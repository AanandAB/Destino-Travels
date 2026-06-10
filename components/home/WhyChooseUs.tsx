'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Check, Plane, Globe, BadgeCheck, Calendar } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '@/components/ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Plane, value: '50,000+', label: 'Tickets Booked' },
  { icon: Globe, value: '45+', label: 'Destinations' },
  { icon: BadgeCheck, value: '100%', label: 'Visa Success Rate' },
  { icon: Calendar, value: '14+', label: 'Years Experience' },
]

const uspList = ['IATA Certified Agency','GST Registered Business','24/7 Customer Support','Best Price Guarantee','Free Consultation','EMI Payment Options']

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.to('.why-img', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[520px]">
            <div className="why-img absolute inset-0 h-[130%] -top-[15%] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/about/about-office.jpg" alt="Destino Travels Office" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent text-dark rounded-2xl p-5 shadow-xl max-w-[220px] z-10">
              <div className="font-mono text-3xl font-bold">50K+</div><div className="text-sm font-medium mt-1">Happy Travellers</div><div className="text-xs text-dark/60 mt-1">Trusted since 2010</div>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Why Destino" title="Trusted by 50,000+" titleAccent="Happy Travellers" subtitle="With over 14 years serving Kerala, Destino Travels offers expert guidance, competitive pricing, and 15+ travel services." centered={false} />
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map(s => { const I = s.icon; return (<div key={s.label} className="bg-surface rounded-2xl p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><I size={20} className="text-accent" /></div><div><div className="font-mono text-xl font-bold text-accent">{s.value}</div><div className="text-xs text-muted">{s.label}</div></div></div>)})}
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-8 pt-8 border-t border-gray-100">
              {uspList.map(item => (<div key={item} className="flex items-center gap-2.5 text-sm text-primary/80"><Check size={16} className="text-accent shrink-0" /> {item}</div>))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
