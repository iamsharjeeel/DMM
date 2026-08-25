import { storiesSection } from "@/content/stories";
import { createOgImage, ogSize } from "@/lib/og-image";
import { getStoryBySlug, getStoryStaticParams } from "@/lib/stories";

export const alt = storiesSection.heading;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getStoryStaticParams();
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return createOgImage(storiesSection.heading);
  }

  return createOgImage(story.title);
}
