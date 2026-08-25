export const storyCategoryLabels = {
  reconciliation: "Reconciliation",
  restoration: "Restoration",
  transformation: "Transformation",
} as const;

export type StoryCategory = keyof typeof storyCategoryLabels;

export type StoryPlacement = "featured" | "secondary" | "more";

export type Story = {
  slug: string;
  category: StoryCategory;
  name: string;
  descriptor?: string;
  title: string;
  preview: string;
  seoDescription: string;
  body: readonly string[];
  pullQuote?: string;
  placement: StoryPlacement;
};

export const storiesSection = {
  eyebrow: "Real Stories",
  heading: "Stories of Reconciliation, Restoration & Transformation",
  intro:
    "Lives changed through faith, friendship, discipleship, prayer, and the decision to keep moving forward.",
  moreHeading: "Explore More Stories",
  readStoryLabel: "Read Story",
  backLabel: "All stories",
  relatedHeading: "More stories",
} as const;

export const stories: readonly Story[] = [
  {
    slug: "ed",
    category: "reconciliation",
    name: "Ed",
    title: "Learning to Begin Again",
    preview:
      "After 22 years in prison and a past connected to the Aryan Nation, Ed entered a new season of life as a Christian. Through personal Bible study and discipleship with Donald, he began confronting anger, temptation, self-doubt, and what it meant to trust God when his old patterns pulled in another direction.",
    seoDescription:
      "Ed’s story follows a new believer rebuilding life after 22 years in prison through Bible study, discipleship, reconciliation, and faith.",
    body: [
      "After spending 22 years in prison and coming from a background connected to the Aryan Nation, Ed entered a very different season of his life as a new Christian.",
      "Donald began meeting with him personally for Bible study and discipleship. After one particularly difficult day, Ed wrote Donald to say that he had opened his Bible and landed on James 4. The passage gave him a practical way to think about anger, temptation, humility, and trusting God when his thoughts were pulling him elsewhere.",
      "During another Bible study, Donald and Ed were discussing the Samaritan woman at the well and what it means to feel rejected or written off. A young woman nearby overheard the conversation, approached them in tears, and told them she had been struggling deeply and was ready to give up. They stopped the study, prayed with her, and spoke words of affirmation over her.",
    ],
    pullQuote: "Today, right now, I feel recharged and refreshed.",
    placement: "featured",
  },
  {
    slug: "tim-moore",
    category: "reconciliation",
    name: "Tim Moore",
    descriptor: "Executive Director, Springfield Right to Life",
    title: "A Friendship Across Church Traditions",
    preview:
      "Tim Moore's faith has carried him through grief, doubt, marriage, family, and decades of service. His friendship with Donald began when Donald served as chaplain for Springfield Right to Life. Though they came from different church traditions, they built a lasting friendship around faith, encouragement, and service.",
    seoDescription:
      "Tim Moore shares a lifelong journey of faith and a friendship with Pastor Donald Mayes that crossed church traditions through service and encouragement.",
    body: [
      "Tim Moore describes faith as something that has accompanied him from childhood through grief, doubt, marriage, family, service, and decades of Christian life.",
      "His story eventually crossed paths with Donald Mayes when Donald became chaplain for Springfield Right to Life.",
      "Tim is Catholic. Donald came from a different church tradition. Instead of allowing those differences to become barriers, the two became close friends.",
      "Tim attended Donald's church. Donald attended events in Tim's Catholic community. Their families participated in ministry events together, and the two men continued calling and texting one another about family, faith, work, church, and the questions each was carrying.",
      "Their friendship is a practical example of one of Donald Mayes Ministries' central convictions: Christians do not need to erase every difference in order to love, encourage, and serve one another.",
    ],
    placement: "secondary",
  },
  {
    slug: "yolanda-bryant",
    category: "transformation",
    name: "Yolanda Bryant",
    title: "She Said Yes",
    preview:
      "Yolanda Bryant traces a major turning point in her faith to December 2000, when she felt called to take her relationship with God seriously and immediately began serving others. She later met Donald at a back-to-school outreach, where his way of caring for people stood out to her. Donald eventually became one of her spiritual mentors.",
    seoDescription:
      "Yolanda Bryant shares how a turning point in faith led to service, spiritual growth, and mentorship with Pastor Donald Mayes.",
    body: [
      "In December 2000, Yolanda Bryant was walking down Clark Street during her lunch break when she experienced a moment she still remembers clearly: a call to take her relationship with God seriously.",
      "Her first response was service.",
      "She bought Christmas cards and gifts, went to a nursing home, and asked for the names of residents who rarely received visitors. She prepared something for each of them.",
      "Later, through a mutual connection, Yolanda met Donald at his annual back-to-school backpack giveaway. Donald was serving people while using crutches at the event. What caught her attention was not the program itself, but the way he interacted with people.",
      "Donald eventually became one of her spiritual mentors as she developed her own relationship with Christ and continued building a life centered around service.",
    ],
    placement: "secondary",
  },
  {
    slug: "herbert-huyler",
    category: "transformation",
    name: 'Herbert "Herbie" Huyler',
    title: "A Different Life Became Possible",
    preview:
      "Herbert Huyler describes years involving gangs, sexual immorality, substance abuse, and eventually heavy dependence on alcohol. His mother called him every Sunday for roughly two years and continued asking the same question: was he ready to change his life and accept Christ?",
    seoDescription:
      "Herbert Huyler shares his journey from substance abuse to faith, recovery, Scripture study, mentoring, and service to others.",
    body: [
      "Herbert Huyler describes years involving gangs, sexual immorality, substance abuse, and eventually heavy dependence on alcohol.",
      "His mother called him every Sunday for roughly two years and continued asking the same question: was he ready to change his life and accept Christ?",
      "After substance abuse put him in the hospital in 1978, Herbert returned to Chicago. On Christmas Day the following year, he attended church with his mother and committed his life to Christ.",
      "The change was not instantly tidy. The following night he went drinking with old friends and returned devastated by what he had done. At the next church service, he went back to the altar and began again.",
      "Herbert later wrote that he had remained free from substance abuse for more than 17 years at the time of his testimony. He went on to study Scripture, serve as an altar counselor, work with young people, and help others beginning their own faith.",
    ],
    placement: "more",
  },
  {
    slug: "charles-reiffit",
    category: "restoration",
    name: "Charles Reiffit",
    title: "Returning to What Was Planted Early",
    preview:
      "Charles grew up with a praying mother and a strong Pentecostal church community. He also knew Donald Mayes and his family from childhood. As he became older, Charles began making decisions without much thought about the faith he had been raised in.",
    seoDescription:
      "Charles Reiffit reflects on returning to the faith foundation of his childhood and passing that foundation on to his own family.",
    body: [
      "Charles grew up with a praying mother and a strong Pentecostal church community. He also knew Donald Mayes and his family from childhood.",
      "As he became older, Charles began making decisions without much thought about the faith he had been raised in. Some of those decisions took him off course.",
      "What stayed with him was the foundation his mother had given him.",
      "Charles eventually returned to that foundation with a clearer sense that faith had to become his own responsibility. Today, he talks about passing the same foundation to his children—not simply telling them what to believe, but helping them develop their own relationship with God.",
    ],
    placement: "more",
  },
  {
    slug: "jessie-herring",
    category: "transformation",
    name: "Pastor Jessie Herring",
    title: "The Prayer Meeting Changed Her First",
    preview:
      "Pastor Jessie Herring did not initially want to lead a three-hour Friday-night prayer meeting. Friday was her night to go out, and the assignment interfered with the life she was living. She agreed anyway.",
    seoDescription:
      "Pastor Jessie Herring shares how a reluctant prayer meeting became a turning point in her own faith, prayer life, and family.",
    body: [
      "Pastor Jessie Herring did not initially want to lead a three-hour Friday-night prayer meeting. Friday was her night to go out, and the assignment interfered with the life she was living.",
      "She agreed anyway.",
      "Her pastor asked her to create a board containing the names and photographs of people she wanted to see saved, healed, or delivered.",
      "When Jessie arrived at the prayer meeting and looked at the board, she realized she could not honestly pray for everyone else's deliverance without confronting her own life first.",
      "She turned the board over.",
      "For the first half of the meeting, she prayed for herself. She spent the remaining time praying for the people whose names she had brought.",
      "Jessie describes that night as the point when her own faith became real. Her prayers later extended especially toward her brothers, whose lives had been marked by drugs and incarceration.",
    ],
    placement: "more",
  },
  {
    slug: "john-james",
    category: "transformation",
    name: 'John James "JJ"',
    title: "The Second Time, He Answered for Himself",
    preview:
      "John James grew up in church in what is now Ford Heights, Illinois. His mother and grandmother made church, prayer, music, and stories about God's faithfulness part of everyday life. At age twelve, his pastor lined up the young people and asked each whether they wanted to give their lives to Christ.",
    seoDescription:
      "John James “JJ” remembers choosing faith for himself at age twelve and the family foundation that shaped his Christian life.",
    body: [
      "John James grew up in church in what is now Ford Heights, Illinois. His mother and grandmother made church, prayer, music, and stories about God's faithfulness part of everyday life.",
      "At age twelve, his pastor lined up the young people and asked each whether they wanted to give their lives to Christ.",
      "John said no.",
      "His younger sister had answered no before him, and he followed her decision.",
      "The following Sunday, the pastor asked them again.",
      "This time John decided that his answer could not depend on anyone standing beside him.",
      "He said yes.",
      "Decades later, he still identifies that decision as the beginning of the faith that shaped the rest of his life.",
    ],
    placement: "more",
  },
];
