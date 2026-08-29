'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { scrollToSection } from './scrollToSection'

export type NavAction = { type: 'scroll'; id: string } | { type: 'link'; href: string }

export default function NavPop({ label, color, action }: { label: string; color: string; action: NavAction }) {
  const text = (
    <motion.span
      whileHover={{ scale: 1.22, rotate: -3, y: -3, color }}
      whileTap={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
      className="font-baloo inline-block cursor-pointer text-xl font-bold uppercase tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)] sm:text-2xl"
    >
      {label}
    </motion.span>
  )

  if (action.type === 'link') {
    return (
      <Link href={action.href} className="inline-block">
        {text}
      </Link>
    )
  }

  return (
    <button type="button" onClick={() => scrollToSection(action.id)} className="inline-block border-0 bg-transparent p-0">
      {text}
    </button>
  )
}
