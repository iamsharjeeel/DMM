import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

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
        "group flex items-center gap-3 no-underline",
        invert ? "text-paper" : "text-ink",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid h-10 w-10 place-items-center border text-[0.7rem] font-medium tracking-[0.18em]",
          invert
            ? "border-paper/30 text-paper"
            : "border-bronze/50 text-bronze-dark",
        )}
      >
        DM
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.15rem] font-medium tracking-tight",
            compact && "text-base",
          )}
        >
          Donald Mayes
        </span>
        <span
          className={cn(
            "mt-1 text-[0.68rem] font-medium tracking-[0.22em] uppercase",
            invert ? "text-paper/70" : "text-ink-soft",
          )}
        >
          Ministries
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </Link>
  );
}
