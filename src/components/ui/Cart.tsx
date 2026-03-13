'use client'

import { useCart } from '@/lib/cart'
import Link from 'next/link'

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice, checkoutUrl } = useCart()

  if (items.length === 0) return null

  return (
    <div
      id="cart"
      className="rounded-sm overflow-hidden"
      style={{ border: '2px solid var(--color-accent)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ background: 'var(--color-accent)', color: '#fff' }}
      >
        <h3 className="text-base font-medium tracking-wide">
          カート（{items.length}種類 / {totalItems}個）
        </h3>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs underline opacity-80 hover:opacity-100 transition-opacity"
        >
          すべて削除
        </button>
      </div>

      {/* Items */}
      <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
        {items.map((item) => (
          <div key={item.id} className="px-6 py-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  {item.sizeName}
                  <span className="text-xs ml-2" style={{ color: 'var(--color-muted)' }}>
                    {item.capacity}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {item.engraving !== 'none' && (
                    <span
                      className="inline-block rounded-sm px-2 py-0.5 text-[10px]"
                      style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                    >
                      {item.engravingLabel}
                    </span>
                  )}
                  {item.coating && (
                    <span
                      className="inline-block rounded-sm px-2 py-0.5 text-[10px]"
                      style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                    >
                      コーティング
                    </span>
                  )}
                  {item.lid && (
                    <span
                      className="inline-block rounded-sm px-2 py-0.5 text-[10px]"
                      style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                    >
                      蓋あり
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-xs shrink-0 ml-4 px-2 py-1 rounded-sm transition-colors hover:bg-red-50"
                style={{ color: 'var(--color-muted)' }}
                aria-label="削除"
              >
                &times; 削除
              </button>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, Math.max(10, item.quantity - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-sm text-sm"
                  style={{ border: '1px solid var(--color-border)', color: 'var(--foreground)' }}
                >
                  &minus;
                </button>
                <span className="text-sm w-12 text-center" style={{ color: 'var(--foreground)' }}>
                  {item.quantity}個
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-sm text-sm"
                  style={{ border: '1px solid var(--color-border)', color: 'var(--foreground)' }}
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  &yen;{item.lineTotal.toLocaleString()}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>
                  @&yen;{item.unitPrice.toLocaleString()} &times; {item.quantity}
                  {item.setupFee > 0 && ` + 金型代¥${item.setupFee.toLocaleString()}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div
        className="px-6 py-5"
        style={{ background: 'var(--color-subtle)', borderTop: '1px solid var(--color-border)' }}
      >
        <div className="flex items-end justify-between mb-4">
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            合計（税別）
          </p>
          <p className="text-2xl font-medium tracking-tight" style={{ color: 'var(--color-accent)' }}>
            &yen;{totalPrice.toLocaleString()}
          </p>
        </div>

        <div className="space-y-3">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent block w-full text-center"
          >
            決済に進む（FOMUS SHOP）
          </a>
          <Link href="/custom" className="btn-outline block w-full text-center">
            お見積り・ご相談フォームへ
          </Link>
        </div>
      </div>
    </div>
  )
}
