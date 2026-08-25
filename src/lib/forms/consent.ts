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
        : form === "speaking-meta-lead"
          ? "website-speaking-meta-lead"
          : "website-speaking-request",
    smsConsentVersion: compliance.consentVersion,
  };
}
