import * as fs from 'fs'
import * as path from 'path'
import MarkdownIt from 'markdown-it'
import lunr from 'lunr'

const md = new MarkdownIt()

interface Slide {
  index: number
  filename: string
  title: string
  section: string
  caption: string
  alt: string
  width?: number
  height?: number
}

interface NotesSection {
  title: string
  slides: Array<{
    index: number
    title: string
    caption: string
  }>
}

async function ingest() {
  // Use local content directory
  const contentDir = path.join(process.cwd(), 'content')
  const slidesDir = path.join(contentDir, 'slides')
  const notesPath = path.join(contentDir, 'notes.md')
  const dataDir = path.join(process.cwd(), 'app', 'data')
  const publicSlidesDir = path.join(process.cwd(), 'public', 'slides')
  const publicDir = path.join(process.cwd(), 'public')

  // Ensure directories exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(publicSlidesDir)) {
    fs.mkdirSync(publicSlidesDir, { recursive: true })
  }

  // Read slides directory
  const slideFiles = fs.readdirSync(slidesDir)
    .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
    .sort((a, b) => {
      const numA = parseInt(a.match(/^(\d+)/)?.[1] || '0')
      const numB = parseInt(b.match(/^(\d+)/)?.[1] || '0')
      return numA - numB
    })

  if (slideFiles.length === 0) {
    console.error('No slide images found in content/slides/')
    process.exit(1)
  }

  // Parse notes.md if it exists
  let siteTitle = 'Slide Deck'
  let sections: NotesSection[] = []
  let currentSection: NotesSection | null = null

  if (fs.existsSync(notesPath)) {
    const notesContent = fs.readFileSync(notesPath, 'utf-8')
    const lines = notesContent.split('\n')

    for (const line of lines) {
      if (line.startsWith('# ')) {
        siteTitle = line.substring(2).trim()
      } else if (line.startsWith('## ')) {
        if (currentSection) {
          sections.push(currentSection)
        }
        currentSection = {
          title: line.substring(3).trim(),
          slides: []
        }
      } else if (line.startsWith('### ')) {
        const slideTitle = line.substring(4).trim()
        const match = slideTitle.match(/slide\s+(\d+)/i)
        const slideIndex = match ? parseInt(match[1]) : currentSection?.slides.length + 1 || 1
        
        if (!currentSection) {
          currentSection = { title: 'Default', slides: [] }
        }
        
        currentSection.slides.push({
          index: slideIndex,
          title: slideTitle,
          caption: ''
        })
      } else if (line.trim() && currentSection && currentSection.slides.length > 0) {
        const lastSlide = currentSection.slides[currentSection.slides.length - 1]
        if (lastSlide.caption) {
          lastSlide.caption += '\n' + line
        } else {
          lastSlide.caption = line
        }
      }
    }

    if (currentSection) {
      sections.push(currentSection)
    }
  }

  // Build slides array
  const slides: Slide[] = []

  for (let i = 0; i < slideFiles.length; i++) {
    const filename = slideFiles[i]
    const slideIndex = i + 1
    const paddedIndex = String(slideIndex).padStart(2, '0')
    
    // Find matching slide data from notes
    let slideData = null
    for (const section of sections) {
      slideData = section.slides.find(s => s.index === slideIndex)
      if (slideData) {
        break
      }
    }

    const title = slideData?.title || `Slide ${slideIndex}`
    const section = sections.find(s => s.slides.some(sl => sl.index === slideIndex))?.title || 'Default'
    const caption = slideData?.caption || ''
    const alt = caption ? caption.substring(0, 100).replace(/[#*_`]/g, '') : `${title} from deck`

    // Copy slide file to public directory
    const sourcePath = path.join(slidesDir, filename)
    const destPath = path.join(publicSlidesDir, filename)
    fs.copyFileSync(sourcePath, destPath)

    // Get image dimensions using sharp
    let width: number | undefined
    let height: number | undefined
    try {
      const sharp = require('sharp')
      const metadata = await sharp(sourcePath).metadata()
      width = metadata.width
      height = metadata.height
    } catch (err) {
      console.warn(`Could not get dimensions for ${filename}:`, err)
    }

    slides.push({
      index: slideIndex,
      filename,
      title,
      section,
      caption: caption.trim(),
      alt,
      width,
      height
    })
  }

  // Save slides.json
  fs.writeFileSync(
    path.join(dataDir, 'slides.json'),
    JSON.stringify(slides, null, 2)
  )

  // Save site metadata
  fs.writeFileSync(
    path.join(dataDir, 'site.json'),
    JSON.stringify({ title: siteTitle, totalSlides: slides.length }, null, 2)
  )

  // Build search index
  const searchIndex = lunr(function () {
    this.ref('index')
    this.field('title')
    this.field('caption')
    this.field('section')
    this.field('path')

    slides.forEach(slide => {
      this.add({
        index: slide.index.toString(),
        title: slide.title,
        caption: slide.caption,
        section: slide.section,
        path: `/slides/${slide.index}/`
      })
    })
  })

  // Save search index
  fs.writeFileSync(
    path.join(publicDir, 'search-index.json'),
    JSON.stringify(searchIndex)
  )

  // Save search documents for client-side lookup
  const searchDocuments = slides.map(slide => ({
    index: slide.index,
    title: slide.title,
    caption: slide.caption,
    section: slide.section,
    path: `/slides/${slide.index}/`
  }))

  fs.writeFileSync(
    path.join(publicDir, 'search-documents.json'),
    JSON.stringify(searchDocuments)
  )

  console.log(`✅ Ingested ${slides.length} slides`)
  console.log(`✅ Site title: ${siteTitle}`)
  console.log(`✅ Generated search index`)
}

ingest().catch(console.error)

