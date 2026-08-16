import { episodesPage } from "@/content/episodes";
import { EpisodeArtwork } from "@/components/episodes/EpisodeArtwork";
import { PlayControl } from "@/components/episodes/PlayControl";
import { archiveNumberLabel, formatPublishedDate } from "@/lib/episodes";
import type { Episode } from "@/lib/episodes";
import { cn } from "@/lib/cn";

export function EpisodeRow({
  episode,
  selected,
  playing,
  onSelect,
  onPlay,
}: {
  episode: Episode;
  selected: boolean;
  playing: boolean;
  onSelect: () => void;
  onPlay: () => void;
}) {
  const playLabel = `${playing ? episodesPage.player.pause : episodesPage.player.play} ${episode.title}`;

  return (
    <article
      aria-current={selected ? "true" : undefined}
      className={cn(
        "episode-row flex min-h-[76px] items-center gap-3 border-b border-l-2 py-3 sm:min-h-[88px] sm:gap-4 lg:min-h-[96px] lg:py-3.5",
        selected
          ? "border-l-gold bg-cream"
          : "border-l-transparent bg-transparent",
        "border-rule transition-[background-color,border-color] duration-[220ms] motion-reduce:transition-none",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex min-h-[52px] min-w-0 flex-1 items-center gap-3 py-1 text-left sm:gap-4"
      >
        <span className="w-8 shrink-0 font-display text-lg italic text-forest sm:w-10 sm:text-xl">
          {archiveNumberLabel(episode.archiveNumber)}
        </span>
        <span className="hidden shrink-0 sm:block">
          <EpisodeArtwork
            src={episode.imageUrl}
            priority={selected}
            sizes="56px"
            className="h-14 w-14"
          />
        </span>
        <span className="min-w-0 flex-1 pr-2">
          <span
            className={cn(
              "episode-title block font-display text-[1.15rem] leading-snug sm:text-[1.25rem]",
              selected ? "text-forest" : "text-ink",
            )}
          >
            {episode.title}
          </span>
          <span className="mt-1 block truncate text-sm text-ink-soft">
            {episode.description}
          </span>
          <span className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">
            <time dateTime={episode.publishedAt}>
              <span className="sm:hidden">
                {formatPublishedDate(episode.publishedAt, true)}
              </span>
              <span className="hidden sm:inline">
                {formatPublishedDate(episode.publishedAt)}
              </span>
            </time>
            <span>{episode.durationLabel}</span>
          </span>
        </span>
      </button>
      <div className="shrink-0 pr-1 sm:pr-2">
        <PlayControl
          playing={playing}
          filled={selected}
          label={playLabel}
          onClick={onPlay}
        />
      </div>
    </article>
  );
}
