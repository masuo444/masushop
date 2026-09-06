'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getAlternatePath, isEnglishPath } from '@/lib/locale'

/**
 * 日本語 / English の切り替え。
 * 対応する翻訳ページが無いパスでは、それぞれのトップページに送る。
 */
export default function LanguageToggle({
  className = '',
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const isEnglish = isEnglishPath(pathname)
  const href = getAlternatePath(pathname)

  const base =
    'text-[13px] leading-none px-2 py-1 transition-colors rounded-sm whitespace-nowrap'
  const activeStyle = { color: 'var(--foreground)', fontWeight: 500 }
  const inactiveStyle = { color: 'var(--color-muted)' }

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label="言語切り替え / Language"
    >
      {isEnglish ? (
        <>
          <Link href={href} className={base} style={inactiveStyle} onClick={onNavigate} hrefLang="ja">
            日本語
          </Link>
          <span aria-hidden="true" style={{ color: 'var(--color-border)' }}>
            /
          </span>
          <span className={base} style={activeStyle} aria-current="true">
            EN
          </span>
        </>
      ) : (
        <>
          <span className={base} style={activeStyle} aria-current="true">
            日本語
          </span>
          <span aria-hidden="true" style={{ color: 'var(--color-border)' }}>
            /
          </span>
          <Link href={href} className={base} style={inactiveStyle} onClick={onNavigate} hrefLang="en">
            EN
          </Link>
        </>
      )}
    </div>
  )
}
