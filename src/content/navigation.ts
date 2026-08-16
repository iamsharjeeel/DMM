import { site } from "@/config/site";

export const primaryNav = [
  { href: site.routes.home, label: "Home" },
  { href: site.routes.episodes, label: "Listen" },
  { href: site.routes.speaking, label: "Speaking" },
  { href: site.routes.prayer, label: "Prayer Requests" },
] as const;

export const headerCta = {
  href: site.routes.booking,
  label: "Book Pastor Mayes",
} as const;

export const footerNav = primaryNav;

export const legalNav = [
  { href: site.routes.privacy, label: "Privacy Policy" },
  { href: site.routes.terms, label: "Terms" },
] as const;
