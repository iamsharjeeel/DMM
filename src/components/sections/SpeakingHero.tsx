import { speaking } from "@/content/speaking";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Container } from "@/components/ui/Container";
import { PastorImage } from "@/components/ui/PastorImage";

export function SpeakingHero() {
  const { hero } = speaking;

  return (
    <section className="section-hairline bg-canvas">
      <Container className="grid items-center gap-14 py-[84px] lg:grid-cols-12 lg:py-[140px]">
        <div className="lg:col-span-7">
          <ChapterHead
            numeral="01"
            eyebrow="Speaking"
            heading={hero.headline}
            as="h1"
          />
          <p className="type-serif-italic mt-7 text-ink">{hero.supporting}</p>
          <div className="mt-7 space-y-5">
            {hero.body.map((paragraph) => (
              <p key={paragraph} className="type-body">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-[56px]">
            <ButtonLink href={hero.cta.href} variant="primary">
              {hero.cta.label}
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-5">
          <PastorImage
            slot={hero.image.slot}
            alt={hero.image.alt}
            aspect="portrait"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
