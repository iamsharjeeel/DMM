import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { stories } from "@/content/stories";
import { getCanonicalUrl } from "@/lib/site-url";
import { getStoryPath } from "@/lib/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: getCanonicalUrl(site.routes.home) },
    { url: getCanonicalUrl(site.routes.episodes) },
    { url: getCanonicalUrl(site.routes.speaking) },
    { url: getCanonicalUrl(site.routes.prayer) },
    ...stories.map((story) => ({
      url: getCanonicalUrl(getStoryPath(story.slug)),
    })),
    { url: getCanonicalUrl(site.routes.privacy) },
    { url: getCanonicalUrl(site.routes.terms) },
    { url: getCanonicalUrl(site.routes.smsTerms) },
  ];
}
