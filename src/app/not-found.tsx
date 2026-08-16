import Link from "next/link";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main id="main" className="bg-ivory">
      <Container width="narrow" className="py-24 text-center">
        <p className="text-xs tracking-[0.28em] uppercase text-bronze-dark">
          Page not found
        </p>
        <h1 className="mt-4 font-display text-5xl">This page is not here.</h1>
        <p className="mt-6 text-lg text-ink-soft">
          The page you requested is not part of the {site.name} website.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={site.routes.home} variant="navy">
            Return home
          </ButtonLink>
          <ButtonLink href={site.routes.prayer} variant="secondary">
            Prayer Requests
          </ButtonLink>
        </div>
        <p className="mt-8">
          <Link href={site.routes.speaking} className="text-bronze-dark underline">
            Invite Pastor Mayes to speak
          </Link>
        </p>
      </Container>
    </main>
  );
}
