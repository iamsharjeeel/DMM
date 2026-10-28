import { site } from "@/config/site";
import type { EpisodeCatalogue } from "@/lib/episodes";

export const episodesPage = {
  seo: {
    title: "Loving Everyone Always Podcast",
    description:
      "Listen to Loving Everyone Always with Pastor Donald Mayesâ€”biblical reflections and practical encouragement on faith, love, reconciliation, and everyday Christian living.",
  },
  eyebrow: "Loving Everyone Always Â· Audio Archive",
  headline: {
    before: "Voices to ",
    italic: "return",
    after: " to.",
  },
  lede: "A growing collection of biblical reflections, practical encouragement, and conversations for everyday life.",
  status: {
    rss: "Updated from RSS",
  },
  discovery: {
    label: "Find a conversation",
    support:
      "Search by title or description, browse seasons, and sort the archive.",
    searchLabel: "Search titles and descriptions",
    searchPlaceholder: "Search the archive",
    sortLabel: "Sort",
    seasonsLabel: "Season",
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
  pager: {
    label: "Archive pages",
    previous: "Previous list",
    next: "Next list",
  },
  player: {
    publisher: "Loving Everyone Alwa¶»§q«^