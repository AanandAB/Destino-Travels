'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronRight } from 'lucide-react'
import { enquirySchema, type EnquiryInput } from '@/lib/validations'
import { submitEnquiry } from '@/lib/api'
import Button from '@/components/ui/Button'

const STEPS = ['Trip Details', 'Your Details', 'Confirm']

export default function BookingPage() {
  const [step, setStep] = useState(1)

  return (
    <section className="pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="font-display text-3xl md:text-4xl text-center font-semibold mb-2">
          Plan Your Journey
        </h1>
        <p className="text-muted text-center mb-10">Fill in your details and our team will get back within 2 hours.</p>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {STEPS.map((label, i) => {
            const stepNum = i + 1
            const isActive = stepNum === step
            const isDone = stepNum < step
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    isActive ? 'bg-accent text-dark' : isDone ? 'bg-primary text-white' : 'border-2 border-muted text-muted'
                  }`}
                >
                  {isDone ? <Check size={14} /> : stepNum}
                </div>
                <span className={`text-xs hidden sm:inline ${isActive ? 'text-accent font-medium' : 'text-muted'}`}>
                  {label}
                </span>
                {i < 2 && <div className={`w-8 h-px ${stepNum < step ? 'bg-accent' : 'bg-muted'}`} />}
              </div>
            )
          })}
        </div>

        {/* Form content */}
        <BookingFormContent step={step} setStep={setStep} />
      </div>
    </section>
  )
}

function BookingFormContent({ step, setStep }: { step: number; setStep: (s: number) => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reference, setReference] = useState('')
  const [tripDetails, setTripDetails] = useState({
    serviceType: '',
    journeyType: 'Round Trip',
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    travelClass: 'Economy',
    adults: 1,
    children: 0,
    infants: 0,
  })

  const form = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      requirements: '',
      source: '',
    },
  })

  const next = () => setStep(Math.min(step + 1, 3))
  const prev = () => setStep(Math.max(step - 1, 1))

  const handleSubmit = async (data: EnquiryInput) => {
    setLoading(true)

    // Build WhatsApp message
    const msgParts = [
      `*Destino Booking Enquiry*`,
      ``,
      `*Trip Details:*`,
      `Service: ${tripDetails.serviceType || 'Not specified'}`,
      `Journey: ${tripDetails.journeyType}`,
      `From: ${tripDetails.from || '—'} → To: ${tripDetails.to || '—'}`,
      `Departure: ${tripDetails.departureDate || '—'}  |  Return: ${tripDetails.returnDate || '—'}`,
      `Class: ${tripDetails.travelClass}  |  Adults: ${tripDetails.adults}  Kids: ${tripDetails.children}  Infants: ${tripDetails.infants}`,
      ``,
      `*Traveller Details:*`,
      `Name: ${data.fullName}`,
      `Mobile: ${data.mobile}`,
      `Email: ${data.email}`,
      `City: ${data.city || '—'}`,
      `Requirements: ${data.requirements || '—'}`,
      `Source: ${data.source || '—'}`,
      ``,
      `_Sent from destinotravels.in_`,
    ]
    const waMessage = encodeURIComponent(msgParts.join('\n'))
    window.open(`https://wa.me/919496259333?text=${waMessage}`, '_blank')

    // Also try API for logging
    try {
      const res = await submitEnquiry({ ...data, ...tripDetails })
      setReference(res.reference || 'DT-' + Date.now().toString().slice(-8))
    } catch {
      // WhatsApp already opened — enquiry still sent
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto bg-accent/15 rounded-full flex items-center justify-center mb-6">
          <Check size={40} className="text-accent" />
        </div>
        <h2 className="font-display text-2xl font-semibold mb-2">Enquiry Received!</h2>
        <p className="text-muted mb-6">
          Our team will call you within 2 hours.{reference && ` Reference: ${reference}`}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" href="/">
            Back to Home
          </Button>
          <a
            href="https://wa.me/919496259333"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full px-8 py-4 text-lg font-medium"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="font-display text-xl font-semibold">Trip Details</h2>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Service Type</label>
            <select
              value={tripDetails.serviceType}
              onChange={(e) => setTripDetails({ ...tripDetails, serviceType: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="">Select service</option>
              <option value="flight-tickets">Flight Tickets</option>
              <option value="tourist-visa">Tourist Visa</option>
              <option value="umrah-services">Umrah Services</option>
              <option value="passport-services">Passport Services</option>
              <option value="visa-stamping">Visa Stamping</option>
              <option value="bus-train-ticket">Bus & Train Ticket</option>
              <option value="holidays">Holiday Packages</option>
              <option value="emigration">Emigration</option>
              <option value="attestation">Certificate Attestation</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Journey Type</label>
            <div className="flex gap-2">
              {['One Way', 'Round Trip'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTripDetails({ ...tripDetails, journeyType: t })}
                  className={`px-5 py-2 rounded-full text-sm transition-colors ${
                    tripDetails.journeyType === t
                      ? 'bg-accent text-dark font-medium'
                      : 'border border-gray-200 hover:border-accent'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">From</label>
              <input
                type="text"
                value={tripDetails.from}
                onChange={(e) => setTripDetails({ ...tripDetails, from: e.target.value })}
                placeholder="City"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">To</label>
              <input
                type="text"
                value={tripDetails.to}
                onChange={(e) => setTripDetails({ ...tripDetails, to: e.target.value })}
                placeholder="Destination"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Departure</label>
              <input
                type="date"
                value={tripDetails.departureDate}
                onChange={(e) => setTripDetails({ ...tripDetails, departureDate: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Return</label>
              <input
                type="date"
                value={tripDetails.returnDate}
                onChange={(e) => setTripDetails({ ...tripDetails, returnDate: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Travel Class</label>
            <div className="flex gap-2">
              {['Economy', 'Business', 'First'].map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setTripDetails({ ...tripDetails, travelClass: c })}
                  className={`px-5 py-2 rounded-full text-sm transition-colors ${
                    tripDetails.travelClass === c
                      ? 'bg-accent text-dark font-medium'
                      : 'border border-gray-200 hover:border-accent'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Adults', key: 'adults' as const, min: 1 },
              { label: 'Children', key: 'children' as const, min: 0 },
              { label: 'Infants', key: 'infants' as const, min: 0 },
            ].map((item) => (
              <div key={item.key}>
                <div className="text-xs text-muted mb-1">{item.label}</div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTripDetails({ ...tripDetails, [item.key]: Math.max(item.min, tripDetails[item.key] - 1) })}
                    className="text-muted hover:text-accent"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">{tripDetails[item.key]}</span>
                  <button
                    type="button"
                    onClick={() => setTripDetails({ ...tripDetails, [item.key]: tripDetails[item.key] + 1 })}
                    className="text-muted hover:text-accent"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="font-display text-xl font-semibold">Your Details</h2>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Full Name *</label>
            <input
              {...form.register('fullName')}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              placeholder="Your full name"
            />
            {form.formState.errors.fullName && (
              <p className="text-xs text-red-500">{form.formState.errors.fullName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email *</label>
              <input
                {...form.register('email')}
                type="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="you@email.com"
              />
              {form.formState.errors.email && (
                <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Mobile *</label>
              <input
                {...form.register('mobile')}
                type="tel"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="10-digit number"
              />
              {form.formState.errors.mobile && (
                <p className="text-xs text-red-500">{form.formState.errors.mobile.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">City / State *</label>
            <input
              {...form.register('city')}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              placeholder="e.g. Kochi, Kerala"
            />
            {form.formState.errors.city && (
              <p className="text-xs text-red-500">{form.formState.errors.city.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Special Requirements</label>
            <textarea
              {...form.register('requirements')}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              placeholder="Any specific preferences or questions..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">How did you find us? *</label>
            <select
              {...form.register('source')}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="">Select...</option>
              <option value="google">Google</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="referral">Referral</option>
              <option value="other">Other</option>
            </select>
            {form.formState.errors.source && (
              <p className="text-xs text-red-500">{form.formState.errors.source.message}</p>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="font-display text-xl font-semibold">Review & Submit</h2>
          <div className="bg-surface rounded-2xl p-6 text-sm space-y-3">
            <div className="flex justify-between"><span className="text-muted">Service</span><span className="text-primary">{tripDetails.serviceType || '-'}</span></div>
            <div className="flex justify-between"><span className="text-muted">From → To</span><span className="text-primary">{tripDetails.from || '-'} → {tripDetails.to || '-'}</span></div>
            <div className="flex justify-between"><span className="text-muted">Name</span><span className="text-primary">{form.watch('fullName') || '-'}</span></div>
            <div className="flex justify-between"><span className="text-muted">Email</span><span className="text-primary">{form.watch('email') || '-'}</span></div>
            <div className="flex justify-between"><span className="text-muted">Phone</span><span className="text-primary">{form.watch('mobile') || '-'}</span></div>
            <div className="flex justify-between"><span className="text-muted">City</span><span className="text-primary">{form.watch('city') || '-'}</span></div>
          </div>
          <label className="flex items-start gap-2 text-sm text-muted">
            <input type="checkbox" required className="mt-0.5 accent-accent" />
            I agree to be contacted by Destino Travels regarding my enquiry.
          </label>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <Button variant="ghost" onClick={prev}>
            &larr; Back
          </Button>
        )}
        <div className="ml-auto">
          {step < 3 ? (
            <Button variant="primary" onClick={next}>
              Continue <ChevronRight size={16} />
            </Button>
          ) : (
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
