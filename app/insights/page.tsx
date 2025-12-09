import Link from "next/link"
import { ArrowRight, ExternalLink, ChevronRight } from "lucide-react"
import { getSubstackPosts, formatDate } from "@/lib/substack"
import NewsletterSignup from "@/components/newsletter-signup"
import Reveal from "@/components/reveal"
import ScrollProgress from "@/components/scroll-progress"

export const revalidate = 3600 // Revalidate every hour

export default async function InsightsPage() {
  const posts = await getSubstackPosts()

  return (
    <main className="flex flex-col">
      <ScrollProgress />
      <div className="w-full bg-card/80 backdrop-blur-sm border-b border-border">
        <nav
          className="max-w-6xl w-full mx-auto px-4 py-3 text-xs md:text-sm text-foreground/70"
          aria-label="Breadcrumb"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="flex items-center text-foreground/40">
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="text-foreground font-medium">
              Insights
            </li>
          </ol>
        </nav>
      </div>
      {/* Hero */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-secondary/20 via-background to-background">
        <Reveal className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Growth Insights & Perspectives
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Explore our latest thinking on business strategy, growth acceleration, and value creation. Subscribe to The
            Conduit of Value for weekly insights.
          </p>
        </Reveal>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Insights Grid */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12">Latest Insights</h2>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/70">No posts available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <Reveal key={post.slug} delay={0.05 * idx} className="h-full">
                  <Link href={`/insights/${post.slug}`} className="group cursor-pointer h-full flex flex-col">
                    <div className="bg-card rounded-lg border border-border overflow-hidden hover:border-accent/50 transition-all hover-lift h-full flex flex-col">
                      {post.imageUrl && (
                        <div className="relative h-40 md:h-48 overflow-hidden bg-muted">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      {!post.imageUrl && (
                        <div className="relative h-40 md:h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <span className="text-6xl font-bold text-primary/20">S</span>
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-semibold rounded-full">
                            Article
                          </span>
                          <span className="text-xs text-foreground/50">{formatDate(post.pubDate)}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-foreground/70 text-sm mb-4 flex-grow line-clamp-3">{post.description}</p>
                        <div className="flex items-center gap-2 text-primary font-medium text-sm">
                          Read Article
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <a
              href="https://conduitofvalue.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
            >
              View All on Substack
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
