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
        "group flex min-w-0 items-center gap-3 no-underline",
        invert ? "text-cream" : "text-ink",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative grid h-10 w-10 shrink-0 place-items-center text-[0.68rem] font-semibold tracking-[0.18em]",
            invert
                ? "bg-cream/10 text-cream ring-1 ring-gold/80"
            : "bg-forest text-cream ring-1 ring-gold/80",
        )}
      >
        DM
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.2rem] tracking-tight",
            compact && "text-base",
          )}
        >
          Donald Mayes
        </span>
        <span
          className={cn(
            "mt-1 text-[0.64rem] font-semibold tracking-[0.2em] uppercase",
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
