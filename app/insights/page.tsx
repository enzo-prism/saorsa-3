"use client"
import { ExternalLink } from "lucide-react"

export default function InsightsPage() {
  const insights = [
    {
      title: "The Conduit of Value",
      description:
        "Deep insights on building valuable businesses and unlocking hidden growth opportunities within your organization.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      link: "https://conduitofvalue.substack.com/",
      category: "Newsletter",
    },
    {
      title: "Strategic Growth Principles",
      description: "Discover the core principles that drive sustainable growth in modern businesses.",
      image: "https://images.unsplash.com/photo-1554224311-beee415c15c7?w=600&h=400&fit=crop",
      link: "https://conduitofvalue.substack.com/",
      category: "Article",
    },
    {
      title: "Market Transformation Trends",
      description: "Stay ahead of industry shifts and emerging opportunities in your market.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      link: "https://conduitofvalue.substack.com/",
      category: "Report",
    },
  ]

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-secondary/20 via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Growth Insights & Perspectives
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Explore our latest thinking on business strategy, growth acceleration, and value creation. Subscribe to The
            Conduit of Value for weekly insights.
          </p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 px-4 bg-muted/30 border-b border-border">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">Subscribe to The Conduit of Value</h2>
            <p className="text-foreground/70 mb-6">
              Get weekly insights on growth, strategy, and business transformation directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-foreground/60 mt-4">
              Or{" "}
              <a
                href="https://conduitofvalue.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                visit Substack directly
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12">Featured Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insights.map((insight, idx) => (
              <a
                key={idx}
                href={insight.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer"
              >
                <div className="bg-card rounded-lg border border-border overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={insight.image || "/placeholder.svg"}
                      alt={insight.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-semibold rounded-full">
                        {insight.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {insight.title}
                    </h3>
                    <p className="text-foreground/70 text-sm mb-4 flex-grow line-clamp-3">{insight.description}</p>
                    <div className="flex items-center gap-2 text-accent font-medium text-sm">
                      Read More
                      <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://conduitofvalue.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
            >
              View All Insights on Substack
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
