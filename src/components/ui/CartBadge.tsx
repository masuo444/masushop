'use client'

import { useCart } from '@/lib/cart'

export default function CartBadge() {
  const { totalItems, items } = useCart()

  if (items.length === 0) return null

  return (
    <a
      href="/products#cart"
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs transition-all hover:opacity-80"
      style={{ background: 'var(--color-accent)', color: '#fff' }}
      aria-label={`カート ${totalItems}個`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <span className="font-medium">{totalItems}</span>
    </a>
  )
}
