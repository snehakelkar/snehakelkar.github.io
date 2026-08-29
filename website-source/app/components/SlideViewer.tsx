'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import MarkdownIt from 'markdown-it'
import type { Slide } from '../types'

const md = new MarkdownIt()

interface SlideViewerProps {
  slide: Slide
  previousPath?: string
  nextPath?: string
  hasPrevious: boolean
  hasNext: boolean
  current: number
  total: number
}

export default function SlideViewer({
  slide,
  previousPath,
  nextPath,
  hasPrevious,
  hasNext,
  current,
  total,
}: SlideViewerProps) {
  const router = useRouter()
  const [isZoomed, setIsZoomed] = useState(false)
  
  const handlePrevious = () => {
    if (previousPath) {
      router.push(previousPath)
    }
  }
  
  const handleNext = () => {
    if (nextPath) {
      router.push(nextPath)
    }
  }

  const captionHtml = slide.caption ? md.render(slide.caption) : null

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <div className="w-full max-w-6xl">
        <div className="mb-4 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {slide.section} • Slide {current} of {total}
          </span>
        </div>

        <motion.div
          key={slide.index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div
            className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <Image
              src={`/slides/${slide.filename}`}
              alt={slide.alt}
              width={slide.width || 1920}
              height={slide.height || 1080}
              className={`w-full h-auto transition-transform ${
                isZoomed ? 'scale-150' : ''
              }`}
              priority
              unoptimized
            />
          </div>
        </motion.div>

        {captionHtml && (
          <div
            className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: captionHtml }}
          />
        )}

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={!hasPrevious}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              hasPrevious
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label="Previous slide"
          >
            ← Previous
          </button>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            {current} / {total}
          </div>

          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              hasNext
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label="Next slide"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

