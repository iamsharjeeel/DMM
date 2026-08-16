import { home } from "@/content/home";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function SpeakingPreview() {
  const { speakingPreview } = home;

  return (
    <Section hairline>
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <ChapterHead
              numeral="05"
              eyebrow="Speaking"
              heading={speakingPreview.heading}
            />
            <p className="type-body mt-7">{speakingPreview.body}</p>
            <p className="type-body mt-7">{speakingPreview.supporting}</p>
            <div className="mt-[56px]">
              <ButtonLink href={speakingPreview.cta.href} variant="primary">
                {speakingPreview.cta.label}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <p className="type-meta text-gold lg:pt-14">
              <span className="block">Churches ·</span>
              <span className="mt-3 block">Conferences ·</span>
              <span className="mt-3 block">Communities</span>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
