import { createOgImage, ogSize } from "@/lib/og-image";

export const alt = "Invite Pastor Donald Mayes to speak";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage("Invite Pastor Donald Mayes");
}
