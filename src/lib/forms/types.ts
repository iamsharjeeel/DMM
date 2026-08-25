export const allowedForms = ["prayer-request", "speaking-booking"] as const;

export type AllowedForm = (typeof allowedForms)[number];

export const MAX_FORM_BODY_BYTES = 32 * 1024;
export const WEBHOOK_TIMEOUT_MS = 9000;
export const MIN_FORM_FILL_MS = 1200;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_HOUR_MS = 60 * 60 * 1000;
export const RATE_LIMIT_HOUR_MAX = 12;

export const TRUSTED_WEBHOOK_HOST = "services.leadconnectorhq.com";

export const FORM_GENERIC_ERROR =
  "We couldn't submit your request right now. Please try again.";
export const FORM_VALIDATION_ERROR = "Please review the highlighted fields.";
export const FORM_RATE_LIMIT_ERROR =
  "We couldn't submit your request right now. Please try again.";

export type FormApiSuccess = { ok: true };
export type FormApiFailure = { ok: false; error: string };
export type FormApiResponse = FormApiSuccess | FormApiFailure;

export function isAllowedForm(value: string): value is AllowedForm {
  return (allowedForms as readonly string[]).includes(value);
}
