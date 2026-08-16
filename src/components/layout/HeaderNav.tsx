"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerCta, primaryNav } from "@/content/navigation";
import { buttonClassName } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
      {primaryNav.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "type-meta pb-1 text-ink transition-colors hover:text-gold",
              active && "border-b border-gold text-ink",
            )}
          >
            {item.label}
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
