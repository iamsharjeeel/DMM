import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule/80 bg-ivory/90 backdrop-blur-md">
      <div className="h-[2px] bg-forest" aria-hidden="true" />
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-6">
        <Wordmark />
        <HeaderNav />
        <MobileNavigation />
      </Container>
    </header>
  );
}
