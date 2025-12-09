"use client"

export default function NewsletterSignup() {
  return (
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
  )
}
