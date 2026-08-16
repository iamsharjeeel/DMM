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
  priority = false,
  className,
  caption,
  framed = true,
}: {
  slot: PhotographySlot;
  alt: string;
  aspect?: keyof typeof aspects;
  priority?: boolean;
  className?: string;
  caption?: string;
  framed?: boolean;
}) {
  const src = site.photography[slot];

  return (
    <figure className={cn("relative min-w-0", className)}>
      {framed ? (
        <>
          <span
            aria-hidden="true"
            className="absolute -top-2.5 -left-2.5 hidden h-14 w-14 border-t border-l border-gold sm:block"
          />
          <span
            aria-hidden="true"
            className="absolute -right-2.5 -bottom-2.5 hidden h-14 w-14 border-r border-b border-gold sm:block"
          />
        </>
      ) : null}
      <div
        className={cn(
          "relative overflow-hidden bg-forest",
          aspects[aspect],
          src && "img-zoom",
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw, 520px"
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="absolute inset-0 flex flex-col justify-between p-6 text-cream sm:p-7"
          >
            <p className="eyebrow text-cream/60">Photography forthcoming</p>
            <div>
              <p className="font-display text-3xl leading-none italic sm:text-4xl">
                Pastor Donald Mayes
              </p>
              <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-cream/70">
                A reserved portrait frame until ministry photography is in
                place.
              </p>
            </div>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink-soft">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
