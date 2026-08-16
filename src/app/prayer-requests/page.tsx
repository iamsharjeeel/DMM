import { PrayerRequestForm } from "@/components/forms/PrayerRequestForm";
import { PrayerHero } from "@/components/sections/PrayerHero";
import { Container } from "@/components/ui/Container";
import { prayer } from "@/content/prayer";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: prayer.seo.title,
  description: prayer.seo.description,
  path: "/prayer-requests",
});

export default function PrayerRequestsPage() {
  return (
    <main id="main" className="bg-ivory">
      <PrayerHero />
      <section className="pb-20 lg:pb-28">
        <Container width="narrow">
          <div className="border border-rule bg-cream px-5 py-8 sm:px-8 sm:py-10">
            <PrayerRequestForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
