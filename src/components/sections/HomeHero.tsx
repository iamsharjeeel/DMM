import { home } from "@/content/home";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PastorImage } from "@/components/ui/PastorImage";

export function HomeHero() {
  const { hero } = home;

  return (
    <section className="section-hairline overflow-hidden bg-canvas">
      <Container className="grid items-center gap-14 py-[84px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:py-[140px]">
        <div className="reveal">
          <p className="type-meta text-gold">{hero.eyebrow}</p>
          <h1 className="type-display-xl mt-7 text-ink">{hero.headline}</h1>
          <p className="type-body mt-7">{hero.supporting}</p>
          <div className="mt-[56px] flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
        <PastorImage
          slot={hero.image.slot}
          alt={hero.image.alt}
          aspect="portrait"
          priority
          showMonogram
          className="w-full"
        />
      </Container>
    </section>
  );
}
