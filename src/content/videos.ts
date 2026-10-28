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
  empty: {
    heading: "Video messages are coming soon.",
    body: "There are no videos available here yet. In the meantime, you can listen to Loving Everyone Always in the audio archive.",
    cta: "Listen to the Podcast",
  },
  watchLabel: "Watch video",
} as const;
