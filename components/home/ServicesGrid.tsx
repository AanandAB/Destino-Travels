import Link from 'next/link'
import Image from 'next/image'
import { Plane, BadgeCheck, Globe, Hotel, FileText, FileCheck, DollarSign, Shield, Heart, Building2, Bus, Ship, Car, GraduationCap, Briefcase, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { services } from '@/data/services'

const iconMap: Record<string, React.ReactNode> = {
  Plane: <Plane size={28} />, BadgeCheck: <BadgeCheck size={28} />, Globe: <Globe size={28} />,
  Hotel: <Hotel size={28} />, FileText: <FileText size={28} />, FileCheck: <FileCheck size={28} />,
  DollarSign: <DollarSign size={28} />, Shield: <Shield size={28} />, Heart: <Heart size={28} />,
  Building2: <Building2 size={28} />, Bus: <Bus size={28} />, Ship: <Ship size={28} />,
  Car: <Car size={28} />, GraduationCap: <GraduationCap size={28} />, Briefcase: <Briefcase size={28} />,
}

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          title="Complete Travel Services"
          subtitle="From flights to pilgrimages — everything under one roof"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-16">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-accent/30 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent" />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white bg-accent rounded-full px-4 py-2 text-xs font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1">
                    Learn More <ArrowRight size={12} />
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-accent/80 group-hover:text-accent transition-colors">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="font-display text-base font-semibold text-primary group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-xs text-muted leading-relaxed line-clamp-2 flex-1">
                  {service.subtitle}
                </p>
              </div>

              <div className="h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-muted mb-3">Need help choosing the right service?</p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-accent text-dark rounded-full px-6 py-3 text-sm font-medium hover:bg-accent-light transition-colors"
          >
            Get Free Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}
