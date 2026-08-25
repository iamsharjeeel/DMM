import { site } from "../config/site";
import { speakingAudiences, speakingTopics } from "./speaking";

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
  cta: "Tell Us About Your Event",
  submitLabel: "Send Speaking Request",
  visitLabel: "Visit Donald Mayes Ministries",
  seo: {
    title: "Invite Pastor Donald Mayes to Speak",
    description:
      "Invite Pastor Donald Mayes to speak at your church, conference, ministry, leadership event, community organization, school, or podcast.",
  },
  hero: {
    eyebrow: "For churches, ministries & community events",
    headline:
      "Invite Pastor Donald Mayes to speak about faith that shows up in how we treat people.",
    body: "For more than 40 years, Pastor Mayes has served churches and communities through preaching, chaplaincy, mentoring, missions, teaching, and pastoral care. He speaks from Scripture and connects it to the choices people make after the event is over.",
    microcopy: "A date can be tentative. Start with what you know.",
    imageAlt: "Pastor Donald Mayes speaking from a pulpit",
    credibility: [
      "40+ years of ministry & community service",
      "Trinity Evangelical Divinity School graduate",
      "Pastor and chaplain",
      "Missionary, Bible teacher, mentor, and community advocate",
    ],
  },
  form: {
    heading: "Tell us about your event",
    support: "A few details are enough to start.",
    timeframePlaceholder:
      "Example: October 2026, Spring 2027, or still deciding",
    locationPlaceholder: "City, state, or virtual",
    notesLabel: "Anything else we should know?",
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
  experience: {
    eyebrow: "Experience",
    heading: "More than four decades in ministry and community service",
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
    lead: "The principle at the center of his ministry:",
    quote: "Love God by loving people.",
    supporting:
      "His personal motto and the heartbeat of Donald Mayes Ministries is “Loving Everyone Always.”",
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
          "The speaking request can indicate an in-person or virtual format. Share the format you are considering and any location details you already have.",
      },
      {
        question: "Can we request a specific topic?",
        answer:
          "Yes. You can select one of Pastor Mayes' current speaking topics or choose “To be discussed” if you want to begin with the purpose of the event.",
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
  },
} as const;

export type SpeakingLeadFormat = (typeof speakingLeadFormats)[number];
