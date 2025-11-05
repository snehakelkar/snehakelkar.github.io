import Link from 'next/link'
import { readFileSync } from 'fs'
import { join } from 'path'
import SlideNavigation from './slides/[index]/SlideNavigation'
import SlideButtons from './slides/[index]/SlideButtons'
import type { Slide, SiteMetadata } from './types'

async function getSiteMetadata(): Promise<SiteMetadata> {
  try {
    const filePath = join(process.cwd(), 'app', 'data', 'site.json')
    const fileContents = readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return { title: 'Slide Deck', totalSlides: 0 }
  }
}

async function getSlides(): Promise<Slide[]> {
  try {
    const filePath = join(process.cwd(), 'app', 'data', 'slides.json')
    const fileContents = readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export default async function Home() {
  const metadata = await getSiteMetadata()
  const slides = await getSlides()

  if (slides.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
        <p className="text-gray-600 dark:text-gray-400">
          No slides found. Please run the ingest script first.
        </p>
      </div>
    )
  }

  // Get first slide (1.png)
  const firstSlide = slides.find(s => s.index === 1) || slides[0]
  const nextSlide = slides.length > 1 ? slides[1] : null

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-6xl">
        <SlideNavigation
          currentIndex={1}
          totalSlides={slides.length}
          hasPrevious={false}
          hasNext={!!nextSlide}
          previousPath={undefined}
          nextPath={nextSlide ? `/slides/${nextSlide.index}/` : undefined}
        />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img
            src={`/slides/${firstSlide.filename}`}
            alt={firstSlide.alt}
            className="w-full h-auto"
            loading="eager"
          />
        </div>

        <SlideButtons
          previousPath={undefined}
          nextPath={nextSlide ? `/slides/${nextSlide.index}/` : undefined}
          hasPrevious={false}
          hasNext={!!nextSlide}
          current={1}
          total={slides.length}
        />
      </div>
    </div>
  )
}

