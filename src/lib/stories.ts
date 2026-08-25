import { stories, type Story, type StoryPlacement } from "@/content/stories";

export function getStoryPath(slug: string) {
  return `/stories/${slug}`;
}

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}

export function getStoriesByPlacement(placement: StoryPlacement): Story[] {
  return stories.filter((story) => story.placement === placement);
}

export function getFeaturedStory(): Story {
  const story = getStoriesByPlacement("featured")[0];
  if (!story) {
    throw new Error("A featured story is required.");
  }
  return story;
}

export function getRelatedStories(slug: string): Story[] {
  return stories.filter((story) => story.slug !== slug);
}

export function getStoryStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}
