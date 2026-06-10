import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Star, Plane, Hotel, Utensils, Bus, Clock, MapPin } from 'lucide-react'
import { packages } from '@/data/packages'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pkg = packages.find((p) => p.slug === params.slug)
  if (!pkg) return { title: 'Package Not Found' }
  return {
    title: pkg.title,
    description: pkg.description,
    openGraph: {
      title: `${pkg.title} — ${formatPrice(pkg.startingPrice)} | Destino Travels`,
      description: pkg.description,
      images: [pkg.image],
    },
  }
}

export default function PackageDetail({ params }: { params: { slug: string } }) {
  const pkg = packages.find((p) => p.slug === params.slug)
  if (!pkg) notFound()

  return (
    <>
      <section className="pt-24 md:pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_360px] gap-10">
            {/* Main */}
            <div>
              <div className="relative h-64 md:h-[420px] rounded-2xl overflow-hidden mb-6 md:mb-8">
                <Image
                  src={pkg.image}
                  alt={`${pkg.title} — ${pkg.destination}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <span className="absolute top-4 right-4 bg-accent text-dark text-sm font-medium rounded-full px-4 py-1.5">
                  {pkg.duration}
                </span>
              </div>

              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
                {pkg.flag} {pkg.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-6">
                <span className="flex items-center gap-1"><MapPin size={14} /> {pkg.destination}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {pkg.duration}</span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-accent fill-accent" />
                  {pkg.rating} ({pkg.reviewCount} reviews)
                </span>
              </div>

              <p className="text-muted mb-8">{pkg.description}</p>

              <h2 className="font-display text-xl md:text-2xl font-semibold mb-6">Day-by-Day Itinerary</h2>
              <div className="space-y-1">
                {pkg.itinerary.map((day, i) => (
                  <div key={day.day} className="flex gap-3 md:gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent font-mono font-bold text-sm">
                        {day.day}
                      </div>
                      {i < pkg.itinerary.length - 1 && (
                        <div className="w-px flex-1 bg-accent/20 mt-1" />
                      )}
                    </div>
                    <div className="pb-5 md:pb-6">
                      <h3 className="font-display text-base md:text-lg font-semibold">{day.title}</h3>
                      <p className="text-muted text-sm mt-1">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="mt-8 lg:mt-0">
              <div className="lg:sticky lg:top-24 bg-white border border-gray-100 rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="font-mono text-3xl font-bold text-accent">
                    {formatPrice(pkg.startingPrice)}
                  </div>
                  <span className="text-sm text-muted">per person</span>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Plane, text: 'Round-trip flights' },
                    { icon: Hotel, text: `${pkg.duration.split('N')[0]} nights accommodation` },
                    { icon: Utensils, text: 'Daily breakfast' },
                    { icon: Bus, text: 'Airport transfers' },
                  ].map((item, i) => {
                    const I = item.icon
                    return (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted">
                        <I size={15} className="text-accent shrink-0" /> {item.text}
                      </div>
                    )
                  })}
                </div>

                <Button variant="primary" href={`/booking?package=${pkg.slug}`} size="lg" className="w-full mb-3">
                  Book Now
                </Button>
                <a
                  href={`https://wa.me/919207575313?text=I'm%20interested%20in%20the%20${encodeURIComponent(pkg.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white rounded-full py-3 text-sm font-medium hover:bg-[#22c35e] transition-colors"
                >
                  💬 WhatsApp Enquiry
                </a>

                <div className="flex justify-center gap-4 mt-4 text-[11px] text-muted">
                  <span>🏷 IATA Certified</span>
                  <span>🛡 GST Registered</span>
                  <span>🔒 Secure Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
