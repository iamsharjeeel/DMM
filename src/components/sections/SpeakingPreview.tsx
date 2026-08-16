import { home } from "@/content/home";
import { ArrowIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SpeakingPreview() {
  const { speakingPreview } = home;

  return (
    <Section tone="forest">
      <Container className="relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <Reveal>
          <SectionHeading heading={speakingPreview.heading} invert>
            <p>{speakingPreview.body}</p>
            <p className="mt-4">{speakingPreview.supporting}</p>
          </SectionHeading>
        </Reveal>
        <Reveal delay={90} className="lg:justify-self-end">
          <ButtonLink href={speakingPreview.cta.href} variant="invert" size="lg">
            {speakingPreview.cta.label}
            <ArrowIcon />
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
