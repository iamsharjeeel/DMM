import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RSS_URL = "https://anchor.fm/s/328aea1c/podcast/rss";
const DEFAULT_TITLE = "After Easter Now What?";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "src", "content", "episodes.catalogue.json");

function decodeEntities(value) {
  let text = value;
  for (let i = 0; i < 2; i += 1) {
    text = text
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
        String.fromCodePoint(Number.parseInt(hex, 16)),
      )
      .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
      .replace(/&nbsp;/gi, " ")
      .replace(/&apos;/gi, "'")
      .replace(/&quot;/gi, '"')
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&amp;/gi, "&");
  }
  return text;
}

function inner(block, name) {
  const cdata = block.match(
    new RegExp(`<${name}(?:\\s[^>]*)?>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`),
  );
  if (cdata) {
    return decodeEntities(cdata[1]).trim();
  }
  const plain = block.match(
    new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`),
  );
  return plain ? decodeEntities(plain[1]).trim() : "";
}

function attr(block, name, attribute) {
  const match = block.match(
    new RegExp(`<${name}\\b[^>]*\\b${attribute}="([^"]+)"`),
  );
  return match ? decodeEntities(match[1]) : "";
}

function stripMarkup(value) {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/---?\s*Support this podcast.*$/i, "")
    .trim();
}

function parseDuration(value) {
  if (!value) {
    return 0;
  }
  if (/^\d+(\.\d+)?$/.test(value)) {
    return Math.round(Number(value));
  }
  const parts = value.split(":").map((part) => Number(part));
  if (parts.some((part) => Number.isNaN(part))) {
    return 0;
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
  }
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function compareEpisodes(a, b) {
  const date = a.publishedAt.localeCompare(b.publishedAt);
  if (date !== 0) {
    return date;
  }
  const title = a.title.localeCompare(b.title, "en");
  if (title !== 0) {
    return title;
  }
  return a.id.localeCompare(b.id);
}

function parseItems(xml) {
  const channel = xml.match(/<channel>([\s\S]*?)<item>/)?.[1] ?? xml;
  const imageUrl =
    attr(channel, "itunes:image", "href") ||
    inner(channel, "url") ||
    "";

  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => {
    const block = match[1];
    const publishedAt = new Date(inner(block, "pubDate")).toISOString();
    const durationSeconds = parseDuration(inner(block, "itunes:duration"));
    const seasonRaw = inner(block, "itunes:season");
    const episodeRaw = inner(block, "itunes:episode");
    const season = seasonRaw ? Number(seasonRaw) : null;
    const episode = episodeRaw ? Number(episodeRaw) : null;

    return {
      id: inner(block, "guid"),
      title: stripMarkup(inner(block, "title")),
      description: stripMarkup(
        inner(block, "itunes:summary") || inner(block, "description"),
      ),
      publishedAt,
      year: new Date(publishedAt).getUTCFullYear(),
      durationSeconds,
      durationLabel: formatDuration(durationSeconds),
      url: inner(block, "link"),
      audioUrl: attr(block, "enclosure", "url"),
      imageUrl: attr(block, "itunes:image", "href") || imageUrl,
      season: Number.isFinite(season) ? season : null,
      episode: Number.isFinite(episode) ? episode : null,
    };
  });

  return {
    title: stripMarkup(inner(channel, "title")),
    author: stripMarkup(inner(channel, "itunes:author") || inner(channel, "author")),
    link: inner(channel, "link"),
    imageUrl,
    items,
  };
}

const response = await fetch(RSS_URL, {
  headers: {
    Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
  },
});

if (!response.ok) {
  throw new Error(`RSS request failed: ${response.status} ${response.statusText}`);
}

const xml = await response.text();
if (!xml.includes("<rss") || !xml.includes("<item>")) {
  throw new Error("RSS response did not contain episode items.");
}

const parsed = parseItems(xml);
const chronological = [...parsed.items].sort(compareEpisodes);
const episodes = chronological.map((episode, index) => ({
  ...episode,
  archiveNumber: index + 1,
}));

const missing = episodes.filter(
  (episode) =>
    !episode.id ||
    !episode.title ||
    !episode.publishedAt ||
    !episode.url ||
    !episode.audioUrl,
);
if (missing.length > 0) {
  throw new Error(`RSS import missing required fields on ${missing.length} episode(s).`);
}

const years = [...new Set(episodes.map((episode) => episode.year))].sort(
  (a, b) => a - b,
);
const seasons = [
  ...new Set(
    episodes
      .map((episode) => episode.season)
      .filter((season) => typeof season === "number"),
  ),
].sort((a, b) => a - b);

const defaultEpisode =
  episodes.find((episode) => episode.title === DEFAULT_TITLE) ??
  [...episodes].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];

const catalogue = {
  importedAt: new Date().toISOString(),
  source: {
    rssUrl: RSS_URL,
    title: parsed.title,
    author: parsed.author,
    link: parsed.link,
    imageUrl: parsed.imageUrl,
  },
  episodeCount: episodes.length,
  yearStart: years[0],
  yearEnd: years[years.length - 1],
  defaultEpisodeId: defaultEpisode.id,
  seasons,
  years,
  episodes,
};

writeFileSync(outFile, `${JSON.stringify(catalogue, null, 2)}\n`, "utf8");

console.log(
  `Imported ${episodes.length} episodes → ${outFile.replace(`${root}\\`, "").replace(`${root}/`, "")}`,
);
console.log(`Default episode: ${defaultEpisode.title}`);
