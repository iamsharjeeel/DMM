export const videoMessages = [
  { id: "imwFV8lOKJ8", title: "A Message from Pastor Mayes", source: "Donald Mayes", format: "short" },
  { id: "I_kkuaIC-r8", title: "With All Your Heart, Loving God, Loving People", source: "Abundant Faith Church Online Campus", format: "standard" },
  { id: "zz02NpuEjsM", title: "The Road to Reconciliation - From the Streets of Chicago to Pulpit", source: "Go and Shepherd Podcast With Kimberly Smith", format: "standard" },
  { id: "x8b80Jbn9ho", title: "Praying For YOU!", source: "Donald Mayes", format: "standard" },
] as const;

export type VideoMessage = (typeof videoMessages)[number];

export const videosPage = {
  seo: {
    title: "Video Messages",
    description: "Watch selected teachings, messages, and conversations with Pastor Donald Mayes.",
  },
  eyebrow: "Watch",
  headline: "Video Messages",
  lede: "Messages and conversations with Pastor Donald Mayes, shared from YouTube.",
  shortLabel: "Featured Short",
  messagesLabel: "Messages & Conversations",
  channelUrl: "https://www.youtube.com/@donaldmayes9857",
  channelCta: "Visit the YouTube Channel",
  listenCta: "Listen to the Podcast",
} as const;
