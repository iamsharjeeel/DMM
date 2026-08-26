import { Wordmark } from "@/components/ui/Wordmark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { speakingLanding } from "@/content/speaking-landing";

const formHref = `#${speakingLanding.formAnchor}`;

export function SpeakingLandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ivory">
      <div className="h-px bg-red" aria-hidden="true" />
      <div className="mx-auto flex h-[var(--lp-header-height)] w-full min-w-0 max-w-wide items-center justify-between gap-3 px-5 sm:px-8 lg:px-12 xl:px-16">
        <Wordmark compact />
        <ButtonLink
          href={formHref}
          variant="primary"
          size="md"
          className="shrink-0 max-sm:px-3 max-sm:text-[0.8125rem]"
        >
          {speakingLanding.cta}
        </ButtonLink>
      </div>
    </header>
  );
}
