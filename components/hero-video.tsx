"use client"

import { useEffect, useRef } from "react"

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.playbackRate = 0.5
    const playPromise = videoRef.current.play()
    if (playPromise) {
      playPromise.catch(() => {
        /* ignore autoplay failures */
      })
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover opacity-25 pointer-events-none scale-110"
      autoPlay
      loop
      muted
      playsInline
      style={{ transformOrigin: "center" }}
    >
      <source
        src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1765308164/Seed_to_Mighty_Tree_Video_j0zzgx.mp4"
        type="video/mp4"
      />
    </video>
  )
}
