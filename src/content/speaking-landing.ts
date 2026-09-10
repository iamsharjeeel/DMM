import { site } from "../config/site";
import { speaking, speakingAudiences, speakingTopics } from "./speaking";

export const speakingLeadFormats = [
  "In person",
  "Virtual",
  "Either",
  "Not sure yet",
] as const;

export const speakingLandingTopics = [
  {
    id: speakingTopics[0].id,
    title: speakingTopics[0].title,
    body: "What it means to love your neighbor beyond words, and how that love shows up in ordinary choices.",
  },
  {
    id: speakingTopics[1].id,
    title: speakingTopics[1].title,
    body: "A biblical approach to damaged relationships, division, grace, and the work of restoration.",
  },
  {
    id: speakingTopics[2].id,
    title: speakingTopics[2].title,
    body: "Loving people across racial, denominational, cultural, and theological differences while remaining faithful to God.",
  },
  {
    id: speakingTopics[3].id,
    title: speakingTopics[3].title,
    body: "Leadership shaped by humility, service, faithfulness, and care for people.",
  },
  {
    id: speakingTopics[4].id,
    title: speakingTopics[4].title,
    body: "Connecting Scripture with everyday decisions, relationships, leadership, and service.",
  },
] as const;

export const speakingLanding = {
  path: site.routes.invitePastorMayes,
  formId: "speaking-meta-lead",
  formAnchor: "speaking-request",
  topicsAnchor: "speaking-topics",
  cta: "Tell Us About Your Event",
  submitLabel: "Send Speaking Request",
  visitLabel: "Visit Donald Mayes Ministries",
  seo: {
    title: "Invite Pastor Donald Mayes to Speak",
    description:
      "Invite Pastor Donald Mayes to speak at your church, conference, ministry, leadership event, community organization, school, or podcast.",
  },
  hero: {
    eyebrow: "Invite Pastor Donald Mayes",
    headline:
      "Invite Pastor Donald Mayes to speak about faith that shows up in how we treat people.",
    headlineLines: [
      "Invite Pastor Donald Mayes",
      "to speak about faith that shows up",
      "in how we treat people.",
    ],
    body: "For more than 40 years, Pastor Mayes has served churches and communities through preaching, chaplaincy, mentoring, missions, teaching, and pastoral care. He speaks from Scripture and connects it to the choices people make after the event is over.",
    exploreLabel: "Explore speaking topics",
    imageAlt: "Pastor Donald Mayes speaking from a pulpit",
    imageCaption: "Pastor Donald Mayes",
    credibility:
      "40+ Years in Ministry · Pastor · Chaplain · Teacher · Community Leader",
  },
  authority: [
    "40+ Years of Ministry & Community Service",
    "Trinity Evangelical Divinity School",
    "Pastor & Chaplain",
    "Missionary · Teacher · Mentor",
  ],
  form: {
    eyebrow: "Start the conversation",
    heading: "Tell us about your event",
    support: "A few details are enough to start.",
    nameLabel: "Name",
    organizationLabel: "Church / Organization",
    emailLabel: "Email",
    phoneLabel: "Phone",
    eventTypeLabel: "Type of Event",
    detailsLabel: "Tell us about your event",
    detailsHint:
      "Include the approximate date, location, audience, or topic if you already know them.",
    confirmation: {
      heading: "Thanks. Your speaking request has been sent.",
      body: "The Donald Mayes Ministries team will review the details and follow up using the contact information you provided.",
    },
  },
  message: {
    eyebrow: "The message",
    heading: "Faith gets practical when people have to live it.",
    body: "Pastor Mayes speaks about love, reconciliation, leadership, and the way Christians treat people across differences. His teaching stays close to Scripture and to the situations people face at home, in church, at work, and in their communities.",
    supporting:
      "The message stays useful after the event because it deals with decisions, relationships, service, and the way faith shapes everyday conduct.",
  },
  topics: {
    eyebrow: "Speaking topics",
    heading: "What Pastor Mayes speaks about",
    items: speakingLandingTopics,
  },
  atmosphere: {
    eyebrow: "Event context",
    heading: "Where Pastor Mayes speaks",
    alt: speaking.hero.image.alt,
    caption:
      "Churches, conferences, leadership events, community organizations, schools, and podcasts.",
  },
  experience: {
    eyebrow: "Experience",
    heading: "More than four decades in ministry and community service.",
    body: "Pastor Mayes has served in church leadership, chaplaincy, mentoring, missions, Bible teaching, and community organizations. Those roles give him decades of ministry experience to draw from when he speaks.",
    items: [
      "Pastor of Worship Community Church",
      "State of Arizona Chaplain",
      "Springfield Ministerial Alliance Chaplain & President",
      "Springfield Right to Life Chaplain",
      "Springfield NAACP Religious Executive Chairman",
      "Juvenile Corrections Center Bible Teacher",
      "Hazel Dell School Mentor",
      "Hustle PHX Board Member",
    ],
  },
  principle: {
    lead: "The principle at the center of his ministry",
    quoteLines: ["Love God", "by loving people."],
    quote: "Love God by loving people.",
    motto: site.motto,
  },
  eventFit: {
    eyebrow: "Event fit",
    heading: "Where Pastor Mayes speaks",
    items: speakingAudiences,
  },
  expectation: {
    heading: "A message built for the purpose of the event",
    body: "Pastor Mayes teaches from Scripture in plain language and draws from decades of ministry and community experience. The goal is to connect biblical principles with the decisions, relationships, and responsibilities people carry into everyday life.",
    supporting:
      "You can request a specific speaking topic or start with the purpose of your event. If the date or message is still being worked out, send what you know and the conversation can continue from there.",
  },
  faq: {
    heading: "Questions",
    items: [
      {
        question: "What kinds of events can we inquire about?",
        answer:
          "Speaking requests can be submitted for churches, conferences, men's ministries, leadership events, community organizations, nonprofits, schools, chaplaincy events, Christian organizations, podcasts, and interviews.",
      },
      {
        question: "Does Pastor Mayes speak in person and virtually?",
        answer:
          "Share whether you are considering an in-person or virtual format, along with any location details you already have.",
      },
      {
        question: "Can we request a specific topic?",
        answer:
          "Yes. You can mention one of Pastor Mayes' current speaking topics, or begin with the purpose of the event.",
      },
      {
        question: "Can we inquire before the date is final?",
        answer:
          "Yes. A tentative date, season, or general timeframe is enough to begin the inquiry.",
      },
      {
        question: "What happens after we submit the form?",
        answer:
          "Your request is sent to Donald Mayes Ministries. The team will review the information and follow up using the contact details you provided.",
      },
    ],
  },
  closer: {
    heading: "Tell us what you're planning.",
    body: "A few details are enough to start. If the date, location, or topic is still being worked out, share what you know.",
    reassurance: "A tentative date is enough to start.",
  },
} as const;

export type SpeakingLeadFormat = (typeof speakingLeadFormats)[number];
