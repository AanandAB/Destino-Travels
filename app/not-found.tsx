import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-[8rem] md:text-[10rem] font-display font-bold text-accent/20 leading-none select-none">
          404
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-primary -mt-6 mb-3">
          Page Not Found
        </h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent text-dark rounded-full px-6 py-3 font-medium hover:bg-accent-light transition-colors"
          >
            ← Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-accent text-accent rounded-full px-6 py-3 font-medium hover:bg-accent hover:text-dark transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
