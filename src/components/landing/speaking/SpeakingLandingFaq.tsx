"use client";

import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { AccentRule } from "@/components/ui/AccentRule";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { speakingLanding } from "@/content/speaking-landing";
import { cn } from "@/lib/cn";

export function SpeakingLandingFaq() {
  const { faq } = speakingLanding;
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <Section>
      <Container width="narrow">
        <Reveal>
          <h2 className="display-lg">{faq.heading}</h2>
          <AccentRule className="mt-5" />
        </Reveal>
        <div className="mt-10">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div key={item.question} className="border-t border-rule last:border-b">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-lg font-medium leading-snug">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative h-4 w-4 shrink-0 text-blue"
                    >
                      <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
                      <span
                        className={cn(
                          "absolute top-0 left-1/2 h-4 w-px bg-current transition-transform duration-200",
                          isOpen && "scale-y-0",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen ? true : undefined}
                  className={cn("lp-faq-panel", isOpen && "is-open")}
                >
                  <div className="lp-faq-panel-inner">
                    <p className="pb-6 text-ink-soft">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
