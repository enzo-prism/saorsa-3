import Image from "next/image"
import Link from "next/link"
import { Home, BookOpen, Mail, Newspaper, Linkedin, Users } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary-foreground border border-primary-foreground/40 shadow-sm flex items-center justify-center">
                <Image
                  src="/saorsa-logo.webp"
                  alt="Saorsa Growth Partners logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                  priority
                />
              </div>
              <span className="font-bold text-lg text-primary-foreground">Saorsa Growth Partners</span>
            </div>
            <p className="text-sm text-primary-foreground/70">Your embedded financial and operational partners.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/" className="inline-flex items-center gap-2 py-1.5 hover:text-accent transition-colors">
                  <Home size={14} />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 py-1.5 hover:text-accent transition-colors"
                >
                  <BookOpen size={14} />
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="inline-flex items-center gap-2 py-1.5 hover:text-accent transition-colors"
                >
                  <Users size={14} />
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Resources</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="https://conduitofvalue.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-1.5 hover:text-accent transition-colors hover-underline"
                >
                  <Newspaper size={14} />
                  Substack
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@saorsagrowth.com"
                  className="inline-flex items-center gap-2 py-1.5 hover:text-accent transition-colors hover-underline"
                >
                  <Mail size={14} />
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Connect</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-1.5 hover:text-accent transition-colors hover-underline"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclosure */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <p className="text-xs text-primary-foreground/60 max-w-3xl">
            We provide strategic advisory and execution support. We are not a regulated financial intermediary or
            licensed broker. We structure our fee schedule strictly around advisory services and are not permitted to
            accept success fees.
          </p>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-primary-foreground/70">
          <p>&copy; {currentYear} Saorsa Growth Partners. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="inline-block py-1.5 hover:text-accent transition-colors">
              Privacy
            </a>
            <a href="#" className="inline-block py-1.5 hover:text-accent transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
