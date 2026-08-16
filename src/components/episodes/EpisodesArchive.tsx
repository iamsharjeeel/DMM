"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DiscoveryBand } from "@/components/episodes/DiscoveryBand";
import { EpisodeIndex } from "@/components/episodes/EpisodeIndex";
import {
  PinnedPlayer,
  type PlayerHandle,
} from "@/components/episodes/PinnedPlayer";
import { Container } from "@/components/ui/Container";
import {
  filterEpisodes,
  getDefaultEpisode,
  getEpisodeById,
  resultCountLabel,
  sortEpisodes,
  type EpisodeCatalogue,
  type EpisodeSort,
} from "@/lib/episodes";

function toggleValue(list: number[], value: number) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value].sort((a, b) => a - b);
}

export function EpisodesArchive({ catalogue }: { catalogue: EpisodeCatalogue }) {
  const defaultEpisode = getDefaultEpisode(catalogue);
  const playerRef = useRef<PlayerHandle>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sort, setSort] = useState<EpisodeSort>("newest");
  const [seasons, setSeasons] = useState<number[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState(defaultEpisode.id);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 175);
    return () => window.clearTimeout(timer);
  }, [query]);

  const visible = useMemo(
    () =>
      sortEpisodes(
        filterEpisodes(catalogue.episodes, {
          query: debouncedQuery,
          seasons,
          years,
        }),
        sort,
      ),
    [catalogue.episodes, debouncedQuery, seasons, years, sort],
  );

  const selected =
    getEpisodeById(catalogue.episodes, selectedId) ?? defaultEpisode;
  const selectedIndex = visible.findIndex((episode) => episode.id === selected.id);
  const canPrevious =
    selectedIndex > 0 || (selectedIndex === -1 && visible.length > 0);
  const canNext =
    (selectedIndex >= 0 && selectedIndex < visible.length - 1) ||
    (selectedIndex === -1 && visible.length > 0);
  const canClear =
    query.trim().length > 0 ||
    seasons.length > 0 ||
    years.length > 0 ||
    sort !== "newest";

  function selectEpisode(id: string, play: boolean) {
    if (id === selectedId) {
      if (play) {
        playerRef.current?.toggle();
      }
      return;
    }
    setAutoPlay(play);
    setSelectedId(id);
  }

  function move(direction: -1 | 1) {
    const fallback =
      direction === 1 ? visible[0] : visible[visible.length - 1];
    const next =
      selectedIndex === -1 ? fallback : visible[selectedIndex + direction];
    if (next) {
      selectEpisode(next.id, isPlaying);
    }
  }

  function clearFilters() {
    setQuery("");
    setDebouncedQuery("");
    setSort("newest");
    setSeasons([]);
    setYears([]);
  }

  return (
    <div className="bg-ivory">
      <DiscoveryBand
        query={query}
        sort={sort}
        seasons={seasons}
        years={years}
        availableSeasons={catalogue.seasons}
        availableYears={catalogue.years}
        resultLabel={resultCountLabel(visible.length, catalogue.episodeCount)}
        canClear={canClear}
        onQueryChange={setQuery}
        onSortChange={setSort}
        onToggleSeason={(value) =>
          setSeasons((current) => toggleValue(current, value))
        }
        onToggleYear={(value) => setYears((current) => toggleValue(current, value))}
        onClear={clearFilters}
      />
      <Container width="wide" className="py-8 lg:py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(19rem,1fr)] lg:items-start lg:gap-12 xl:gap-16">
          <div className="order-2 min-w-0 pb-[14rem] sm:pb-0 lg:order-1">
            <EpisodeIndex
              episodes={visible}
              selectedId={selected.id}
              playingId={isPlaying ? selected.id : null}
              onSelect={(id) => selectEpisode(id, false)}
              onPlay={(id) => selectEpisode(id, true)}
              onClear={clearFilters}
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="fixed inset-x-0 bottom-0 z-30 pb-[env(safe-area-inset-bottom)] sm:static sm:pb-0 lg:sticky lg:top-[calc(var(--header-height)+1.25rem)]">
              <PinnedPlayer
                ref={playerRef}
                episode={selected}
                autoPlay={autoPlay}
                canPrevious={canPrevious}
                canNext={canNext}
                onAutoPlayConsumed={() => setAutoPlay(false)}
                onPlayingChange={setIsPlaying}
                onPrevious={() => move(-1)}
                onNext={() => move(1)}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
