import { speaking } from "@/content/speaking";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { PastorImage } from "@/components/ui/PastorImage";

export function SpeakingHero() {
  const { hero } = speaking;

  return (
    <section className="tone-forest">
      <Container className="relative grid items-center gap-12 py-[var(--space-hero)] lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
        <div className="hero-enter min-w-0">
          <p className="eyebrow text-cream/60">Speaking</p>
          <GoldRule className="mt-5" />
          <h1 className="display-xl mt-6 max-w-[12ch] text-balance text-cream">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl font-display text-2xl italic leading-snug text-cream sm:text-[1.85rem]">
            {hero.supporting}
          </p>
          <div className="mt-8 max-w-xl space-y-4 text-lg text-cream/80">
            {hero.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href={hero.cta.href} variant="invert" size="lg">
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
