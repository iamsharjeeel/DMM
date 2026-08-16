import { site } from "@/config/site";
import { createOgImage, ogSize } from "@/lib/og-image";

export const alt = `${site.name} — ${site.motto}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage(site.motto);
}
