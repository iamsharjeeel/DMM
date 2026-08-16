import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceList() {
  const { experience } = home;

  return (
    <Section>
      <Container>
        <SectionHeading heading={experience.heading} />
        <ol className="mt-12 grid gap-x-12 sm:grid-cols-2">
          {experience.items.map((item, index) => (
            <li
              key={item}
              className="flex gap-5 border-t border-rule py-5"
            >
              <span className="w-8 shrink-0 text-sm tracking-[0.16em] text-bronze-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-lg leading-snug">{item}</span>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
