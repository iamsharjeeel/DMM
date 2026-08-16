import { speaking } from "@/content/speaking";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function SpeakingTopics() {
  const { topics } = speaking;

  return (
    <Section hairline>
      <Container>
        <ChapterHead
          numeral="02"
          eyebrow="The Record"
          heading={topics.heading}
        />
        <ol className="mt-[56px]">
          {topics.items.map((topic, index) => (
            <li
              key={topic.id}
              className="grid gap-4 border-t border-hairline py-10 md:grid-cols-[5rem_minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10"
            >
              <span className="font-display text-[30px] font-medium leading-none text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="type-display-md text-ink">{topic.title}</h3>
              <p className="type-body">{topic.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
