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
}: {
  slot: PhotographySlot;
  alt: string;
  aspect?: keyof typeof aspects;
  priority?: boolean;
  className?: string;
  caption?: string;
}) {
  const src = site.photography[slot];

  return (
    <figure className={cn("relative", className)}>
      <div className={cn("relative overflow-hidden bg-navy", aspects[aspect])}>
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
            className="absolute inset-0 flex flex-col justify-between bg-[linear-gradient(160deg,#1b2636_0%,#2c3a4e_52%,#9c7a4a_140%)] p-6 text-paper"
          >
            <p className="text-[0.68rem] font-medium tracking-[0.26em] uppercase opacity-80">
              Photography pending
            </p>
            <div>
              <p className="font-display text-3xl leading-none italic">
                Pastor Donald Mayes
              </p>
              <p className="mt-3 max-w-[16rem] text-sm text-paper/75">
                Replace this frame with a professional portrait. Keep this
                aspect ratio.
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
