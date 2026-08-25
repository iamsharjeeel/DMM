import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { AccentRule } from "@/components/ui/AccentRule";
import { home } from "@/content/home";

export function ContactSection() {
  return (
    <div className="border-t border-rule bg-cream">
      <Container className="flex flex-col gap-8 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20">
        <div className="max-w-xl">
          <p className="eyebrow text-blue">Connect</p>
          <AccentRule className="mt-5" />
          <h2 className="display-lg mt-5">{home.connect.heading}</h2>
          <p className="mt-4 text-ink-soft">{home.connect.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={home.hero.primaryCta.href} variant="primary">
            {home.hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={home.hero.secondaryCta.href} variant="secondary">
            {home.hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
