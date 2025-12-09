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

function extractSlugFromLink(link: string): string {
  // Extract slug from URL like https://conduitofvalue.substack.com/p/when-the-throttle-sticks
  const match = link.match(/\/p\/([^/?]+)/)
  return match ? match[1] : ""
}

function parseRSSItem(item: RSSItem): SubstackPost {
  return {
    title: item.title || "",
    slug: extractSlugFromLink(item.link),
    description: item.description || "",
    content: item["content:encoded"] || "",
    pubDate: new Date(item.pubDate),
    imageUrl: item.enclosure?.["@_url"] || null,
    author: item["dc:creator"] || "Saorsa Growth Partners",
    link: item.link || "",
  }
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const response = await fetch(SUBSTACK_FEED_URL, {
      next: { revalidate: 3600 }, // Revalidate every hour
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
