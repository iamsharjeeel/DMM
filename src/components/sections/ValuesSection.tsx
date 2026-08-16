import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ValuesSection() {
  const { values } = home;

  return (
    <Section tone="paper">
      <Container>
        <SectionHeading heading={values.heading} />
        <p className="mt-8 font-display text-6xl tracking-[0.12em] sm:text-7xl">
          {values.identity}
        </p>
        <p className="mt-3 text-lg tracking-[0.08em] text-bronze-dark uppercase">
          {values.phrase}
        </p>
        <ul className="mt-12 grid gap-10 lg:grid-cols-3">
          {values.items.map((item) => (
            <li key={item.letter} className="border-t border-rule pt-6">
              <p className="font-display text-5xl text-bronze">{item.letter}</p>
              <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
