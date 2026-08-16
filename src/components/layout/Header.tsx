import { Container } from "@/components/ui/Container";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/90 backdrop-blur-sm">
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-6">
        <BrandLockup />
        <div className="flex items-center gap-6">
          <HeaderNav />
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
