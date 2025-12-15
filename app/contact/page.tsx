"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, Calendar, Lightbulb, ChevronDown, Linkedin } from "lucide-react"
import Reveal from "@/components/reveal"

export default function ContactPage() {
  const insightsSubscribeUrl = (email: string) => {
    const params = new URLSearchParams({
      email,
      utm_source: "saorsa-site",
      utm_medium: "contact-form",
      utm_campaign: "insights-updates",
    })
    return `https://conduitofvalue.substack.com/subscribe?${params.toString()}`
  }

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    subscribeToInsights: false,
  }

  const [formData, setFormData] = useState({
    ...initialFormData,
  })

  const [status, setStatus] = useState<"idle" | "success">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    const value = e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : e.target.value
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData({ ...initialFormData })
    setStatus("idle")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with HubSpot
    // For now, we'll just show a success message
    console.log("Form submitted:", formData)
    setStatus("success")

    if (formData.subscribeToInsights) {
      window.open(insightsSubscribeUrl(formData.email), "_blank", "noopener,noreferrer")
    }
  }

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Let's Discuss Your Partnership
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            We approach every conversation with investor-level rigor. Let's explore whether a partnership trial makes
            sense and how we can create measurable value together.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-14 md:py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-6">
            {/* Email */}
            <div className="text-center md:text-left bg-card border border-border rounded-xl p-5 md:p-6 hover-lift transition-shadow space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto md:mx-0">
                <Mail size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Email</h3>
              <a
                href="mailto:Duncan@saorsapartners.com"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-primary/70 text-primary bg-primary/5 hover:bg-primary/10 transition-all duration-200 ease-out hover-lift text-sm font-medium"
              >
                Duncan@saorsapartners.com
              </a>
            </div>

            {/* Calendar */}
            <div className="text-center md:text-left bg-card border border-border rounded-xl p-5 md:p-6 hover-lift transition-shadow space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto md:mx-0">
                <Calendar size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Schedule Call</h3>
              <a
                href="#"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-primary/70 text-primary bg-primary/5 hover:bg-primary/10 transition-all duration-200 ease-out hover-lift text-sm font-medium"
              >
                Book a 30-min consultation
              </a>
            </div>

            {/* Phone */}
            <div className="text-center md:text-left bg-card border border-border rounded-xl p-5 md:p-6 hover-lift transition-shadow space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto md:mx-0">
                <Phone size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Phone</h3>
              <a
                href="tel:+19257840718"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-primary/70 text-primary bg-primary/5 hover:bg-primary/10 transition-all duration-200 ease-out hover-lift text-sm font-medium"
              >
                (925) 784-0718
              </a>
            </div>

            {/* LinkedIn */}
            <div className="text-center md:text-left bg-card border border-border rounded-xl p-5 md:p-6 hover-lift transition-shadow space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto md:mx-0">
                <Linkedin size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/duncanbwalker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-primary/70 text-primary bg-primary/5 hover:bg-primary/10 transition-all duration-200 ease-out hover-lift text-sm font-medium"
              >
                Connect with Duncan
              </a>
            </div>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">Send us a message</h2>

              {status === "success" ? (
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 text-center">
                  <p className="font-semibold text-foreground">Message received</p>
                  <p className="text-sm mt-2 text-foreground/80">Thanks for reaching out. We’ll respond within 24 hours.</p>

                  {formData.subscribeToInsights && (
                    <div className="mt-6 bg-card/60 border border-border rounded-lg p-4 text-left">
                      <p className="font-semibold text-foreground">Confirm Insights subscription</p>
                      <p className="text-sm text-foreground/70 mt-1">
                        To receive new Insights posts by email, please confirm your opt-in on Substack.
                      </p>
                      <a
                        href={insightsSubscribeUrl(formData.email)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                      >
                        Subscribe to Insights
                      </a>
                      <p className="text-xs text-foreground/60 mt-2">If a new tab didn’t open, use the button above.</p>
                    </div>
                  )}

                  <button type="button" onClick={resetForm} className="mt-6 text-sm text-primary hover:underline font-medium">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-foreground/50"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-foreground/50"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-foreground/50"
                  />

                  <label className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="subscribeToInsights"
                      checked={formData.subscribeToInsights}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span className="text-sm text-foreground/80 leading-snug">
                      <span className="font-medium text-foreground">Email me new Insights posts</span>
                      <span className="block text-xs text-foreground/60 mt-1">
                        Get notified when we publish. Unsubscribe anytime.
                      </span>
                    </span>
                  </label>

                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-foreground/50"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-foreground/50"
                  />

                  <textarea
                    name="message"
                    placeholder="Tell us about your business and growth goals..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-foreground/50 resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                  >
                    Send Message
                  </button>

                  <p className="text-xs text-foreground/60 text-center">
                    We use your information to respond to your inquiry. If you opt in, we’ll also help you subscribe to Insights updates via Substack.
                  </p>
                </form>
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-12">
              <Reveal>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Quick Links</h2>
                  <div className="space-y-4">
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors hover-lift group"
                  >
                    <Calendar size={24} className="text-primary flex-shrink-0 mt-1 transition-colors group-hover:text-foreground" />
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-foreground transition-colors">
                        Book a Consultation
                      </h3>
                      <p className="text-sm text-foreground/80 group-hover:text-foreground mt-1">
                        Schedule a 30-minute discovery call with our team
                      </p>
                    </div>
                  </a>

                  <a href="/insights" className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors hover-lift group">
                    <Lightbulb
                      size={24}
                      className="text-primary flex-shrink-0 mt-1 transition-colors group-hover:text-foreground"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-foreground transition-colors">
                        The Conduit of Value
                      </h3>
                      <p className="text-sm text-foreground/80 group-hover:text-foreground mt-1">
                        Weekly insights on growth and business strategy
                      </p>
                    </div>
                  </a>
                </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
                  <h3 className="font-bold text-foreground mb-4">What to Expect</h3>
                  <ol className="space-y-3 text-sm text-foreground/70">
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">1.</span>
                      <span>Discovery conversation to decide if we should pursue a partnership trial together</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">2.</span>
                      <span>Deep due diligence and strategic assessment of your opportunity</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">3.</span>
                      <span>Proposal structured as a partnership trial with clear success metrics and retainer alignment</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">4.</span>
                      <span>Results-focused engagement tied to measurable outcomes and long-term fit</span>
                    </li>
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ-like Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12">Common Questions</h2>

          <FAQSection />
        </div>
      </section>
    </main>
  )
}

function FAQSection() {
  const faqs = [
    {
      q: "What types of companies do you partner with?",
      a: "We partner with companies at critical inflection points—whether you're raising capital, building infrastructure for scale, navigating a turnaround, or preparing for a transaction. We apply the same due diligence to potential partnerships as we would to investments.",
    },
    {
      q: "How is this different from traditional consulting?",
      a: "We structure engagements as partnership trials, not consulting projects. We're building relationships, not billing hours. For long-term clients, we even syndicate investment through our network—putting our capital alongside yours.",
    },
    {
      q: "What is your fee structure?",
      a: "We use results-focused retainers tied to measurable outcomes, not time-based billing. As strategic advisors, we are not permitted to accept success fees—our fee schedule is structured strictly around advisory services.",
    },
    {
      q: "How do you decide which engagements to pursue?",
      a: "We apply investor-level due diligence before pursuing any partnership. If we don't believe in the opportunity or don't think we can add meaningful value, we'll tell you. We only partner where we see genuine potential for mutual success.",
    },
  ]

  return (
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <Reveal key={item.q} delay={0.05 * idx}>
                <FAQItem question={item.q} answer={item.a} defaultOpen={idx === 0} />
              </Reveal>
            ))}
          </div>
  )
}

function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-border bg-card rounded-lg overflow-hidden transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left px-4 py-3 md:px-5 md:py-4 gap-3"
      >
        <span className="text-sm md:text-base font-semibold text-foreground">{question}</span>
        <ChevronDown
          size={18}
          className={`text-foreground/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 md:px-5 md:pb-5 text-sm text-foreground/70 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}
