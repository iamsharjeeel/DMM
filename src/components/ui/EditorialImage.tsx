import Image from "next/image";
import { cn } from "@/lib/cn";

const aspects = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  cinematic: "aspect-[16/10] lg:aspect-[2.15/1]",
} as const;

export function EditorialImage({
  src,
  alt,
  aspect = "portrait",
  preload = false,
  className,
  caption,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 44vw, 520px",
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  aspect?: keyof typeof aspects;
  preload?: boolean;
  className?: string;
  caption?: string;
  sizes?: string;
  objectPosition?: string;
}) {
  return (
    <figure className={cn("relative min-w-0", className)}>
      <span
        aria-hidden="true"
        className="absolute -top-2.5 -left-2.5 hidden h-14 w-14 border-t border-l border-red sm:block"
      />
      <span
        aria-hidden="true"
        className="absolute -right-2.5 -bottom-2.5 hidden h-14 w-14 border-r border-b border-red sm:block"
      />
      <div
        className={cn(
          "img-zoom relative overflow-hidden bg-blue-deep",
          aspects[aspect],
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          preload={preload}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink-soft">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
