import { MetadataRoute } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { Slide } from './types'

async function getSlides(): Promise<Slide[]> {
  try {
    const filePath = join(process.cwd(), 'app', 'data', 'slides.json')
    const fileContents = readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slides = await getSlides()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/toc/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  slides.forEach((slide) => {
    routes.push({
      url: `${baseUrl}/slides/${slide.index}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  return routes
}

