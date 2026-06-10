import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Your Journey',
  description: 'Book your dream trip with Destino Travels. Quick enquiry form, free consultation.',
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
