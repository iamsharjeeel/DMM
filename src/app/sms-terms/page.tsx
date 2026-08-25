import { LegalPage } from "@/components/sections/LegalPage";
import { createMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = createMetadata({
  title: "SMS Messaging Terms",
  description:
    "Read the SMS messaging terms for Donald Mayes Ministries LLC, including consent, message frequency, rates, support, privacy, and opt-out instructions.",
  path: site.routes.smsTerms,
});

export default function SmsTermsPage() {
  return (
    <main id="main">
      <LegalPage kind="smsTerms" />
    </main>
  );
}
