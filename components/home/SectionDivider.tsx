import { Plane } from 'lucide-react'

export default function SectionDivider() {
  return (
    <div className="relative py-16 bg-surface overflow-hidden">
      {/* Decorative diagonal clip */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />

      <div className="relative max-w-7xl mx-auto px-4 flex items-center justify-center gap-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
          <Plane size={18} className="text-accent rotate-45" />
        </div>
        <p className="shrink-0 font-display text-primary/60 italic text-xl">
          Every journey tells a story
        </p>
        <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
          <Plane size={18} className="text-accent -rotate-45" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>
    </div>
  )
}
