'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SearchModal from './SearchModal'

export default function Navbar() {
  const pathname = usePathname()
  const [showSearch, setShowSearch] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/toc/', label: 'Table of Contents' },
  ]

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => setShowSearch(true)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              aria-label="Search"
            >
              🔍 Search
            </button>
          </div>
        </div>
      </nav>
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </>
  )
}

