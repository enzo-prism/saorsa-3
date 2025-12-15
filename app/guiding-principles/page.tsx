import Link from "next/link"
import Reveal from "@/components/reveal"

export default function GuidingPrinciplesPage() {
  const principles = [
    { title: "Partnership First", body: "Our clients are partners, not transactions. We succeed only when they succeed." },
    { title: "Aligned Incentives", body: "Structures should reward shared progress and minimize misaligned interests." },
    {
      title: "Shared Success",
      body:
        "When outcomes are created together, rewards should be shared. Treasure is not hoarded — it’s reinvested in people, communities, and future opportunities. This is wealth.",
    },
    { title: "Capital as a Tool, Not the Goal", body: "Money is fuel, not the destination. Discipline, creativity, and strategy matter more than fundraising headlines." },
    { title: "Non-Traditional Roots, Exceptional Outcomes", body: "We believe great companies often emerge from unexpected places and underestimated founders." },
    { title: "Build Bridges, Not Walls", body: "Relationships compound. We prioritize trust, collaboration, and long-term goodwill over short-term wins." },
    { title: "Learn Relentlessly", body: "Everyone—from interns to founders—can and should be learning constantly. Curiosity beats certainty." },
    { title: "Start with \"Yes\"", body: "Constraints spark creativity. We approach challenges with a solutions-first mindset." },
    { title: "Figure It Out", body: "Resourcefulness and accountability matter more than perfection. If it’s unclear, we lean in and solve it." },
  ]

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-10 md:py-14 px-4 bg-gradient-to-br from-secondary/20 via-background to-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 space-y-5 md:space-y-6">
          <Reveal className="text-center space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-[0.08em]">
              The Saorsa Way
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Guiding Principles</h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Saorsa Growth Partners exists to help great people build enduring companies that create thriving communities. Financial strategy is about enabling freedom, resilience, and long-term prosperity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="py-12 md:py-18 px-4 bg-background">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
          <Reveal className="bg-card border border-border rounded-xl p-5 md:p-7 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Principles</h2>
            <p className="text-sm text-foreground/70 mb-5 md:mb-6">A practical framework for how we partner, deploy capital, and grow together.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {principles.map((item, idx) => (
                <Reveal
                  key={item.title}
                  delay={0.035 * idx}
                  className="relative overflow-hidden rounded-lg border border-border bg-muted/40 p-4 md:p-5 hover:border-primary/40 hover:shadow-sm transition-colors"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary/30" />
                  <p className="text-xs font-semibold text-primary mb-1 tracking-[0.06em]">{idx + 1}. {item.title}</p>
                  <p className="text-foreground/80 leading-relaxed text-sm md:text-base">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal className="bg-card border border-border rounded-xl p-5 md:p-7 shadow-sm">
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full w-fit">
                Meaning
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">What does “Saorsa” mean to us?</h2>
              <p className="text-foreground/80 leading-relaxed">
                Saorsa [say-or-sah] is derived from the Scots Gaelic word meaning \"freedom\" or \"liberation.\" Saorsa represents the pursuit of financial independence and the clarity that comes with empowered decision-making. Rooted in a legacy of resilience and self-determination, the term encapsulates the transformative journey toward sustainable growth and strategic vision. At its heart, Saorsa Growth Partners is about unlocking the potential to thrive—financially, professionally, and personally—through intentional planning and purposeful action.
              </p>
            </div>
          </Reveal>

          <Reveal className="bg-muted/30 border border-border rounded-xl p-5 md:p-7 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
              <div className="space-y-2 text-foreground/80 text-sm md:text-base">
                <h3 className="text-lg font-semibold text-foreground">Saorsa Growth Partners</h3>
                <p>San Francisco, California</p>
                <p>
                  Email: <a className="hover-underline" href="mailto:Duncan@saorsapartners.com">Duncan@saorsapartners.com</a>
                </p>
                <p>
                  Phone: <a className="hover-underline" href="tel:+19257840718">(925) 784-0718</a>
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-primary text-primary hover:bg-primary/5 transition-all duration-200 ease-out hover-lift text-sm font-medium"
              >
                Get in Touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
