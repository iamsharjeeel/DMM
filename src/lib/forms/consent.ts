import { compliance } from "../../config/compliance";
import type { AllowedForm } from "./types";

export function attachSmsConsentMetadata<T extends Record<string, unknown>>(
  form: AllowedForm,
  payload: T,
) {
  return {
    ...payload,
    smsConsentCapturedAt: new Date().toISOString(),
    smsConsentSource:
      form === "prayer-request"
        ? "website-prayer-request"
        : "website-speaking-request",
    smsConsentVersion: compliance.consentVersion,
  };
}
