'use client'

import { useEffect } from 'react'
import { euProducts } from '@/lib/eu-order-products'
import { trackSiteEvent } from '@/lib/interaction-tracking'

type Gtag = (command: string, eventName: string, params?: Record<string, unknown>) => void
const SENT_KEY = 'masu-purchase-sent'

/**
 * 決済完了をGA4（purchase）と自前の記録に1回だけ送る。
 * Stripe の決済リンクから ?product=ichigo&session_id=cs_... 付きで戻ってくる。
 * 数量は分からないので、金額は1個分を目安として送る。
 */
export default function PurchaseTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id') || ''
    const product = euProducts.find((p) => p.id === params.get('product'))
    const productId = product?.id || 'unknown'

    try {
      const sent = new Set<string>(JSON.parse(localStorage.getItem(SENT_KEY) || '[]'))
      const key = sessionId || `${productId}:${new Date().toDateString()}`
      if (sent.has(key)) return
      sent.add(key)
      localStorage.setItem(SENT_KEY, JSON.stringify([...sent].slice(-50)))
    } catch {
      // ストレージが使えない場合は重複を許して送る
    }

    trackSiteEvent('purchase', productId)
    const gtag = (window as unknown as { gtag?: Gtag }).gtag
    if (typeof gtag !== 'function') return
    try {
      gtag('event', 'purchase', {
        transaction_id: sessionId || undefined,
        currency: 'EUR',
        value: product ? Number(product.price) : undefined,
        items: [{ item_id: productId, item_name: product?.name, price: product ? Number(product.price) : undefined }],
      })
    } catch {
      // 計測の失敗で表示を妨げない
    }
  }, [])

  return null
}
