'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import MobileNav from './MobileNav'
import { services } from '@/data/services'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/packages', label: 'Packages' },
  { href: '/visa', label: 'Visa' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    if (mobileOpen) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = '' }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHome
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 text-primary shadow-sm'
            : 'bg-transparent text-white'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Destino Tours & Travels Home">
              <Image
                src="/Destino-Travels/LOGO_TRANSPARENT.png"
                alt="Destino Tours & Travels"
                width={48}
                height={48}
                className="h-10 w-auto object-contain"
              />
              <span className="flex flex-col leading-tight">
                <span className={`font-display font-bold text-lg tracking-tight ${isScrolled || !isHome ? 'text-primary' : 'text-white'}`}>Destino</span>
                <span className={`text-[10px] tracking-[0.2em] uppercase font-medium ${isScrolled || !isHome ? 'text-primary' : 'text-white/80'}`}>TOURS &amp; TRAVELS</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary relative py-1 ${
                    pathname === link.href ? 'text-primary' : isScrolled || !isHome ? 'text-charcoal/70' : 'text-white/70'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
                  setServicesOpen(true);
                }}
                onMouseLeave={() => {
                  closeTimerRef.current = setTimeout(() => setServicesOpen(false), 200);
                }}
              >
                <button
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary py-1 ${
                    pathname.startsWith('/services') ? 'text-primary' : isScrolled || !isHome ? 'text-charcoal/70' : 'text-white/70'
                  }`}
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 mt-2 w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 transition-all duration-200 ${
                  servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}>
                  <div className="grid grid-cols-2 gap-1">
                    {services.slice(0, 14).map((s) => (
                      <Link key={s.id} href={`/services/${s.slug}`} onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-surface text-sm text-charcoal/70 hover:text-primary transition-colors">
                        <span className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center text-primary text-xs shrink-0">
                          {s.icon === 'Plane' ? '✈' : s.icon === 'BadgeCheck' ? '✓' : s.icon === 'Globe' ? '🌍' : s.icon === 'Hotel' ? '🏨' : s.icon === 'FileText' ? '📄' : s.icon === 'FileCheck' ? '📋' : s.icon === 'DollarSign' ? '💱' : s.icon === 'Shield' ? '🛡' : s.icon === 'Heart' ? '💝' : s.icon === 'Building2' ? '🕌' : s.icon === 'Bus' ? '🚌' : s.icon === 'Ship' ? '🚢' : s.icon === 'Car' ? '🚗' : s.icon === 'GraduationCap' ? '🎓' : s.icon === 'Briefcase' ? '💼' : '●'}
                        </span>
                        <span>{s.title}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <Link href="/booking" onClick={() => setServicesOpen(false)}
                      className="flex items-center justify-center gap-2 bg-primary text-white rounded-full py-2.5 text-sm font-semibold hover:bg-accent-dark transition-colors">
                      Get Free Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
              <a href="tel:+919496249333"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isScrolled || !isHome ? 'text-charcoal/60 hover:text-primary' : 'text-white/60 hover:text-white'
                }`}
                aria-label="Call Destino Tours & Travels">
                <Phone size={14} /> <span className="hidden xl:inline">94962 49333</span>
              </a>
              <Link href="/booking"
                className="bg-primary text-white rounded-full px-4 xl:px-5 py-2 text-sm font-semibold hover:bg-accent-dark transition-all">
                Book Now
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(true)} className={`lg:hidden p-2 -mr-2 ${isScrolled || !isHome ? 'text-charcoal' : 'text-white'}`}
              aria-label="Open navigation menu" aria-expanded={mobileOpen}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </>
  )
}
