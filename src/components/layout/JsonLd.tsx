import { getJsonLd } from "@/lib/json-ld";
import { serializeJsonLd } from "@/lib/json-ld-script";

export function JsonLd() {
  const data = getJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
