import { create } from 'zustand'

interface EnquiryState {
  step: number
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

interface EnquiryActions {
  setStep: (step: number) => void
  setField: (field: keyof EnquiryState, value: string | number) => void
  reset: () => void
}

const initialState: EnquiryState = {
  step: 1,
  serviceType: '',
  journeyType: 'round-trip',
  from: '',
  to: '',
  departureDate: '',
  returnDate: '',
  travelClass: 'economy',
  adults: 1,
  children: 0,
  infants: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  requirements: '',
  source: '',
}

export const useEnquiryStore = create<EnquiryState & EnquiryActions>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set(initialState),
}))
