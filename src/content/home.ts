import { site } from "@/config/site";

export const home = {
  hero: {
    eyebrow: site.name,
    headline: site.motto,
    supporting: site.mission,
    primaryCta: {
      href: site.routes.booking,
      label: "Invite Pastor Mayes to Speak",
    },
    secondaryCta: {
      href: site.routes.prayer,
      label: "Submit a Prayer Request",
    },
    image: {
      slot: "hero" as const,
      alt: "Forthcoming portrait of Pastor Donald Mayes",
    },
  },
  meet: {
    heading: "Meet Pastor Donald Mayes",
    paragraphs: [
      "For more than 40 years, Pastor Donald Mayes has served people through ministry, community leadership, mentoring, missions, teaching, and pastoral care.",
      "A graduate of Trinity Evangelical Divinity School, Pastor Mayes has served in numerous ministry and community leadership roles, including pastor, chaplain, missionary, Bible teacher, mentor, board member, and community advocate.",
    ],
    principleLead:
      "Through every role, one principle has remained at the center of his ministry:",
    principle: "Love God by loving people.",
    mottoLead:
      "His personal motto—and the heartbeat of Donald Mayes Ministries—is:",
    motto: site.motto,
    image: {
      alt: "A quiet sanctuary interior with a wooden pulpit and arched windows",
    },
  },
  experience: {
    heading: "40+ Years of Ministry & Community Service",
    items: [
      "Pastor of Worship Community Church",
      "State of Arizona Chaplain",
      "Illinois Teen Challenge Board Member",
      "Springfield Ministerial Alliance Chaplain & President",
      "Springfield Right to Life Chaplain",
      "Springfield NAACP Religious Executive Chairman",
      "Springfield Urban League Male Involvement Presenter",
      "Juvenile Corrections Center Bible Teacher",
      "Hazel Dell School Mentor",
      "Missionary",
      "Hustle PHX Board Member",
      "Servant Leader",
    ],
  },
  mission: {
    heading: "Our Mission",
    body: site.mission,
    supporting: site.missionShort,
  },
  vision: {
    heading: "Our Vision",
    body: site.vision,
  },
  values: {
    heading: "Our Core Values",
    identity: "F. C. L.",
    phrase: site.fcl.phrase,
    items: site.fcl.values,
  },
  whoWeServe: {
    heading: "Who We Serve",
    headline: site.audienceHeadline,
    supporting: site.audienceSupport,
    body: "Whether you are a pastor, ministry leader, church member, community leader, organization, or someone simply trying to live out your faith, Pastor Mayes teaches practical biblical principles for loving and serving people well.",
  },
  speakingPreview: {
    heading: "A Message That Brings People Together",
    body: "Pastor Mayes brings more than four decades of ministry and community leadership experience to churches, conferences, ministries, businesses, nonprofits, and community organizations.",
    supporting:
      "His messages center around biblical love, reconciliation, restoration, servant leadership, and practical Christian living.",
    cta: {
      href: site.routes.speaking,
      label: "Explore Speaking Topics",
    },
  },
  prayerPreview: {
    heading: "How Can We Pray for You?",
    body: "You don't have to walk through life's challenges alone.",
    supporting:
      "Donald Mayes Ministries would be honored to pray with you and for you.",
    cta: {
      href: site.routes.prayer,
      label: "Submit a Prayer Request",
    },
  },
  connect: {
    heading: "Connect With Donald Mayes Ministries",
    body: "The most direct ways to connect right now are to invite Pastor Mayes to speak or to share a prayer request.",
  },
} as const;
