'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.to('.cta-inner', { yPercent: -5, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }, section)
    return () => ctx.revert()
  }, [])

  const waNumber = '919207575313'

  return (
    <section ref={sectionRef} className="bg-accent pt-28 pb-16" style={{ clipPath: 'polygon(0 8%, 100% 0%, 100% 100%, 0% 100%)' }}>
      <div className="cta-inner max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-4">Ready to Travel?</h2>
        <p className="text-dark/70 text-lg max-w-xl mx-auto mb-8">
          Talk to our experts — free consultation, instant quotes, real support from Irikkur, Kannur.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button variant="primary" href="tel:+919****9333" size="lg" className="bg-dark text-white hover:bg-dark/90">
            📞 Call Now
          </Button>
          <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-8 py-4 text-lg font-medium hover:bg-[#22c35e] transition-colors">
            💬 WhatsApp Us
          </a>
        </div>
        <p className="mt-6 text-dark/60 text-sm">
          Or email <a href="mailto:support@destinotravels.in" className="underline">support@destinotravels.in</a>
        </p>
      </div>
    </section>
  )
}
