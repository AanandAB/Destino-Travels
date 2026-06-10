import type { Metadata, Viewport } from 'next'
import LenisProvider from '@/components/providers/LenisProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import BackToTop from '@/components/ui/BackToTop'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.destinotravels.in'),
  title: {
    default: "Destino Tours & Travels | Kerala's Trusted Travel Agency",
    template: '%s | Destino Tours & Travels',
  },
  description:
    "Kerala's trusted travel agency in Irikkur, Kannur — flight tickets, visas, Umrah, holidays, passport & more. 9 services under one roof.",
  keywords: [
    'travel agency Kannur', 'visa processing Kerala', 'flight tickets Irikkur',
    'tour packages Kerala', 'Destino Tours & Travels', 'Umrah packages Kerala',
    'passport assistance Kerala', 'attestation services Kerala',
  ],
  authors: [{ name: 'Destino Tours & Travels' }],
  creator: 'Destino Tours & Travels',
  publisher: 'Destino Tours & Travels',
  openGraph: {
    siteName: 'Destino Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    title: "Destino Tours & Travels | Irikkur, Kannur",
    description: "Kerala's trusted travel agency — 9 services, real people, real support.",
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.destinotravels.in' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </LenisProvider>
      </body>
    </html>
  )
}
