'use client'

import { useRouter } from 'next/navigation'

interface SlideButtonsProps {
  previousPath?: string
  nextPath?: string
  hasPrevious: boolean
  hasNext: boolean
  current: number
  total: number
}

export default function SlideButtons({
  previousPath,
  nextPath,
  hasPrevious,
  hasNext,
  current,
  total,
}: SlideButtonsProps) {
  const router = useRouter()

  return (
    <div className="mt-4 flex justify-between items-center">
      <button
        onClick={() => {
          if (previousPath) {
            router.push(previousPath)
          }
        }}
        disabled={!hasPrevious}
        className={`px-6 py-2 rounded-md font-medium transition-colors ${
          hasPrevious
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        ← Previous
      </button>

      <span className="text-sm text-gray-600 dark:text-gray-400">
        {current} / {total}
      </span>

      <button
        onClick={() => {
          if (nextPath) {
            router.push(nextPath)
          }
        }}
        disabled={!hasNext}
        className={`px-6 py-2 rounded-md font-medium transition-colors ${
          hasNext
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Next →
      </button>
    </div>
  )
}

