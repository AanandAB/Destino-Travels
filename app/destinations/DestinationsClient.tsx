'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { destinations } from '@/data/destinations'
import { formatPrice } from '@/lib/utils'

const categories = ['All', 'beach', 'city', 'nature', 'mountain', 'heritage']

export default function DestinationsClient() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = destinations.filter((d) => {
    const catMatch = filter === 'All' || d.category === filter
    const searchMatch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase())
    return catMatch && searchMatch
  })

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[55vh] bg-dark">
        <Image
          src="/Destino-Travels/images/destinations/dest-maldives.jpg"
          alt="Explore worldwide destinations with Destino Travels"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-white font-semibold mb-3">
              Explore Destinations
            </h1>
            <p className="text-white/60 text-base md:text-lg">45+ handpicked destinations worldwide</p>
          </div>
        </div>
      </section>

      {/* Sticky filters */}
      <div className="sticky top-[64px] md:top-[80px] bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 md:py-4 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm transition-colors ${
                    filter === cat
                      ? 'bg-accent text-dark font-medium'
                      : 'bg-surface text-muted hover:bg-accent/10'
                  }`}
                >
                  {cat === 'All' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-56">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/50" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 bg-white"
                aria-label="Search destinations"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-8 md:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/packages?destination=${dest.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-40 md:h-56 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={`${dest.name}, ${dest.country} — travel destination`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3">
                      <div className="text-white font-display text-base md:text-lg font-semibold leading-tight">
                        {dest.flag} {dest.name}
                      </div>
                      <div className="text-white/60 text-xs">{dest.country} · {dest.duration}</div>
                    </div>
                    <span className="absolute top-2 right-2 bg-accent text-dark text-xs font-medium rounded-full px-2.5 py-1">
                      {formatPrice(dest.startingPrice)}
                    </span>
                    {dest.popular && (
                      <span className="absolute top-2 left-2 bg-emerald text-white text-[10px] font-medium rounded-full px-2 py-0.5">
                        Popular
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted text-lg">No destinations found.</p>
              <button onClick={() => { setFilter('All'); setSearch('') }} className="text-accent text-sm mt-2 hover:underline">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
