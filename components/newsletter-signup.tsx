"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setError("Please enter your email to subscribe.")
      return
    }
    setError("")
    setLoading(true)
    // Placeholder success; hook up backend later
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 400)
  }

  return (
    <section className="py-10 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card/70 backdrop-blur-sm border border-border/70 rounded-xl p-6 md:p-7 shadow-sm hover-lift">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">Subscribe to The Conduit of Value</h2>
          <p className="text-foreground/70 mb-5">
            Get weekly insights on growth, strategy, and business transformation directly to your inbox.
          </p>

          {submitted ? (
            <div
              className="flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-primary"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 size={20} />
              <div>
                <p className="font-semibold">Subscribed</p>
                <p className="text-xs text-primary/80">You’re in. Check your inbox for the first issue.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                  if (submitted) setSubmitted(false)
                }}
                className="flex-1 px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground placeholder-foreground/50"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium whitespace-nowrap transition-all duration-200 ease-out hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}
          {error && !submitted && <p className="text-xs text-destructive mt-2">{error}</p>}

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
