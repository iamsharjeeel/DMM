import { home } from "@/content/home";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ExperienceList() {
  const { experience } = home;

  return (
    <Section hairline>
      <Container>
        <ChapterHead
          numeral="01"
          eyebrow="The Record — Forty Years of Service"
          heading={experience.heading}
        />
        <ol className="mt-[56px] grid sm:grid-cols-2 sm:gap-x-14">
          {experience.items.map((item, index) => (
            <li
              key={item}
              className="flex gap-5 border-t border-hairline py-7"
            >
              <span className="w-8 shrink-0 font-display text-[20px] font-medium text-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-[17px] leading-[1.65] text-body">
                {item}
              </span>
            </li>
          ))}
          <li className="flex gap-5 border-t border-hairline py-7 sm:col-span-2">
            <span className="w-8 shrink-0 font-display text-[20px] font-medium italic text-gold">
              13
            </span>
            <span className="font-display text-[20px] font-normal italic text-gold">
              Servant Leader
            </span>
          </li>
        </ol>
      </Container>
    </Section>
  );
}
