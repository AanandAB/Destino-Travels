import type { Metadata } from 'next'
import PackagesClient from './PackagesClient'

export const metadata: Metadata = {
  title: 'Tour Packages',
  description: 'Curated tour packages from Kerala — Maldives, Dubai, Bali, Europe, Kerala backwaters & more. Best prices, all-inclusive. Book with Destino Travels.',
}

export default function PackagesPage() {
  return <PackagesClient />
}
