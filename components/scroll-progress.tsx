"use client"

import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame: number

    const update = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop || document.body.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      const pct = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0
      setProgress(pct)
      frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="h-1 bg-primary/15 overflow-hidden">
        <div
          className="h-1 bg-primary w-full origin-left will-change-transform transition-transform duration-200 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
          aria-hidden
        />
      </div>
    </div>
  )
}
