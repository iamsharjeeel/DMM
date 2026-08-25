import { speaking } from "@/content/speaking";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SpeakingTopics() {
  const { topics } = speaking;

  return (
    <Section tone="cream">
      <Container>
        <Reveal>
          <SectionHeading heading={topics.heading} />
        </Reveal>
        <ol className="mt-12">
          {topics.items.map((topic, index) => (
            <li
              key={topic.id}
              className="grid gap-3 border-t border-rule py-10 md:grid-cols-[4.5rem_minmax(0,0.85fr)_minmax(0,1.2fr)] md:gap-10"
            >
              <span
                aria-hidden="true"
                className="font-display text-2xl italic text-blue"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display-md leading-tight">{topic.title}</h3>
              <p className="text-lg text-ink-soft">{topic.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
