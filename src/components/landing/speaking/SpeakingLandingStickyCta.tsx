"use client";

import { useEffect, useState } from "react";
import { speakingLanding } from "@/content/speaking-landing";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function SpeakingLandingStickyCta() {
  const [formNearby, setFormNearby] = useState(false);
  const [formFocused, setFormFocused] = useState(false);

  useEffect(() => {
    const form = document.getElementById(speakingLanding.formAnchor);
    if (!(form instanceof HTMLElement)) {
      return;
    }

    const section: HTMLElement = form;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFormNearby(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    observer.observe(section);

    function handleFocusIn(event: FocusEvent) {
      if (event.target instanceof Node && section.contains(event.target)) {
        setFormFocused(true);
      }
    }

    function handleFocusOut(event: FocusEvent) {
      if (
        event.target instanceof Node &&
        section.contains(event.target) &&
        !(
          event.relatedTarget instanceof Node &&
          section.contains(event.relatedTarget)
        )
      ) {
        setFormFocused(false);
      }
    }

    section.addEventListener("focusin", handleFocusIn);
    section.addEventListener("focusout", handleFocusOut);

    return () => {
      observer.disconnect();
      section.removeEventListener("focusin", handleFocusIn);
      section.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  if (formNearby || formFocused) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-ivory px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <ButtonLink
        href={`#${speakingLanding.formAnchor}`}
        variant="primary"
        size="lg"
        className="w-full"
      >
        {speakingLanding.cta}
      </ButtonLink>
    </div>
  );
}
