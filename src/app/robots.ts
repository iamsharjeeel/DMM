import type { MetadataRoute } from "next";
import { CANONICAL_ORIGIN, isVercelPreview } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (isVercelPreview()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${CANONICAL_ORIGIN}/sitemap.xml`,
    host: CANONICAL_ORIGIN,
  };
}
