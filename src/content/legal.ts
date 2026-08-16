import { site } from "@/config/site";

export const legal = {
  privacy: {
    title: "Privacy Policy",
    updated: "August 16, 2026",
    intro:
      "This Privacy Policy describes how Donald Mayes Ministries currently treats information in connection with this website. It is provisional and requires legal review once final contact details, branding, and any submission infrastructure are in place.",
    sections: [
      {
        heading: "What this website currently collects",
        paragraphs: [
          "Phase 1 of this website is informational. The speaking and prayer forms on this site are frontend experiences only. Completing a form does not send, store, email, or otherwise transmit the information you enter.",
          "We do not currently operate a database, CRM, email processor, or other backend collection system for this website.",
        ],
      },
      {
        heading: "What we do not do with form entries",
        paragraphs: [
          "Form entries are not saved in your browser by this website, are not placed in page URLs, and are not sent to analytics or third-party services by this website.",
          "Until a submission system is implemented, please do not rely on these forms to deliver a booking or prayer request.",
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
          "If Donald Mayes Ministries later collects prayer requests, booking inquiries, or other personal information, this policy will be revised to describe what is collected, why it is collected, how long it is kept, who can access it, and how to request changes or deletion. Until then, do not treat this page as a description of an active data-collection program.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms",
    updated: "August 16, 2026",
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
          "The booking and prayer forms currently confirm on the page only. Submitting a form does not create a commitment by Donald Mayes Ministries and does not transmit your information to our team until a future submission process is connected.",
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
