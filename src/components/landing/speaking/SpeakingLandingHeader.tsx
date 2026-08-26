import { Wordmark } from "@/components/ui/Wordmark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { speakingLanding } from "@/content/speaking-landing";

const formHref = `#${speakingLanding.formAnchor}`;

export function SpeakingLandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ivory">
      <div className="h-px bg-red" aria-hidden="true" />
      <div className="mx-auto flex h-auto min-h-[var(--lp-header-height)] w-full min-w-0 max-w-wide flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-2 sm:px-8 lg:px-12 xl:px-16">
        <Wordmark compact />
        <ButtonLink
          href={formHref}
          variant="primary"
          size="md"
          className="shrink-0 max-[360px]:w-full max-[380px]:min-h-10 max-[380px]:px-2.5 max-[380px]:text-[0.72rem] max-sm:px-3 max-sm:text-[0.8125rem]"
        >
          {speakingLanding.cta}
        </ButtonLink>
      </div>
    </header>
  );
}
