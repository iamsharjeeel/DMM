import { SpeakingLanding } from "@/components/landing/speaking/SpeakingLanding";
import { speakingLanding } from "@/content/speaking-landing";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: speakingLanding.seo.title,
  description: speakingLanding.seo.description,
  path: speakingLanding.path,
  noindex: true,
});

export default function InvitePastorMayesPage() {
  return <SpeakingLanding />;
}
