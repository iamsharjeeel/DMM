import rawCatalogue from "@/content/episodes.catalogue.json";

export type Episode = {
  id: string;
  archiveNumber: number;
  title: string;
  description: string;
  publishedAt: string;
  year: number;
  durationSeconds: number;
  durationLabel: string;
  url: string;
  audioUrl: string;
  imageUrl: string;
  season: number | null;
  episode: number | null;
};

export type EpisodeCatalogue = {
  importedAt: string;
  source: {
    rssUrl: string;
    title: string;
    author: string;
    link: string;
    imageUrl: string;
  };
  episodeCount: number;
  yearStart: number;
  yearEnd: number;
  defaultEpisodeId: string;
  seasons: number[];
  years: number[];
  episodes: Episode[];
};

export type EpisodeSort = "newest" | "oldest" | "shortest" | "longest";

export const episodeSortValues: EpisodeSort[] = [
  "newest",
  "oldest",
  "shortest",
  "longest",
];

export function isEpisodeSort(value: string): value is EpisodeSort {
  return episodeSortValues.some((item) => item === value);
}

export const episodeCatalogue = rawCatalogue as EpisodeCatalogue;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function archiveNumberLabel(value: number) {
  return String(value).padStart(2, "0");
}

export function formatPublishedDate(iso: string, compact = false) {
  const date = new Date(iso);
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  if (compact) {
    return `${shortMonths[month]} ${day}, ${year}`;
  }
  return `${months[month]} ${day}, ${year}`;
}

export function formatTimecode(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
  }
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function byId(a: Episode, b: Episode) {
  return a.id.localeCompare(b.id);
}

function byTitle(a: Episode, b: Episode) {
  const title = a.title.localeCompare(b.title, "en", { sensitivity: "base" });
  return title !== 0 ? title : byId(a, b);
}

function byDate(a: Episode, b: Episode, direction: "asc" | "desc") {
  const left = direction === "asc" ? a.publishedAt : b.publishedAt;
  const right = direction === "asc" ? b.publishedAt : a.publishedAt;
  const date = left.localeCompare(right);
  return date !== 0 ? date : byTitle(a, b);
}

export function sortEpisodes(episodes: Episode[], sort: EpisodeSort): Episode[] {
  const copy = [...episodes];
  copy.sort((a, b) => {
    if (sort === "newest") {
      return byDate(a, b, "desc");
    }
    if (sort === "oldest") {
      return byDate(a, b, "asc");
    }
    const duration =
      sort === "shortest"
        ? a.durationSeconds - b.durationSeconds
        : b.durationSeconds - a.durationSeconds;
    if (duration !== 0) {
      return duration;
    }
    return byDate(a, b, "desc");
  });
  return copy;
}

export function filterEpisodes(
  episodes: Episode[],
  {
    query,
    seasons,
    years,
  }: {
    query: string;
    seasons: number[];
    years: number[];
  },
): Episode[] {
  const needle = query.trim().toLocaleLowerCase("en");

  return episodes.filter((episode) => {
    if (needle) {
      const haystack =
        `${episode.title} ${episode.description}`.toLocaleLowerCase("en");
      if (!haystack.includes(needle)) {
        return false;
      }
    }
    if (seasons.length > 0 && (episode.season === null || !seasons.includes(episode.season))) {
      return false;
    }
    if (years.length > 0 && !years.includes(episode.year)) {
      return false;
    }
    return true;
  });
}

export function getEpisodeById(episodes: Episode[], id: string) {
  return episodes.find((episode) => episode.id === id);
}

export function getDefaultEpisode(catalogue: EpisodeCatalogue) {
  return (
    getEpisodeById(catalogue.episodes, catalogue.defaultEpisodeId) ??
    sortEpisodes(catalogue.episodes, "newest")[0]
  );
}

export function resultCountLabel(shown: number, total: number) {
  if (shown === total) {
    return `${total} conversations`;
  }
  return `${shown} of ${total} conversations`;
}

export const ARCHIVE_PAGE_SIZE = 5;

export function pageCount(total: number, pageSize = ARCHIVE_PAGE_SIZE) {
  if (total <= 0) {
    return 0;
  }
  return Math.ceil(total / pageSize);
}

export function clampPage(
  page: number,
  total: number,
  pageSize = ARCHIVE_PAGE_SIZE,
) {
  const last = Math.max(0, pageCount(total, pageSize) - 1);
  return Math.min(Math.max(0, page), last);
}

export function slicePage<T>(
  items: T[],
  page: number,
  pageSize = ARCHIVE_PAGE_SIZE,
) {
  const start = clampPage(page, items.length, pageSize) * pageSize;
  return items.slice(start, start + pageSize);
}

export function pageForIndex(index: number, pageSize = ARCHIVE_PAGE_SIZE) {
  if (index < 0) {
    return 0;
  }
  return Math.floor(index / pageSize);
}

export function pageRangeLabel(
  page: number,
  total: number,
  pageSize = ARCHIVE_PAGE_SIZE,
) {
  if (total <= 0) {
    return "0 of 0";
  }
  const current = clampPage(page, total, pageSize);
  const start = current * pageSize + 1;
  const end = Math.min((current + 1) * pageSize, total);
  return `${start}–${end} of ${total}`;
}
