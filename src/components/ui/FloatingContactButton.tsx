'use client'

import { usePathname } from 'next/navigation'

export default function FloatingContactButton() {
  const pathname = usePathname()

  const isEnglish = pathname.startsWith('/en')
  const href = isEnglish ? '/en/contact' : '/custom'
  const label = isEnglish ? 'Contact Us' : '無料で見積り'

  // 遷移先そのものでは出さない（フォーム画面で重ねて出す意味がないため）
  if (pathname === href) return null

  return (
    <a
      href={href}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-90 p-3 gap-2 sm:px-5 sm:py-3"
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
      <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">{label}</span>
      <span className="sr-only sm:hidden">{label}</span>
    </a>
  )
}
