import type { Story } from "@/content/stories";
import { ReadStoryLink } from "@/components/stories/ReadStoryLink";
import { StoryHeader } from "@/components/stories/StoryHeader";
import { cn } from "@/lib/cn";

export function StoryPreview({
  story,
  variant = "secondary",
}: {
  story: Story;
  variant?: "secondary" | "compact";
}) {
  const compact = variant === "compact";

  return (
    <article
      className={cn(
        !compact && "border-t border-rule pt-8 first:border-t-0 first:pt-0",
      )}
    >
      <StoryHeader
        story={story}
        headingLevel={compact ? "p" : "h3"}
        size={compact ? "compact" : "standard"}
      />
      {compact ? null : (
        <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-soft">
          {story.preview}
        </p>
      )}
      <div className={cn(compact ? "mt-3" : "mt-4")}>
        <ReadStoryLink slug={story.slug} title={story.title} />
      </div>
    </article>
  );
}
