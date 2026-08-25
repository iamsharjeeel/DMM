import { site } from "./site";

export const compliance = {
  consentVersion: "2026-08-26",
  legalName: site.legalName,
  programName: "Donald Mayes Ministries Messaging Program",
  privacyPath: site.routes.privacy,
  termsPath: site.routes.terms,
  smsTermsPath: site.routes.smsTerms,
  email: site.email,
  phone: site.phone,
  emailHref: `mailto:${site.email}`,
  phoneHref: "tel:+17737875028",
  website: "https://donaldmayesministries.com",
  formAcknowledgment:
    "By submitting this form, you acknowledge our Privacy Policy and Terms of Service. SMS participation is governed by our SMS Terms.",
  marketingConsentLabel:
    "I consent to receive marketing text messages, about special offers, discounts, and service updates, from Donald Mayes Ministries LLC at the phone number provided. Message frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.",
  nonMarketingConsentLabels: {
    prayer:
      "I consent to receive non-marketing text messages from Donald Mayes Ministries LLC about prayer request follow-up and requested ministry communications. Message frequency may vary, message & data rates may apply. Text HELP for assistance, reply STOP to opt out.",
    speaking:
      "I consent to receive non-marketing text messages from Donald Mayes Ministries LLC about speaking inquiry follow-up, scheduling, event coordination, and requested service communications. Message frequency may vary, message & data rates may apply. Text HELP for assistance, reply STOP to opt out.",
  },
  mobileNonSharingClause:
    "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
} as const;

export type ComplianceConfig = typeof compliance;
