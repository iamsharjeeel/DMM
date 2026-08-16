import { site } from "@/config/site";

export const legal = {
  privacy: {
    title: "Privacy Policy",
    updated: "August 17, 2026",
    intro:
      "This Privacy Policy describes how Donald Mayes Ministries currently treats information in connection with this website. It is provisional and requires legal review once final contact details and branding are in place.",
    sections: [
      {
        heading: "What this website currently collects",
        paragraphs: [
          "This website uses HighLevel external tracking so Donald Mayes Ministries can understand visits and receive form submissions for ministry follow-up.",
          "HighLevel may process page URLs, UTM parameters, and the fields you enter in the speaking booking form and the prayer request form, including prayer request text.",
        ],
      },
      {
        heading: "What we do not do with form entries",
        paragraphs: [
          "This website does not save form entries in your browser, place them in page URLs, or write them to the console.",
          "Submitting a booking or prayer form is how you send that information to Donald Mayes Ministries through HighLevel.",
        ],
      },
      {
        heading: "Information that may be processed by hosting",
        paragraphs: [
          "This website is intended to be hosted on Vercel. Like most websites, hosting and content-delivery infrastructure may process standard technical request data such as IP address, browser type, and requested pages as part of serving the site. This policy does not make claims about encryption, retention, or subprocessors beyond that ordinary hosting behavior.",
        ],
      },
      {
        heading: "Contact information",
        paragraphs: [
          "A public ministry email address and social profiles have not been confirmed for publication. When they are, this policy will be updated.",
        ],
      },
      {
        heading: "Future updates",
        paragraphs: [
          "This policy will be revised as contact details, branding, retention practices, and any later scheduling tools are finalized. Do not treat this page as a complete legal description of HighLevel's own processing until it has been reviewed.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms",
    updated: "August 17, 2026",
    intro:
      "These Terms govern use of the Donald Mayes Ministries website. They are provisional and require legal review before they should be treated as final.",
    sections: [
      {
        heading: "The website",
        paragraphs: [
          `${site.name} provides information about Pastor Donald Mayes, speaking invitations, and a way to begin sharing a prayer request. The site does not constitute pastoral counseling, professional advice, or a church membership relationship.`,
        ],
      },
      {
        heading: "Forms",
        paragraphs: [
          "The booking and prayer forms send the information you enter to Donald Mayes Ministries through HighLevel so the ministry can follow up. Submitting a form does not create a speaking engagement or other commitment.",
        ],
      },
      {
        heading: "Content",
        paragraphs: [
          "Website content is provided for ministry communication. You may not copy the site in a way that misrepresents Pastor Mayes, the ministry, or the source of the material.",
        ],
      },
      {
        heading: "Limitation",
        paragraphs: [
          "The website is provided as-is for informational purposes. Donald Mayes Ministries does not warrant uninterrupted availability. These Terms do not limit liability where the law does not allow it.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "These Terms may be updated as the ministry's contact details, branding, and technical systems are finalized.",
        ],
      },
    ],
  },
} as const;
