import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { services } from '@/data/services'
import Button from '@/components/ui/Button'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return { title: 'Service Not Found' }
  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} — Destino Travels Kerala`,
      description: service.description,
      images: [service.image],
    },
  }
}

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  return (
    <>
      <section className="relative h-[35vh] md:h-[50vh]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark/60 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl text-white font-semibold mb-2">
              {service.title}
            </h1>
            <p className="text-white/60 text-sm md:text-lg">{service.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_300px] gap-10">
            <div>
              <p className="text-base md:text-lg text-muted leading-relaxed mb-8">{service.description}</p>
              <h2 className="font-display text-xl md:text-2xl font-semibold mb-4">What We Offer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {service.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm">
                    <Check size={16} className="text-accent shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <h2 className="font-display text-xl md:text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-2.5">
                {[
                  { q: 'How long does the process take?', a: 'Processing time varies by service. Most are completed within 3–7 working days. Express processing available.' },
                  { q: 'What documents do I need?', a: 'Requirements vary by service. Our team guides you through exact documents after you get in touch.' },
                  { q: 'Do you offer emergency processing?', a: 'Yes, express/emergency processing is available for most services at an additional fee.' },
                ].map((faq, i) => (
                  <details key={i} className="bg-surface rounded-xl p-4 group cursor-pointer">
                    <summary className="font-medium text-sm md:text-base list-none flex items-center justify-between gap-2">
                      {faq.q}
                      <span className="text-accent text-xs group-open:rotate-180 transition-transform shrink-0">▼</span>
                    </summary>
                    <p className="text-sm text-muted mt-2 ml-0">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="mt-8 lg:mt-0 lg:sticky lg:top-24 self-start">
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-display text-xl font-semibold mb-3">Enquire Now</h3>
                <p className="text-white/60 text-sm mb-6">
                  Get in touch with our {service.title.toLowerCase()} experts for a free consultation.
                </p>
                <Button
                  variant="primary"
                  href={`/booking?service=${service.id}`}
                  size="md"
                  className="w-full mb-3"
                >
                  Get Free Quote
                </Button>
                <a
                  href="https://wa.me/919496259333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white rounded-full py-3 text-sm font-medium hover:bg-[#22c35e] transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
