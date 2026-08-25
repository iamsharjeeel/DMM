import { episodesPage } from "@/content/episodes";
import { createOgImage, ogSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = episodesPage.seo.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage("Voices to return to.");
}
