import { ArrowIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AccentRule } from "@/components/ui/AccentRule";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { speakingLanding } from "@/content/speaking-landing";

export function SpeakingTopicsEditorial() {
  const { topics } = speakingLanding;

  return (
    <Section
      id={speakingLanding.topicsAnchor}
      tone="cream"
      className="scroll-mt-[calc(var(--lp-header-height)+0.75rem)]"
    >
      <Container>
        <Reveal>
          <Eyebrow>{topics.eyebrow}</Eyebrow>
          <AccentRule className="mt-5" />
          <h2 className="display-lg mt-5 max-w-3xl text-balance">{topics.heading}</h2>
        </Reveal>
        <ol className="mt-12 lg:mt-16">
          {topics.items.map((topic, index) => (
            <li key={topic.id} className="lp-topic-row">
              <a
                href={`#${speakingLanding.formAnchor}`}
                className="grid gap-3 py-7 no-underline md:grid-cols-[5.5rem_minmax(0,0.9fr)_minmax(0,1.25fr)_1.5rem] md:items-baseline md:gap-10 md:py-8"
              >
                <span
                  aria-hidden="true"
                  className="lp-topic-num font-display text-[1.85rem] leading-none text-blue italic md:text-[2.15rem]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="lp-topic-title text-xl font-medium leading-snug text-ink">
                  {topic.title}
                </h3>
                <p className="text-ink-soft md:pt-1">{topic.body}</p>
                <span
                  className="lp-topic-arrow hidden text-ink-soft md:flex md:justify-end"
                  aria-hidden="true"
                >
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
