import { home } from "@/content/home";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { AccentRule } from "@/components/ui/AccentRule";
import { PastorImage } from "@/components/ui/PastorImage";

export function HomeHero() {
  const { hero } = home;

  return (
    <section className="bg-ivory">
      <Container
        width="wide"
        className="grid items-center gap-12 py-[var(--space-hero)] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-16 xl:gap-24"
      >
        <div className="hero-enter min-w-0">
          <p className="eyebrow text-blue">{hero.eyebrow}</p>
          <AccentRule className="mt-5" />
          <h1 className="display-xl mt-6 max-w-[14ch] text-balance text-blue-deep italic">
            {hero.headline}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {hero.supporting}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={hero.primaryCta.href} variant="primary" size="lg">
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
