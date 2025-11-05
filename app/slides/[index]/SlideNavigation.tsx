'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SlideNavigationProps {
  currentIndex: number
  totalSlides: number
  hasPrevious: boolean
  hasNext: boolean
  previousPath?: string
  nextPath?: string
}

export default function SlideNavigation({
  currentIndex,
  totalSlides,
  hasPrevious,
  hasNext,
  previousPath,
  nextPath,
}: SlideNavigationProps) {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrevious && previousPath) {
        router.push(previousPath)
      } else if (e.key === 'ArrowRight' && hasNext && nextPath) {
        router.push(nextPath)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasPrevious, hasNext, previousPath, nextPath, router])

  return null
}

