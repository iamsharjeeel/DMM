import { home } from "@/content/home";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function WhoWeServe() {
  const { whoWeServe } = home;

  return (
    <Section hairline>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-5 lg:pr-10">
            <ChapterHead
              numeral="04"
              eyebrow={whoWeServe.heading}
              heading={whoWeServe.headline}
            />
          </div>
          <div className="lg:col-span-7 lg:border-l lg:border-hairline lg:pl-14">
            <p className="type-body">{whoWeServe.supporting}</p>
            <p className="type-body mt-7">{whoWeServe.body}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
