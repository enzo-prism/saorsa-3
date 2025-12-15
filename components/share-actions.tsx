"use client"

import { useEffect, useMemo, useState } from "react"
import { Link2, Linkedin, Mail, Share2, Twitter } from "lucide-react"

interface ShareActionsProps {
  title: string
  fallbackUrl?: string
}

export default function ShareActions({ title, fallbackUrl = "" }: ShareActionsProps) {
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(fallbackUrl)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const shareUrl = currentUrl || fallbackUrl

  const shareLinks = useMemo(
    () => ({
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`,
    }),
    [shareUrl, title]
  )

  const handleCopy = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error("Failed to copy link", err)
    }
  }

  const baseBtn =
    "inline-flex items-center gap-2 text-xs md:text-sm font-medium border rounded-md px-3 py-2 transition-colors"

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1 text-foreground/70 text-xs md:text-sm">
        <Share2 size={14} />
        Share
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className={`${baseBtn} border-border bg-card hover:bg-muted/60 text-foreground`}
      >
        <Link2 size={14} />
        {copied ? "Copied" : "Copy link"}
      </button>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseBtn} border-border bg-card hover:bg-muted/60 text-foreground`}
      >
        <Linkedin size={14} />
        LinkedIn
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseBtn} border-border bg-card hover:bg-muted/60 text-foreground`}
      >
        <Twitter size={14} />
        X/Twitter
      </a>
      <a
        href={shareLinks.email}
        className={`${baseBtn} border-border bg-card hover:bg-muted/60 text-foreground`}
      >
        <Mail size={14} />
        Email
      </a>
    </div>
  )
}
