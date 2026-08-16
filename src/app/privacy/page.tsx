import { LegalPage } from "@/components/sections/LegalPage";
import { legal } from "@/content/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: legal.privacy.title,
  description:
    "Provisional privacy policy for the Donald Mayes Ministries website. Form submissions are not collected in Phase 1.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main">
      <LegalPage kind="privacy" />
    </main>
  );
}
