import { AccentRule } from "@/components/ui/AccentRule";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { speakingLanding } from "@/content/speaking-landing";

export function SpeakingMessage() {
  const { message } = speakingLanding;

  return (
    <Section>
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-4">
              <Eyebrow>{message.eyebrow}</Eyebrow>
              <AccentRule className="mt-5" />
            </div>
            <div className="lg:col-span-8">
              <h2 className="lp-manifesto max-w-xl text-blue-deep lg:max-w-[16ch]">
                {message.heading}
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
                {message.body}
              </p>
              <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
                {message.supporting}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
