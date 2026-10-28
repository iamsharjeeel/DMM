import { AccentRule } from "@/components/ui/AccentRule";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import { videoMessages, videosPage, type VideoMessage } from "@/content/videos";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: videosPage.seo.title,
  description: videosPage.seo.description,
  path: site.routes.videos,
});

function YouTubePlayer({ video, portrait = false }: { video: VideoMessage; portrait?: boolean }) {
  return (
    <div className={portrait ? "relative aspect-[9/16] w-full overflow-hidden bg-blue-deep" : "relative aspect-video w-full overflow-hidden bg-blue-deep"}>
      <iframe
        src={"https://www.youtube-nocookie.com/embed/" + video.id + "?rel=0"}
        title={"Watch " + video.title}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export default function VideosPage() {
  const [featured, ...messages] = videoMessages;

  return (
    <main id="main" className="bg-ivory">
      <section>
        <Container width="wide" className="py-14 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-blue">{videosPage.eyebrow}</p>
            <AccentRule className="mt-5" />
            <h1 className="display-lg mt-6">{videosPage.headline}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">{videosPage.lede}</p>
          </div>
        </Container>
      </section>
      <section className="border-y border-rule bg-cream">
        <Container width="wide" className="grid gap-8 py-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-center md:gap-12 lg:py-16">
          <div className="mx-auto w-full max-w-[19rem] md:mx-0">
            <YouTubePlayer video={featured} portrait />
          </div>
          <div className="max-w-xl">
            <p className="eyebrow text-blue">{videosPage.shortLabel}</p>
            <AccentRule className="mt-5" />
            <h2 className="display-md mt-6">{featured.title}</h2>
            <p className="mt-4 text-sm font-medium text-ink-soft">{featured.source}</p>
          </div>
        </Container>
      </section>
      <section>
        <Container width="wide" className="py-14 sm:py-16 lg:py-20">
          <p className="eyebrow text-blue">{videosPage.messagesLabel}</p>
          <AccentRule className="mt-5" />
          <ul className="mt-9 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-12">
            {messages.map((video) => (
              <li key={video.id}>
                <article>
                  <YouTubePlayer video={video} />
                  <h2 className="mt-5 font-display text-[1.7rem] leading-tight sm:text-[1.9rem]">{video.title}</h2>
                  <p className="mt-2 text-sm text-ink-soft">{video.source}</p>
                </article>
              </li>
            ))}
          </ul>
          <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-rule pt-8">
            <a
              href={videosPage.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue underline underline-offset-4 hover:text-blue-hover"
            >
              {videosPage.channelCta}
            </a>
            <ButtonLink href={site.routes.episodes} variant="secondary">{videosPage.listenCta}</ButtonLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
