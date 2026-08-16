import { archiveStatus, episodesPage } from "@/content/episodes";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import type { EpisodeCatalogue } from "@/lib/episodes";

export function ArchiveIntro({ catalogue }: { catalogue: EpisodeCatalogue }) {
  const status = archiveStatus(catalogue);
  const { headline } = episodesPage;

  return (
    <section className="bg-ivory">
      <Container
        width="wide"
        className="grid gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-16 lg:py-20"
      >
        <div className="measure">
          <p className="eyebrow text-forest">{episodesPage.eyebrow}</p>
          <GoldRule className="mt-5" />
          <h1 className="display-lg mt-6 text-balance">
            {headline.before}
            <em className="italic">{headline.italic}</em>
            {headline.after}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
            {episodesPage.lede}
          </p>
        </div>
        <aside className="border-t border-rule pt-6 lg:border-0 lg:pt-1 lg:text-right">
          <p className="eyebrow text-ink-soft">{status.count}</p>
          <p className="eyebrow mt-3 text-ink-soft">{status.span}</p>
          <p className="eyebrow mt-3 text-ink-soft">{status.rss}</p>
        </aside>
      </Container>
    </section>
  );
}
