import { site } from "@/config/site";

export const prayer = {
  hero: {
    headline: "How Can We Pray for You?",
    lines: [
      "Whatever you're facing, we'd be honored to pray with you.",
      "You can share as much or as little as you feel comfortable sharing.",
    ],
  },
  form: {
    name: {
      label: "Your Name",
      optional: true,
    },
    email: {
      label: "Email Address",
      optionalHint: "Optional unless you request follow-up by email.",
    },
    phone: {
      label: "Phone Number",
      optionalHint:
        "Optional unless you request follow-up by phone or text.",
    },
    request: {
      label: "How can we pray for you?",
    },
    urgent: {
      label: "Is this prayer request urgent?",
      checkbox:
        "Yes, I would appreciate prayer as soon as possible.",
    },
    followUp: {
      label:
        "Would you like someone from Donald Mayes Ministries to follow up with you?",
      yes: "Yes",
      no: "No",
    },
    contactMethod: {
      label: "How would you prefer we contact you?",
      options: [
        { value: "email", label: "Email" },
        { value: "phone", label: "Phone" },
        { value: "text", label: "Text" },
      ],
    },
    consent: {
      label:
        "I give Donald Mayes Ministries permission to contact me regarding this prayer request.",
    },
    submitLabel: "Submit Prayer Request",
  },
  confirmation: {
    heading: "Your Prayer Request Has Been Received",
    body: "Thank you for trusting us with your request. Our ministry will be praying with you.",
    motto: site.motto,
  },
  frontendNotice:
    "This form currently confirms on this page only. Requests are not stored or sent until submission handling is implemented.",
  seo: {
    title: "Prayer Requests",
    description:
      "Share a prayer request with Donald Mayes Ministries. You can share as much or as little as you feel comfortable sharing.",
  },
} as const;

export const followUpOptions = [
  { value: "yes", label: prayer.form.followUp.yes },
  { value: "no", label: prayer.form.followUp.no },
] as const;
