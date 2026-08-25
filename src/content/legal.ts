import { compliance } from "@/config/compliance";
import { site } from "@/config/site";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "dl"; items: readonly { term: string; definition: string }[] }
  | { type: "contact" };

export type LegalDocument = {
  title: string;
  effectiveDate: string;
  programOperator: string;
  programName?: string;
  intro?: string;
  sections: readonly {
    heading: string;
    blocks: readonly LegalBlock[];
  }[];
};

const effectiveDate = "August 26, 2026";

const privacy: LegalDocument = {
  title: "Privacy Policy",
  effectiveDate,
  programOperator: compliance.legalName,
  intro: `This Privacy Policy describes how ${compliance.legalName} collects, uses, shares, and protects personal information in connection with ${compliance.website} and related ministry communications.`,
  sections: [
    {
      heading: "Mobile information and SMS",
      blocks: [
        {
          type: "p",
          text: compliance.mobileNonSharingClause,
        },
        {
          type: "p",
          text: `${compliance.legalName} does not sell leads, buy leads, rent mobile lists, or share SMS opt-in data or consent with affiliates or other parties for marketing or promotional purposes.`,
        },
      ],
    },
    {
      heading: "Who we are",
      blocks: [
        {
          type: "p",
          text: `${compliance.legalName} operates the Donald Mayes Ministries website and related ministry communications. This policy applies to information processed through the website and through the ministry's communication services.`,
        },
      ],
    },
    {
      heading: "Information you provide",
      blocks: [
        {
          type: "p",
          text: "Depending on how you use the website, you may provide:",
        },
        {
          type: "ul",
          items: [
            "name",
            "email address",
            "phone number",
            "prayer request content",
            "prayer follow-up preferences",
            "speaking inquiry details, including event information",
            "communication preferences",
            "general contact permission",
            "marketing SMS consent",
            "non-marketing SMS consent",
            "the method or source of SMS consent",
            "the date and time of SMS consent where captured",
          ],
        },
        {
          type: "p",
          text: "The website does not collect membership account data, fitness or medical data, or payment card numbers.",
        },
      ],
    },
    {
      heading: "Information collected automatically",
      blocks: [
        {
          type: "p",
          text: "When you visit the website, hosting, security, and related systems may process standard technical information such as IP address, browser and device information, requested pages, referring information, and server request data.",
        },
        {
          type: "p",
          text: "The website currently uses Vercel for hosting, HighLevel for ministry follow-up and external tracking of website activity, and Google Tag Manager as tag-management infrastructure. Additional measurement or advertising tags, if any, would be configured inside that container. This policy does not claim that Google Analytics or advertising tracking is active solely because Google Tag Manager is installed.",
        },
      ],
    },
    {
      heading: "How information is used",
      blocks: [
        {
          type: "p",
          text: `${compliance.legalName} may use personal information to:`,
        },
        {
          type: "ul",
          items: [
            "respond to prayer requests",
            "provide ministry follow-up when requested",
            "process speaking inquiries",
            "coordinate events and speaking requests",
            "send requested communications",
            "send transactional or service SMS only where SMS consent permits",
            "send marketing SMS only when separately consented to",
            "administer and secure the website",
            "understand website performance through analytics or related infrastructure where used",
            "meet legal and compliance obligations",
            "maintain SMS opt-out and suppression records",
          ],
        },
      ],
    },
    {
      heading: "Information sharing",
      blocks: [
        {
          type: "p",
          text: `${compliance.legalName} does not sell personal information.`,
        },
        {
          type: "p",
          text: "Personal information may be processed by service providers needed to operate requested website and ministry services, including website hosting, CRM infrastructure, HighLevel, telecommunications carriers, SMS delivery providers or aggregators, and tag-management or analytics infrastructure.",
        },
        {
          type: "p",
          text: compliance.mobileNonSharingClause,
        },
        {
          type: "p",
          text: "SMS opt-in data and consent are not made available for unrelated third-party marketing.",
        },
      ],
    },
    {
      heading: "Retention",
      blocks: [
        {
          type: "p",
          text: "Information may be retained only for as long as reasonably necessary to respond to ministry requests, provide requested services, maintain business records, satisfy compliance requirements, prevent abuse or security problems, document communication consent, and honor opt-out or suppression requests.",
        },
      ],
    },
    {
      heading: "Security",
      blocks: [
        {
          type: "p",
          text: `${compliance.legalName} uses reasonable technical and administrative safeguards appropriate to this website, including HTTPS/TLS where used by the website and access controls where applicable. No online system can guarantee absolute security.`,
        },
      ],
    },
    {
      heading: "Children",
      blocks: [
        {
          type: "p",
          text: "This website is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided personal information, contact us using the details below and we will review the request.",
        },
      ],
    },
    {
      heading: "Privacy rights",
      blocks: [
        {
          type: "p",
          text: "Subject to applicable law, you may have rights to request access to, correction of, or deletion of certain personal information.",
        },
        {
          type: "p",
          text: `Where applicable under law, you may send privacy requests to [${compliance.email}](${compliance.emailHref}).`,
        },
      ],
    },
    {
      heading: "SMS and mobile communications",
      blocks: [
        {
          type: "p",
          text: "SMS communication is based on documented affirmative consent. Marketing SMS consent and non-marketing SMS consent are separate decisions. Providing a phone number, submitting a form, requesting follow-up, or granting general contact permission does not by itself constitute SMS consent.",
        },
        {
          type: "p",
          text: "Phone numbers are not sold. SMS consent records are not sold. Mobile data is not shared for unrelated third-party marketing. SMS providers and carriers may process information needed to deliver messages. Message frequency varies. Message and data rates may apply. You may opt out as described in the [SMS Terms](/sms-terms).",
        },
      ],
    },
    {
      heading: "Changes",
      blocks: [
        {
          type: "p",
          text: "This Privacy Policy may be updated from time to time. The effective date above will be revised when a change is published.",
        },
      ],
    },
    {
      heading: "Contact",
      blocks: [{ type: "contact" }],
    },
  ],
};

const terms: LegalDocument = {
  title: "Terms of Service",
  effectiveDate,
  programOperator: compliance.legalName,
  intro: `These Terms of Service govern use of the Donald Mayes Ministries website operated by ${compliance.legalName}. By using the website, you agree to these Terms.`,
  sections: [
    {
      heading: "The website and ministry services",
      blocks: [
        {
          type: "p",
          text: `${site.name} provides ministry information, biblical and ministry content, Loving Everyone Always audio content, Stories of Reconciliation, Restoration & Transformation, speaking information, speaking inquiries, prayer requests, and ministry communication or follow-up.`,
        },
        {
          type: "p",
          text: `Support is available at [${compliance.email}](${compliance.emailHref}) and [${compliance.phone}](${compliance.phoneHref}).`,
        },
      ],
    },
    {
      heading: "User responsibilities",
      blocks: [
        {
          type: "p",
          text: "When using the website, you agree to:",
        },
        {
          type: "ul",
          items: [
            "provide accurate information when submitting forms",
            "not misuse website functionality",
            "not attempt unauthorized access",
            "not submit unlawful or abusive content",
            "respect website and ministry intellectual property",
            "comply with applicable law",
          ],
        },
      ],
    },
    {
      heading: "Ministry communications",
      blocks: [
        {
          type: "p",
          text: "Website content, prayer interaction, and form submissions do not automatically create a medical relationship, legal relationship, professional counseling relationship, or church membership relationship. Prayer requests are ministry communications. The website does not promise emergency-response availability.",
        },
        {
          type: "p",
          text: "Submitting a speaking inquiry does not create a speaking engagement or other commitment.",
        },
      ],
    },
    {
      heading: "SMS communications",
      blocks: [
        {
          type: "p",
          text: `${compliance.legalName} is the sender of the Donald Mayes Ministries Messaging Program.`,
        },
        {
          type: "p",
          text: "If you provide affirmative SMS consent, you may receive non-marketing or service messages such as prayer request follow-up, requested ministry follow-up, speaking inquiry follow-up, speaking scheduling, event coordination, and other requested service communications.",
        },
        {
          type: "p",
          text: "Marketing messages, such as ministry updates, event announcements, content announcements, and other ministry promotional communications consistent with the registered campaign, are sent only where you separately and affirmatively opt in. Not every user receives marketing messages.",
        },
        {
          type: "p",
          text: "SMS consent is not a condition of receiving ministry services. SMS consent can be withdrawn. Message frequency varies. Message and data rates may apply.",
        },
        {
          type: "p",
          text: `You can cancel the SMS service at any time. Just text "STOP" to ${compliance.phone}. After you send the SMS message "STOP" to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, just sign up as you did the first time and we will start sending SMS messages to you again. If you are experiencing issues with the messaging program you can reply with the keyword HELP for more assistance, or you can get help directly at [${compliance.email}](${compliance.emailHref}) or [${compliance.phone}](${compliance.phoneHref}).`,
        },
        {
          type: "p",
          text: "Carriers are not liable for delayed or undelivered messages.",
        },
        {
          type: "p",
          text: `As always, message and data rates may apply for any messages sent to you from us and to us from you. You will receive messages at a varying frequency. If you have any questions about your text plan or data plan, it is best to contact your wireless provider.`,
        },
        {
          type: "p",
          text: `If you have any questions regarding privacy, please read our privacy policy: [Privacy Policy](/privacy). Additional SMS details are in the [SMS Terms](/sms-terms).`,
        },
      ],
    },
    {
      heading: "Intellectual property",
      blocks: [
        {
          type: "p",
          text: `The Donald Mayes Ministries brand, official logo, website content, written ministry content, audio and podcast content where ${compliance.legalName} owns the rights, and other ministry materials are owned by ${compliance.legalName} or used with permission. You may not copy the site in a way that misrepresents Pastor Mayes, the ministry, or the source of the material. These Terms do not claim ownership of third-party content.`,
        },
      ],
    },
    {
      heading: "Limitation",
      blocks: [
        {
          type: "p",
          text: "The website is provided as-is for informational and ministry purposes. Donald Mayes Ministries does not warrant uninterrupted availability. These Terms do not limit liability where the law does not allow it.",
        },
      ],
    },
    {
      heading: "Changes",
      blocks: [
        {
          type: "p",
          text: "These Terms may be updated from time to time. The effective date above will be revised when a change is published.",
        },
      ],
    },
    {
      heading: "Contact",
      blocks: [{ type: "contact" }],
    },
  ],
};

const smsTerms: LegalDocument = {
  title: "SMS Messaging Terms",
  effectiveDate,
  programOperator: compliance.legalName,
  programName: compliance.programName,
  intro: `These SMS Messaging Terms govern the ${compliance.programName} operated by ${compliance.legalName}. Support is available at [${compliance.email}](${compliance.emailHref}) and [${compliance.phone}](${compliance.phoneHref}).`,
  sections: [
    {
      heading: "Mobile information",
      blocks: [
        {
          type: "p",
          text: compliance.mobileNonSharingClause,
        },
      ],
    },
    {
      heading: "Program description",
      blocks: [
        {
          type: "p",
          text: "Non-marketing messages may include prayer request follow-up, requested ministry follow-up, speaking inquiry follow-up, speaking scheduling, event coordination, and requested service communication.",
        },
        {
          type: "p",
          text: "Where separately consented, marketing messages may include ministry updates, ministry announcements, event announcements, new content announcements, and promotional ministry communications consistent with the registered campaign.",
        },
      ],
    },
    {
      heading: "Consent",
      blocks: [
        {
          type: "p",
          text: "SMS is sent only after affirmative documented opt-in. Consent may be obtained through a clearly labeled website checkbox or other documented affirmative consent methods used by the ministry.",
        },
        {
          type: "p",
          text: "Consent must be affirmative, specific, documented, not bundled, and not preselected. Marketing and non-marketing consent are separate. Consent is not required to submit a ministry request or receive non-SMS services.",
        },
      ],
    },
    {
      heading: "Opt out",
      blocks: [
        {
          type: "p",
          text: "You may opt out by replying with a recognized stop keyword, including STOP, CANCEL, UNSUBSCRIBE, QUIT, END, or OPT-OUT.",
        },
        {
          type: "p",
          text: `You may also request support or opt-out assistance by emailing [${compliance.email}](${compliance.emailHref}).`,
        },
      ],
    },
    {
      heading: "Help",
      blocks: [
        {
          type: "p",
          text: `Reply HELP for assistance. You may also contact [${compliance.email}](${compliance.emailHref}) or [${compliance.phone}](${compliance.phoneHref}).`,
        },
      ],
    },
    {
      heading: "Message frequency",
      blocks: [
        {
          type: "p",
          text: "Message frequency varies.",
        },
      ],
    },
    {
      heading: "Rates",
      blocks: [
        {
          type: "p",
          text: "Message and data rates may apply. Carrier pricing is controlled by the subscriber's wireless provider.",
        },
      ],
    },
    {
      heading: "Carrier disclaimer",
      blocks: [
        {
          type: "p",
          text: "Carriers are not liable for delayed or undelivered messages.",
        },
      ],
    },
    {
      heading: "Privacy",
      blocks: [
        {
          type: "p",
          text: "Phone numbers are not sold. SMS consent records are not sold. Opt-in data is not used for unrelated third-party marketing. Telecommunications and SMS providers may process necessary data to deliver messages. Suppression and opt-out information may be retained for compliance.",
        },
        {
          type: "p",
          text: "See the [Privacy Policy](/privacy).",
        },
      ],
    },
    {
      heading: "Program summary",
      blocks: [
        {
          type: "dl",
          items: [
            {
              term: "Program Name",
              definition: compliance.programName,
            },
            {
              term: "Operated By",
              definition: compliance.legalName,
            },
            {
              term: "Opt Out",
              definition: "STOP, CANCEL, UNSUBSCRIBE, QUIT, END, OPT-OUT",
            },
            {
              term: "Help",
              definition: "HELP",
            },
            {
              term: "Message Frequency",
              definition: "Varies",
            },
            {
              term: "Carrier Charges",
              definition: "Message and data rates may apply",
            },
            {
              term: "Support Email",
              definition: `[${compliance.email}](${compliance.emailHref})`,
            },
            {
              term: "Support Phone",
              definition: `[${compliance.phone}](${compliance.phoneHref})`,
            },
            {
              term: "Privacy",
              definition: "[Privacy Policy](/privacy)",
            },
            {
              term: "SMS Terms",
              definition: "[SMS Messaging Terms](/sms-terms)",
            },
            {
              term: "Terms",
              definition: "[Terms of Service](/terms)",
            },
          ],
        },
      ],
    },
    {
      heading: "Contact",
      blocks: [{ type: "contact" }],
    },
  ],
};

export const legal = {
  privacy,
  terms,
  smsTerms,
} as const;
