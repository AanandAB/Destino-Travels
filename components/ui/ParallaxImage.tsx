'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface Props {
  src: string
  alt: string
  speed?: number
  className?: string
}

export default function ParallaxImage({ src, alt, speed = 0.35, className }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current || !imageRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: -100 * speed * 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={wrapperRef} className={`overflow-hidden ${className || ''}`}>
      <div ref={imageRef} className="h-[130%] w-full relative -top-[15%]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      </div>
    </div>
  )
}
