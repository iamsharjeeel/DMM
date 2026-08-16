import { ButtonLink } from "@/components/ui/ButtonLink";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { home } from "@/content/home";

export function ContactSection() {
  return (
    <Section hairline>
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ChapterHead
              numeral="06"
              eyebrow="Connect"
              heading={home.connect.heading}
            />
            <p className="type-body mt-7">{home.connect.body}</p>
          </div>
          <div className="bg-navy-panel px-8 py-10 lg:col-span-5">
            <div className="flex flex-col gap-4">
              <ButtonLink href={home.hero.primaryCta.href} variant="primary">
                {home.hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={home.hero.secondaryCta.href} variant="invert">
                {home.hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
