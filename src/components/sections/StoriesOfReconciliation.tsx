import { ReadStoryLink } from "@/components/stories/ReadStoryLink";
import { StoryHeader } from "@/components/stories/StoryHeader";
import { StoryPreview } from "@/components/stories/StoryPreview";
import { AccentRule } from "@/components/ui/AccentRule";
import { Container } from "@/components/ui/Container";
import { PullQuote } from "@/components/ui/PullQuote";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { storiesSection } from "@/content/stories";
import {
  getFeaturedStory,
  getStoriesByPlacement,
} from "@/lib/stories";

export function StoriesOfReconciliation() {
  const featured = getFeaturedStory();
  const secondary = getStoriesByPlacement("secondary");
  const more = getStoriesByPlacement("more");

  return (
    <Section
      id="stories"
      tone="cream"
      className="scroll-mt-[calc(var(--header-height)+0.75rem)]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={storiesSection.eyebrow}
            heading={storiesSection.heading}
          >
            <p>{storiesSection.intro}</p>
          </SectionHeading>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-0">
          <Reveal className="min-w-0 lg:col-span-7 lg:pr-12 xl:pr-16">
            <article>
              <StoryHeader story={featured} headingLevel="h3" size="featured" />
              <AccentRule className="mt-6" />
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                {featured.preview}
              </p>
              {featured.pullQuote ? (
                <PullQuote quote={featured.pullQuote} />
              ) : null}
              <div className="mt-6">
                <ReadStoryLink slug={featured.slug} title={featured.title} />
              </div>
            </article>
          </Reveal>

          <Reveal
            delay={80}
            className="flex min-w-0 flex-col border-t border-rule pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 xl:pl-14"
          >
            {secondary.map((story) => (
              <StoryPreview key={story.slug} story={story} />
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-14 border-t border-rule pt-8 lg:mt-16">
          <h3
            id="more-stories-heading"
            className="font-display text-[1.7rem] leading-tight sm:text-[1.9rem]"
          >
            {storiesSection.moreHeading}
          </h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {more.map((story) => (
              <li key={story.slug} className="border-t border-rule pt-5">
                <StoryPreview story={story} variant="compact" />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
