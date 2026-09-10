import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AccentRule } from "@/components/ui/AccentRule";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { speakingLanding } from "@/content/speaking-landing";

export function SpeakingEventFit() {
  const { eventFit } = speakingLanding;

  return (
    <Section tone="mist">
      <Container>
        <Reveal>
          <Eyebrow>{eventFit.eyebrow}</Eyebrow>
          <AccentRule className="mt-5" />
          <h2 className="display-lg mt-5">{eventFit.heading}</h2>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5">
            {eventFit.items.map((item) => (
              <li key={item}>
                <a
                  href={`#${speakingLanding.formAnchor}`}
                  className="lp-fit-item flex min-h-14 items-center border-t border-rule px-3 py-4 text-[0.95rem] leading-snug no-underline sm:min-h-16"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
