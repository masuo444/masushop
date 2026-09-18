'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { masuSizes } from '@/lib/masu-data'

export default function FloatingContactButton() {
  const pathname = usePathname()
  // フォームが見えているページのパスを保持する。パスが変わればひとりでに無効になるので、
  // 遷移時に同期的な setState でリセットする必要がない。
  const [visibleFor, setVisibleFor] = useState<string | null>(null)

  const isEnglish = pathname.startsWith('/en')
  const href = isEnglish ? '/en/contact' : '/custom'
  const label = isEnglish ? 'Contact Us' : '無料で見積り'

  // 商品詳細ページ（/products/ichigo など）はスマホで下部固定バーを出すので、このボタンは重ねない
  const isProductDetail = masuSizes.some((m) => pathname === `/products/${m.id}`)

  // ページ内にフォーム（#form）やかんたん見積り（#quote）がある場合、それが見えている間はボタンを隠す。
  // 同じ導線が二重に出るのを避け、狭い画面で送信ボタンと重なるのも防ぐ。
  useEffect(() => {
    const targets = ['form', 'quote']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return
    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setVisibleFor(visible.size > 0 ? pathname : null)
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  // 遷移先そのものでは出さない（フォーム画面で重ねて出す意味がないため）
  if (pathname === href) return null
  // 購入者アンケート・印刷用カード・管理画面では見積りの導線を出さない
  if (pathname.startsWith('/voice') || pathname.startsWith('/admin')) return null
  if (visibleFor === pathname) return null

  return (
    <a
      href={href}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-90 p-3 gap-2 sm:px-5 sm:py-3 ${
        isProductDetail ? 'max-md:hidden' : ''
      }`}
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
