import { home, type FoundationalScripture } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { AccentRule } from "@/components/ui/AccentRule";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

function ScriptureAttribution({
  scripture,
  invert = false,
}: {
  scripture?: FoundationalScripture;
  invert?: boolean;
}) {
  if (!scripture) {
    return null;
  }

  const reference = scripture.reference.trim();
  if (!reference) {
    return null;
  }

  const quotation = scripture.quotation?.trim();

  return (
    <figure className="mt-10 max-w-xl">
      <AccentRule />
      {quotation ? (
        <blockquote
          className={cn(
            "mt-5 font-display text-xl italic leading-relaxed sm:text-[1.35rem]",
            invert ? "text-cream/80" : "text-ink-soft",
          )}
        >
          {quotation}
        </blockquote>
      ) : null}
      <figcaption
        className={cn(
          "eyebrow",
          quotation ? "mt-4" : "mt-5",
          invert ? "text-cream/60" : "text-blue",
        )}
      >
        {reference}
      </figcaption>
    </figure>
  );
}

export function MissionVision() {
  return (
    <section>
      <div className="grid lg:grid-cols-2">
        <div className="bg-mist">
          <Container width="full" className="section-space max-w-none lg:pr-16 xl:pr-20">
            <Reveal>
              <p className="eyebrow text-blue">What we do</p>
              <AccentRule className="mt-5" />
              <h2 className="display-lg mt-5">{home.mission.heading}</h2>
              <p className="mt-6 max-w-xl text-xl leading-relaxed">
                {home.mission.body}
              </p>
              <p className="mt-6 font-display text-2xl italic text-ink-soft sm:text-[1.85rem]">
                {home.mission.supporting}
              </p>
              <ScriptureAttribution scripture={home.mission.scripture} />
            </Reveal>
          </Container>
        </div>
        <div className="tone-blue">
          <Container width="full" className="section-space relative max-w-none lg:pl-16 xl:pl-20">
            <Reveal>
              <p className="eyebrow text-cream/60">
                What that work hopes to accomplish
              </p>
              <AccentRule className="mt-5" />
              <h2 className="display-lg mt-5 text-cream">{home.vision.heading}</h2>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-cream/80">
                {home.vision.body}
              </p>
              <ScriptureAttribution scripture={home.vision.scripture} invert />
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}
