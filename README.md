# Slides to Site

A standalone, static website generator from Canva slide deck exports. This project converts PNG/JPG slide images and optional Markdown notes into a fully functional static website using Next.js.

## Features

- 🎨 **Static Export**: Pure static site with no dependencies on Canva or external APIs
- 📱 **Responsive Design**: Works on all devices with Tailwind CSS
- 🔍 **Client-Side Search**: Full-text search using Lunr.js
- ♿ **Accessible**: Semantic HTML, keyboard navigation, focus states
- 🚀 **SEO Optimized**: Sitemap, robots.txt, Open Graph tags
- ⌨️ **Keyboard Controls**: Arrow keys for navigation
- 🖼️ **Image Optimization**: Lazy loading and zoom on click

## Quick Start

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Prepare your content**:
   - Export slides from Canva as PNG or JPG images
   - Name them sequentially: `1.png`, `2.png`, `3.png`, etc. (or `01.png`, `02.png`, etc.)
   - Place them in `content/slides/`
   - Optionally create `content/notes.md` with slide metadata

3. **Run ingest**:
   ```bash
   npm run ingest
   ```

4. **Build the site**:
   ```bash
   npm run build
   ```

5. **Deploy**:
   - The static site is in the `out/` directory
   - Upload to GitHub Pages, Netlify, S3, or any static host
   - Or open `out/index.html` directly in a browser for local testing

## Development

Run the development server:

```bash
npm run dev
```

This will automatically run the ingest script and start the Next.js dev server at `http://localhost:3000`.

## Content Structure

### Slides Directory

Place your slide images in `content/slides/` with sequential names:
- `1.png` (or `01.png`, `.jpg`)
- `2.png` (or `02.png`)
- `3.png` (or `03.png`)
- etc.

The script will automatically sort them numerically regardless of padding.

### Notes File (Optional)

Create `content/notes.md` with the following structure:

```markdown
# Site Title

## Section Name

### Slide 1
Caption text for slide 1 goes here.

### Slide 2
Caption text for slide 2 goes here.

## Another Section

### Slide 3
Caption for slide 3.
```

- `# Site Title` - Sets the site title (shown on landing page)
- `## Section Name` - Groups slides into sections
- `### Slide N` - Matches slide number (must match image filename)
- Body text after `### Slide N` becomes the caption

If `notes.md` is missing, slides will be titled "Slide 1", "Slide 2", etc.

## Scripts

- `pnpm ingest` - Process slides and notes, generate data files
- `pnpm build` - Build static site (runs ingest automatically)
- `pnpm dev` - Development server (runs ingest automatically)
- `pnpm start` - Start production server (for testing, not needed for static export)

## Project Structure

```
slides-to-site/
├── app/
│   ├── components/       # React components
│   ├── data/            # Generated slide data (from ingest)
│   ├── slides/[index]/  # Dynamic slide pages
│   ├── toc/             # Table of contents
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
├── content/
│   ├── slides/          # Source slide images
│   └── notes.md         # Optional slide metadata
├── public/
│   ├── slides/          # Copied slide images (generated)
│   └── search-index.json # Search index (generated)
├── scripts/
│   └── ingest.ts        # Build script
└── out/                  # Static export (generated)
```

## Deployment

### GitHub Pages

1. Build the site: `pnpm build`
2. Commit and push the `out/` directory
3. Configure GitHub Pages to serve from `/out` directory

### Netlify

1. Build command: `pnpm build`
2. Publish directory: `out`

### Vercel

1. Build command: `pnpm build`
2. Output directory: `out`

### Any Static Host

Upload the entire `out/` directory to your hosting provider.

## Customization

### Styling

Edit `app/globals.css` and `tailwind.config.ts` to customize the design.

### Metadata

Edit `app/layout.tsx` to change default metadata, or update `content/notes.md` to change the site title.

## License

MIT

