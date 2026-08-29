'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      {!isHome && <Navbar />}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {!isHome && <Footer />}
    </>
  )
}
