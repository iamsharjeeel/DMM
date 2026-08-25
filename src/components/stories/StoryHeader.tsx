import { storyCategoryLabels, type Story } from "@/content/stories";
import { cn } from "@/lib/cn";

export function StoryHeader({
  story,
  headingLevel,
  size = "standard",
}: {
  story: Story;
  headingLevel: "h1" | "h2" | "h3" | "p";
  size?: "featured" | "standard" | "compact";
}) {
  const Heading = headingLevel;

  return (
    <header>
      <p className="eyebrow text-forest">
        {storyCategoryLabels[story.category]}
      </p>
      <p className="mt-4 text-[0.9375rem] leading-snug text-ink-soft">
        <span className="text-ink">{story.name}</span>
        {story.descriptor ? (
          <>
            <span aria-hidden="true"> · </span>
            <span>{story.descriptor}</span>
          </>
        ) : null}
      </p>
      <Heading
        className={cn(
          "mt-3 text-balance",
          size === "featured" &&
            "font-display text-[clamp(2rem,3.2vw,3.15rem)] leading-[1.12] tracking-[-0.02em]",
          size === "standard" && "display-md",
          size === "compact" &&
            "font-display text-[1.4rem] leading-snug tracking-[-0.015em]",
        )}
      >
        {story.title}
      </Heading>
    </header>
  );
}
