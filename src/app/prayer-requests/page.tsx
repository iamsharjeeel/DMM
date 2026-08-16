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
    <main id="main" className="bg-canvas">
      <PrayerHero />
      <section className="section-space section-hairline bg-canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7 lg:col-start-1">
              <PrayerRequestForm />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
