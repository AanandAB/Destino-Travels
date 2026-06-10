import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Destino Travels Kerala. Call +919****5313, WhatsApp, or visit our office. Free consultation for all travel services.',
  openGraph: {
    title: 'Contact Destino Travels Kerala',
    description: 'Call, WhatsApp, email or visit us. Free travel consultation.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
