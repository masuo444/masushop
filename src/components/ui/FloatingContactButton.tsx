'use client'

import { usePathname } from 'next/navigation'

export default function FloatingContactButton() {
  const pathname = usePathname()

  // Only show on English pages
  if (!pathname.startsWith('/en')) return null

  return (
    <a
      href="/en/contact"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-90 p-3 md:gap-2 md:px-5 md:py-3"
      style={{ background: 'var(--color-accent)', color: '#fff' }}
    >
      {/* Mail / envelope icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4 12 13 2 4" />
      </svg>
      <span className="hidden md:inline text-sm font-medium">Contact Us</span>
    </a>
  )
}
