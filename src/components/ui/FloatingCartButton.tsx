'use client'

import { useCart } from '@/lib/cart'

export default function FloatingCartButton() {
  const { items, totalItems, totalPrice } = useCart()

  if (items.length === 0) return null

  return (
    <a
      href="/products#cart"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full px-5 py-3 shadow-lg transition-all hover:scale-105 lg:hidden"
      style={{ background: 'var(--color-accent)', color: '#fff' }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <span className="text-sm font-medium">
        {totalItems}個 &yen;{totalPrice.toLocaleString()}
      </span>
    </a>
  )
}
