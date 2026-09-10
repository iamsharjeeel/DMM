import Link from "next/link";
import { SpeakingAtmosphere } from "@/components/landing/speaking/SpeakingAtmosphere";
import { SpeakingAuthorityStrip } from "@/components/landing/speaking/SpeakingAuthorityStrip";
import { SpeakingEventFit } from "@/components/landing/speaking/SpeakingEventFit";
import { SpeakingExperience } from "@/components/landing/speaking/SpeakingExperience";
import { SpeakingLandingCloser } from "@/components/landing/speaking/SpeakingLandingCloser";
import { SpeakingLandingFaq } from "@/components/landing/speaking/SpeakingLandingFaq";
import { SpeakingLandingHeader } from "@/components/landing/speaking/SpeakingLandingHeader";
import { SpeakingLandingHero } from "@/components/landing/speaking/SpeakingLandingHero";
import { SpeakingLandingStickyCta } from "@/components/landing/speaking/SpeakingLandingStickyCta";
import { SpeakingLandingViewTracker } from "@/components/landing/speaking/SpeakingLandingViewTracker";
import { SpeakingLeadForm } from "@/components/landing/speaking/SpeakingLeadForm";
import { SpeakingMessage } from "@/components/landing/speaking/SpeakingMessage";
import { SpeakingPrinciple } from "@/components/landing/speaking/SpeakingPrinciple";
import { SpeakingTopicsEditorial } from "@/components/landing/speaking/SpeakingTopicsEditorial";
import { AccentRule } from "@/components/ui/AccentRule";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Wordmark } from "@/components/ui/Wordmark";
import { compliance } from "@/config/compliance";
import { speakingLanding } from "@/content/speaking-landing";
import { legalNav } from "@/content/navigation";
import { site } from "@/config/site";

export function SpeakingLanding() {
  const { form, expectation } = speakingLanding;

  return (
    <div className="speaking-landing-page flex min-h-screen flex-col bg-ivory pb-[5.25rem] lg:pb-0">
      <SpeakingLandingViewTracker />
      <SpeakingLandingHeader />
      <main id="main" className="flex-1">
        <SpeakingLandingHero />
        <SpeakingAuthorityStrip />
        <SpeakingMessage />
        <SpeakingTopicsEditorial />
        <SpeakingAtmosphere />
        <SpeakingExperience />
        <SpeakingPrinciple />
        <SpeakingEventFit />
        <Section
          id={speakingLanding.formAnchor}
          tone="cream"
          className="scroll-mt-[calc(var(--lp-header-height)+0.75rem)]"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
              <div className="lg:col-span-5">
                <Reveal>
                  <Eyebrow>{form.eyebrow}</Eyebrow>
                  <AccentRule className="mt-5" />
                  <h2 className="display-lg mt-5 max-w-xl lg:max-w-[12ch]">{form.heading}</h2>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                    {form.support}
                  </p>
                  <p className="mt-8 max-w-md font-display text-2xl leading-snug">
                    {expectation.heading}
                  </p>
                  <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
                    {expectation.supporting}
                  </p>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                <SpeakingLeadForm />
              </div>
            </div>
          </Container>
        </Section>
        <SpeakingLandingFaq />
        <SpeakingLandingCloser />
      </main>
      <footer className="bg-blue-deep text-cream">
        <Container className="flex flex-col gap-6 border-t border-cream/10 py-10 text-sm text-cream/70">
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
