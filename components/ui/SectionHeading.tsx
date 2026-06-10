import { cn } from '@/lib/utils'

interface Props {
  eyebrow?: string
  title: string
  titleAccent?: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  centered = true,
  light = false,
  className,
}: Props) {
  return (
    <div className={cn('max-w-3xl', centered ? 'mx-auto text-center' : '', className)}>
      {eyebrow && (
        <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">
          {eyebrow}
        </p>
      )}
      <div
        className={cn(
          'w-12 h-0.5 bg-accent mb-6',
          centered ? 'mx-auto' : ''
        )}
      />
      <h2
        className={cn(
          'font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4',
          light ? 'text-white' : 'text-primary'
        )}
      >
        {title}{' '}
        {titleAccent && (
          <em className="text-accent not-italic">{titleAccent}</em>
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-base max-w-xl',
            centered ? 'mx-auto' : '',
            light ? 'text-white/70' : 'text-muted'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
