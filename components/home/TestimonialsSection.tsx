'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '@/components/ui/SectionHeading'
import { testimonials } from '@/data/testimonials'

gsap.registerPlugin(ScrollTrigger)

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.to('.testimonial-card', { y: -8, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="What Our Clients Say" subtitle="Real stories from real travellers who trusted Destino" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-14">
          {testimonials.map(t => (
            <div key={t.id} className="testimonial-card bg-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-lg transition-shadow">
              <Quote size={36} className="text-accent/20 -mt-1" />
              <p className="text-primary/80 text-sm italic mt-2 leading-relaxed">&ldquo;{t.review}&rdquo;</p>
              <div className="flex items-center gap-3 mt-5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-accent shrink-0">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="44px" loading="lazy" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-primary">{t.name}</div>
                  <div className="text-xs text-muted">{t.location} — {t.destination}</div>
                  <div className="flex gap-0.5 mt-0.5">{[...Array(t.rating)].map((_, i) => <Star key={i} size={10} className="text-accent fill-accent" />)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
