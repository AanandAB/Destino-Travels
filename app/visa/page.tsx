import type { Metadata } from 'next'
import Image from 'next/image'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Visa Services',
  description: 'Tourist visa, business visa, student visa processing for 50+ countries. UAE, UK, USA, Schengen & more. 100% success rate. Apply online.',
  openGraph: {
    title: 'Visa Services — 100% Success Rate | Destino Travels',
    description: 'Hassle-free visa processing for 50+ countries. UAE, UK, USA, Schengen, Australia & more.',
  },
}

const countryVisas = [
  { country: 'UAE', flag: '🇦🇪', type: 'Tourist / Visit', days: '3-5 days', fee: '₹4,999' },
  { country: 'UK', flag: '🇬🇧', type: 'Visitor / Business', days: '7-10 days', fee: '₹12,999' },
  { country: 'USA', flag: '🇺🇸', type: 'Tourist / Business', days: '10-15 days', fee: '₹15,999' },
  { country: 'Schengen', flag: '🇪🇺', type: 'Tourist / Business', days: '10-15 days', fee: '₹8,999' },
  { country: 'Canada', flag: '🇨🇦', type: 'Visitor / Student', days: '10-20 days', fee: '₹15,999' },
  { country: 'Australia', flag: '🇦🇺', type: 'Visitor / Student', days: '10-15 days', fee: '₹14,999' },
  { country: 'Singapore', flag: '🇸🇬', type: 'Tourist / Business', days: '3-5 days', fee: '₹3,999' },
  { country: 'Malaysia', flag: '🇲🇾', type: 'Tourist / e-Visa', days: '2-3 days', fee: '₹2,999' },
]

export default function VisaPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-5xl text-white font-semibold mb-3">
            Visa Services
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            Hassle-free visa processing for 50+ countries with a 100% success rate. Tourist, business, student & work visas.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Select Your Destination" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {countryVisas.map((v) => (
              <div key={v.country} className="bg-white rounded-2xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{v.flag}</span>
                  <h3 className="font-display text-lg font-semibold">{v.country}</h3>
                </div>
                <div className="space-y-1.5 text-sm text-muted">
                  <div className="flex justify-between"><span>Type</span><span className="text-primary">{v.type}</span></div>
                  <div className="flex justify-between"><span>Processing</span><span className="text-primary">{v.days}</span></div>
                  <div className="flex justify-between"><span>Starts at</span><span className="font-mono text-accent font-bold">{v.fee}</span></div>
                </div>
                <Button variant="primary" size="sm" href="/booking?service=visa-services" className="w-full mt-4">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Documents Required" subtitle="Our team helps you gather and verify every document" />
          <div className="grid sm:grid-cols-2 gap-2.5 mt-10">
            {[
              'Valid passport (6+ months validity)',
              'Recent passport-size photographs',
              'Completed visa application form',
              'Travel itinerary / flight bookings',
              'Hotel reservation confirmation',
              'Bank statements (last 3 months)',
              'Income tax returns (last 3 years)',
              'Employment letter / NOC',
            ].map((doc) => (
              <div key={doc} className="flex items-center gap-2.5 text-sm">
                <Check size={16} className="text-accent shrink-0" /> {doc}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-white font-semibold mb-3">
            Ready to Apply?
          </h2>
          <p className="text-white/60 mb-8">Our visa experts guide you through the entire process — from documents to stamping.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" href="/booking?service=visa-services">
              Start Visa Application
            </Button>
            <Button variant="outline-white" size="lg" href="tel:+919****5313">
              📞 Call an Expert
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
