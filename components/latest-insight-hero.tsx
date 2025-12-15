import Link from "next/link"
import { ArrowRight, Lightbulb } from "lucide-react"
import { getSubstackPosts } from "@/lib/substack"

const NEW_THRESHOLD_DAYS = 14

function formatCompactDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export default async function LatestInsightHero() {
  const posts = await getSubstackPosts()
  const latest = posts[0]

  if (!latest?.slug) return null

  const publishedAt = latest.pubDate.getTime()
  const hasValidDate = Number.isFinite(publishedAt)
  const ageMs = hasValidDate ? Date.now() - publishedAt : Number.NaN
  const isNew = Number.isFinite(ageMs) && ageMs >= 0 && ageMs <= 1000 * 60 * 60 * 24 * NEW_THRESHOLD_DAYS

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Link
        href={`/insights/${latest.slug}`}
        aria-label={`Read the latest Insight: ${latest.title}`}
        className="group relative block overflow-hidden rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm px-4 py-3 text-left shadow-sm transition-colors hover:border-accent/60 hover:bg-card/70 hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Lightbulb size={18} aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-foreground/70">
              <span className="inline-flex items-center rounded-full border border-border/70 bg-background/40 px-2 py-0.5 font-semibold text-foreground/80">
                Latest Insight
              </span>
              {isNew && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">
                  New
                </span>
              )}
              {hasValidDate && (
                <time dateTime={latest.pubDate.toISOString()} className="text-foreground/60">
                  {formatCompactDate(latest.pubDate)}
                </time>
              )}
            </div>

            <div className="mt-1 flex items-center gap-2">
              <p className="min-w-0 flex-1 text-sm sm:text-base font-semibold text-foreground line-clamp-2 sm:line-clamp-1 group-hover:text-primary transition-colors">
                {latest.title}
              </p>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="shrink-0 text-foreground/50 transition-transform group-hover:text-primary group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
