'use client'
import Link from 'next/link'
import { X, Phone } from 'lucide-react'
import { services } from '@/data/services'

interface NavLink { href: string; label: string }

export default function MobileNav({ open, onClose, links }: {
  open: boolean; onClose: () => void; links: NavLink[]
}) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-dark/70 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-dark z-50 transform transition-transform duration-300 ease-out lg:hidden overflow-y-auto ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog" aria-modal="true" aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10 sticky top-0 bg-dark z-10">
          <span className="font-display text-lg text-white font-bold">Destino Travels</span>
          <button onClick={onClose} className="text-white/60 hover:text-white p-1" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col p-5 gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-white/80 hover:text-accent text-base font-medium transition-colors py-3 px-3 rounded-xl hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}

          {/* Services sub-section */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-white/40 text-xs font-semibold tracking-wider uppercase px-3 py-2">All Services</p>
            <div className="grid grid-cols-1 gap-0.5">
              {services.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  onClick={onClose}
                  className="text-white/60 hover:text-accent text-sm transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-5 border-t border-white/10 space-y-3 sticky bottom-0 bg-dark">
          <a href="tel:+919****5313" className="flex items-center justify-center gap-2 text-white bg-white/10 rounded-xl py-3 text-sm font-medium hover:bg-white/15 transition-colors">
            <Phone size={16} /> +91 92075 75313
          </a>
          <a href="https://wa.me/919207575313" className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-3 text-sm font-medium hover:bg-[#22c35e] transition-colors">
            💬 WhatsApp Us
          </a>
          <Link href="/booking" onClick={onClose} className="flex items-center justify-center gap-2 bg-accent text-dark rounded-xl py-3 text-sm font-medium hover:bg-accent-light transition-colors">
            ✈ Book Now
          </Link>
        </div>
      </div>
    </>
  )
}
