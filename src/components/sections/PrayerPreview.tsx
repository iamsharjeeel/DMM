import { home } from "@/content/home";
import { GoldCross } from "@/components/brand/GoldCross";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function PrayerPreview() {
  const { prayerPreview } = home;

  return (
    <Section tone="navy">
      <Container>
        <GoldCross />
        <header className="mt-7">
          <p className="type-meta text-on-navy">
            <span className="lg:hidden">
              <span className="text-gold">03</span>
              <span aria-hidden="true"> · </span>
            </span>
            Prayer
          </p>
          <div className="mt-4 flex items-baseline gap-5">
            <span
              aria-hidden="true"
              className="hidden shrink-0 font-display text-[44px] font-medium leading-none text-gold lg:block"
            >
              03
            </span>
            <h2 className="type-display-lg text-on-navy">
              {prayerPreview.heading}
            </h2>
          </div>
        </header>
        <p className="type-body mt-7 text-on-navy-muted">
          {prayerPreview.body}
        </p>
        <p className="type-body mt-4 text-on-navy-muted">
          {prayerPreview.supporting}
        </p>
        <div className="mt-[56px]">
          <ButtonLink href={prayerPreview.cta.href} variant="invert">
            {prayerPreview.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
