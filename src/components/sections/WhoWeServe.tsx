import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function WhoWeServe() {
  const { whoWeServe } = home;

  return (
    <Section tone="sage">
      <Container width="narrow" className="text-center">
        <Reveal>
          <p className="eyebrow text-forest">{whoWeServe.heading}</p>
          <GoldRule className="mx-auto mt-5" />
          <h2 className="display-lg mt-6 text-balance">
            {whoWeServe.headline}
          </h2>
          <p className="mt-6 text-lg text-ink-soft">{whoWeServe.supporting}</p>
          <p className="mt-5 text-ink-soft">{whoWeServe.body}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
