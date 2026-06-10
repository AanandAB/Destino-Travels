import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Instagram, ChevronRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { services } from '@/data/services'

const quickLinks = [
  { href: '/destinations', label: 'Destinations' },
  { href: '/packages', label: 'Tour Packages' },
  { href: '/visa', label: 'Visa Services' },
  { href: '/booking', label: 'Book Now' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Top accent bar */}
      <div className="h-1 bg-white/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal stagger={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: Brand + Contact */}
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="font-display font-bold text-2xl tracking-tight text-white">
                  Destino
                </span>
                <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase font-medium">TOURS &amp; TRAVELS</span>
              </Link>
              <p className="mt-4 text-white/60 text-sm leading-relaxed">
                Kerala&apos;s trusted travel partner — 9 travel services, thousands of happy travellers, and a passion for creating unforgettable journeys from Irikkur, Kannur.
              </p>

              <div className="mt-6 space-y-2.5">
                <a href="tel:+919****5313" className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors">
                  <Phone size={14} className="text-white shrink-0" /> 92075 75313
                </a>
                <a href="mailto:support@destinotravels.in" className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors">
                  <Mail size={14} className="text-white shrink-0" /> support@destinotravels.in
                </a>
                <div className="flex items-start gap-2.5 text-white/60 text-sm">
                  <MapPin size={14} className="text-white shrink-0 mt-0.5" /> Near Canara Bank, Iritty Road, Irikkur, Kannur, Kerala
                </div>
                <div className="flex items-center gap-2.5 text-white/60 text-sm">
                  <Clock size={14} className="text-white shrink-0" /> Mon–Sat: 9 AM – 8 PM IST
                </div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-5 text-white">Quick Links</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1.5 group">
                      <ChevronRight size={12} className="text-white/30 group-hover:text-white transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: All Services */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-5 text-white">Our Services</h4>
              <ul className="space-y-1.5">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={`/services/${s.slug}`} className="text-white/50 hover:text-white text-sm transition-colors">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Social + CTAs */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-5 text-white">Follow Us</h4>
              <div className="flex gap-3 mb-6">
                <a href="https://instagram.com/destino_irikkur" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/50 hover:text-white transition-all" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
              </div>

              <div className="space-y-2.5">
                <a href="https://wa.me/919496259333" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-2.5 text-sm font-medium hover:bg-[#22c35e] transition-colors w-full">
                  💬 WhatsApp Us
                </a>
                <Link href="/booking"
                  className="flex items-center justify-center gap-2 bg-white text-primary rounded-xl py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors w-full">
                  ✈ Book Now
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Destino Tours &amp; Travels, Irikkur, Kannur. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-white/30 text-xs">
            <span>GST Registered</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>IATA Certified</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
