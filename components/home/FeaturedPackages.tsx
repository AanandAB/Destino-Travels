'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Plane, Hotel, Utensils, Bus } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '@/components/ui/SectionHeading'
import { packages } from '@/data/packages'
import { formatPrice } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const inclusionIcons: Record<string, React.ReactNode> = {
  flight: <Plane size={14} className="text-accent" />,
  hotel: <Hotel size={14} className="text-accent" />,
  meal: <Utensils size={14} className="text-accent" />,
  transfer: <Bus size={14} className="text-accent" />,
  sightseeing: <Bus size={14} className="text-accent" />,
  visa: <Bus size={14} className="text-accent" />,
}

export default function FeaturedPackages() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      // Subtle drift on the title area
      gsap.to('.pkg-title-area', { y: -20, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 } })
      // Cards slowly drift up
      gsap.to('.pkg-card', { y: -10, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pkg-title-area">
          <SectionHeading title="Featured Packages" subtitle="Handpicked getaways loved by our travellers" light />
          <div className="w-16 h-0.5 bg-accent mx-auto mb-12 mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <Link key={pkg.id} href={`/packages/${pkg.slug}`} className="pkg-card group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 md:h-52 overflow-hidden">
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                {pkg.reviewCount > 200 && <span className="absolute top-3 left-3 bg-emerald text-white text-[10px] font-medium rounded-full px-2.5 py-0.5">Best Seller</span>}
                <span className="absolute top-3 right-3 bg-dark/80 backdrop-blur-sm text-white text-xs rounded-full px-3 py-1">{pkg.duration}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-primary">{pkg.flag} {pkg.title}</h3>
                <p className="text-sm text-muted mt-1 line-clamp-2">{pkg.description}</p>
                <div className="flex gap-2 mt-3">{pkg.inclusions.map(inc => <span key={inc}>{inclusionIcons[inc]}</span>)}</div>
                <div className="flex items-center gap-1 mt-3"><Star size={14} className="text-accent fill-accent" /><span className="text-sm font-medium text-primary">{pkg.rating}</span><span className="text-xs text-muted">({pkg.reviewCount})</span></div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-end justify-between"><div><span className="font-mono font-bold text-accent text-xl">{formatPrice(pkg.startingPrice)}</span><span className="text-xs text-muted">/person</span></div><span className="text-sm text-primary font-medium group-hover:text-accent">View →</span></div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12"><Link href="/packages" className="inline-flex items-center text-accent hover:underline text-sm font-medium">View All Packages →</Link></div>
      </div>
    </section>
  )
}
