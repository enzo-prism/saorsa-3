import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg text-primary">S</span>
              </div>
              <span className="font-bold text-lg">Saorsa</span>
            </div>
            <p className="text-sm text-primary-foreground/70">Your embedded financial and operational partners.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/" className="inline-block py-1.5 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/insights" className="inline-block py-1.5 hover:text-accent transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/partners" className="inline-block py-1.5 hover:text-accent transition-colors">
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
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  Conduit of Value
                </a>
              </li>
              <li>
                <Link href="/contact" className="inline-block py-1.5 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="mailto:hello@saorsagrowth.com" className="inline-block py-1.5 hover:text-accent transition-colors">
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
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a href="mailto:hello@saorsagrowth.com" className="inline-block py-1.5 hover:text-accent transition-colors">
                  Say Hello
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
