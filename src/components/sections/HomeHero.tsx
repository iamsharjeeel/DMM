import { home } from "@/content/home";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PastorImage } from "@/components/ui/PastorImage";

export function HomeHero() {
  const { hero } = home;

  return (
    <section className="overflow-hidden bg-ivory">
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:py-24">
        <div className="reveal">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-bronze-dark">
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[0.95] font-medium tracking-tight text-balance sm:text-6xl lg:text-[5.2rem]">
            {hero.headline}
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-soft sm:text-xl">
            {hero.supporting}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} variant="navy" size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="secondary"
              size="lg"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
        <PastorImage
          slot={hero.image.slot}
          alt={hero.image.alt}
          aspect="portrait"
          priority
          className="mx-auto w-full max-w-md lg:max-w-none"
        />
      </Container>
    </section>
  );
}
