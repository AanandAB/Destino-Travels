'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Plane, Hotel, Utensils, Bus } from 'lucide-react'
import { packages } from '@/data/packages'
import { formatPrice } from '@/lib/utils'

const inclusionIcons: Record<string, React.ReactNode> = {
  flight: <Plane size={13} className="text-accent" />,
  hotel: <Hotel size={13} className="text-accent" />,
  meal: <Utensils size={13} className="text-accent" />,
  transfer: <Bus size={13} className="text-accent" />,
  sightseeing: <Bus size={13} className="text-accent" />,
  visa: <Bus size={13} className="text-accent" />,
}

export default function PackagesClient() {
  const [sort, setSort] = useState<'popular' | 'price-low' | 'price-high'>('popular')

  const sorted = [...packages].sort((a, b) => {
    if (sort === 'price-low') return a.startingPrice - b.startingPrice
    if (sort === 'price-high') return b.startingPrice - a.startingPrice
    return b.reviewCount - a.reviewCount
  })

  return (
    <>
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-dark text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-3xl md:text-5xl text-white font-semibold mb-3">
            Tour Packages
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
            Curated travel experiences for every traveller and every budget — from Kerala to the world
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-6 md:mb-8">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="text-sm border border-gray-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
              aria-label="Sort packages"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {sorted.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/packages/${pkg.slug}`}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-44 md:h-52 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={`${pkg.title} — ${pkg.destination} tour package`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 right-3 bg-dark/80 backdrop-blur-sm text-white text-xs rounded-full px-3 py-1">
                    {pkg.duration}
                  </span>
                  {pkg.reviewCount > 200 && (
                    <span className="absolute top-3 left-3 bg-emerald text-white text-[10px] font-medium rounded-full px-2.5 py-0.5">
                      Best Seller
                    </span>
                  )}
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-display text-base md:text-lg font-semibold text-primary">
                    {pkg.flag} {pkg.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted mt-1 line-clamp-2">{pkg.description}</p>
                  <div className="flex gap-2 mt-3">
                    {pkg.inclusions.map((inc) => (
                      <span key={inc} title={inc}>{inclusionIcons[inc]}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <Star size={14} className="text-accent fill-accent" />
                    <span className="text-sm font-medium text-primary">{pkg.rating}</span>
                    <span className="text-xs text-muted">({pkg.reviewCount})</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-end justify-between">
                    <div>
                      <span className="font-mono font-bold text-accent text-lg md:text-xl">
                        {formatPrice(pkg.startingPrice)}
                      </span>
                      <span className="text-xs text-muted">/person</span>
                    </div>
                    <span className="text-xs md:text-sm text-primary font-medium group-hover:text-accent transition-colors">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
