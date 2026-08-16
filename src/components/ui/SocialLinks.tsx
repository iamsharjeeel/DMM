import { site, type SocialNetwork } from "@/config/site";

const labels: Record<SocialNetwork, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
};

export function SocialLinks({ invert = false }: { invert?: boolean }) {
  const links = (Object.keys(site.social) as SocialNetwork[])
    .map((network) => {
      const href = site.social[network];
      return href ? { network, href, label: labels[network] } : null;
    })
    .filter((item): item is { network: SocialNetwork; href: string; label: string } =>
      Boolean(item),
    );

  if (links.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link) => (
        <li key={link.network}>
          <a
            href={link.href}
            className={
              invert
                ? "type-meta text-on-navy-muted underline-offset-4 hover:text-on-navy hover:underline"
                : "type-meta text-muted underline-offset-4 hover:text-ink hover:underline"
            }
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
