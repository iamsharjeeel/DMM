import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AccentRule } from "@/components/ui/AccentRule";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { speakingLanding } from "@/content/speaking-landing";

export function SpeakingExperience() {
  const { experience } = speakingLanding;

  return (
    <Section>
      <Container>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>{experience.eyebrow}</Eyebrow>
              <AccentRule className="mt-5" />
              <h2 className="display-lg mt-5 max-w-xl lg:max-w-[14ch]">{experience.heading}</h2>
              <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
                {experience.body}
              </p>
            </div>
            <ol className="lg:col-span-7 lg:pt-10">
              {experience.items.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-5 border-t border-rule py-4 last:border-b"
                >
                  <span
                    aria-hidden="true"
                    className="w-8 shrink-0 font-display text-lg text-blue italic"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-0.5 leading-snug">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
