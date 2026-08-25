"use client";

import { useEffect, useState } from "react";
import { speakingLanding } from "@/content/speaking-landing";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function SpeakingLandingStickyCta() {
  const [formInView, setFormInView] = useState(true);

  useEffect(() => {
    const node = document.getElementById(speakingLanding.formAnchor);
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFormInView(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (formInView) {
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
