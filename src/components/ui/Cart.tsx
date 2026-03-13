'use client'

import { useCart } from '@/lib/cart'
import Link from 'next/link'

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice, checkoutUrl } =
    useCart()

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
        <div className="flex items-center gap-3">
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
          <h3 className="text-sm font-medium tracking-wide">
            カート — {items.length}種類 / {totalItems}個
          </h3>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-[10px] underline opacity-70 hover:opacity-100 transition-opacity"
        >
          すべて削除
        </button>
      </div>

      {/* Items */}
      <div>
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="px-6 py-5"
            style={{
              borderBottom:
                idx < items.length - 1 ? '1px solid var(--color-border)' : undefined,
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold shrink-0"
                    style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                  >
                    {idx + 1}
                  </span>
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    {item.sizeName}
                    <span className="text-[10px] ml-1.5 font-normal" style={{ color: 'var(--color-muted)' }}>
                      {item.capacity}
                    </span>
                  </p>
                </div>

                {/* Option tags */}
                <div className="flex flex-wrap gap-1.5 ml-7 mb-2">
                  {item.engraving !== 'none' && (
                    <span
                      className="inline-block rounded-sm px-2 py-0.5 text-[9px]"
                      style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                    >
                      {item.engravingLabel}
                    </span>
                  )}
                  {item.coating && (
                    <span
                      className="inline-block rounded-sm px-2 py-0.5 text-[9px]"
                      style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                    >
                      コーティング
                    </span>
                  )}
                  {item.lid && (
                    <span
                      className="inline-block rounded-sm px-2 py-0.5 text-[9px]"
                      style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                    >
                      蓋あり
                    </span>
                  )}
                  {item.engraving === 'none' && !item.coating && !item.lid && (
                    <span className="text-[9px]" style={{ color: 'var(--color-muted)' }}>
                      オプションなし
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="shrink-0 ml-2 w-7 h-7 flex items-center justify-center rounded-sm text-sm transition-colors"
                style={{ color: 'var(--color-muted)' }}
                aria-label="削除"
              >
                &times;
              </button>
            </div>

            {/* Quantity + Price row */}
            <div className="flex items-center justify-between ml-7">
              <div className="flex items-center border rounded-sm overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, Math.max(10, item.quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center text-xs"
                  style={{ color: 'var(--foreground)', borderRight: '1px solid var(--color-border)' }}
                >
                  &minus;
                </button>
                <span className="w-12 h-7 flex items-center justify-center text-xs" style={{ color: 'var(--foreground)' }}>
                  {item.quantity}個
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center text-xs"
                  style={{ color: 'var(--foreground)', borderLeft: '1px solid var(--color-border)' }}
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  &yen;{item.lineTotal.toLocaleString()}
                </p>
                <p className="text-[9px]" style={{ color: 'var(--color-muted)' }}>
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
        className="px-6 py-6"
        style={{ background: 'var(--color-subtle)', borderTop: '1px solid var(--color-border)' }}
      >
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs mb-0.5" style={{ color: 'var(--color-muted)' }}>合計（税別）</p>
            <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>
              {items.length}種類 / {totalItems}個
            </p>
          </div>
          <p className="text-3xl font-medium tracking-tight" style={{ color: 'var(--color-accent)' }}>
            &yen;{totalPrice.toLocaleString()}
          </p>
        </div>

        <div className="space-y-2">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-sm text-sm font-medium tracking-wide transition-all hover:opacity-90"
            style={{ background: 'var(--color-accent)', color: '#fff', cursor: 'pointer' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            決済に進む（FOMUS SHOP）
          </a>
          <Link
            href="/custom"
            className="block w-full py-3 rounded-sm text-center text-xs tracking-wide transition-all"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--foreground)',
            }}
          >
            お見積り・ご相談フォームへ
          </Link>
        </div>
      </div>
    </div>
  )
}
