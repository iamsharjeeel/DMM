import { LegalPage } from "@/components/sections/LegalPage";
import { createMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Read the terms governing use of the Donald Mayes Ministries website, ministry content, prayer requests, speaking inquiries, and communications.",
  path: site.routes.terms,
});

export default function TermsPage() {
  return (
    <main id="main">
      <LegalPage kind="terms" />
    </main>
  );
}
