import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";

export function MissionVision() {
  return (
    <section className="section-hairline">
      <div className="grid lg:grid-cols-2">
        <div className="bg-canvas">
          <Container width="full" className="section-space lg:pr-16">
            <p className="type-meta text-gold">What we do</p>
            <h2 className="type-display-lg mt-4 text-ink">
              {home.mission.heading}
            </h2>
            <p className="type-serif-italic mt-7 max-w-measure text-gold">
              {home.mission.body}
            </p>
            <p className="type-body mt-7">{home.mission.supporting}</p>
          </Container>
        </div>
        <div className="relative overflow-hidden bg-navy-panel text-on-navy">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-8 right-8 font-display text-[120px] leading-none font-medium text-gold/15"
          >
            II.
          </span>
          <Container width="full" className="section-space relative lg:pl-16">
            <p className="type-meta text-on-navy">
              What that work hopes to accomplish
            </p>
            <h2 className="type-display-lg mt-4 text-on-navy">
              {home.vision.heading}
            </h2>
            <div className="mt-7 h-px w-14 bg-gold" />
            <p className="type-body mt-7 max-w-measure text-on-navy-muted">
              {home.vision.body}
            </p>
          </Container>
        </div>
      </div>
    </section>
  );
}
