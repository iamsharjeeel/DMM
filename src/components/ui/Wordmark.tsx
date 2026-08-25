import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

function BrandMark() {
  return (
    <Image
      src={site.assets.logo}
      alt=""
      width={100}
      height={54}
      className="h-auto w-7"
    />
  );
}

export function Wordmark({
  invert = false,
  compact = false,
}: {
  invert?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={site.routes.home}
      className={cn(
        "group flex min-w-0 items-center gap-2.5 no-underline sm:gap-3",
        invert ? "text-cream" : "text-ink",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative grid h-10 w-10 shrink-0 place-items-center text-white",
          invert
            ? "bg-cream/10 ring-1 ring-red/80"
            : "bg-blue ring-1 ring-red/80",
        )}
      >
        <BrandMark />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "truncate font-display text-[1.05rem] tracking-tight sm:text-[1.2rem]",
            compact && "text-base sm:text-base",
          )}
        >
          Donald Mayes
        </span>
        <span
          className={cn(
            "mt-1 text-[0.58rem] font-semibold tracking-[0.16em] uppercase sm:text-[0.64rem] sm:tracking-[0.2em]",
            invert ? "text-cream/70" : "text-ink-soft",
          )}
        >
          Ministries
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </Link>
  );
}
