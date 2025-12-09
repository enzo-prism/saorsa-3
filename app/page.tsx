import Link from "next/link"
import { ArrowRight, Zap, Target, TrendingUp, Users } from "lucide-react"

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] bg-gradient-to-br from-primary via-background to-background flex items-center justify-center px-4 py-12 md:py-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
              Strategic Growth Acceleration
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-balance text-foreground mb-6">
            Unlock Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              True Growth Potential
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/70 text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            Partner with Saorsa Growth Partners to accelerate your business transformation and achieve sustainable,
            strategic growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2"
            >
              Schedule Consultation <ArrowRight size={20} />
            </Link>
            <Link
              href="/insights"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
            >
              Read Our Insights
            </Link>
          </div>

          <p className="text-sm text-foreground/60">Trusted by growth-focused companies across industries</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Approach</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We combine strategic insight with practical execution to drive measurable growth results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Strategic Planning",
                description:
                  "Define clear objectives and develop comprehensive growth strategies aligned with your vision.",
              },
              {
                icon: TrendingUp,
                title: "Growth Acceleration",
                description: "Execute proven tactics to drive rapid, sustainable revenue and market expansion.",
              },
              {
                icon: Zap,
                title: "Performance Optimization",
                description: "Identify and eliminate bottlenecks to maximize operational efficiency and profitability.",
              },
              {
                icon: Users,
                title: "Partnership Model",
                description: "Work alongside your team as strategic partners invested in your long-term success.",
              },
            ].map((service, idx) => {
              const Icon = service.icon
              return (
                <div
                  key={idx}
                  className="p-6 bg-card rounded-lg border border-border hover:border-accent/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-12 text-balance">Why Saorsa?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                number: "01",
                title: "Proven Track Record",
                description: "Delivered transformational growth for dozens of companies across industries and stages.",
              },
              {
                number: "02",
                title: "Strategic Depth",
                description: "Our team brings decades of combined experience in business strategy and execution.",
              },
              {
                number: "03",
                title: "Hands-On Partnership",
                description: "We work embedded with your team, not as detached consultants but as true partners.",
              },
              {
                number: "04",
                title: "Results-Driven",
                description: "Every initiative is tied to clear metrics and measurable business outcomes.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-accent-foreground font-bold text-lg">
                    {item.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Ready to Accelerate Your Growth?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how Saorsa can help you unlock your true growth potential and drive sustainable business
            success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Get Started Today
            </Link>
            <a
              href="https://conduitofvalue.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground rounded-lg hover:bg-primary-foreground/10 transition-colors font-medium"
            >
              Explore Our Insights
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
