import Link from "next/link";
import { SpeakingLeadForm } from "@/components/landing/speaking/SpeakingLeadForm";
import { SpeakingLandingStickyCta } from "@/components/landing/speaking/SpeakingLandingStickyCta";
import { SpeakingLandingViewTracker } from "@/components/landing/speaking/SpeakingLandingViewTracker";
import { AccentRule } from "@/components/ui/AccentRule";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PastorImage } from "@/components/ui/PastorImage";
import { PullQuote } from "@/components/ui/PullQuote";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Wordmark } from "@/components/ui/Wordmark";
import { compliance } from "@/config/compliance";
import { speakingLanding } from "@/content/speaking-landing";
import { legalNav } from "@/content/navigation";
import { site } from "@/config/site";

const formHref = `#${speakingLanding.formAnchor}`;

export function SpeakingLanding() {
  const { hero, message, topics, experience, principle, eventFit, expectation, faq, closer } =
    speakingLanding;

  return (
    <div className="speaking-landing-page flex min-h-screen flex-col bg-ivory pb-[5.25rem] lg:pb-0">
      <SpeakingLandingViewTracker />
      <header className="border-b border-rule bg-ivory">
        <div className="h-px bg-red" aria-hidden="true" />
        <Container className="flex min-h-[4.25rem] items-center justify-between gap-4 py-2">
          <Wordmark compact />
          <ButtonLink href={formHref} variant="primary" size="md" className="shrink-0">
            {speakingLanding.cta}
          </ButtonLink>
        </Container>
      </header>

      <main id="main" className="flex-1">
        <section className="border-b border-rule bg-ivory py-10 sm:py-12 lg:py-14">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,26.5rem)] lg:items-start lg:gap-12">
              <div>
                <p className="eyebrow text-blue">{hero.eyebrow}</p>
                <AccentRule className="mt-5" />
                <h1 className="mt-5 font-display text-[1.85rem] leading-[1.12] tracking-tight text-balance sm:text-[2.25rem] lg:text-[2.45rem]">
                  {hero.headline}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                  {hero.body}
                </p>
                <ul className="mt-6 max-w-xl space-y-2 border-t border-rule pt-5">
                  {hero.credibility.map((item) => (
                    <li key={item} className="text-sm leading-snug text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href={formHref} variant="primary" size="lg">
                    {speakingLanding.cta}
                  </ButtonLink>
                  <p className="mt-3 text-sm text-ink-soft">{hero.microcopy}</p>
                </div>
                <div className="mt-10 hidden max-w-md lg:block">
                  <PastorImage
                    slot="hero"
                    alt={hero.imageAlt}
                    aspect="landscape"
                    objectPosition="center 20%"
                  />
                </div>
              </div>
              <div
                id={speakingLanding.formAnchor}
                className="scroll-mt-[5.5rem] border border-rule bg-cream p-5 sm:p-6"
              >
                <SpeakingLeadForm />
              </div>
            </div>
            <div className="mt-10 lg:hidden">
              <PastorImage
                slot="hero"
                alt={hero.imageAlt}
                aspect="landscape"
                objectPosition="center 20%"
              />
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <SectionHeading eyebrow={message.eyebrow} heading={message.heading}>
              <p>{message.body}</p>
              <p className="mt-5">{message.supporting}</p>
            </SectionHeading>
          </Container>
        </Section>

        <Section tone="cream">
          <Container>
            <SectionHeading eyebrow={topics.eyebrow} heading={topics.heading} />
            <ol className="mt-12">
              {topics.items.map((topic, index) => (
                <li
                  key={topic.id}
                  className="grid gap-2 border-t border-rule py-7 md:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-10 md:py-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl italic text-blue"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-medium leading-snug">{topic.title}</h3>
                  <p className="text-ink-soft">{topic.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading eyebrow={experience.eyebrow} heading={experience.heading}>
              <p>{experience.body}</p>
            </SectionHeading>
            <ol className="mt-12 grid gap-x-16 sm:grid-cols-2">
              {experience.items.map((item, index) => (
                <li key={item} className="flex gap-5 border-t border-rule py-5">
                  <span
                    aria-hidden="true"
                    className="w-10 shrink-0 font-display text-xl italic text-blue"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-0.5 leading-snug">{item}</span>
                </li>
              ))}
            </ol>
            <PullQuote lead={principle.lead} quote={principle.quote} />
            <p className="mt-5 max-w-xl text-ink-soft">{principle.supporting}</p>
          </Container>
        </Section>

        <Section tone="mist">
          <Container>
            <SectionHeading eyebrow={eventFit.eyebrow} heading={eventFit.heading} />
            <ul className="mt-12 grid gap-x-16 sm:grid-cols-2">
              {eventFit.items.map((item) => (
                <li key={item} className="border-t border-rule py-4">
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading heading={expectation.heading}>
              <p>{expectation.body}</p>
              <p className="mt-5">{expectation.supporting}</p>
            </SectionHeading>
          </Container>
        </Section>

        <Section tone="cream">
          <Container width="narrow">
            <SectionHeading heading={faq.heading} />
            <div className="mt-10 space-y-8">
              {faq.items.map((item) => (
                <div key={item.question} className="border-t border-rule pt-6">
                  <h3 className="text-lg font-medium leading-snug">{item.question}</h3>
                  <p className="mt-3 text-ink-soft">{item.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading heading={closer.heading}>
              <p>{closer.body}</p>
            </SectionHeading>
            <div className="mt-8">
              <ButtonLink href={formHref} variant="primary" size="lg">
                {speakingLanding.cta}
              </ButtonLink>
            </div>
          </Container>
        </Section>
      </main>

      <footer className="bg-blue-deep text-cream">
        <Container className="flex flex-col gap-6 py-10 text-sm text-cream/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Wordmark invert compact />
            <Link href={site.routes.home} className="text-cream hover:underline">
              {speakingLanding.visitLabel}
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <a href={compliance.emailHref} className="text-cream/80 hover:text-cream hover:underline">
              {compliance.email}
            </a>
            <a href={compliance.phoneHref} className="text-cream/80 hover:text-cream hover:underline">
              {compliance.phone}
            </a>
          </div>
          <div className="flex flex-col gap-4 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {site.copyrightYear} {site.legalName}. All Rights Reserved.
            </p>
            <ul className="flex flex-wrap gap-5">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </footer>
      <SpeakingLandingStickyCta />
    </div>
  );
}
