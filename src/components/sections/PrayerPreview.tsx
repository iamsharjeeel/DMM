import { home } from "@/content/home";
import { ArrowIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PrayerPreview() {
  const { prayerPreview } = home;

  return (
    <Section>
      <Container width="narrow">
        <Reveal>
          <SectionHeading heading={prayerPreview.heading}>
            <p>{prayerPreview.body}</p>
            <p className="mt-4">{prayerPreview.supporting}</p>
          </SectionHeading>
          <div className="mt-9">
            <ButtonLink href={prayerPreview.cta.href} variant="primary" size="lg">
              {prayerPreview.cta.label}
              <ArrowIcon />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
