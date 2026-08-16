import { LegalPage } from "@/components/sections/LegalPage";
import { legal } from "@/content/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: legal.terms.title,
  description:
    "Provisional terms for the Donald Mayes Ministries website. Requires legal review.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main">
      <LegalPage kind="terms" />
    </main>
  );
}
