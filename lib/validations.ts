import { z } from 'zod'

export const enquirySchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Valid email required'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit Indian mobile number required'),
  city: z.string().min(2, 'City required'),
  requirements: z.string().optional(),
  source: z.string().min(1, 'Please select how you found us'),
})

export const visaEligibilitySchema = z.object({
  nationality: z.string().min(1, 'Select nationality'),
  destination: z.string().min(1, 'Select destination country'),
  purpose: z.string().min(1, 'Select purpose of visit'),
  status: z.string().optional(),
})

export type EnquiryInput = z.infer<typeof enquirySchema>
export type VisaEligibilityInput = z.infer<typeof visaEligibilitySchema>
