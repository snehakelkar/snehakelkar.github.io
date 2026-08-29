import Link from 'next/link'

export default function PlaceholderSection({
  title,
  accent,
}: {
  title: string
  accent: string
}) {
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl px-6 py-16">
      <Link href="/" className="font-baloo text-sm font-semibold text-gray-500 hover:text-gray-700">
        ← Back to My Digital Space
      </Link>
      <h1
        className="font-baloo mt-6 text-4xl font-extrabold sm:text-5xl"
        style={{ color: accent }}
      >
        {title}
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        This page is still under construction — check back soon!
      </p>
    </div>
  )
}
