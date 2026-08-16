import { getJsonLd } from "@/lib/json-ld";

export function JsonLd() {
  const data = getJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
