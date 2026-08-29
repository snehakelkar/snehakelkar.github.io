import { notFound } from 'next/navigation'
import { readFileSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import SlideViewer from '../../components/SlideViewer'
import ProgressBar from '../../components/ProgressBar'
import SlideNavigation from './SlideNavigation'
import type { Slide } from '../../types'
import type { Metadata } from 'next'

async function getSlides(): Promise<Slide[]> {
  try {
    const filePath = join(process.cwd(), 'app', 'data', 'slides.json')
    const fileContents = readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

interface PageProps {
  params: Promise<{ index: string }>
}

export async function generateStaticParams() {
  const slides = await getSlides()
  return slides.map((slide) => ({
    index: slide.index.toString(),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { index } = await params
  const slides = await getSlides()
  const slideIndex = parseInt(index)
  const slide = slides.find((s) => s.index === slideIndex)

  if (!slide) {
    return {
      title: 'Slide Not Found',
    }
  }

  return {
    title: `${slide.title} - Slide ${slideIndex}`,
    description: slide.caption || slide.alt,
    openGraph: {
      title: slide.title,
      description: slide.caption || slide.alt,
      images: [`/slides/${slide.filename}`],
    },
  }
}

export default async function SlidePage({ params }: PageProps) {
  const { index } = await params
  const slides = await getSlides()
  const slideIndex = parseInt(index)
  const slide = slides.find((s) => s.index === slideIndex)

  if (!slide) {
    notFound()
  }

  const currentIndex = slideIndex - 1
  const previousSlide = currentIndex > 0 ? slides[currentIndex - 1] : null
  const nextSlide = currentIndex < slides.length - 1 ? slides[currentIndex + 1] : null

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-4">
          <Link
            href="/toc/"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Table of Contents
          </Link>
        </div>
        <div className="mb-4">
          <ProgressBar current={slideIndex} total={slides.length} />
        </div>
      </div>

      <SlideNavigation
        currentIndex={slideIndex}
        totalSlides={slides.length}
        hasPrevious={!!previousSlide}
        hasNext={!!nextSlide}
        previousPath={previousSlide ? `/slides/${previousSlide.index}/` : undefined}
        nextPath={nextSlide ? `/slides/${nextSlide.index}/` : undefined}
      />

      <SlideViewer
        slide={slide}
        previousPath={previousSlide ? `/slides/${previousSlide.index}/` : undefined}
        nextPath={nextSlide ? `/slides/${nextSlide.index}/` : undefined}
        hasPrevious={!!previousSlide}
        hasNext={!!nextSlide}
        current={slideIndex}
        total={slides.length}
      />
    </div>
  )
}

