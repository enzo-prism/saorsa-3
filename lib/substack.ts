import { XMLParser } from "fast-xml-parser"

export interface SubstackPost {
  title: string
  slug: string
  description: string
  content: string
  pubDate: Date
  imageUrl: string | null
  author: string
  link: string
}

interface RSSItem {
  title: string
  description: string
  link: string
  guid: string
  "dc:creator": string
  pubDate: string
  enclosure?: {
    "@_url": string
    "@_type": string
  }
  "content:encoded": string
}

interface RSSFeed {
  rss: {
    channel: {
      item: RSSItem | RSSItem[]
    }
  }
}

const SUBSTACK_FEED_URL = "https://conduitofvalue.substack.com/feed"
const SUBSTACK_REVALIDATE_SECONDS = 900

const NAMED_ENTITY_CODE_POINTS: Record<string, number> = {
  amp: 38,
  lt: 60,
  gt: 62,
  quot: 34,
  apos: 39,
  nbsp: 32,
  rsquo: 0x2019,
  lsquo: 0x2018,
  rdquo: 0x201d,
  ldquo: 0x201c,
  ndash: 0x2013,
  mdash: 0x2014,
  hellip: 0x2026,
}

function decodeHtmlEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity[0] === "#") {
      const isHex = entity[1]?.toLowerCase() === "x"
      const number = parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10)
      if (Number.isNaN(number)) return match
      return String.fromCodePoint(number)
    }

    const codePoint = NAMED_ENTITY_CODE_POINTS[entity.toLowerCase()]
    return typeof codePoint === "number" ? String.fromCodePoint(codePoint) : match
  })
}

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, " ")
}

function cleanText(value: string): string {
  if (!value) return ""
  const withoutTags = stripHtmlTags(value)
  const decoded = decodeHtmlEntities(withoutTags)
  return decoded.replace(/\s+/g, " ").trim()
}

function extractSlugFromLink(link: string): string {
  // Extract slug from URL like https://conduitofvalue.substack.com/p/when-the-throttle-sticks
  const match = link.match(/\/p\/([^/?]+)/)
  return match ? match[1] : ""
}

function parseRSSItem(item: RSSItem): SubstackPost {
  return {
    title: cleanText(item.title || ""),
    slug: extractSlugFromLink(item.link),
    description: cleanText(item.description || ""),
    content: item["content:encoded"] || "",
    pubDate: new Date(item.pubDate),
    imageUrl: item.enclosure?.["@_url"] || null,
    author: cleanText(item["dc:creator"] || "Saorsa Growth Partners"),
    link: item.link || "",
  }
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const response = await fetch(SUBSTACK_FEED_URL, {
      next: { revalidate: SUBSTACK_REVALIDATE_SECONDS },
    })

    if (!response.ok) {
      console.error("Failed to fetch Substack feed:", response.status)
      return []
    }

    const xml = await response.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    })

    const feed: RSSFeed = parser.parse(xml)
    const items = feed.rss?.channel?.item

    if (!items) {
      return []
    }

    // Handle both single item and array of items
    const itemArray = Array.isArray(items) ? items : [items]

    const posts = itemArray.map(parseRSSItem)

    // Sort by date, newest first
    return posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
  } catch (error) {
    console.error("Error fetching Substack posts:", error)
    return []
  }
}

export async function getSubstackPost(slug: string): Promise<SubstackPost | null> {
  const posts = await getSubstackPosts()
  return posts.find((post) => post.slug === slug) || null
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}
