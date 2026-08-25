export const site = {
  name: "Donald Mayes Ministries",
  legalName: "Donald Mayes Ministries LLC",
  pastorName: "Pastor Donald Mayes",
  pastorShortName: "Pastor Mayes",
  motto: "Loving Everyone Always.",
  mission:
    "Donald Mayes Ministries exists to teach followers of Christ how to love people through practical biblical living.",
  missionShort: "Love people through practical biblical living.",
  vision:
    "To cross denominational, racial, and theological lines with God's love through the power of reconciliation and restoration.",
  audienceHeadline: "Our audience is anyone who cares about people.",
  audienceSupport:
    "Donald Mayes Ministries is for people who want their faith to shape the way they treat others.",
  fcl: {
    letters: ["F", "C", "L"] as const,
    phrase: "Faithful. Committed. Loyal.",
    values: [
      {
        letter: "F",
        title: "Faithful to God",
        body: "We seek to honor God and remain faithful to His Word in everything we do.",
      },
      {
        letter: "C",
        title: "Committed to Serving",
        body: "We believe love should be demonstrated through action, compassion, and service.",
      },
      {
        letter: "L",
        title: "Loyal to the Body of Christ",
        body: "We seek unity within the Body of Christ while loving people across denominational, racial, cultural, and theological differences.",
      },
    ],
  },
  copyrightYear: 2026,
  email: "info@donaldmayesministries.com",
  phone: "+1 773-787-5028",
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    youtube: null as string | null,
  },
  assets: {
    logo: "/brand/dmm-logo.png",
    supportingImage: "/images/editorial/sanctuary.png",
    ogDefault: "/opengraph-image",
  },
  photography: {
    hero: "/images/pastor/donald-mayes-speaking.png",
    portrait: "/images/pastor/donald-mayes-headshot.jpg",
  },
  routes: {
    home: "/",
    episodes: "/episodes",
    speaking: "/speaking",
    prayer: "/prayer-requests",
    privacy: "/privacy",
    terms: "/terms",
    smsTerms: "/sms-terms",
    invitePastorMayes: "/invite-pastor-mayes",
    booking: "/speaking#booking",
    prayerCall: "/booking",
    stories: "/#stories",
  },
  podcast: {
    name: "Loving Everyone Always",
    rssUrl: "https://anchor.fm/s/328aea1c/podcast/rss",
  },
} as const;

export const googleTagManager = {
  containerId: "GTM-WQ272CGD",
} as const;

export const highLevelTracking = {
  scriptSrc: "https://link.msgsndr.com/js/external-tracking.js",
  defaultTrackingId: "tk_21e62a71c8824e2bb559ef6c1136f256",
} as const;

export function getHighLevelTrackingId() {
  const fromEnv = process.env.NEXT_PUBLIC_GHL_TRACKING_ID?.trim();
  return fromEnv || highLevelTracking.defaultTrackingId;
}

export type SiteConfig = typeof site;
export type SocialNetwork = keyof typeof site.social;
export type PhotographySlot = keyof typeof site.photography;
