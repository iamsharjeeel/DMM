import { site } from "@/config/site";
import type { EpisodeCatalogue } from "@/lib/episodes";

export const episodesPage = {
  seo: {
    title: "Listen",
    description:
      "A growing collection of biblical reflections, practical encouragement, and conversations for everyday life.",
  },
  eyebrow: "Loving Everyone Always · Audio Archive",
  headline: {
    before: "Voices to ",
    italic: "return",
    after: " to.",
  },
  lede: "A growing collection of biblical reflections, practical encouragement, and conversations for everyday life.",
  status: {
    present: "Present",
    rss: "Updated from RSS",
  },
  discovery: {
    label: "Find a conversation",
    support:
      "Search by title or description, then narrow by season, year, and length.",
    searchLabel: "Search titles and descriptions",
    searchPlaceholder: "Search the archive",
    sortLabel: "Sort",
    seasonsLabel: "Season",
    yearsLabel: "Year",
    clear: "Clear filters",
  },
  sortOptions: [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
    { value: "shortest", label: "Shortest" },
    { value: "longest", label: "Longest" },
  ] as const,
  empty:
    "No conversations match these filters. Clear the archive filters to begin again.",
  indexLabel: "Episode archive",
  player: {
    publisher: "Loving Everyone Always",
    ministry: site.name,
    pending: "Playback is being connected",
    progress: "Audio progress",
    previous: "Previous episode",
    next: "Next episode",
    play: "Play",
    pause: "Pause",
  },
  closing: {
    eyebrow: "The ministry",
    heading: "More from Donald Mayes Ministries",
    body: "Return home for the ministry message, speaking invitations, and prayer.",
    cta: "Explore the ministry",
  },
} as const;

export function archiveStatus(catalogue: EpisodeCatalogue) {
  return {
    count: `${catalogue.episodeCount} episodes`,
    span: `${catalogue.yearStart}—${episodesPage.status.present}`,
    rss: episodesPage.status.rss,
  };
}
