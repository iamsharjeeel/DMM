import { site, type SocialNetwork } from "@/config/site";
import { isSafeHttpsUrl } from "@/lib/urls";

const labels: Record<SocialNetwork, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
};

export function SocialLinks({ invert = false }: { invert?: boolean }) {
  const links = (Object.keys(site.social) as SocialNetwork[])
    .map((network) => {
      const href = site.social[network];
      if (!href || !isSafeHttpsUrl(href)) {
        return null;
      }
      return { network, href, label: labels[network] };
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
            target="_blank"
            rel="noopener noreferrer"
            className={
              invert
                ? "text-sm text-paper/80 underline-offset-4 hover:text-paper hover:underline"
                : "text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            }
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
