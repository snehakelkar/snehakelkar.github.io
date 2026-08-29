import type { Metadata } from 'next'
import { Caveat, Baloo_2 } from 'next/font/google'
import './globals.css'
import SiteChrome from './components/SiteChrome'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-caveat',
})

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-baloo',
})

export const metadata: Metadata = {
  title: 'My Digital Space — Sneha Kelkar',
  description: "Sneha Kelkar's digital space: about me, projects, resume, thoughts, and side quests.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${caveat.variable} ${baloo.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded">
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}

