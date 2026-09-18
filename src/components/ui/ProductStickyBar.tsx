'use client'

import { useEffect, useState } from 'react'

/**
 * 商品ページ（スマホのみ）の下部固定バー。
 * 押すと同じページ内の「かんたん見積り」（#quote）までスクロールする。
 * 見積りフォームが画面に入っている間は隠す。
 */
export default function ProductStickyBar({
  productName,
  targetId = 'quote',
}: {
  productName: string
  targetId?: string
}) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: '0px 0px -20% 0px' },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [targetId])

  const scrollToQuote = () => {
    const target = document.getElementById(targetId)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // スクロール後に見出しへフォーカスを移す（キーボード操作の続きができるように）
    const heading = target.querySelector<HTMLElement>('h2')
    window.setTimeout(() => heading?.focus?.(), 400)
  }

  return (
    <>
      {/* バーの高さぶんフッターが隠れないように余白を取る */}
      <div className="md:hidden" style={{ height: 76 }} aria-hidden />
      <div
        id="product-sticky-bar"
        className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
          hidden ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{
          background: 'var(--background)',
          borderTop: '1px solid var(--color-border)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="text-[13px] leading-tight font-medium truncate">{productName}</p>
            <p className="text-[11px] leading-tight" style={{ color: 'var(--color-muted)' }}>
              見積り・仕上がりイメージ無料
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToQuote}
            className="ml-auto shrink-0 rounded-sm px-5 py-3 text-sm font-medium cursor-pointer"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            このサイズで見積り（無料）
          </button>
        </div>
      </div>
    </>
  )
}
