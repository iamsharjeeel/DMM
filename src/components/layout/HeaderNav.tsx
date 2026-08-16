"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerCta, primaryNav } from "@/content/navigation";
import { buttonClassName } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
      {primaryNav.map((item) => {
        const current =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={cn(
              "relative py-1 text-[0.9375rem] text-ink-soft transition-colors hover:text-ink",
              current && "text-ink",
            )}
          >
            {item.label}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 -bottom-1 mx-auto h-px w-5 bg-gold transition-opacity",
                current ? "opacity-100" : "opacity-0",
              )}
            />
          </Link>
        );
      })}
      <Link
        href={headerCta.href}
        className={buttonClassName({ variant: "primary", size: "md" })}
      >
        {headerCta.label}
      </Link>
    </nav>
  );
}
