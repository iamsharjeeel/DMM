import Image from "next/image";
import { site, type PhotographySlot } from "@/config/site";
import { cn } from "@/lib/cn";

const aspects = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
} as const;

export function PastorImage({
  slot,
  alt,
  aspect = "portrait",
  preload = false,
  className,
  caption,
  framed = true,
  stretch = false,
  objectPosition = "center",
}: {
  slot: PhotographySlot;
  alt: string;
  aspect?: keyof typeof aspects;
  preload?: boolean;
  className?: string;
  caption?: string;
  framed?: boolean;
  stretch?: boolean;
  objectPosition?: string;
}) {
  const src = site.photography[slot];

  return (
    <figure className={cn("relative min-w-0", stretch && "lg:h-full", className)}>
      {framed ? (
        <>
          <span
            aria-hidden="true"
            className="absolute -top-2.5 -left-2.5 hidden h-14 w-14 border-t border-l border-red sm:block"
          />
          <span
            aria-hidden="true"
            className="absolute -right-2.5 -bottom-2.5 hidden h-14 w-14 border-r border-b border-red sm:block"
          />
        </>
      ) : null}
      <div
        className={cn(
          "relative overflow-hidden bg-blue-deep",
          aspects[aspect],
          stretch && "lg:h-full lg:aspect-auto",
          src && "img-zoom",
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            preload={preload}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw, 520px"
            className="object-cover"
            style={{ objectPosition }}
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="absolute inset-0 bg-blue-deep"
          />
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink-soft">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
