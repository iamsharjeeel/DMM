import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

export function BrandMonogram({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="0.5"
        y="0.5"
        width="39"
        height="39"
        stroke="currentColor"
        strokeWidth="1"
      />
      <text
        x="17.2"
        y="27.5"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', serif"
        fontSize="22"
        fontWeight="600"
      >
        D
      </text>
      <text
        x="23.6"
        y="27.5"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', serif"
        fontSize="22"
        fontWeight="600"
      >
        M
      </text>
    </svg>
  );
}

export function BrandLockup({
  variant = "full",
  className,
}: {
  variant?: "full" | "monogram";
  className?: string;
}) {
  return (
    <Link
      href={site.routes.home}
      className={cn(
        "group inline-flex no-underline",
        variant === "full" ? "items-center gap-3" : "justify-center",
        className,
      )}
    >
      <span className="text-gold">
        <BrandMonogram />
      </span>
      {variant === "full" ? (
        <span className="flex flex-col justify-center leading-none">
          <span className="font-display text-[15px] font-normal tracking-normal text-ink">
            Donald Mayes
          </span>
          <span className="mt-[5px] font-meta text-[9px] font-medium tracking-[0.3em] text-ink uppercase">
            Ministries
          </span>
        </span>
      ) : null}
      <span className="sr-only">{site.name}</span>
    </Link>
  );
}
