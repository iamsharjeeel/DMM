import { createOgImage, ogSize } from "@/lib/og-image";

export const alt = "How Can We Pray for You?";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage("How Can We Pray for You?");
}
