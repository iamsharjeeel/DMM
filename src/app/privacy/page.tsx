import { LegalPage } from "@/components/sections/LegalPage";
import { createMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read how Donald Mayes Ministries LLC collects, uses, protects, and handles personal information, including prayer requests, speaking inquiries, website data, and SMS consent.",
  path: site.routes.privacy,
});

export default function PrivacyPage() {
  return (
    <main id="main">
      <LegalPage kind="privacy" />
    </main>
  );
}
