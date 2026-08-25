import {
  TRUSTED_WEBHOOK_HOST,
  WEBHOOK_TIMEOUT_MS,
  type AllowedForm,
} from "./types";

export class WebhookConfigError extends Error {
  constructor() {
    super("Form webhook is not configured.");
    this.name = "WebhookConfigError";
  }
}

export function getConfiguredWebhookUrl(): URL {
  const raw = process.env.GHL_FORM_WEBHOOK_URL?.trim();
  if (!raw) {
    throw new WebhookConfigError();
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new WebhookConfigError();
  }

  if (url.protocol === "https:" && url.hostname === TRUSTED_WEBHOOK_HOST) {
    return url;
  }

  if (
    process.env.GHL_FORM_WEBHOOK_ALLOW_LOCAL === "1" &&
    url.protocol === "http:" &&
    (url.hostname === "127.0.0.1" || url.hostname === "localhost")
  ) {
    return url;
  }

  throw new WebhookConfigError();
}

export async function forwardFormWebhook(
  formName: AllowedForm,
  payload: Record<string, unknown>,
): Promise<{ ok: true } | { ok: false }> {
  const url = getConfiguredWebhookUrl();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        source: formName,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "error",
      signal: controller.signal,
    });

    if (!response.ok) {
      return { ok: false };
    }
    return { ok: true };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}
