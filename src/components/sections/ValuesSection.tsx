import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ValuesSection() {
  const { values } = home;

  return (
    <Section tone="cream">
      <Container>
        <Reveal>
          <SectionHeading heading={values.heading} />
          <p className="mt-10 font-display text-[clamp(3.75rem,10vw,8rem)] leading-none tracking-[0.04em]">
            {values.identity}
          </p>
          <p className="mt-4 text-lg tracking-[0.04em] text-ink-soft">
            {values.phrase}
          </p>
        </Reveal>
        <ul className="mt-14">
          {values.items.map((item) => (
            <li
              key={item.letter}
              className="grid gap-4 border-t border-rule py-8 md:grid-cols-[5.5rem_minmax(0,0.7fr)_minmax(0,1.3fr)] md:items-start md:gap-10 md:py-10"
            >
              <p
                aria-hidden="true"
                className="font-display text-5xl leading-none text-forest md:text-6xl"
              >
                {item.letter}
              </p>
              <h3 className="display-md pt-1">{item.title}</h3>
              <p className="max-w-xl text-lg text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
