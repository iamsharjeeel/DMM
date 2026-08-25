import { notFound } from "next/navigation";
import { StoryArticle } from "@/components/stories/StoryArticle";
import { createMetadata } from "@/lib/metadata";
import {
  getStoryBySlug,
  getStoryPath,
  getStoryStaticParams,
} from "@/lib/stories";

export const dynamicParams = false;

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getStoryStaticParams();
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return createMetadata({
      title: "Story not found",
      description: "This story is not part of the Donald Mayes Ministries website.",
      path: getStoryPath(slug),
    });
  }

  return createMetadata({
    title: story.title,
    description: story.seoDescription,
    path: getStoryPath(story.slug),
    socialTitle: `${story.name}: ${story.title}`,
    openGraphType: "article",
  });
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <main id="main">
      <StoryArticle story={story} />
    </main>
  );
}
