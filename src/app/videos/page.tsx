import { AccentRule } from "@/components/ui/AccentRule";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import { videoMessages, videosPage } from "@/content/videos";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: videosPage.seo.title,
  description: videosPage.seo.description,
  path: site.routes.videos,
});

export default function VideosPage() {
  return (
    <main id="main" className="min-h-[60vh] bg-ivory">
      <section>
        <Container width="wide" className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow text-blue">{videosPage.eyebrow}</p>
            <AccentRule className="mt-5" />
            <h1 className="display-lg mt-6">{videosPage.headline}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
              {videosPage.lede}
            </p>
          </div>
          {videoMessages.length > 0 ? (
            <ul className="mt-12 grid gap-8 border-t border-rule pt-10 md:grid-cols-2 lg:mt-16">
              {videoMessages.map((video) => (
                <li key={video.url} className="border-b border-rule pb-8">
                  <h2 className="font-display text-3xl leading-tight">{video.title}</h2>
                  {video.description ? <p className="mt-3 text-ink-soft">{video.description}</p> : null}
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-sm font-semibold text-blue underline underline-offset-4 hover:text-blue-hover"
                  >
                    {videosPage.watchLabel}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 max-w-3xl border-t border-rule pt-10 lg:mt-16">
              <h2 className="font-display text-3xl leading-tight">{videosPage.empty.heading}</h2>
              <p className="mt-4 max-w-xl text-ink-soft">{videosPage.empty.body}</p>
              <div className="mt-8">
                <ButtonLink href={site.routes.episodes} variant="secondary">
                  {videosPage.empty.cta}
                </ButtonLink>
              </div>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
