export type VideoMessage = {
  title: string;
  url: string;
  description?: string;
};

export const videoMessages: readonly VideoMessage[] = [];

export const videosPage = {
  seo: {
    title: "Video Messages",
    description: "Watch video messages and biblical teaching from Pastor Donald Mayes as they become available.",
  },
  eyebrow: "Watch",
  headline: "Video Messages",
  lede: "A home for video messages and teaching from Pastor Donald Mayes.",
  channelUrl: "https://www.youtube.com/@donaldmayes9857",
  empty: {
    heading: "Explore Pastor Mayes on YouTube.",
    body: "Visit the YouTube channel to watch available messages. Individual videos will be featured here once their links and details are verified.",
    channelCta: "Visit YouTube Channel",
    cta: "Listen to the Podcast",
  },
  watchLabel: "Watch video",
} as const;
