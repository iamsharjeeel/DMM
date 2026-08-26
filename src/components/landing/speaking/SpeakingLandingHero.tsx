import { ButtonLink } from "@/components/ui/ButtonLink";
import { PastorImage } from "@/components/ui/PastorImage";
import { speakingLanding } from "@/content/speaking-landing";

const formHref = `#${speakingLanding.formAnchor}`;
const topicsHref = `#${speakingLanding.topicsAnchor}`;

export function SpeakingLandingHero() {
  const { hero } = speakingLanding;

  return (
    <section className="overflow-x-clip bg-ivory">
      <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-stretch">
        <div className="flex min-w-0 flex-col justify-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16 xl:py-20 xl:pl-[max(3rem,calc((100vw-86rem)/2+4rem))] xl:pr-12">
          <p className="eyebrow lp-enter lp-enter-1 text-blue">{hero.eyebrow}</p>
          <h1 className="lp-hero-headline lp-enter lp-enter-2 mt-6 max-w-[40rem] text-blue-deep">
            {hero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="lp-enter lp-enter-3 mt-6 max-w-[34rem] text-base leading-relaxed text-ink-soft sm:text-lg">
            {hero.body}
          </p>
          <p className="lp-enter lp-enter-3 mt-8 max-w-[36rem] text-[0.68rem] font-semibold tracking-[0.16em] text-ink-soft uppercase sm:text-[0.72rem] sm:tracking-[0.18em]">
            {hero.credibility}
          </p>
          <div className="lp-enter lp-enter-4 mt-8 flex flex-col items-start gap-4 sm:mt-10">
            <ButtonLink href={formHref} variant="primary" size="lg">
              {speakingLanding.cta}
            </ButtonLink>
            <a
              href={topicsHref}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-blue underline-offset-[6px] hover:underline"
            >
              {hero.exploreLabel}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="relative min-h-[22rem] min-w-0 px-5 pb-10 sm:min-h-[28rem] sm:px-8 lg:min-h-[36rem] lg:px-0 lg:pb-0">
          <div className="relative overflow-hidden lg:h-full">
            <div className="lp-hero-frame relative lg:h-full">
              <span
                aria-hidden="true"
                className="absolute top-4 left-4 z-10 hidden h-14 w-14 border-t border-l border-red sm:block"
              />
              <span
                aria-hidden="true"
                className="absolute right-4 bottom-4 z-10 hidden h-14 w-14 border-r border-b border-red sm:block"
              />
              <PastorImage
                slot="hero"
                alt={hero.imageAlt}
                aspect="portrait"
                preload
                framed={false}
                stretch
                zoomOnHover={false}
                objectPosition="center 38%"
                sizes="(max-width: 1023px) 100vw, 46vw"
                className="lg:h-full"
              />
            </div>
          </div>
          <p className="mt-3 text-[0.68rem] font-semibold tracking-[0.18em] text-blue uppercase lg:absolute lg:right-0 lg:bottom-0 lg:left-0 lg:z-10 lg:mt-0 lg:bg-ivory lg:px-5 lg:py-3">
            {hero.imageCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
