'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'outline-white' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
  children: React.ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  children,
  type = 'button',
  disabled,
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium transition-all duration-300 active:scale-95',
    variant === 'primary' && 'bg-accent text-dark hover:bg-accent-light hover:shadow-lg hover:shadow-accent/25',
    variant === 'outline' && 'border border-accent text-accent hover:bg-accent hover:text-dark',
    variant === 'outline-white' && 'border border-white/40 text-white hover:bg-white hover:text-dark hover:border-white',
    variant === 'ghost' && 'text-muted hover:text-primary hover:bg-gray-50',
    size === 'sm' && 'px-4 py-2 text-sm',
    size === 'md' && 'px-6 py-3 text-sm',
    size === 'lg' && 'px-8 py-4 text-base',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')
    const Comp = isExternal ? 'a' : Link
    const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <Comp href={href} className={baseClasses} {...externalProps}>
        {children}
      </Comp>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {children}
    </button>
  )
}
