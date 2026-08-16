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
    <main id="main" className="bg-prayer">
      <PrayerHero />
      <section className="pb-20">
        <Container width="narrow">
          <PrayerRequestForm />
        </Container>
      </section>
    </main>
  );
}
