import type { Metadata } from "next";
import { site } from "@/config/site";
import { getCanonicalUrl, isVercelPreview } from "@/lib/site-url";

type OpenGraphType = "website" | "article";

export function rootRobots(): Metadata["robots"] {
  if (isVercelPreview()) {
    return {
      index: false,
      follow: false,
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function createMetadata({
  title,
  description,
  path,
  socialTitle,
  openGraphType = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  socialTitle?: string;
  openGraphType?: OpenGraphType;
  noindex?: boolean;
}): Metadata {
  const url = getCanonicalUrl(path);
  const shareTitle = socialTitle ?? `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: openGraphType,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
    },
    ...(noindex
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : {}),
  };
}
