import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";

export function MissionVision() {
  return (
    <section>
      <div className="grid lg:grid-cols-2">
        <div className="bg-ivory-deep">
          <Container width="full" className="section-space lg:pr-16">
            <p className="text-xs font-medium tracking-[0.28em] uppercase text-bronze-dark">
              What we do
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              {home.mission.heading}
            </h2>
            <p className="mt-6 max-w-xl text-xl leading-relaxed">
              {home.mission.body}
            </p>
            <p className="mt-6 font-display text-2xl italic text-ink-soft">
              {home.mission.supporting}
            </p>
          </Container>
        </div>
        <div className="bg-navy text-paper">
          <Container width="full" className="section-space lg:pl-16">
            <p className="text-xs font-medium tracking-[0.28em] uppercase text-bronze">
              What that work hopes to accomplish
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              {home.vision.heading}
            </h2>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-paper/85">
              {home.vision.body}
            </p>
          </Container>
        </div>
      </div>
    </section>
  );
}
