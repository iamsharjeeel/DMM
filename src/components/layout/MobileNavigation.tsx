"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerCta, primaryNav } from "@/content/navigation";
import { buttonClassName } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { GoldRule } from "@/components/ui/GoldRule";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";

export function MobileNavigation() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
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
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const overlay = open ? (
    <div
      ref={panelRef}
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[80] flex flex-col bg-ivory"
    >
      <div className="h-[2px] bg-forest" aria-hidden="true" />
      <div className="flex items-center justify-between px-5 py-4">
        <Wordmark compact />
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
      <nav className="flex flex-1 flex-col px-6 pb-16 pt-8 sm:px-10">
        <p className="eyebrow text-forest">Menu</p>
        <GoldRule className="mt-5" />
        <ul className="mt-10 space-y-5">
          {primaryNav.map((item) => {
            const current =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "font-display text-[2.6rem] leading-none text-ink sm:text-5xl",
                    current && "italic",
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
            className: "mt-12 w-full max-w-sm",
          })}
          onClick={() => setMenuPath(null)}
        >
          {headerCta.label}
        </Link>
      </nav>
    </div>
  ) : null;

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
      {overlay ? createPortal(overlay, document.body) : null}
    </div>
  );
}
