import { home } from "@/content/home";
import { ArrowIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SpeakingPreview() {
  const { speakingPreview } = home;

  return (
    <Section tone="navy">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <SectionHeading heading={speakingPreview.heading} invert>
          <p>{speakingPreview.body}</p>
          <p className="mt-4">{speakingPreview.supporting}</p>
        </SectionHeading>
        <div className="lg:justify-self-end">
          <ButtonLink href={speakingPreview.cta.href} variant="invert" size="lg">
            {speakingPreview.cta.label}
            <ArrowIcon />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
