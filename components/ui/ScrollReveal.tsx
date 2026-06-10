'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface Props {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  stagger?: number
  className?: string
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 50,
  stagger = 0.12,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    }

    const ctx = gsap.context(() => {
      gsap.from(el.children, {
        ...fromVars,
        duration: 0.9,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [delay, direction, distance, stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
