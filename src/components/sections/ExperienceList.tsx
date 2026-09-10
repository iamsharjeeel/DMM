import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RoleList } from "@/components/ui/RoleList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceList() {
  const { experience } = home;

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading heading={experience.heading}>
            <p>{experience.intro}</p>
          </SectionHeading>
        </Reveal>
        <RoleList items={experience.items} />
      </Container>
    </Section>
  );
}
