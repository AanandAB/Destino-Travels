'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface Props {
  startTime?: number
  endTime?: number
  height?: string
}

export default function VideoTransitionDivider({
  startTime = 3.0,
  endTime = 8.0,
  height = '200vh',
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const init = () => {
      video.currentTime = startTime

      const ctx = gsap.context(() => {
        gsap.to(video, {
          currentTime: endTime,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }, section)

      return () => ctx.revert()
    }

    if (video.readyState >= 1) init()
    else video.addEventListener('loadedmetadata', init, { once: true })
  }, [startTime, endTime])

  return (
    <section ref={sectionRef} className="relative" style={{ height }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/Destino-Travels/videos/destino-hero.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/30 to-dark/80" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
            <p className="font-display text-white/60 italic text-2xl">
              Every journey tells a story
            </p>
            <div className="w-16 h-0.5 bg-accent mx-auto mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
