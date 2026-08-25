import { site } from "@/config/site";
import { episodesPage } from "@/content/episodes";
import { episodeCatalogue } from "@/lib/episodes";
import { getCanonicalSiteUrl, getCanonicalUrl } from "@/lib/site-url";

function socialUrls() {
  return Object.values(site.social).filter(
    (value): value is string => typeof value === "string" && value.length > 0,
  );
}

function iso8601Duration(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  let value = "PT";
  if (hours > 0) {
    value += `${hours}H`;
  }
  if (minutes > 0) {
    value += `${minutes}M`;
  }
  if (rest > 0 || (hours === 0 && minutes === 0)) {
    value += `${rest}S`;
  }
  return value;
}

export function jsonLdIds(origin = getCanonicalSiteUrl()) {
  return {
    website: `${origin}/#website`,
    organization: `${origin}/#organization`,
    person: `${origin}/#person`,
    podcast: `${origin}/episodes/#podcast`,
  };
}

export function getJsonLd() {
  const origin = getCanonicalSiteUrl();
  const ids = jsonLdIds(origin);
  const logoUrl = getCanonicalUrl(site.assets.logo);
  const portraitUrl = getCanonicalUrl(site.photography.portrait);
  const sameAs = socialUrls();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        name: site.name,
        alternateName: "DMM",
        url: origin,
        description: site.mission,
        inLanguage: "en-US",
        publisher: { "@id": ids.organization },
      },
      {
        "@type": "Organization",
        "@id": ids.organization,
        name: site.name,
        legalName: site.legalName,
        url: origin,
        description: site.mission,
        slogan: site.motto,
        logo: logoUrl,
        email: site.email,
        telephone: site.phone,
        founder: { "@id": ids.person },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "Person",
        "@id": ids.person,
        name: "Donald Mayes",
        honorificPrefix: "Pastor",
        jobTitle: "Pastor",
        description:
          "Pastor Donald Mayes has served people through ministry, community leadership, mentoring, missions, teaching, and pastoral care for more than 40 years.",
        image: portraitUrl,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Trinity Evangelical Divinity School",
        },
        affiliation: { "@id": ids.organization },
        worksFor: { "@id": ids.organization },
        url: origin,
      },
    ],
  };
}

export function getPodcastJsonLd() {
  const origin = getCanonicalSiteUrl();
  const ids = jsonLdIds(origin);
  const url = getCanonicalUrl(site.routes.episodes);
  const source = episodeCatalogue.source;

  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": ids.podcast,
    name: source.title,
    url,
    description: episodesPage.seo.description,
    inLanguage: "en-US",
    webFeed: source.rssUrl,
    numberOfEpisodes: episodeCatalogue.episodeCount,
    image: source.imageUrl,
    sameAs: source.link,
    author: { "@id": ids.person },
    publisher: { "@id": ids.organization },
    hasPart: episodeCatalogue.episodes.map((episode) => ({
      "@type": "PodcastEpisode",
      name: episode.title,
      datePublished: episode.publishedAt,
      duration: iso8601Duration(episode.durationSeconds),
      url: episode.url,
      associatedMedia: {
        "@type": "AudioObject",
        contentUrl: episode.audioUrl,
      },
    })),
  };
}
