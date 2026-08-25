import Link from "next/link";
import { storiesSection } from "@/content/stories";
import { ArrowIcon } from "@/components/ui/icons";
import { getStoryPath } from "@/lib/stories";
import { cn } from "@/lib/cn";

export function ReadStoryLink({
  slug,
  title,
  className,
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  return (
    <Link
      href={getStoryPath(slug)}
      aria-label={`${storiesSection.readStoryLabel}: ${title}`}
      className={cn(
        "inline-flex items-center gap-2 text-[0.9375rem] font-medium text-forest transition-colors hover:text-forest-deep",
        className,
      )}
    >
      {storiesSection.readStoryLabel}
      <ArrowIcon />
    </Link>
  );
}
