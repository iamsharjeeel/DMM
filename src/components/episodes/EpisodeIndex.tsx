import { episodesPage } from "@/content/episodes";
import { EpisodeRow } from "@/components/episodes/EpisodeRow";
import type { Episode } from "@/lib/episodes";

export function EpisodeIndex({
  episodes,
  selectedId,
  playingId,
  onSelect,
  onPlay,
  onClear,
}: {
  episodes: Episode[];
  selectedId: string;
  playingId: string | null;
  onSelect: (id: string) => void;
  onPlay: (id: string) => void;
  onClear: () => void;
}) {
  if (episodes.length === 0) {
    return (
      <div className="border-t border-rule py-16">
        <p className="max-w-md font-display text-3xl leading-snug">
          {episodesPage.empty}
        </p>
        <button
          type="button"
          onClick={onClear}
          className="mt-6 text-[0.6875rem] font-semibold tracking-[0.16em] text-forest uppercase underline-offset-4 hover:underline"
        >
          {episodesPage.discovery.clear}
        </button>
      </div>
    );
  }

  return (
    <ol aria-label={episodesPage.indexLabel} className="border-t border-rule">
      {episodes.map((episode) => (
        <li key={episode.id} value={episode.archiveNumber}>
          <EpisodeRow
            episode={episode}
            selected={episode.id === selectedId}
            playing={playingId === episode.id}
            onSelect={() => onSelect(episode.id)}
            onPlay={() => onPlay(episode.id)}
          />
        </li>
      ))}
    </ol>
  );
}
