'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { isEnglishPath } from '@/lib/locale'

/**
 * <html lang> を現在のページの言語に合わせる。
 *
 * ルートレイアウトは全ページで共有されており、サーバー側では
 * パスを見られないため、クライアントで書き換えている。
 * 英語ページ側は <div lang="en"> も持っているので、この処理が
 * 走らなくても本文の言語判定は保たれる。
 */
export default function HtmlLang() {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.lang = isEnglishPath(pathname) ? 'en' : 'ja'
  }, [pathname])

  return null
}
