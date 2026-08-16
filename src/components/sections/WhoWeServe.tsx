import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function WhoWeServe() {
  const { whoWeServe } = home;

  return (
    <Section>
      <Container width="narrow" className="text-center">
        <p className="text-xs font-medium tracking-[0.28em] uppercase text-bronze-dark">
          {whoWeServe.heading}
        </p>
        <h2 className="mt-6 font-display text-4xl leading-[1.12] sm:text-5xl">
          {whoWeServe.headline}
        </h2>
        <p className="mt-6 text-lg text-ink-soft">{whoWeServe.supporting}</p>
        <p className="mt-5 text-ink-soft">{whoWeServe.body}</p>
      </Container>
    </Section>
  );
}
