'use client'

import { useEffect, useRef, useState } from 'react'

type ScrollDirection = 'up' | 'down'

export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('up')
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastY.current

      if (Math.abs(delta) < 10) return

      setDirection(delta > 0 ? 'down' : 'up')
      lastY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
