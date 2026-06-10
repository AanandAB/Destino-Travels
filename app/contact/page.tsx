'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactMap from '@/components/shared/ContactMap'

const phones = [
  { num: '9496249333', label: '94962 49333' },
  { num: '9207575313', label: '92075 75313' },
  { num: '7025882465', label: '70258 82465' },
  { num: '9207574313', label: '92075 74313' },
  { num: '04602259333', label: '0460 225 9333' },
]

const serviceOptions = [
  'Flight Tickets', 'Tourist Visa', 'Umrah Services',
  'Passport Services', 'Visa Stamping', 'Bus & Train Ticket',
  'Holiday Packages', 'Emigration', 'Attestation',
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '', message: ''
  })

  const whatsappNumber = '919496259333'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, phone: ph, email, service, message } = form

    const msgLines = [
      `*Destino Enquiry*`,
      ``,
      `*Name:* ${name}`,
      `*Phone:* ${ph}`,
      `*Email:* ${email}`,
      `*Service:* ${service || 'Not specified'}`,
      `*Message:* ${message || '—'}`,
      ``,
      `_Sent from destinotravels.in_`,
    ]
    const msgBody = encodeURIComponent(msgLines.join('\n'))

    setSent(true)
    window.open(`https://wa.me/${whatsappNumber}?text=${msgBody}`, '_blank')
  }

  return (
    <>
      <section className="pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Let's Plan Your Trip"
            subtitle="Call, WhatsApp, or visit us — real people, real support from Irikkur, Kannur."
          />

          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 mt-12">
            {/* Contact Form */}
            <div>
              {sent ? (
                <div className="bg-surface rounded-2xl p-8 text-center border border-primary/20">
                  <Check size={48} className="mx-auto mb-4 text-primary" />
                  <h3 className="font-display text-2xl font-bold text-primary mb-2">
                    WhatsApp Opened!
                  </h3>
                  <p className="text-muted text-sm mb-4">
                    If WhatsApp didn&apos;t open, click below to send your enquiry manually.
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to enquire about your travel services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:bg-[#22c35e] transition-colors"
                  >
                    💬 Open WhatsApp
                  </a>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-charcoal">Name</label>
                    <input
                      id="name" type="text" required value={form.name} onChange={handleChange}
                      className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 mt-1 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-charcoal">Email</label>
                      <input
                        id="email" type="email" required value={form.email} onChange={handleChange}
                        className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 mt-1 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium text-charcoal">Phone</label>
                      <input
                        id="phone" type="tel" required value={form.phone} onChange={handleChange}
                        className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 mt-1 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="service" className="text-sm font-medium text-charcoal">Service Interested In</label>
                    <select
                      id="service" value={form.service} onChange={handleChange}
                      className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 mt-1 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    >
                      <option value="">Select service</option>
                      {serviceOptions.map(s => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="text-sm font-medium text-charcoal">Message (optional)</label>
                    <textarea
                      id="message" rows={4} value={form.message} onChange={handleChange}
                      className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 mt-1 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                      placeholder="Tell us about your travel plans..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white rounded-full py-3.5 font-semibold hover:bg-accent-dark transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Send via WhatsApp
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info + Map */}
            <div className="space-y-5">
              <div className="bg-primary text-white rounded-2xl p-6 md:p-8 space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">Contact Information</h3>

                {/* Phone grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {phones.map(p => (
                    <a key={p.num} href={`tel:+91${p.num}`}
                      className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm bg-white/10 rounded-xl p-3">
                      <Phone size={16} className="text-white shrink-0" /> {p.label}
                    </a>
                  ))}
                </div>

                <a href="mailto:support@destinotravels.in" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm">
                  <Mail size={18} className="text-white shrink-0" /> support@destinotravels.in
                </a>

                <div className="flex items-start gap-3 text-white/70 text-sm">
                  <MapPin size={18} className="text-white shrink-0 mt-0.5" />
                  <span>Near Canara Bank, Iritty Road, Irikkur, Kannur, Kerala</span>
                </div>

                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Clock size={18} className="text-white shrink-0" /> Mon–Sat: 9 AM – 8 PM IST
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <a href="tel:+919****9333" className="flex-1 bg-white text-primary rounded-full py-3 text-sm font-medium text-center hover:bg-white/90 transition-colors">
                    📞 Call Now
                  </a>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] text-white rounded-full py-3 text-sm font-medium text-center hover:bg-[#22c35e] transition-colors">
                    💬 WhatsApp
                  </a>
                </div>
              </div>
              <ContactMap />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
