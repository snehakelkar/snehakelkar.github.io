'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import lunr from 'lunr'
import type { SearchDocument } from '../types'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchDocument[]>([])
  const [index, setIndex] = useState<lunr.Index | null>(null)
  const [documents, setDocuments] = useState<SearchDocument[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      // Load search index and documents
      Promise.all([
        fetch('/search-index.json').then(res => res.json()),
        fetch('/search-documents.json').then(res => res.json())
      ]).then(([indexData, docs]) => {
        setIndex(lunr.Index.load(indexData))
        setDocuments(docs)
      })
      
      // Focus input
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (!index || !query.trim()) {
      setResults([])
      return
    }

    try {
      const searchResults = index.search(query)
      const matchedDocs = searchResults
        .map(result => documents.find(doc => doc.index === parseInt(result.ref)))
        .filter((doc): doc is SearchDocument => doc !== undefined)
        .slice(0, 10)
      
      setResults(matchedDocs)
    } catch (err) {
      console.error('Search error:', err)
      setResults([])
    }
  }, [query, index, documents])

  const handleSelect = (doc: SearchDocument) => {
    router.push(doc.path)
    onClose()
    setQuery('')
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search slides..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {results.length === 0 && query && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No results found
            </p>
          )}
          {results.length > 0 && (
            <ul className="space-y-2">
              {results.map((doc) => (
                <li key={doc.index}>
                  <button
                    onClick={() => handleSelect(doc)}
                    className="w-full text-left p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {doc.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {doc.section}
                    </div>
                    {doc.caption && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">
                        {doc.caption.substring(0, 100)}...
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

