import { episodesPage } from "@/content/episodes";
import { cn } from "@/lib/cn";

export function ArchivePager({
  rangeLabel,
  canPrevious,
  canNext,
  onPrevious,
  onNext,
}: {
  rangeLabel: string;
  canPrevious: boolean;
  canNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const copy = episodesPage.pager;

  return (
    <nav
      aria-label={copy.label}
      className="mt-6 flex items-center justify-between gap-4 border-t border-rule pt-4"
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={!canPrevious}
        className={cn(
          "text-[0.6875rem] font-semibold tracking-[0.16em] uppercase underline-offset-4",
          canPrevious
            ? "text-blue hover:underline"
            : "cursor-not-allowed text-ink-soft",
        )}
      >
        {copy.previous}
      </button>
      <p
        className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-soft uppercase"
        aria-live="polite"
      >
        {rangeLabel}
      </p>
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className={cn(
          "text-[0.6875rem] font-semibold tracking-[0.16em] uppercase underline-offset-4",
          canNext
            ? "text-blue hover:underline"
            : "cursor-not-allowed text-ink-soft",
        )}
      >
        {copy.next}
      </button>
    </nav>
  );
}
