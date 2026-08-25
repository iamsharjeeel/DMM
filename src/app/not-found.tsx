import Link from "next/link";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { AccentRule } from "@/components/ui/AccentRule";

export default function NotFound() {
  return (
    <main id="main" className="bg-ivory">
      <Container width="narrow" className="py-24">
        <p className="eyebrow text-blue">Page not found</p>
        <AccentRule className="mt-5" />
        <h1 className="display-lg mt-5">This page is not here.</h1>
        <p className="mt-6 text-lg text-ink-soft">
          The page you requested is not part of the {site.name} website.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
            className="text-blue underline underline-offset-4 hover:text-blue-hover"
          >
            Invite Pastor Mayes to speak
          </Link>
        </p>
      </Container>
    </main>
  );
}
