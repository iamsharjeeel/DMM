import { NextResponse } from "next/server";
import { logFormEvent } from "@/lib/forms/log";
import { allowFormSubmission } from "@/lib/forms/rate-limit";
import { parseNativeForm } from "@/lib/forms/schemas";
import {
  contentTypeIsJson,
  isSameOriginRequest,
  payloadTooLarge,
} from "@/lib/forms/security";
import {
  FORM_GENERIC_ERROR,
  FORM_RATE_LIMIT_ERROR,
  FORM_VALIDATION_ERROR,
  MAX_FORM_BODY_BYTES,
  isAllowedForm,
} from "@/lib/forms/types";
import { forwardFormWebhook, WebhookConfigError } from "@/lib/forms/webhook";

function jsonResponse(body: { ok: true } | { ok: false; error: string }, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

async function readJsonBody(
  request: Request,
): Promise<{ error: 400 | 413 } | { value: unknown }> {
  if (payloadTooLarge(request, MAX_FORM_BODY_BYTES)) {
    return { error: 413 };
  }

  const buffer = await request.arrayBuffer();
  if (buffer.byteLength > MAX_FORM_BODY_BYTES) {
    return { error: 413 };
  }

  try {
    return { value: JSON.parse(new TextDecoder().decode(buffer)) as unknown };
  } catch {
    return { error: 400 };
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ form: string }> },
) {
  const requestId = crypto.randomUUID();
  const { form } = await context.params;

  if (!isAllowedForm(form)) {
    logFormEvent({ requestId, form, result: "error", status: 404 });
    return jsonResponse({ ok: false, error: FORM_GENERIC_ERROR }, 404);
  }

  if (!isSameOriginRequest(request)) {
    logFormEvent({ requestId, form, result: "error", status: 403 });
    return jsonResponse({ ok: false, error: FORM_GENERIC_ERROR }, 403);
  }

  if (!contentTypeIsJson(request)) {
    logFormEvent({ requestId, form, result: "error", status: 415 });
    return jsonResponse({ ok: false, error: FORM_GENERIC_ERROR }, 415);
  }

  if (!allowFormSubmission(form, request)) {
    logFormEvent({ requestId, form, result: "error", status: 429 });
    return jsonResponse({ ok: false, error: FORM_RATE_LIMIT_ERROR }, 429);
  }

  const body = await readJsonBody(request);
  if ("error" in body) {
    logFormEvent({ requestId, form, result: "error", status: body.error });
    if (body.error === 413) {
      return jsonResponse({ ok: false, error: FORM_GENERIC_ERROR }, 413);
    }
    return jsonResponse({ ok: false, error: FORM_VALIDATION_ERROR }, 400);
  }

  const parsed = parseNativeForm(form, body.value);
  if (parsed.status === "invalid") {
    logFormEvent({ requestId, form, result: "error", status: 400 });
    return jsonResponse({ ok: false, error: FORM_VALIDATION_ERROR }, 400);
  }

  if (parsed.status === "ignored") {
    logFormEvent({ requestId, form, result: "ok", status: 200 });
    return jsonResponse({ ok: true }, 200);
  }

  try {
    const forwarded = await forwardFormWebhook(form, parsed.payload);
    if (!forwarded.ok) {
      logFormEvent({ requestId, form, result: "error", status: 502 });
      return jsonResponse({ ok: false, error: FORM_GENERIC_ERROR }, 502);
    }
  } catch (error) {
    if (error instanceof WebhookConfigError) {
      logFormEvent({ requestId, form, result: "error", status: 500 });
      return jsonResponse({ ok: false, error: FORM_GENERIC_ERROR }, 500);
    }
    logFormEvent({ requestId, form, result: "error", status: 502 });
    return jsonResponse({ ok: false, error: FORM_GENERIC_ERROR }, 502);
  }

  logFormEvent({ requestId, form, result: "ok", status: 200 });
  return jsonResponse({ ok: true }, 200);
}

export function GET() {
  return jsonResponse({ ok: false, error: FORM_GENERIC_ERROR }, 405);
}
