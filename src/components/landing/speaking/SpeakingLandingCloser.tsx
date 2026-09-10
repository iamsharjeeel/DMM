import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { AccentRule } from "@/components/ui/AccentRule";
import { Section } from "@/components/ui/Section";
import { speakingLanding } from "@/content/speaking-landing";

export function SpeakingLandingCloser() {
  const { closer } = speakingLanding;

  return (
    <Section tone="blue" className="pb-20">
      <Container>
        <AccentRule />
        <h2 className="display-lg mt-6 max-w-xl text-cream lg:max-w-[12ch]">{closer.heading}</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
          {closer.body}
        </p>
        <div className="mt-8">
          <ButtonLink
            href={`#${speakingLanding.formAnchor}`}
            variant="primary"
            size="lg"
          >
            {speakingLanding.cta}
          </ButtonLink>
        </div>
        <p className="mt-5 text-sm text-cream/70">{closer.reassurance}</p>
      </Container>
    </Section>
  );
}
