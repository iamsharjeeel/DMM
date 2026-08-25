export const speakingLandingEvents = {
  view: "dmm_speaking_lp_view",
  formStart: "dmm_speaking_lp_form_start",
  submitSuccess: "dmm_speaking_lp_submit_success",
  submitError: "dmm_speaking_lp_submit_error",
} as const;

export type SpeakingLandingEvent =
  (typeof speakingLandingEvents)[keyof typeof speakingLandingEvents];

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function pushDataLayerEvent(event: SpeakingLandingEvent): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event });
}
