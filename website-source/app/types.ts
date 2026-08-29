export interface Slide {
  index: number
  filename: string
  title: string
  section: string
  caption: string
  alt: string
  width?: number
  height?: number
}

export interface SiteMetadata {
  title: string
  totalSlides: number
}

export interface SearchDocument {
  index: number
  title: string
  caption: string
  section: string
  path: string
}

