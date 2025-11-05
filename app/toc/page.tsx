import Link from 'next/link'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { Slide } from '../types'

async function getSlides(): Promise<Slide[]> {
  try {
    const filePath = join(process.cwd(), 'app', 'data', 'slides.json')
    const fileContents = readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export default async function TOCPage() {
  const slides = await getSlides()

  // Group slides by section
  const sections = slides.reduce((acc, slide) => {
    if (!acc[slide.section]) {
      acc[slide.section] = []
    }
    acc[slide.section].push(slide)
    return acc
  }, {} as Record<string, Slide[]>)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Table of Contents
      </h1>

      {Object.keys(sections).length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No slides found. Please run the ingest script first.
        </p>
      ) : (
        <div className="space-y-8">
          {Object.entries(sections).map(([sectionName, sectionSlides]) => (
            <div key={sectionName} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                {sectionName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectionSlides.map((slide) => (
                  <Link
                    key={slide.index}
                    href={`/slides/${slide.index}/`}
                    className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                  >
                    <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded mb-3 overflow-hidden">
                      <img
                        src={`/slides/${slide.filename}`}
                        alt={slide.alt}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {slide.title}
                    </h3>
                    {slide.caption && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {slide.caption.replace(/[#*_`]/g, '').substring(0, 100)}...
                      </p>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Slide {slide.index}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

