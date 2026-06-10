'use client'
import Link from 'next/link'
import { Plane, FileCheck, GraduationCap, ArrowRight, MessageCircle, Phone } from 'lucide-react'

const quickActions = [
  { icon: Plane, label: 'Flights & Visas', href: '/services/flight-tickets', color: 'bg-primary' },
  { icon: FileCheck, label: 'Passport & Attestation', href: '/services/passport-services', color: 'bg-primary' },
  { icon: GraduationCap, label: 'Umrah & Holidays', href: '/services/umrah-services', color: 'bg-primary' },
]

export default function SearchBar() {
  return (
    <div className="mx-auto max-w-4xl px-4 relative z-30">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-7">
        <p className="text-center text-sm text-muted font-medium mb-4">
          What do you need help with today?
        </p>

        {/* Quick action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {quickActions.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-surface hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                <Icon size={18} />
              </div>
              <span className="text-sm font-medium text-charcoal group-hover:text-primary transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* Contact row */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-3 border-t border-gray-100">
          <a
            href="https://wa.me/919207575313"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#22c35e] transition-colors"
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>
          <a
            href="tel:+919****9333"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-accent-dark transition-colors"
          >
            <Phone size={16} />
            Call Now
          </a>
          <span className="text-xs text-muted">or</span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
          >
            Send Full Enquiry <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
