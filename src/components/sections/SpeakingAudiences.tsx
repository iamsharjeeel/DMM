import { speaking } from "@/content/speaking";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SpeakingAudiences() {
  const { audiences } = speaking;

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading heading={audiences.heading} />
        </Reveal>
        <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-4 text-xl leading-snug sm:text-2xl">
          {audiences.items.map((item, index) => (
            <li key={item} className="flex items-baseline gap-3">
              <span>{item}</span>
              {index < audiences.items.length - 1 ? (
                <span aria-hidden="true" className="text-gold">
                  ·
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
