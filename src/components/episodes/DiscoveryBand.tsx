import { episodesPage } from "@/content/episodes";
import { controlClassName } from "@/components/forms/FormField";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { isEpisodeSort, type EpisodeSort } from "@/lib/episodes";

function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "rounded-sm border px-3 py-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase transition-[color,background-color,border-color,opacity] duration-[180ms] motion-reduce:transition-none",
        pressed
          ? "border-gold bg-cream text-forest"
          : "border-forest/20 bg-cream text-ink hover:border-forest",
      )}
    >
      {children}
    </button>
  );
}

export function DiscoveryBand({
  query,
  sort,
  seasons,
  years,
  availableSeasons,
  availableYears,
  resultLabel,
  canClear,
  onQueryChange,
  onSortChange,
  onToggleSeason,
  onToggleYear,
  onClear,
}: {
  query: string;
  sort: EpisodeSort;
  seasons: number[];
  years: number[];
  availableSeasons: number[];
  availableYears: number[];
  resultLabel: string;
  canClear: boolean;
  onQueryChange: (value: string) => void;
  onSortChange: (value: EpisodeSort) => void;
  onToggleSeason: (value: number) => void;
  onToggleYear: (value: number) => void;
  onClear: () => void;
}) {
  const copy = episodesPage.discovery;

  return (
    <section className="border-y border-rule bg-sage">
      <Container
        width="wide"
        className="grid gap-8 py-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:items-start lg:gap-16 lg:py-10"
      >
        <div>
          <p className="eyebrow text-forest">{copy.label}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            {copy.support}
          </p>
        </div>
        <div className="min-w-0 space-y-5">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_13.5rem]">
            <div>
              <label htmlFor="archive-search" className="sr-only">
                {copy.searchLabel}
              </label>
              <input
                id="archive-search"
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder={copy.searchPlaceholder}
                autoComplete="off"
                className={cn(controlClassName, "min-h-11 bg-cream")}
              />
            </div>
            <div>
              <label htmlFor="archive-sort" className="sr-only">
                {copy.sortLabel}
              </label>
              <select
                id="archive-sort"
                value={sort}
                onChange={(event) => {
                  if (isEpisodeSort(event.target.value)) {
                    onSortChange(event.target.value);
                  }
                }}
                className={cn(controlClassName, "min-h-11 bg-cream font-semibold")}
              >
                {episodesPage.sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <fieldset className="min-w-0">
              <legend className="mb-2 text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-soft uppercase">
                {copy.seasonsLabel}
              </legend>
              <div className="flex flex-wrap gap-2">
                {availableSeasons.map((season) => (
                  <FilterChip
                    key={season}
                    pressed={seasons.includes(season)}
                    onClick={() => onToggleSeason(season)}
                  >
                    {`${copy.seasonsLabel} ${season}`}
                  </FilterChip>
                ))}
              </div>
            </fieldset>
            <fieldset className="min-w-0">
              <legend className="mb-2 text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-soft uppercase">
                {copy.yearsLabel}
              </legend>
              <div className="flex flex-wrap gap-2">
                {availableYears.map((year) => (
                  <FilterChip
                    key={year}
                    pressed={years.includes(year)}
                    onClick={() => onToggleYear(year)}
                  >
                    {String(year)}
                  </FilterChip>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-forest/10 pt-4">
            <p
              className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-soft uppercase"
              aria-live="polite"
            >
              {resultLabel}
            </p>
            <button
              type="button"
              onClick={onClear}
              disabled={!canClear}
              className="text-[0.6875rem] font-semibold tracking-[0.16em] text-forest uppercase underline-offset-4 hover:underline disabled:text-ink-soft disabled:no-underline"
            >
              {copy.clear}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
