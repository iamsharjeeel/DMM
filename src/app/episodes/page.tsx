import { ArchiveIntro } from "@/components/episodes/ArchiveIntro";
import { ClosingBand } from "@/components/episodes/ClosingBand";
import { EpisodesArchive } from "@/components/episodes/EpisodesArchive";
import { site } from "@/config/site";
import { episodesPage } from "@/content/episodes";
import { episodeCatalogue } from "@/lib/episodes";
import { getPodcastJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: episodesPage.seo.title,
  description: episodesPage.seo.description,
  path: site.routes.episodes,
});

export default function EpisodesPage() {
  return (
    <main id="main" className="bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPodcastJsonLd()) }}
      />
      <ArchiveIntro catalogue={episodeCatalogue} />
      <EpisodesArchive catalogue={episodeCatalogue} />
      <ClosingBand />
    </main>
  );
}
