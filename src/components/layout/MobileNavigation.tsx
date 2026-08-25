"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerCta, primaryNav } from "@/content/navigation";
import { buttonClassName } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { AccentRule } from "@/components/ui/AccentRule";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";
import { agentDebugLog } from "@/lib/agent-debug-log";

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

    // #region agent log
    const logOpen = () => {
      const panel = panelRef.current;
      const panelRect = panel?.getBoundingClientRect();
      const linkMetrics = panel
        ? Array.from(panel.querySelectorAll<HTMLElement>("nav a")).map((a) => {
            const r = a.getBoundingClientRect();
            return {
              text: a.textContent?.trim() ?? "",
              top: Math.round(r.top),
              left: Math.round(r.left),
              width: Math.round(r.width),
              height: Math.round(r.height),
              inView:
                r.bottom > 0 &&
                r.top < window.innerHeight &&
                r.right > 0 &&
                r.left < window.innerWidth,
            };
          })
        : [];
      void agentDebugLog({
        hypothesisId: "A-E",
        location: "MobileNavigation.tsx:open-effect",
        message: "mobile menu opened",
        runId: "pre-fix",
        data: {
          pathname,
          viewport: { w: window.innerWidth, h: window.innerHeight },
          scroll: {
            x: window.scrollX,
            y: window.scrollY,
            docScrollLeft: document.documentElement.scrollLeft,
            bodyScrollLeft: document.body.scrollLeft,
          },
          bodyOverflow: document.body.style.overflow,
          bodyOverflowComputed: getComputedStyle(document.body).overflow,
          bodyOverflowXComputed: getComputedStyle(document.body).overflowX,
          portalParent: panel?.parentElement?.tagName ?? null,
          inHeader: panel ? Boolean(panel.closest("header")) : null,
          panelRect: panelRect
            ? {
                top: Math.round(panelRect.top),
                left: Math.round(panelRect.left),
                width: Math.round(panelRect.width),
                height: Math.round(panelRect.height),
              }
            : null,
          panelStyles: panel
            ? {
                position: getComputedStyle(panel).position,
                zIndex: getComputedStyle(panel).zIndex,
                bg: getComputedStyle(panel).backgroundColor,
                opacity: getComputedStyle(panel).opacity,
                visibility: getComputedStyle(panel).visibility,
                transform: getComputedStyle(panel).transform,
              }
            : null,
          headerStyles: (() => {
            const header = document.querySelector("header");
            if (!header) return null;
            const cs = getComputedStyle(header);
            return {
              position: cs.position,
              zIndex: cs.zIndex,
              filter: cs.filter,
              backdropFilter: cs.backdropFilter,
              transform: cs.transform,
              overflow: cs.overflow,
              height: Math.round(header.getBoundingClientRect().height),
            };
          })(),
          linkMetrics,
          centerEl: (() => {
            const el = document.elementFromPoint(
              Math.floor(window.innerWidth / 2),
              Math.floor(window.innerHeight / 2),
            );
            return el
              ? {
                  tag: el.tagName,
                  text: el.textContent?.trim().slice(0, 40) ?? "",
                  className: String(
                    (el as HTMLElement).className ?? "",
                  ).slice(0, 80),
                }
              : null;
          })(),
        },
      });
    };
    requestAnimationFrame(() => requestAnimationFrame(logOpen));
    // #endregion

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
      // #region agent log
      void agentDebugLog({
        hypothesisId: "C-D",
        location: "MobileNavigation.tsx:close-cleanup",
        message: "mobile menu closing cleanup",
        runId: "pre-fix",
        data: {
          scrollBeforeRestore: {
            x: window.scrollX,
            y: window.scrollY,
            docScrollLeft: document.documentElement.scrollLeft,
            bodyScrollLeft: document.body.scrollLeft,
          },
          bodyOverflowInline: document.body.style.overflow,
        },
      });
      // #endregion
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, pathname]);

  const overlay = open ? (
    <div
      ref={panelRef}
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[80] flex flex-col bg-ivory"
    >
      <div className="h-px bg-red" aria-hidden="true" />
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
        <p className="eyebrow text-blue">Menu</p>
        <AccentRule className="mt-5" />
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
                    current && "text-blue italic",
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
        onClick={() => {
          // #region agent log
          void agentDebugLog({
            hypothesisId: "E",
            location: "MobileNavigation.tsx:open-click",
            message: "hamburger clicked",
            runId: "pre-fix",
            data: {
              pathname,
              menuPathBefore: menuPath,
              viewport: {
                w: window.innerWidth,
                h: window.innerHeight,
              },
              scrollX: window.scrollX,
              scrollY: window.scrollY,
            },
          });
          // #endregion
          setMenuPath(pathname);
        }}
      >
        <MenuIcon />
        <span className="sr-only">Open menu</span>
      </button>
      {overlay ? createPortal(overlay, document.body) : null}
    </div>
  );
}
