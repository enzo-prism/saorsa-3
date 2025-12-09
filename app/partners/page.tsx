"use client"

import { CheckCircle, Award, Zap } from "lucide-react"

export default function PartnersPage() {
  const caseStudies = [
    {
      company: "TechScale Innovations",
      industry: "SaaS",
      challenge: "Plateaued growth at $2M ARR with limited market reach",
      results: [
        "Increased ARR to $8.5M in 18 months",
        "Expanded market presence across 3 new verticals",
        "42% improvement in customer acquisition efficiency",
      ],
      testimonial: "Saorsa didn't just advise—they rolled up their sleeves and became part of our team.",
      executive: "Sarah Chen, CEO",
    },
    {
      company: "Enterprise Solutions Co",
      industry: "B2B Services",
      challenge: "Complex sales process limiting growth and team efficiency",
      results: [
        "Streamlined sales cycle by 35%",
        "Scaled team from 8 to 35 people strategically",
        "Revenue growth of 180% year-over-year",
      ],
      testimonial: "Their strategic framework transformed how we think about scaling.",
      executive: "Marcus Johnson, President",
    },
    {
      company: "Growth Stage Startup",
      industry: "Fintech",
      challenge: "Preparing for Series B: needing to prove PMF and unit economics",
      results: [
        "Demonstrated clear path to profitability",
        "Secured $15M Series B investment",
        "Built sustainable go-to-market machine",
      ],
      testimonial: "Saorsa helped us build the narrative and business foundation investors wanted to see.",
      executive: "Alex Rivera, Founder",
    },
    {
      company: "Legacy Manufacturing",
      industry: "Industrial",
      challenge: "Digital transformation and market expansion needed",
      results: [
        "Successfully pivoted to new market segments",
        "Reduced operational costs by 28%",
        "Launched 2 new product lines",
      ],
      testimonial: "They made our transformation from legacy to growth leader feel achievable.",
      executive: "Catherine Brown, COO",
    },
  ]

  const benefits = [
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "Track record of delivering measurable growth across diverse industries and business stages.",
    },
    {
      icon: Award,
      title: "Strategic Expertise",
      description: "Deep domain knowledge combined with proven frameworks for accelerating growth.",
    },
    {
      icon: Zap,
      title: "Hands-On Partnership",
      description: "Work directly with your team, not as detached advisors but as invested strategic partners.",
    },
  ]

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-accent/20 via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Success Stories</h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            See how we've helped ambitious companies unlock growth and transform their businesses.
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
                    <Icon size={32} className="text-accent" />
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

          <div className="space-y-12">
            {caseStudies.map((study, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-8 md:p-10 hover:border-accent/50 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{study.company}</h3>
                    <p className="text-accent font-medium text-sm">{study.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Challenge</p>
                    <p className="text-foreground leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Timeline</p>
                    <p className="text-foreground">12-24 months</p>
                  </div>
                </div>

                <div className="mb-8 pb-8 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-4">Key Results</p>
                  <ul className="space-y-3">
                    {study.results.map((result, ridx) => (
                      <li key={ridx} className="flex gap-3 items-start">
                        <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg border border-border">
                  <p className="text-foreground italic mb-4 text-lg">"{study.testimonial}"</p>
                  <p className="text-foreground/70 font-medium">{study.executive}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Your Growth Story Starts Here</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Ready to join our portfolio of successful partners and unlock your growth potential?
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Schedule Your Consultation
          </a>
        </div>
      </section>
    </main>
  )
}
