import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

function BrandMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 54"
      fill="none"
      aria-hidden="true"
      className="h-[1.55rem] w-[1.55rem]"
    >
      <g
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="round"
      >
        <line x1="0.4" y1="51.1" x2="99.6" y2="51.1" />
        <line x1="50" y1="0" x2="50" y2="51.1" />
        <circle cx="50" cy="16.4" r="15.5" />
        <path d="M2.2 5.4H17.7V51.1" />
        <path d="M17.7 5.4H36.2" />
        <path d="M97.8 5.4H82.3V51.1" />
        <path d="M82.3 5.4H63.8" />
      </g>
    </svg>
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
            ? "bg-cream/10 ring-1 ring-gold/80"
            : "bg-forest ring-1 ring-gold/80",
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
