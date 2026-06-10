import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { destinations } from '@/data/destinations'

export default function DestinationsMarquee() {
  const pills = destinations.map((d) => (
    <Link
      key={d.id}
      href={`/packages?destination=${d.slug}`}
      className="inline-flex items-center gap-2 border border-accent/30 rounded-full px-5 py-2 bg-white text-primary font-sans text-sm hover:bg-accent hover:text-dark transition-colors whitespace-nowrap shrink-0"
    >
      <span>{d.flag}</span>
      <span>{d.name}</span>
    </Link>
  ))

  return (
    <section className="py-20 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <SectionHeading title="Popular Destinations" />
      </div>

      {/* Row 1 — left to right */}
      <div className="flex gap-4 animate-marquee mb-4">
        {pills}
        {pills}
      </div>

      {/* Row 2 — right to left */}
      <div className="flex gap-4 animate-marquee-rev">
        {pills.slice().reverse()}
        {pills.slice().reverse()}
      </div>

      <div className="text-center mt-10">
        <Link href="/destinations" className="text-accent hover:underline text-sm font-medium">
          View All Destinations →
        </Link>
      </div>
    </section>
  )
}
