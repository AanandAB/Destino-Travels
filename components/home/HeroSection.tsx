'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const heroImages = [
  { src: '/Destino-Travels/images/hero/hero-1.jpg', alt: 'Maldives Aerial Ocean View' },
  { src: '/Destino-Travels/images/hero/hero-2.jpg', alt: 'Kerala Backwaters at Sunset' },
  { src: '/Destino-Travels/images/hero/hero-3.jpg', alt: 'Dubai Skyline at Night' },
]

const stats = [
  { value: '50,000+', label: 'Tickets Booked' },
  { value: '45+', label: 'Destinations' },
  { value: '100%', label: 'Visa Success' },
  { value: '4.9★', label: 'Client Rating' },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const nextSlide = useCallback(() => setCurrent((prev) => (prev + 1) % heroImages.length), [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  // GSAP: text entrance + background parallax
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Text entrance
      gsap.set('.hero-line', { opacity: 1 })
      gsap.from('.hero-line', { opacity: 0, y: 40, stagger: 0.15, duration: 1, delay: 0.2, ease: 'power3.out' })

      // Parallax on all hero background images
      gsap.to('.hero-bg-img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // Content shift opposite direction
      gsap.to('.hero-content-container', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // Stats strip parallax
      gsap.to('.hero-stats', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" aria-label="Hero banner">
      {heroImages.map((img, i) => (
        <div key={img.src} className="hero-bg-img absolute inset-0 h-[120%] -top-[10%] transition-opacity duration-[1.5s]"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }} aria-hidden={i !== current}>
          <Image src={img.src} alt={img.alt} fill className="object-cover" priority={i === 0} loading={i === 0 ? undefined : 'lazy'} sizes="100vw" quality={85} />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/30 to-dark/85 z-[1]" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="hero-content-container absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-[5]">
        <div className="hero-line w-0.5 h-12 md:h-16 bg-accent mx-auto mb-4 md:mb-6" />
        <div className="hero-line inline-flex items-center gap-2 bg-accent/15 backdrop-blur-sm border border-accent/30 rounded-full px-4 md:px-5 py-1.5 md:py-2 mb-4 md:mb-6">
          <span className="text-accent font-mono text-[10px] md:text-xs tracking-[0.15em] uppercase">✈ Your Journey, Our Expertise</span>
        </div>
        <h1 className="hero-line font-display font-semibold text-white leading-[1.1] mb-4 md:mb-5 tracking-tight" style={{ fontSize: 'clamp(2rem, 6vw, 6rem)' }}>
          Mark Your<br /><em className="text-accent not-italic">Destination</em>
        </h1>
        <p className="hero-line font-sans text-white/70 md:text-white/80 text-sm md:text-lg max-w-md md:max-w-2xl mb-6 md:mb-8 leading-relaxed px-2">
          Kerala&apos;s trusted travel partner — air ticketing, visa processing, tour packages &amp; 15+ travel services under one roof.
        </p>
        <div className="hero-line flex flex-col sm:flex-row gap-3 md:gap-4 items-center">
          <Button variant="primary" size="lg" href="/packages">Explore Packages</Button>
          <Button variant="outline-white" size="lg" href="tel:+919****5313">📞 Talk to an Expert</Button>
        </div>
        <div className="hero-line absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/50 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase">Scroll to explore</span>
          <div className="w-px h-8 md:h-10 bg-gradient-to-b from-accent to-transparent animate-bounce-slow" />
        </div>
      </div>

      <div className="hero-stats absolute bottom-0 left-0 right-0 bg-dark/60 backdrop-blur-md border-t border-white/10 py-3 md:py-5 z-[10]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center">
          {stats.map(s => (<div key={s.label}><div className="font-mono font-bold text-accent text-base md:text-xl">{s.value}</div><div className="font-sans text-white/50 text-[10px] md:text-[11px] tracking-wider uppercase mt-0.5 md:mt-1">{s.label}</div></div>))}
        </div>
      </div>

      <div className="absolute bottom-20 md:bottom-28 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-[10]">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all duration-500 ${i === current ? 'bg-accent w-5 md:w-6' : 'bg-white/30 hover:bg-white/50'}`} aria-label={`Slide ${i+1} of ${heroImages.length}`} />
        ))}
      </div>
    </section>
  )
}
