import { home } from "@/content/home";
import { ArrowIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PrayerPreview() {
  const { prayerPreview } = home;

  return (
    <Section tone="prayer">
      <Container width="narrow">
        <SectionHeading heading={prayerPreview.heading}>
          <p>{prayerPreview.body}</p>
          <p className="mt-4">{prayerPreview.supporting}</p>
        </SectionHeading>
        <div className="mt-8">
          <ButtonLink href={prayerPreview.cta.href} variant="secondary" size="lg">
            {prayerPreview.cta.label}
            <ArrowIcon />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
