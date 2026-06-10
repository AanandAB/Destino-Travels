import type { Metadata } from 'next'
import DestinationsClient from './DestinationsClient'

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Explore 45+ destinations worldwide with Destino Travels. Maldives, Dubai, Bali, Paris, Switzerland & more. Best prices from Kerala.',
}

export default function DestinationsPage() {
  return <DestinationsClient />
}
