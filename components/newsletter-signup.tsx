"use client"

export default function NewsletterSignup() {
  return (
    <section className="py-10 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card/70 backdrop-blur-sm border border-border/70 rounded-xl p-6 md:p-7 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">Subscribe to The Conduit of Value</h2>
          <p className="text-foreground/70 mb-5">
            Get weekly insights on growth, strategy, and business transformation directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground placeholder-foreground/50"
            />
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-foreground/60 mt-3">
            Or{" "}
            <a
              href="https://conduitofvalue.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              visit Substack directly
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
