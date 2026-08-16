import Link from "next/link";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main id="main" className="section-hairline bg-canvas">
      <Container className="py-[84px] lg:py-[140px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-meta text-gold">Page not found</p>
            <h1 className="type-display-lg mt-7 text-ink">
              This page is not here.
            </h1>
            <p className="type-body mt-7">
              The page you requested is not part of the {site.name} website.
            </p>
            <div className="mt-[56px] flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={site.routes.home} variant="primary">
                Return home
              </ButtonLink>
              <ButtonLink href={site.routes.prayer} variant="secondary">
                Prayer Requests
              </ButtonLink>
            </div>
            <p className="mt-8">
              <Link
                href={site.routes.speaking}
                className="type-meta text-gold underline-offset-4 hover:text-gold-deep hover:underline"
              >
                Invite Pastor Mayes to speak
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
