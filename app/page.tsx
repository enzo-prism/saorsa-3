import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ValueEquationChart from "@/components/value-equation-chart"
import ServicesCarousel from "@/components/services-carousel"
import Reveal from "@/components/reveal"
import HeroVideo from "@/components/hero-video"
import LatestInsightHero from "@/components/latest-insight-hero"

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] bg-gradient-to-br from-primary via-background to-background flex items-center justify-center px-4 py-12 md:py-0">
        <div className="absolute inset-0 overflow-hidden">
          <HeroVideo />
          <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/75 to-background/60" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <Reveal className="relative max-w-4xl mx-auto text-center z-10">
          <div className="inline-block mb-6">
            <div className="flex justify-center mb-3">
              <img src="/saorsa-logo.webp" alt="Saorsa Growth Partners logo" className="h-10 w-10 object-contain" />
            </div>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Saorsa Growth Partners
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-balance text-foreground mb-6">
            Your Embedded{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Financial & Strategic Partners
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/70 text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            We go beyond consulting. We embed with investor-level rigor to answer hard questions, structure partnership
            trials, and drive measurable value while working shoulder to shoulder with you.
          </p>

          <p className="text-sm md:text-base text-foreground/60 text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            Every business faces critical inflection points. We bring the investor mindset and operational{" "}
            <span className="underline underline-offset-4 decoration-primary/40">excellence</span> to help you navigate
            them.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ease-out hover-lift hover:bg-primary/90 active:translate-y-[1px]"
            >
              Start Your Partnership <ArrowRight size={20} />
            </Link>
            <Link
              href="/insights"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-medium transition-all duration-200 ease-out hover-lift hover:bg-primary/5 active:translate-y-[1px]"
            >
              Read Our Insights
            </Link>
          </div>

          <div className="mb-8">
            <LatestInsightHero />
          </div>

          <p className="text-sm text-foreground/60">Beyond consulting. True partnership.</p>
        </Reveal>
      </section>

      {/* Services Section - 5 Pillars */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">How We Help</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Every business faces critical inflection points. We bring the investor mindset and operational{" "}
              <span className="underline underline-offset-4 decoration-primary/40">excellence</span> to help you navigate
              them.
            </p>
          </Reveal>

          <Reveal>
            <ServicesCarousel />
          </Reveal>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 bg-muted/30">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-24 right-0 w-[360px] h-[360px] blur-[70px] animate-float-slow"
            style={{ background: "radial-gradient(circle at 30% 30%, rgba(61,68,53,0.6), transparent 55%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[320px] h-[320px] blur-[70px] animate-float-slower"
            style={{ background: "radial-gradient(circle at 60% 60%, rgba(214,186,162,0.6), transparent 55%)" }}
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-12 text-balance">
            Why Partner With Saorsa?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                number: "01",
                title: "Projects Are Partnerships",
                description:
                  "Every engagement is a partnership trial. We invest early to prove conviction and fit, not to meter hours.",
              },
              {
                number: "02",
                title: "Results-Focused Retainers",
                description:
                  "Retainers are tied to measurable value creation. The only metric that matters is your success.",
              },
              {
                number: "03",
                title: "The Ultimate Investment",
                description:
                  "With long-term partners (12+ months), we syndicate capital from our network and put our capital alongside yours.",
              },
              {
                number: "04",
                title: "Trusted Advisory Partner",
                description:
                  "We approach every engagement with care, honesty, and accountability. Our role is to help you make the right decisions, even when the answer is not the easy one.",
              },
            ].map((item, idx) => (
              <Reveal key={idx} delay={0.05 * idx} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-accent-foreground font-bold text-lg">
                    {item.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Value Equation Chart */}
      <ValueEquationChart />

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Ready to Start a Partnership Trial?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's decide together if we should pursue this. We approach the first conversation with the same diligence
            we bring to every engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium transition-all duration-200 ease-out hover-lift hover:bg-accent/90"
            >
              Start the Conversation
            </Link>
            <Link
              href="/insights"
              className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground rounded-lg font-medium transition-all duration-200 ease-out hover-lift hover:bg-primary-foreground/10"
            >
              Explore Our Insights
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
