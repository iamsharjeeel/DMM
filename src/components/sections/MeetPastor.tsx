import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { PastorImage } from "@/components/ui/PastorImage";
import { PullQuote } from "@/components/ui/PullQuote";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MeetPastor() {
  const { meet } = home;

  return (
    <Section tone="cream">
      <Container className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch lg:gap-16 xl:gap-20">
        <Reveal className="lg:h-full">
          <PastorImage
            slot={meet.image.slot}
            alt={meet.image.alt}
            aspect="portrait"
            stretch
            objectPosition="center 22%"
          />
        </Reveal>
        <Reveal delay={80}>
          <SectionHeading heading={meet.heading} />
          <div className="mt-8 space-y-5 text-lg text-ink-soft">
            {meet.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <PullQuote lead={meet.principleLead} quote={meet.principle} />
          <PullQuote lead={meet.mottoLead} quote={meet.motto} />
        </Reveal>
      </Container>
    </Section>
  );
}
