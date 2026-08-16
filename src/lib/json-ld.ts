import { site } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

export function getJsonLd() {
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name: site.name,
        url,
        description: site.mission,
        inLanguage: "en-US",
        publisher: { "@id": `${url}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url,
        description: site.mission,
        slogan: site.motto,
        founder: { "@id": `${url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: "Donald Mayes",
        honorificPrefix: "Pastor",
        jobTitle: "Pastor",
        description:
          "Pastor Donald Mayes has served people through ministry, community leadership, mentoring, missions, teaching, and pastoral care for more than 40 years.",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Trinity Evangelical Divinity School",
        },
        affiliation: { "@id": `${url}/#organization` },
        url,
      },
    ],
  };
}
