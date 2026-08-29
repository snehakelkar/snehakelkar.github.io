// A manually-driven scroll animation, rather than relying on native
// `scrollIntoView({ behavior: 'smooth' })`, which can silently fail to
// animate at all in some environments (and can be cancelled by layout
// shifts elsewhere on the page while it's mid-flight).
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const startY = window.scrollY
  const targetY = el.getBoundingClientRect().top + startY
  const distance = targetY - startY
  const duration = 700
  let startTime: number | null = null

  function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3)
  }

  function step(timestamp: number) {
    if (startTime === null) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    window.scrollTo(0, startY + distance * easeOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}
