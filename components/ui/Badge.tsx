import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'accent' | 'primary' | 'emerald' | 'outline'
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = 'accent', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variant === 'accent' && 'bg-accent text-dark',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'emerald' && 'bg-emerald text-white',
        variant === 'outline' && 'border border-accent/50 text-accent',
        className
      )}
    >
      {children}
    </span>
  )
}
