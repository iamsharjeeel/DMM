import { home } from "@/content/home";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ValuesSection() {
  const { values } = home;

  return (
    <Section hairline>
      <Container>
        <ChapterHead numeral="02" eyebrow="Core Values" heading={values.heading} />
        <p className="type-display-lg mt-[56px] tracking-[0.18em] text-ink">
          {values.identity}
        </p>
        <ul className="mt-[56px] grid gap-10 lg:grid-cols-3">
          {values.items.map((item) => (
            <li key={item.letter} className="border-t border-hairline pt-7">
              <p className="font-display text-[48px] leading-none font-medium text-gold">
                {item.letter}
              </p>
              <h3 className="type-display-md mt-7 text-ink">{item.title}</h3>
              <p className="type-body mt-4">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="type-serif-italic mt-[56px] text-ink">{values.phrase}</p>
      </Container>
    </Section>
  );
}
