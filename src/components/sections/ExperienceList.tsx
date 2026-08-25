import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceList() {
  const { experience } = home;

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading heading={experience.heading} />
        </Reveal>
        <ol className="mt-12 grid gap-x-16 sm:grid-cols-2">
          {experience.items.map((item, index) => (
            <li
              key={item}
              className="flex gap-5 border-t border-rule py-5"
            >
              <span
                aria-hidden="true"
                className="w-10 shrink-0 font-display text-xl italic text-blue"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="pt-0.5 text-lg leading-snug">{item}</span>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
