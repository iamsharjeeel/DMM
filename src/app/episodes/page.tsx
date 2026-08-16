import { ArchiveIntro } from "@/components/episodes/ArchiveIntro";
import { ClosingBand } from "@/components/episodes/ClosingBand";
import { EpisodesArchive } from "@/components/episodes/EpisodesArchive";
import { site } from "@/config/site";
import { episodesPage } from "@/content/episodes";
import { episodeCatalogue } from "@/lib/episodes";
import { createMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = createMetadata({
  title: episodesPage.seo.title,
  description: episodesPage.seo.description,
  path: site.routes.episodes,
});

function podcastJsonLd() {
  const url = `${getSiteUrl()}${site.routes.episodes}`;

  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: episodeCatalogue.source.title,
    url,
    webFeed: episodeCatalogue.source.rssUrl,
    numberOfEpisodes: episodeCatalogue.episodeCount,
    image: episodeCatalogue.source.imageUrl,
    author: {
      "@type": "Person",
      name: episodeCatalogue.source.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };
}

export default function EpisodesPage() {
  return (
    <main id="main" className="bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastJsonLd()) }}
      />
      <ArchiveIntro catalogue={episodeCatalogue} />
      <EpisodesArchive catalogue={episodeCatalogue} />
      <ClosingBand />
    </main>
  );
}
