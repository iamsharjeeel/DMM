import Link from "next/link";
import { headerCta, primaryNav } from "@/content/navigation";
import { buttonClassName } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule/80 bg-ivory/92 backdrop-blur-sm">
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-6">
        <Wordmark />
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-[0.08em] text-ink-soft uppercase transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={headerCta.href}
            className={buttonClassName({ variant: "primary", size: "md" })}
          >
            {headerCta.label}
          </Link>
        </nav>
        <MobileNavigation />
      </Container>
    </header>
  );
}
