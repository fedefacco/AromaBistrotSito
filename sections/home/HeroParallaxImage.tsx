'use client'

import { useEffect, useState } from 'react'
import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

interface HeroParallaxImageProps {
  src: string | null
  mobileSrc: string | null
  alt: string
}

export default function HeroParallaxImage({ src, mobileSrc, alt }: HeroParallaxImageProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const { scrollY } = useScroll()
  // Map first 600px of scroll to a 20% image shift downward
  const y = useTransform(scrollY, [0, 600], ['0%', '20%'])

  const shouldParallax = isDesktop && !shouldReduceMotion

  if (!src) {
    return <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-900" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 scale-110"
        style={shouldParallax ? { y } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className={`object-cover object-center ${mobileSrc ? 'hidden sm:block' : 'block'}`}
          sizes="100vw"
        />
        {mobileSrc && (
          <Image
            src={mobileSrc}
            alt={alt}
            fill
            priority
            className="object-cover object-center block sm:hidden"
            sizes="100vw"
          />
        )}
      </motion.div>
    </div>
  )
}
