import { speaking } from "@/content/speaking";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SpeakingTopics() {
  const { topics } = speaking;

  return (
    <Section tone="paper">
      <Container>
        <SectionHeading heading={topics.heading} />
        <ol className="mt-12 divide-y divide-rule">
          {topics.items.map((topic, index) => (
            <li
              key={topic.id}
              className="grid gap-4 py-10 md:grid-cols-[5rem_minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10"
            >
              <span className="text-sm tracking-[0.18em] text-bronze-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-3xl leading-tight">
                {topic.title}
              </h3>
              <p className="text-lg text-ink-soft">{topic.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
