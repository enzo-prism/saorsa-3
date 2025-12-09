"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, Calendar } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with HubSpot
    // For now, we'll just show a success message
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Let's Start Your Growth Journey
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Contact Saorsa Growth Partners to discuss how we can help accelerate your business growth and unlock new
            opportunities.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto md:mx-0 mb-4">
                <Mail size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
              <a
                href="mailto:hello@saorsagrowth.com"
                className="text-foreground/70 hover:text-accent transition-colors"
              >
                hello@saorsagrowth.com
              </a>
            </div>

            {/* Calendar */}
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto md:mx-0 mb-4">
                <Calendar size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Schedule Call</h3>
              <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                Book a 30-min consultation
              </a>
              <p className="text-sm text-foreground/60 mt-1">(Calendar link to be added)</p>
            </div>

            {/* Phone */}
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto md:mx-0 mb-4">
                <Phone size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
              <a href="tel:+1234567890" className="text-foreground/70 hover:text-accent transition-colors">
                +1 (234) 567-890
              </a>
            </div>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">Send us a message</h2>

              {submitted ? (
                <div className="bg-accent/10 border border-accent text-accent rounded-lg p-6 text-center">
                  <p className="font-semibold">Thank you for reaching out!</p>
                  <p className="text-sm mt-2">We'll be in touch within 24 hours.</p>
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
                    We respect your privacy. Your information will only be used to contact you about your inquiry.
                  </p>
                </form>
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Quick Links</h2>
                <div className="space-y-4">
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <Calendar size={24} className="text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        Book a Consultation
                      </h3>
                      <p className="text-sm text-foreground/70 mt-1">
                        Schedule a 30-minute discovery call with our team
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://conduitofvalue.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <Mail size={24} className="text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        The Conduit of Value
                      </h3>
                      <p className="text-sm text-foreground/70 mt-1">Weekly insights on growth and business strategy</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
                <h3 className="font-bold text-foreground mb-4">What to Expect</h3>
                <ol className="space-y-3 text-sm text-foreground/70">
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary flex-shrink-0">1.</span>
                    <span>Initial consultation to understand your business and goals</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary flex-shrink-0">2.</span>
                    <span>Strategic assessment of growth opportunities and challenges</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary flex-shrink-0">3.</span>
                    <span>Custom proposal outlining our approach and partnership terms</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary flex-shrink-0">4.</span>
                    <span>Ongoing partnership with regular check-ins and impact metrics</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ-like Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12">Common Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: "What types of companies do you work with?",
                a: "We work with ambitious companies across industries at all growth stages—from pre-Series A startups to established enterprises looking to accelerate transformation.",
              },
              {
                q: "How long is a typical engagement?",
                a: "Most engagements range from 6-24 months depending on scope and goals. We customize the partnership to match your specific needs and timeline.",
              },
              {
                q: "What is your engagement model?",
                a: "We work as strategic partners embedded with your team, combining advisory guidance with hands-on execution support to drive measurable results.",
              },
              {
                q: "How do you measure success?",
                a: "Every engagement includes clear KPIs and metrics aligned with your business goals. We track progress regularly and adjust strategy as needed.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">{item.q}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
