import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceList } from "@/components/sections/ExperienceList";
import { HomeHero } from "@/components/sections/HomeHero";
import { MeetPastor } from "@/components/sections/MeetPastor";
import { MissionVision } from "@/components/sections/MissionVision";
import { PrayerPreview } from "@/components/sections/PrayerPreview";
import { SpeakingPreview } from "@/components/sections/SpeakingPreview";
import { StoriesOfReconciliation } from "@/components/sections/StoriesOfReconciliation";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { site } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Loving Everyone Always",
  description: site.mission,
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main">
      <HomeHero />
      <MeetPastor />
      <ExperienceList />
      <MissionVision />
      <ValuesSection />
      <WhoWeServe />
      <StoriesOfReconciliation />
      <SpeakingPreview />
      <PrayerPreview />
      <ContactSection />
    </main>
  );
}
