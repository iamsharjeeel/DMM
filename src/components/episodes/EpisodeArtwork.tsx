import Image from "next/image";
import { cn } from "@/lib/cn";

export function EpisodeArtwork({
  src,
  priority = false,
  sizes,
  framed = false,
  className,
}: {
  src: string;
  priority?: boolean;
  sizes: string;
  framed?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {framed ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-2 -left-2 hidden h-8 w-8 border-t border-l border-red sm:block"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -bottom-2 hidden h-8 w-8 border-r border-b border-red sm:block"
          />
        </>
      ) : null}
      <div className="img-zoom absolute inset-0 overflow-hidden bg-blue-deep">
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          preload={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
