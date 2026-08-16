import { BookingSection } from "@/components/sections/BookingSection";
import { SpeakingAudiences } from "@/components/sections/SpeakingAudiences";
import { SpeakingHero } from "@/components/sections/SpeakingHero";
import { SpeakingTopics } from "@/components/sections/SpeakingTopics";
import { Testimonials } from "@/components/sections/Testimonials";
import { speaking } from "@/content/speaking";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: speaking.seo.title,
  description: speaking.seo.description,
  path: "/speaking",
});

export default function SpeakingPage() {
  return (
    <main id="main">
      <SpeakingHero />
      <SpeakingTopics />
      <SpeakingAudiences />
      <Testimonials
        heading={speaking.testimonials.heading}
        items={speaking.testimonials.items}
      />
      <BookingSection />
    </main>
  );
}
