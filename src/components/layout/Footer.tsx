import Link from "next/link";
import { site } from "@/config/site";
import { footerNav, legalNav } from "@/content/navigation";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { BrandLockup } from "@/components/brand/BrandLockup";

export function Footer() {
  return (
    <footer className="bg-navy-panel text-on-navy">
      <Container className="py-[112px] max-lg:py-[84px]">
        <div className="flex flex-col items-center text-center">
          <BrandLockup variant="monogram" />
          <p className="type-serif-italic mt-7 text-gold">{site.motto}</p>
        </div>
        <div className="mt-[56px] grid gap-12 md:grid-cols-2 lg:grid-cols-2">
          <div>
            <p className="type-meta text-gold">Navigate</p>
            <ul className="mt-7 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-on-navy transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="type-meta text-gold">Connect</p>
            <p className="type-body mt-7 max-w-measure text-on-navy-muted">
              Invite Pastor Mayes to speak, or share a prayer request. Public
              email and social profiles will appear here once they are confirmed.
            </p>
            <div className="mt-7">
              <SocialLinks invert />
            </div>
          </div>
        </div>
        <div className="mt-[56px] border-t border-hairline pt-7">
          <p className="text-sm text-on-navy-muted">
            © {site.copyrightYear} {site.legalName}.
          </p>
          <p className="type-meta mt-4 text-on-navy-muted">
            Est. 40+ years of service — Springfield / Phoenix
          </p>
          <ul className="mt-7 flex gap-7">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="type-meta text-on-navy-muted hover:text-on-navy"
                >
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
