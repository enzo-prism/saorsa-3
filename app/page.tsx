import Link from "next/link"
import { ArrowRight, DollarSign, Rocket, TrendingUp, Wrench, Handshake } from "lucide-react"
import ValueEquationChart from "@/components/value-equation-chart"

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
              Strategic Advisory Services
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-balance text-foreground mb-6">
            Your Dedicated{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Financial & Strategic Partners
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/70 text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            We embed ourselves as your dedicated financial and operational partners, bringing investor-level rigor and
            data-backed decisions to drive your long-term success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2"
            >
              Start Your Partnership <ArrowRight size={20} />
            </Link>
            <Link
              href="/insights"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
            >
              Read Our Insights
            </Link>
          </div>

          <p className="text-sm text-foreground/60">Beyond consulting. True partnership.</p>
        </div>
      </section>

      {/* Services Section - 5 Pillars */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">How We Help</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Every business faces critical inflection points. We bring the investor mindset and operational expertise
              to help you navigate them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                title: "How Do I Fund This?",
                subtitle: "Capital Strategy",
                description:
                  "Navigate fundraising with investor-ready materials, capital structure optimization, and strategic investor relations.",
              },
              {
                icon: Rocket,
                title: "How Do I Build This?",
                subtitle: "Startup Operating Model",
                description:
                  "Establish the financial infrastructure, operational systems, and governance frameworks to scale effectively.",
              },
              {
                icon: TrendingUp,
                title: "How Do I Grow This?",
                subtitle: "Small Business Excellence",
                description:
                  "Transform from operator to owner-investor with strategic planning, performance metrics, and sustainable growth.",
              },
              {
                icon: Wrench,
                title: "How Do I Fix This?",
                subtitle: "Turnaround Planning",
                description:
                  "Stabilize operations, rebuild stakeholder confidence, and execute data-driven restructuring strategies.",
              },
              {
                icon: Handshake,
                title: "How Do I Sell This?",
                subtitle: "M&A Strategy",
                description:
                  "Maximize transaction value through comprehensive preparation, market positioning, and deal execution support.",
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
                  <h3 className="text-lg font-semibold text-foreground mb-1">{service.title}</h3>
                  <p className="text-sm text-accent font-medium mb-2">{service.subtitle}</p>
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
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-12 text-balance">
            Why Partner With Saorsa?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                number: "01",
                title: "Projects Are Partnerships",
                description:
                  "Every project is a trial run for a lasting alliance. We invest deeply because we're building relationships, not billing hours.",
              },
              {
                number: "02",
                title: "Results-Focused Retainers",
                description:
                  "We structure engagements around measurable value, not time. Your success metrics are our success metrics.",
              },
              {
                number: "03",
                title: "The Ultimate Investment",
                description:
                  "For long-term clients, we syndicate fundraising through our network—putting our capital alongside yours.",
              },
              {
                number: "04",
                title: "Investor Mindset",
                description:
                  "We apply deep due diligence before pursuing any engagement. If we don't believe in the opportunity, we'll tell you.",
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

      {/* Value Equation Chart */}
      <ValueEquationChart />

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Ready to Start Your Partnership?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss whether we're the right partners for your journey. We approach every conversation with the
            same rigor we bring to our engagements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Start the Conversation
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
