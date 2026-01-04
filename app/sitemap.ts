import type { MetadataRoute } from "next"
import { getSubstackPosts } from "@/lib/substack"

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

const STATIC_PATHS = ["", "/partners", "/guiding-principles", "/contact", "/insights"]

export const revalidate = 900

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: new URL(path, BASE_URL).toString(),
  }))

  const posts = await getSubstackPosts()
  const postEntries = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: new URL(`/insights/${post.slug}`, BASE_URL).toString(),
      lastModified: post.pubDate,
    }))

  return [...staticEntries, ...postEntries]
}
