'use client'

import { useEffect, useState } from 'react'
import NavPop from './NavPop'
import AvatarLoop, { type AvatarClip } from './AvatarLoop'

const ABOUT_PHOTO_SRC = '/images/about-me-photo.jpg'

function AboutPhoto() {
  // Checked via a plain Image() probe (not the rendered <img>'s onError)
  // because on localhost a 404 can resolve before React finishes
  // hydrating and attaching the listener, silently missing the error.
  const [status, setStatus] = useState<'loading' | 'ok' | 'failed'>('loading')

  useEffect(() => {
    const probe = new window.Image()
    probe.onload = () => setStatus('ok')
    probe.onerror = () => setStatus('failed')
    probe.src = ABOUT_PHOTO_SRC
  }, [])

  return (
    <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border-4 border-white/80 bg-black/20 shadow-lg">
      {status === 'ok' && (
        <img
          src={ABOUT_PHOTO_SRC}
          alt="Sneha Kelkar in the gardens of the Quinta de Regaleira estate in Sintra, Portugal"
          className="h-full w-full object-cover"
        />
      )}
      {status === 'failed' && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-sm text-white/70">
          <span>📷</span>
          <span>Add your photo at public/images/about-me-photo.jpg</span>
        </div>
      )}
    </div>
  )
}

const NAV_ITEMS = [
  { label: 'About Me', color: '#f4a63f', action: { type: 'scroll', id: 'about' } as const },
  { label: 'Projects', color: '#7fae52', action: { type: 'link', href: '/projects/' } as const },
  { label: 'Resume', color: '#4fa7c9', action: { type: 'link', href: '/resume/' } as const },
  { label: 'Thoughts', color: '#c9793f', action: { type: 'link', href: '/thoughts/' } as const },
  { label: 'Side Quests', color: '#e3c23c', action: { type: 'link', href: '/side-quests/' } as const },
]

const AVATAR_CLIPS: AvatarClip[] = [
  { src: '/avatars/avatar.mp4', label: 'About Me', action: { type: 'scroll', id: 'about' } },
  { src: '/avatars/avatar_pcb.mp4', label: 'Projects', action: { type: 'link', href: '/projects/' } },
  { src: '/avatars/avatar_typing.mp4', label: 'Resume', action: { type: 'link', href: '/resume/' } },
  { src: '/avatars/avatar_reading.mp4', label: 'Thoughts', action: { type: 'link', href: '/thoughts/' } },
  { src: '/avatars/avatar_yawning.mp4', label: 'Side Quests', action: { type: 'link', href: '/side-quests/' } },
]

export default function Hero() {
  return (
    <div
      className="relative w-full bg-[#e8dcae]"
      style={{
        backgroundImage: "url('/images/journey-bg.png')",
        backgroundSize: '100% auto',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <section id="landing" className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
        <p className="text-center font-baloo text-sm font-semibold tracking-[0.3em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] sm:text-base">
          ✦ MY DIGITAL SPACE ✦
        </p>
        <h1 className="font-caveat mt-2 text-center text-6xl font-bold text-[#2b2318] sm:text-7xl md:text-8xl">
          Sneha Kelkar
        </h1>

        <nav className="mt-8 flex flex-col items-center gap-3" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavPop key={item.label} {...item} />
          ))}
        </nav>

        <div className="mt-10">
          <AvatarLoop clips={AVATAR_CLIPS} />
        </div>
      </section>

      <section id="about" className="flex min-h-screen flex-col justify-center px-6 py-16">
        <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1fr_260px] md:items-start">
          <div>
            <h2 className="font-baloo text-4xl font-extrabold text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)] sm:text-5xl">
              About Me
            </h2>
            <div className="mt-5 max-w-2xl space-y-4 rounded-2xl bg-black/25 p-5 text-base leading-relaxed text-white backdrop-blur-sm sm:text-lg">
              <p>
                Hi there! I&apos;m a student at John&apos;s Hopkins University pursuing a Master&apos;s
                degree in Electrical Engineering and Physics after completing my BSE in Biomedical
                Engineering. I love building fun trinkets and gadgets for my friends, family, and
                community members.
              </p>
              <p>
                When I&apos;m not working or studying, you can find me baking, reading, tinkering, or
                traveling. I love exploring languages and culture through conversations, books and
                podcasts.
              </p>
              <p>
                This space is designed for me to share some of these personal projects for feedback,
                inspo, and reflection.
              </p>
              <p>P.S If you have any good travel, reading, or podcast recommendations, let me know!!</p>
              <p className="font-baloo text-xl font-bold text-[#f4d35e]">Got recs?</p>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-[260px] md:mx-0 md:mt-16">
            <AboutPhoto />
            <figcaption className="mt-2 text-center text-sm text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              Here&apos;s me in the gardens of the Quinta de Regaleira estate located in Sintra,
              Portugal!
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  )
}
