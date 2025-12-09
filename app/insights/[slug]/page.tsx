import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Calendar, User, ChevronRight } from "lucide-react"
import { getSubstackPost, getSubstackPosts, formatDate } from "@/lib/substack"
import ArticleContent from "@/components/article-content"
import NewsletterSignup from "@/components/newsletter-signup"
import ShareActions from "@/components/share-actions"
import type { Metadata } from "next"

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getSubstackPost(slug)

  if (!post) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: `${post.title} | Saorsa Growth Partners`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getSubstackPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = await getSubstackPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="flex flex-col">
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
            <li>
              <Link href="/insights" className="hover:text-foreground transition-colors">
                Insights
              </Link>
            </li>
            <li aria-hidden="true" className="flex items-center text-foreground/40">
              <ChevronRight size={14} />
            </li>
            <li
              aria-current="page"
              className="text-foreground font-medium line-clamp-1 max-w-[180px] sm:max-w-[260px] md:max-w-[360px]"
            >
              {post.title}
            </li>
          </ol>
        </nav>
      </div>
      {/* Article Header */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-secondary/20 via-background to-background">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Insights
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col gap-4 md:gap-3">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-foreground/60 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time dateTime={post.pubDate.toISOString()}>{formatDate(post.pubDate)}</time>
              </div>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent hover:underline"
              >
                Read on Substack
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Share */}
            <ShareActions title={post.title} fallbackUrl={post.link} />
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.imageUrl && (
        <section className="px-4">
          <div className="max-w-4xl mx-auto -mt-4">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-lg border border-border"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <ArticleContent content={post.content} />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-8 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            More Insights
          </Link>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Read on Substack
            <ExternalLink size={18} />
          </a>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </main>
  )
}
