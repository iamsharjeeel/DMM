import Image from "next/image";
import { BrandMonogram } from "@/components/brand/BrandLockup";
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
  showMonogram = false,
}: {
  slot: PhotographySlot;
  alt: string;
  aspect?: keyof typeof aspects;
  priority?: boolean;
  className?: string;
  caption?: string;
  showMonogram?: boolean;
}) {
  const src = site.photography[slot];

  return (
    <figure className={cn("relative w-full", className)}>
      <div
        className={cn(
          "relative border border-hairline bg-canvas",
          aspects[aspect],
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 46vw, 560px"
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
          >
            <p className="type-serif-italic max-w-[16rem] text-gold">
              A portrait of Pastor Mayes, arriving shortly,
            </p>
            {showMonogram ? (
              <span className="mt-7 text-gold">
                <BrandMonogram size={40} />
              </span>
            ) : null}
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
