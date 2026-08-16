import Link from "next/link";
import { site } from "@/config/site";
import { footerNav, legalNav } from "@/content/navigation";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer className="bg-navy text-paper">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark invert />
            <p className="mt-6 font-display text-2xl italic">{site.motto}</p>
            <p className="mt-4 max-w-md text-paper/75">
              Teaching followers of Christ how to love people through practical
              biblical living.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-bronze">
              Navigate
            </p>
            <ul className="mt-4 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper/85 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-bronze">
              Connect
            </p>
            <p className="mt-4 max-w-xs text-sm text-paper/75">
              Invite Pastor Mayes to speak, or share a prayer request. Public
              email and social profiles will appear here once they are confirmed.
            </p>
            <div className="mt-4">
              <SocialLinks invert />
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-paper/15 pt-6 text-sm text-paper/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.legalName}. All Rights Reserved.
          </p>
          <ul className="flex gap-5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-paper">
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
