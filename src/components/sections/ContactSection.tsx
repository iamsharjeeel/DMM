import { ButtonLink } from "@/components/ui/ButtonLink";
import { home } from "@/content/home";

export function ContactSection() {
  return (
    <div className="border-t border-rule bg-paper">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div className="max-w-xl">
          <p className="text-xs font-medium tracking-[0.28em] uppercase text-bronze-dark">
            Connect
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight">
            {home.connect.heading}
          </h2>
          <p className="mt-4 text-ink-soft">{home.connect.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={home.hero.primaryCta.href} variant="navy">
            {home.hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={home.hero.secondaryCta.href} variant="secondary">
            {home.hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
