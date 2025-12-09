"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Home, Lightbulb, Users, PhoneCall, Menu, X, Compass } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    {
      label: "Insights",
      href: "/insights",
      icon: Lightbulb,
      iconActive: Lightbulb,
      hoverClass: "text-primary drop-shadow-[0_0_10px_rgba(61,68,53,0.45)] fill-current",
    },
    { label: "Partners", href: "/partners", icon: Users },
    { label: "Guiding Principles", href: "/guiding-principles", icon: Compass },
    { label: "Contact", href: "/contact", icon: PhoneCall },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3">
            <Image
              src="/saorsa-logo.webp"
              alt="Saorsa Growth Partners logo"
              width={36}
              height={36}
              priority
              className="h-9 w-9 object-contain transition-transform duration-200 group-hover:scale-110 group-hover:drop-shadow-sm"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const HoverIcon = item.iconActive ?? Icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group text-sm font-medium text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-2 hover-underline"
                >
                  <span className="relative h-4 w-4 flex items-center justify-center">
                    <Icon
                      size={16}
                      strokeWidth={1.7}
                      className="transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1"
                    />
                    <HoverIcon
                      size={16}
                      strokeWidth={1.7}
                      className={`absolute transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 ${
                        item.hoverClass ?? "text-primary"
                      }`}
                    />
                  </span>
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/contact"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity hover-lift text-sm font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-md text-foreground hover:bg-muted"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            {navItems.map((item) => {
              const Icon = item.icon
              const HoverIcon = item.iconActive ?? Icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3 text-sm font-medium text-foreground/70 hover:text-primary px-3 py-3 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="relative h-4 w-4 flex items-center justify-center">
                    <Icon
                      size={16}
                      strokeWidth={1.7}
                      className="transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1"
                    />
                    <HoverIcon
                      size={16}
                      strokeWidth={1.7}
                      className={`absolute transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 ${
                        item.hoverClass ?? "text-primary"
                      }`}
                    />
                  </span>
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/contact"
              className="block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-sm font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
