import { speaking } from "@/content/speaking";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function SpeakingAudiences() {
  const { audiences } = speaking;

  return (
    <Section hairline>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ChapterHead
              numeral="03"
              eyebrow="Who We Serve"
              heading={audiences.heading}
            />
          </div>
          <ul className="lg:col-span-7 lg:border-l lg:border-hairline lg:pl-14">
            {audiences.items.map((item) => (
              <li
                key={item}
                className="border-t border-hairline py-5 font-serif text-[17px] leading-[1.65] text-body first:border-t-0 lg:first:border-t"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
