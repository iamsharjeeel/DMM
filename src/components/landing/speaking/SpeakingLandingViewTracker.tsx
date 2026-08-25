"use client";

import { useEffect } from "react";
import {
  pushDataLayerEvent,
  speakingLandingEvents,
} from "@/lib/analytics/data-layer";

let viewPushed = false;

export function SpeakingLandingViewTracker() {
  useEffect(() => {
    if (viewPushed) {
      return;
    }
    viewPushed = true;
    pushDataLayerEvent(speakingLandingEvents.view);
  }, []);

  return null;
}
