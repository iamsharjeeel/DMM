import { trimText } from "./normalize";
import { site } from "../../config/site";

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export const ATTRIBUTION_MAX_LENGTH = 200;
export const LANDING_PATH = site.routes.invitePastorMayes;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

export type LandingAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  landingPath: string;
};

export function clipAttributionValue(value: string): string {
  return trimText(value).slice(0, ATTRIBUTION_MAX_LENGTH);
}

export function readLandingAttribution(): LandingAttribution {
  const attribution: LandingAttribution = {
    landingPath: LANDING_PATH,
  };

  if (typeof window === "undefined") {
    return attribution;
  }

  const params = new URLSearchParams(window.location.search);
  for (const key of ATTRIBUTION_KEYS) {
    const raw = params.get(key);
    if (!raw) {
      continue;
    }
    const value = clipAttributionValue(raw);
    if (value) {
      attribution[key] = value;
    }
  }

  return attribution;
}

export function compactAttribution(
  input: Partial<LandingAttribution>,
): LandingAttribution {
  const attribution: LandingAttribution = {
    landingPath: LANDING_PATH,
  };

  for (const key of ATTRIBUTION_KEYS) {
    const value = input[key];
    if (!value) {
      continue;
    }
    const clipped = clipAttributionValue(value);
    if (clipped) {
      attribution[key] = clipped;
    }
  }

  return attribution;
}
