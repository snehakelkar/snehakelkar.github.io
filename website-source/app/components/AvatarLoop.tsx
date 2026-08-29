'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scrollToSection } from './scrollToSection'

export type ClipAction = { type: 'scroll'; id: string } | { type: 'link'; href: string }

export interface AvatarClip {
  src: string
  label: string
  action: ClipAction
}

export default function AvatarLoop({ clips }: { clips: AvatarClip[] }) {
  const [index, setIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const current = clips[index]

  // A persistent <video> node with imperative src swaps avoids autoplay
  // races that happen when remounting a new <video> element per clip.
  // play() is deferred until the browser signals it has data, since
  // calling it immediately after load() can be rejected mid-buffer.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const tryPlay = () => {
      el.play().catch(() => {})
    }
    el.addEventListener('canplay', tryPlay)
    el.src = current.src
    el.load()
    return () => el.removeEventListener('canplay', tryPlay)
  }, [current.src])

  const handleEnded = () => {
    setIndex((i) => (i + 1) % clips.length)
  }

  const circle = (
    <motion.div
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="relative h-40 w-40 overflow-hidden rounded-full bg-black shadow-[0_0_0_4px_rgba(255,255,255,0.35),0_12px_30px_rgba(0,0,0,0.45)] ring-1 ring-black/20 sm:h-52 sm:w-52 cursor-pointer"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="h-full w-full object-contain p-3"
      />
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-black/15" />
    </motion.div>
  )

  return (
    <div className="flex flex-col items-center gap-3">
      {current.action.type === 'link' ? (
        <Link
          href={current.action.href}
          aria-label={`Go to the ${current.label} page`}
          className="group block"
        >
          {circle}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => scrollToSection((current.action as { type: 'scroll'; id: string }).id)}
          aria-label={`Scroll to the ${current.label} section`}
          className="group block border-0 bg-transparent p-0"
        >
          {circle}
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.p
          key={current.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="font-baloo text-sm font-semibold tracking-wide text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] sm:text-base"
        >
          {current.action.type === 'link' ? 'click to visit' : 'click to scroll to'} {current.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
