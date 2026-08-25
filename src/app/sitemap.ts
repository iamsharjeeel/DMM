import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { stories } from "@/content/stories";
import { getSiteUrl } from "@/lib/site-url";
import { getStoryPath } from "@/lib/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return [
    {
      url: `${base}${site.routes.home}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...stories.map((story) => ({
      url: `${base}${getStoryPath(story.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${base}${site.routes.episodes}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}${site.routes.speaking}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}${site.routes.prayer}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}${site.routes.privacy}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}${site.routes.terms}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
