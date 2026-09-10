import { AccentRule } from "@/components/ui/AccentRule";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { speakingLanding } from "@/content/speaking-landing";

export function SpeakingPrinciple() {
  const { principle } = speakingLanding;

  return (
    <Section tone="blue">
      <Container>
        <Reveal>
          <Eyebrow invert>{principle.lead}</Eyebrow>
          <h2 className="sr-only">{principle.quote}</h2>
          <AccentRule className="mt-6" />
          <blockquote className="lp-principle-quote mt-8 max-w-xl text-cream lg:max-w-[14ch]">
            <span className="block">{principle.quoteLines[0]}</span>
            <span className="block italic">{principle.quoteLines[1]}</span>
          </blockquote>
          <p className="mt-8 font-display text-2xl text-cream italic sm:text-[1.85rem]">
            {principle.motto}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
