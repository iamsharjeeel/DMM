import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule/80 bg-ivory">
      <div className="h-px bg-red" aria-hidden="true" />
      <Container className="flex h-[var(--header-height)] min-w-0 items-center justify-between gap-3 sm:gap-6">
        <Wordmark />
        <HeaderNav />
        <MobileNavigation />
      </Container>
    </header>
  );
}
