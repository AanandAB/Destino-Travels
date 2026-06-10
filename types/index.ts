export interface Service {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  icon: string
  image: string
  features: string[]
  color: string
}

export interface Destination {
  id: string
  slug: string
  name: string
  country: string
  flag: string
  image: string
  category: string
  startingPrice: number
  duration: string
  popular: boolean
  lat: number
  lng: number
}

export interface Package {
  id: string
  slug: string
  title: string
  destination: string
  flag: string
  image: string
  duration: string
  startingPrice: number
  rating: number
  reviewCount: number
  description: string
  inclusions: string[]
  itinerary: ItineraryDay[]
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  destination: string
  review: string
  rating: number
  avatar: string
}

export interface EnquiryFormData {
  serviceType: string
  journeyType: string
  from: string
  to: string
  departureDate: string
  returnDate: string
  travelClass: string
  adults: number
  children: number
  infants: number
  fullName: string
  email: string
  mobile: string
  city: string
  requirements: string
  source: string
}
