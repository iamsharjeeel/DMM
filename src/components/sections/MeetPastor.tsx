import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { PastorImage } from "@/components/ui/PastorImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MeetPastor() {
  const { meet } = home;

  return (
    <Section tone="paper">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <PastorImage
          slot={meet.image.slot}
          alt={meet.image.alt}
          aspect="portrait"
        />
        <div>
          <SectionHeading heading={meet.heading} />
          <div className="mt-8 space-y-5 text-lg text-ink-soft">
            {meet.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 text-ink-soft">{meet.principleLead}</p>
          <p className="mt-3 font-display text-3xl italic">{meet.principle}</p>
          <p className="mt-8 text-ink-soft">{meet.mottoLead}</p>
          <p className="mt-3 font-display text-4xl italic">{meet.motto}</p>
        </div>
      </Container>
    </Section>
  );
}
