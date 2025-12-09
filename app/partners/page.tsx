"use client"

import { CheckCircle, Award, Zap } from "lucide-react"

export default function PartnersPage() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Results-Focused Retainers",
      description: "Engagements are tied to measurable value creation—your outcomes are the metric, not our hours.",
    },
    {
      icon: Award,
      title: "Investor-Level Diligence",
      description: "We underwrite fit before we engage, ensuring the partnership is right for both sides.",
    },
    {
      icon: Zap,
      title: "Embedded Partners",
      description: "We work shoulder to shoulder as your dedicated financial and operational team, not outside advisors.",
    },
  ]

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-accent/20 via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Partnership Results</h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Every engagement is a partnership trial. We embed as financial and operational partners to deliver measurable
            outcomes and prove conviction.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-foreground/70">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Case Studies</h2>

          <div className="bg-card border border-dashed border-border rounded-lg p-10 text-center">
            <p className="text-lg font-semibold text-foreground mb-2">Case Studies Coming Soon</p>
            <p className="text-foreground/70">
              We’re curating a detailed set of partnership stories that show our diligence, embedded execution, and results-focused retainers in action.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Your Partnership Story Starts Here</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            We're selective about the partnerships we pursue. Let's explore whether we're the right fit for each other.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Start the Conversation
          </a>
        </div>
      </section>
    </main>
  )
}
