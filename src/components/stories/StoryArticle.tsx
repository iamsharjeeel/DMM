import Link from "next/link";
import {
  storiesSection,
  storyCategoryLabels,
  type Story,
} from "@/content/stories";
import { StoryHeader } from "@/components/stories/StoryHeader";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { PullQuote } from "@/components/ui/PullQuote";
import { site } from "@/config/site";
import { getRelatedStories, getStoryPath } from "@/lib/stories";

export function StoryArticle({ story }: { story: Story }) {
  const related = getRelatedStories(story.slug);

  return (
    <article className="bg-ivory">
      <Container width="narrow" className="pt-16 pb-8 lg:pt-24">
        <p>
          <Link
            href={site.routes.stories}
            className="text-sm text-ink-soft transition-colors hover:text-forest"
          >
            {storiesSection.backLabel}
          </Link>
        </p>
        <div className="mt-10">
          <StoryHeader story={story} headingLevel="h1" size="featured" />
        </div>
        <GoldRule className="mt-8" />
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink-soft">
          {story.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {story.pullQuote ? <PullQuote quote={story.pullQuote} /> : null}
      </Container>

      <div className="mt-16 border-t border-rule bg-cream">
        <Container className="py-14 lg:py-16">
          <p className="eyebrow text-forest">{storiesSection.relatedHeading}</p>
          <GoldRule className="mt-5" />
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="border-t border-rule pt-5">
                <p className="eyebrow text-forest">
                  {storyCategoryLabels[item.category]}
                </p>
                <p className="mt-3 text-sm text-ink">{item.name}</p>
                <h2 className="mt-2 font-display text-[1.45rem] leading-snug">
                  <Link
                    href={getStoryPath(item.slug)}
                    className="transition-colors hover:text-forest"
                  >
                    {item.title}
                  </Link>
                </h2>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </article>
  );
}
