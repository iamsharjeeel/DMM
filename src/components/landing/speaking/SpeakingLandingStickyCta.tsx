"use client";

import { useEffect, useState } from "react";
import { speakingLanding } from "@/content/speaking-landing";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function SpeakingLandingStickyCta() {
  const [heroInView, setHeroInView] = useState(true);
  const [formNearby, setFormNearby] = useState(false);
  const [formFocused, setFormFocused] = useState(false);

  useEffect(() => {
    const form = document.getElementById(speakingLanding.formAnchor);
    const hero = document.getElementById("speaking-landing-hero");
    if (!(form instanceof HTMLElement)) {
      return;
    }

    const section: HTMLElement = form;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id === speakingLanding.formAnchor) {
            setFormNearby(entry.isIntersecting);
          }
          if (entry.target.id === "speaking-landing-hero") {
            setHeroInView(entry.isIntersecting);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    observer.observe(section);
    if (hero instanceof HTMLElement) {
      observer.observe(hero);
    }

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

  if (heroInView || formNearby || formFocused) {
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
