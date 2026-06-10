'use client'
import { useEffect, useRef } from 'react'
import { Search, FileText, Plane } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '@/components/ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { number: '01', icon: Search, title: 'Tell Us Your Dream', description: 'Share your destination, dates, and preferences with our travel experts.' },
  { number: '02', icon: FileText, title: 'Get Your Custom Quote', description: 'We craft the perfect itinerary with transparent pricing — no hidden costs, ever.' },
  { number: '03', icon: Plane, title: 'Pack & Enjoy', description: 'We handle everything — bookings, visas, insurance. You just pack and create memories.' },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.to('.step-card', { y: -15, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="How It Works" subtitle="Book your dream trip in 3 simple steps" light />
        <div className="grid md:grid-cols-3 gap-8 relative mt-16">
          <div className="hidden md:block absolute top-16 left-[18%] right-[18%] h-px bg-gradient-to-r from-accent/40 via-accent/20 to-accent/40" />
          {steps.map((s, i) => { const I = s.icon; return (
            <div key={i} className="step-card relative text-center">
              <div className="text-[7rem] font-display font-bold text-accent/[0.06] absolute inset-0 flex items-center justify-center select-none leading-none">{s.number}</div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto bg-accent/15 rounded-2xl flex items-center justify-center mb-6"><I size={30} className="text-accent" /></div>
                <h3 className="font-display text-xl text-white font-semibold mb-3">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">{s.description}</p>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}
