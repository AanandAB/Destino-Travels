import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

/** Prefix asset paths for GitHub Pages static export */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${base}${path}`
}
