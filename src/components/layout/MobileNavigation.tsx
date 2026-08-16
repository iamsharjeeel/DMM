"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerCta, primaryNav } from "@/content/navigation";
import { buttonClassName } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function MobileNavigation() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const trigger = buttonRef.current;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuPath(null);
      }
    }

    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center text-ink"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setMenuPath(pathname)}
      >
        <MenuIcon />
        <span className="sr-only">Open menu</span>
      </button>
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-canvas"
        >
          <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <p className="type-meta text-gold">Menu</p>
            <button
              ref={closeRef}
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center"
              onClick={() => setMenuPath(null)}
            >
              <CloseIcon />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center px-8 pb-16">
            <ul className="space-y-7">
              {primaryNav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "type-display-lg text-ink",
                        active && "text-gold",
                      )}
                      onClick={() => setMenuPath(null)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={headerCta.href}
              className={buttonClassName({
                variant: "primary",
                size: "lg",
                className: "mt-10 w-full",
              })}
              onClick={() => setMenuPath(null)}
            >
              {headerCta.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
