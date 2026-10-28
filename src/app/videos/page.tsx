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
            <p className="eyebrow text-blue"¶»§q«^