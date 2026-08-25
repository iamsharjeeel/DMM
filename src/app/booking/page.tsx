import Link from "next/link";
import { HighLevelCalendar } from "@/components/booking/HighLevelCalendar";
import { AccentRule } from "@/components/ui/AccentRule";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { site } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

const description =
  "Choose a convenient time for a brief prayer call with Pastor Donald Mayes. This time is set aside for prayer, encouragement, and support.";

export const metadata = createMetadata({
  title: "Schedule a Prayer Call",
  description,
  path: site.routes.prayerCall,
});

export default function BookingPage() {
  return (
    <div className="booking-page flex min-h-screen flex-col bg-ivory">
      <header className="border-b border-rule bg-ivory">
        <div className="h-px bg-red" aria-hidden="true" />
        <Container className="flex min-h-[4.25rem] items-center justify-between gap-4 py-2">
          <Wordmark compact />
          <Link
            href={site.routes.home}
            className="shrink-0 text-sm font-medium text-blue underline-offset-4 hover:underline"
          >
            Back to Home
          </Link>
        </Container>
      </header>

      <main id="main" className="flex-1 py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-narrow text-center">
            <p className="eyebrow text-blue">Prayer Call</p>
            <AccentRule className="mx-auto mt-5" />
            <h1 className="display-lg mt-6 text-balance">
              Schedule a Prayer Call
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {description}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-[60rem] border border-rule bg-cream p-3 sm:mt-12 sm:p-6 lg:p-8">
            <HighLevelCalendar />
          </div>
        </Container>
      </main>

      <footer className="bg-blue-deep text-cream">
        <Container className="flex flex-col gap-3 py-8 text-sm text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.legalName}. All Rights Reserved.
          </p>
          <Link href={site.routes.home} className="text-cream hover:underline">
            Donald Mayes Ministries
          </Link>
        </Container>
      </footer>
    </div>
  );
}
