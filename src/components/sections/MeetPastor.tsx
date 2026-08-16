import { home } from "@/content/home";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Container } from "@/components/ui/Container";
import { PastorImage } from "@/components/ui/PastorImage";
import { Section } from "@/components/ui/Section";

export function MeetPastor() {
  const { meet } = home;

  return (
    <Section hairline>
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <PastorImage
          slot={meet.image.slot}
          alt={meet.image.alt}
          aspect="portrait"
        />
        <div>
          <ChapterHead
            numeral="I"
            eyebrow="The Pastor"
            heading={meet.heading}
          />
          <div className="mt-7 space-y-5">
            {meet.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-body">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="type-body mt-7">{meet.principleLead}</p>
          <p className="type-serif-italic mt-4 text-ink">{meet.principle}</p>
          <p className="type-body mt-7">{meet.mottoLead}</p>
          <blockquote className="mt-7 ml-9">
            <div className="mb-7 h-px w-14 bg-gold" />
            <p className="type-serif-italic text-[24px] text-ink">{meet.motto}</p>
          </blockquote>
        </div>
      </Container>
    </Section>
  );
}
