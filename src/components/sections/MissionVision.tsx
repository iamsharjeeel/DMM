import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";

export function MissionVision() {
  return (
    <section>
      <div className="grid lg:grid-cols-2">
        <div className="bg-sage">
          <Container width="full" className="section-space max-w-none lg:pr-16 xl:pr-20">
            <Reveal>
              <p className="eyebrow text-forest">What we do</p>
              <GoldRule className="mt-5" />
              <h2 className="display-lg mt-5">{home.mission.heading}</h2>
              <p className="mt-6 max-w-xl text-xl leading-relaxed">
                {home.mission.body}
              </p>
              <p className="mt-6 font-display text-2xl italic text-ink-soft sm:text-[1.85rem]">
                {home.mission.supporting}
              </p>
            </Reveal>
          </Container>
        </div>
        <div className="tone-forest">
          <Container width="full" className="section-space relative max-w-none lg:pl-16 xl:pl-20">
            <Reveal>
              <p className="eyebrow text-cream/60">
                What that work hopes to accomplish
              </p>
              <GoldRule className="mt-5" />
              <h2 className="display-lg mt-5 text-cream">{home.vision.heading}</h2>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-cream/80">
                {home.vision.body}
              </p>
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}
