'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import Button from '@/components/ui/Button'

export default function HeroVideoScrub() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const init = () => {
      const duration = video.duration

      const ctx = gsap.context(() => {
        // Core: scrub video currentTime with scroll
        gsap.to(video, {
          currentTime: duration,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        })

        // Overlay fade
        gsap.to(overlayRef.current, {
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '30% bottom',
            scrub: true,
          },
        })

        // Content fade out
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -60,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '12% bottom',
            scrub: true,
          },
        })

        // Text lines fade in on load
        gsap.from('.hero-line', {
          opacity: 0,
          y: 30,
          stagger: 0.18,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
        })
      }, section)

      return () => ctx.revert()
    }

    if (video.readyState >= 1) {
      init()
    } else {
      video.addEventListener('loadedmetadata', init, { once: true })
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative" style={{ height: '600vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video element */}
        <video
          ref={videoRef}
          src="/Destino-Travels/videos/destino-hero.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
          preload="auto"
          poster="/images/hero/hero-fallback.jpg"
        />

        {/* Dark gradient overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark/60"
          style={{ opacity: 0.75 }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Hero text content */}
        <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <div className="hero-line w-0.5 h-16 bg-accent mx-auto mb-6" />
          <div className="hero-line inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-accent font-mono text-xs tracking-widest uppercase">
              ✈ Your Journey, Our Expertise
            </span>
          </div>
          <h1
            className="hero-line font-display font-semibold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            Explore the World
            <br />
            <em className="text-accent not-italic">with Destino</em>
          </h1>
          <p className="hero-line font-sans text-white/80 text-lg max-w-2xl mb-8 leading-relaxed">
            Kerala&apos;s trusted travel experts — air ticketing, visa processing,
            tour packages, hotel booking &amp; more.
          </p>
          <div className="hero-line flex flex-col sm:flex-row gap-4 items-center">
            <Button variant="primary" size="lg" href="/packages">
              Explore Packages
            </Button>
            <Button variant="outline-white" size="lg" href="tel:+919207575313">
              📞 Talk to an Expert
            </Button>
          </div>
          <div className="hero-line absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-white/50 font-mono text-xs tracking-widest uppercase">
              Scroll to explore
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent animate-bounce-slow" />
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-dark/70 backdrop-blur-sm border-t border-white/10 py-4 z-20">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: '50,000+', label: 'Tickets Booked' },
              { value: '45+', label: 'Destinations' },
              { value: '100%', label: 'Visa Success' },
              { value: '4.9★', label: 'Client Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-mono font-bold text-accent text-lg">{stat.value}</div>
                <div className="font-sans text-white/60 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
