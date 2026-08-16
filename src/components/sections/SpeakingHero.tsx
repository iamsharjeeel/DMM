import { speaking } from "@/content/speaking";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PastorImage } from "@/components/ui/PastorImage";

export function SpeakingHero() {
  const { hero } = speaking;

  return (
    <section className="bg-navy text-paper">
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <h1 className="font-display text-5xl leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="mt-6 text-xl text-bronze">{hero.supporting}</p>
          <div className="mt-8 max-w-xl space-y-4 text-lg text-paper/80">
            {hero.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href={hero.cta.href} variant="primary" size="lg">
              {hero.cta.label}
            </ButtonLink>
          </div>
        </div>
        <PastorImage
          slot={hero.image.slot}
          alt={hero.image.alt}
          aspect="portrait"
          priority
        />
      </Container>
    </section>
  );
}
