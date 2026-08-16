import Script from "next/script";
import {
  getHighLevelTrackingId,
  highLevelTracking,
} from "@/config/site";

export function HighLevelTracking() {
  const trackingId = getHighLevelTrackingId();
  if (!trackingId) {
    return null;
  }

  return (
    <Script
      id="highlevel-external-tracking"
      src={highLevelTracking.scriptSrc}
      strategy="afterInteractive"
      data-tracking-id={trackingId}
    />
  );
}
