import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

const visaTypes = [
  { name: 'UAE Visit Visa', flag: '🇦🇪' },
  { name: 'UK Visit Visa', flag: '🇬🇧' },
  { name: 'Schengen Visa', flag: '🇪🇺' },
  { name: 'USA Tourist Visa', flag: '🇺🇸' },
  { name: 'Student Visa', flag: '🎓' },
  { name: 'Work Permit', flag: '💼' },
]

export default function VisaSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <SectionHeading
              eyebrow="Visa Services"
              title="Visas Made"
              titleAccent="Simple"
              subtitle="We handle the paperwork so you don't have to. Tourist visas, business permits, attestation — our 100% success track record speaks."
              centered={false}
            />

            {/* Visa type cards */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {visaTypes.map((v) => (
                <Link
                  key={v.name}
                  href="/visa"
                  className="flex items-center gap-2 bg-surface rounded-xl p-3 hover:bg-accent/10 transition-colors"
                >
                  <span className="text-lg">{v.flag}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{v.name}</div>
                    <div className="text-xs text-accent">Apply →</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Button variant="primary" href="/visa" size="lg">
                Apply for Visa →
              </Button>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="relative h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="/images/services/service-visa.jpg"
                alt="Visa Services"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-accent text-dark rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-dark text-dark" />
                ))}
              </div>
              <div className="font-display font-bold text-lg">100% Visa Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
