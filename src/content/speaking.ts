export const speakingTopics = [
  {
    id: "loving-everyone-always",
    title: "Loving Everyone Always",
    body: "What does it really mean to love your neighbor? Pastor Mayes explores how followers of Christ can move beyond simply talking about love and begin demonstrating it through everyday actions.",
  },
  {
    id: "reconciliation-restoration",
    title: "Reconciliation & Restoration",
    body: "A biblical approach to healing relationships, overcoming division, extending grace, and creating opportunities for restoration.",
  },
  {
    id: "crossing-the-lines",
    title: "Crossing the Lines That Divide Us",
    body: "A message about loving people across racial, denominational, cultural, and theological differences while remaining faithful to God.",
  },
  {
    id: "servant-leadership",
    title: "Servant Leadership",
    body: "Leadership isn't simply about having a title. Pastor Mayes teaches leaders how to influence others through humility, service, faithfulness, and genuine care for people.",
  },
  {
    id: "practical-biblical-living",
    title: "Practical Biblical Living",
    body: "How do we take the truths found in Scripture and actually live them? This message helps followers of Christ connect biblical principles with everyday decisions, relationships, and service.",
  },
] as const;

export const speakingAudiences = [
  "Churches",
  "Conferences",
  "Men's Ministries",
  "Leadership Events",
  "Community Organizations",
  "Nonprofits",
  "Schools",
  "Chaplaincy Events",
  "Christian Organizations",
  "Podcasts & Interviews",
] as const;

export const eventTypes = [
  "Church",
  "Conference",
  "Men's Ministry",
  "Leadership Event",
  "Community Organization",
  "Nonprofit",
  "School",
  "Chaplaincy Event",
  "Christian Organization",
  "Podcast or Interview",
  "Other",
] as const;

export const speaking = {
  hero: {
    headline: "Invite Pastor Donald Mayes",
    supporting:
      "Biblical truth. Practical application. A message centered on loving people.",
    body: [
      "For more than 40 years, Pastor Donald Mayes has served churches and communities through preaching, teaching, leadership, mentoring, missions, chaplaincy, and community service.",
      "Today, he brings those experiences together to help audiences understand what it means to live out the love of Christ in everyday life.",
    ],
    cta: {
      href: "#booking",
      label: "Book Pastor Mayes",
    },
    image: {
      slot: "speaking" as const,
      alt: "Forthcoming speaking photograph of Pastor Donald Mayes",
    },
  },
  topics: {
    heading: "Speaking Topics",
    items: speakingTopics,
  },
  audiences: {
    heading: "Who Pastor Mayes Speaks To",
    items: speakingAudiences,
  },
  testimonials: {
    heading: "Testimonials",
    items: [] as ReadonlyArray<{
      quote: string;
      name: string;
      role?: string;
    }>,
  },
  booking: {
    heading: "Bring the Message to Your Community",
    body: "Interested in having Pastor Donald Mayes speak at your church, conference, organization, podcast, or event?",
    supporting:
      "Tell us a little about your event and our team will follow up with you.",
    submitLabel: "Submit Booking Request",
  },
  seo: {
    title: "Invite Pastor Donald Mayes to Speak",
    description:
      "Invite Pastor Donald Mayes to speak on biblical love, reconciliation, restoration, servant leadership, and practical Christian living.",
  },
} as const;

export const speakingTopicOptions = [
  ...speakingTopics.map((topic) => topic.title),
  "To be discussed",
] as const;
