import type { Metadata } from 'next'
import Image from 'next/image'
import SectionHeading from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'About Us',
  description: "Destino Travels — Kerala's trusted travel agency since 2010. IATA certified, 50,000+ happy travellers, 15+ services under one roof.",
}

const milestones = [
  { year: '2010', text: 'Founded in Kerala with a mission to make travel accessible to everyone' },
  { year: '2015', text: 'Reached 10,000 happy customers across South India' },
  { year: '2020', text: 'Launched digital platform for seamless online bookings' },
  { year: '2024', text: '50,000+ tickets booked, 45+ destinations, 15+ services, IATA certified' },
]

const team = [
  { name: 'Mohammed Rafi', role: 'Founder & Director', avatar: '/images/testimonials/avatar-3.jpg' },
  { name: 'Aisha Beevi', role: 'Visa Processing Head', avatar: '/images/testimonials/avatar-2.jpg' },
  { name: 'Rahul Nair', role: 'Tour Operations Manager', avatar: '/images/testimonials/avatar-1.jpg' },
  { name: 'Fathima Rinsa', role: 'Customer Relations Lead', avatar: '/images/testimonials/avatar-6.jpg' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[40vh] md:h-[55vh]">
        <Image
          src="/Destino-Travels/images/about/about-team.jpg"
          alt="Destino Travels team in Kerala"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark/60 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-white font-semibold mb-3">
              About Destino Travels
            </h1>
            <p className="text-white/60 text-base md:text-lg">Your journey, our expertise since 2010</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="14+ Years of"
                titleAccent="Travel Excellence"
                subtitle="Founded in 2010 in the heart of Kerala, Destino Travels began with a simple mission: make world-class travel accessible to everyone. What started as a small office with 2 people has grown into Kerala's most trusted travel agency."
                centered={false}
              />
              <p className="text-muted mt-4 text-sm md:text-base">
                Today, we serve thousands of clients across India and the globe, offering 15+ travel services — 
                from air ticketing to Umrah packages, passport assistance to corporate travel management.
              </p>
            </div>
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/Destino-Travels/images/about/about-office.jpg"
                alt="Destino Travels office in Kerala"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl text-white font-semibold mb-4">Our Mission</h2>
          <p className="text-accent text-lg md:text-xl font-display italic leading-relaxed">
            &ldquo;To make every journey unforgettable through expert guidance, transparent pricing, 
            and genuine care for every traveller who walks through our doors.&rdquo;
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Meet Our Team" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden ring-2 ring-accent mb-4">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="96px"
                  />
                </div>
                <h3 className="font-display text-base md:text-lg font-semibold">{member.name}</h3>
                <p className="text-xs md:text-sm text-accent">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading title="Our Journey" />
          <div className="mt-10 space-y-6">
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-4 md:gap-6 items-start">
                <div className="shrink-0 w-16 md:w-20 text-right">
                  <span className="font-mono text-xl md:text-2xl font-bold text-accent">{m.year}</span>
                </div>
                <div className="relative pl-5 md:pl-6 border-l-2 border-accent/30 pb-6">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
                  <p className="text-muted text-sm md:text-base">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-surface text-center">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Certifications & Memberships" />
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-10">
            {[
              { label: 'IATA Certified', icon: '✈' },
              { label: 'GST Registered', icon: '🇮🇳' },
              { label: 'TAAI Member', icon: '🌍' },
              { label: 'Kerala Tourism Approved', icon: '🌴' },
            ].map((cert) => (
              <div key={cert.label} className="bg-white rounded-2xl p-5 md:p-6 w-36 md:w-44 text-center hover:shadow-md transition-shadow">
                <div className="text-2xl md:text-3xl mb-2">{cert.icon}</div>
                <div className="text-xs md:text-sm font-medium text-primary">{cert.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
