import Image from "next/image";
import { cn } from "@/lib/cn";

const aspects = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
} as const;

export function EditorialImage({
  src,
  alt,
  aspect = "portrait",
  preload = false,
  className,
}: {
  src: string;
  alt: string;
  aspect?: keyof typeof aspects;
  preload?: boolean;
  className?: string;
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw, 520px"
          className="object-cover"
        />
      </div>
    </figure>
  );
}
