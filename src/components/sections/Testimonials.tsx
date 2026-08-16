import { ChapterHead } from "@/components/ui/ChapterHead";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function Testimonials({
  heading,
  items,
}: {
  heading: string;
  items: ReadonlyArray<{ quote: string; name: string; role?: string }>;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section hairline>
      <Container>
        <ChapterHead numeral="—" eyebrow="Voices" heading={heading} />
        <ul className="mt-[56px] grid gap-8 lg:grid-cols-2">
          {items.map((item) => (
            <li
              key={`${item.name}-${item.quote}`}
              className="border-t border-hairline pt-7"
            >
              <blockquote className="type-serif-italic text-ink">
                {item.quote}
              </blockquote>
              <p className="type-meta mt-7 text-muted">
                {item.name}
                {item.role ? ` — ${item.role}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
