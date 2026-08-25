import Link from "next/link";
import { compliance } from "@/config/compliance";
import { site } from "@/config/site";
import { footerNav, headerCta, legalNav } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { AccentRule } from "@/components/ui/AccentRule";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer data-site-shell className="tone-blue">
      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <Wordmark invert />
            <p className="mt-8 font-display text-[2.15rem] leading-[1.1] italic text-cream sm:text-4xl">
              {site.motto}
            </p>
            <AccentRule className="mt-6" />
            <p className="mt-6 max-w-md text-cream/70">
              Teaching followers of Christ how to love people through practical
              biblical living.
            </p>
          </div>
          <div>
            <p className="eyebrow text-cream/60">Navigate</p>
            <ul className="mt-5 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/80 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-cream/60">Connect</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              Invite Pastor Mayes to speak, or share a prayer request.
            </p>
            <p className="mt-4">
              <a
                href={compliance.emailHref}
                className="text-cream/80 transition-colors hover:text-cream hover:underline"
              >
                {compliance.email}
              </a>
            </p>
            <p className="mt-2">
              <a
                href={compliance.phoneHref}
                className="text-cream/80 transition-colors hover:text-cream hover:underline"
              >
                {compliance.phone}
              </a>
            </p>
            <div className="mt-6">
              <ButtonLink href={headerCta.href} variant="invert" size="md">
                {headerCta.label}
              </ButtonLink>
            </div>
            <div className="mt-5">
              <SocialLinks invert />
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-6 text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.legalName}. All Rights Reserved.
          </p>
          <ul className="flex gap-5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
