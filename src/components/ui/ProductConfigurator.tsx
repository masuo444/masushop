'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { MasuSize } from '@/lib/masu-data'
import { engravingMethods, optionPrices } from '@/lib/masu-data'

export default function ProductConfigurator({ product }: { product: MasuSize }) {
  const [engraving, setEngraving] = useState('none')
  const [coating, setCoating] = useState(false)
  const [lid, setLid] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const selectedEngraving = engravingMethods.find((m) => m.id === engraving)
  const engravingPrice = selectedEngraving?.price ?? 0
  const coatingPrice = coating ? optionPrices.coating : 0
  const lidPrice = lid && product.hasLidOption ? optionPrices.lid : 0
  const unitPrice = product.priceFrom + engravingPrice + coatingPrice + lidPrice
  const totalPrice = unitPrice * quantity

  const purchaseUrl = `https://shop.fomus.co.jp?product=${product.id}&engraving=${engraving}&coating=${coating ? 'yes' : 'no'}&lid=${lid ? 'yes' : 'no'}&qty=${quantity}`

  return (
    <div className="space-y-8">
      {/* 価格表示 */}
      <div>
        <p className="text-xs tracking-wider mb-1" style={{ color: 'var(--color-muted)' }}>
          合計金額（税別）
        </p>
        <p className="text-3xl font-medium tracking-tight" style={{ color: 'var(--color-accent)' }}>
          &yen;{totalPrice.toLocaleString()}
        </p>
        {quantity > 1 && (
          <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
            &yen;{unitPrice.toLocaleString()} / 個 &times; {quantity}個
          </p>
        )}
      </div>

      <div className="divider" />

      {/* 名入れ選択 */}
      <div>
        <h3 className="serif text-base mb-3" style={{ color: 'var(--foreground)' }}>名入れ</h3>
        <div className="space-y-2">
          {engravingMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setEngraving(method.id)}
              className="w-full text-left rounded-sm p-4 transition-all duration-200"
              style={{
                border: engraving === method.id
                  ? '2px solid var(--color-accent)'
                  : '1px solid var(--color-border)',
                background: engraving === method.id
                  ? 'var(--color-accent-light)'
                  : 'var(--background)',
                padding: engraving === method.id ? '15px' : '16px',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  {method.name}
                </span>
                {method.price > 0 && (
                  <span className="text-xs" style={{ color: 'var(--color-accent)' }}>
                    +&yen;{method.price.toLocaleString()}
                  </span>
                )}
              </div>
              {method.description && (
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {method.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 特殊コーティング */}
      <div>
        <h3 className="serif text-base mb-3" style={{ color: 'var(--foreground)' }}>特殊コーティング</h3>
        <button
          type="button"
          onClick={() => setCoating(!coating)}
          className="w-full text-left rounded-sm p-4 transition-all duration-200"
          style={{
            border: coating
              ? '2px solid var(--color-accent)'
              : '1px solid var(--color-border)',
            background: coating
              ? 'var(--color-accent-light)'
              : 'var(--background)',
            padding: coating ? '15px' : '16px',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-sm text-xs transition-colors"
                style={{
                  border: coating ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                  background: coating ? 'var(--color-accent)' : 'transparent',
                  color: coating ? '#fff' : 'transparent',
                }}
              >
                {coating ? '\u2713' : ''}
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                コーティングあり
              </span>
            </div>
            <span className="text-xs" style={{ color: 'var(--color-accent)' }}>
              +&yen;{optionPrices.coating.toLocaleString()}
            </span>
          </div>
          <p className="text-xs mt-1 ml-8 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            水や汚れに強い特殊コーティングを施します
          </p>
        </button>
      </div>

      {/* 蓋 */}
      {product.hasLidOption && (
        <div>
          <h3 className="serif text-base mb-3" style={{ color: 'var(--foreground)' }}>蓋</h3>
          <button
            type="button"
            onClick={() => setLid(!lid)}
            className="w-full text-left rounded-sm p-4 transition-all duration-200"
            style={{
              border: lid
                ? '2px solid var(--color-accent)'
                : '1px solid var(--color-border)',
              background: lid
                ? 'var(--color-accent-light)'
                : 'var(--background)',
              padding: lid ? '15px' : '16px',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-sm text-xs transition-colors"
                  style={{
                    border: lid ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                    background: lid ? 'var(--color-accent)' : 'transparent',
                    color: lid ? '#fff' : 'transparent',
                  }}
                >
                  {lid ? '\u2713' : ''}
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  蓋あり
                </span>
              </div>
              <span className="text-xs" style={{ color: 'var(--color-accent)' }}>
                +&yen;{optionPrices.lid.toLocaleString()}
              </span>
            </div>
            <p className="text-xs mt-1 ml-8 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              小物入れやギフトボックスとしてもお使いいただけます
            </p>
          </button>
        </div>
      )}

      {/* 数量 */}
      <div>
        <h3 className="serif text-base mb-3" style={{ color: 'var(--foreground)' }}>数量</h3>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-sm text-lg transition-colors"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--foreground)',
            }}
            aria-label="数量を減らす"
          >
            &minus;
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10)
              if (!isNaN(v) && v >= 1) setQuantity(v)
            }}
            className="h-10 w-16 rounded-sm text-center text-sm"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--background)',
              color: 'var(--foreground)',
            }}
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-sm text-lg transition-colors"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--foreground)',
            }}
            aria-label="数量を増やす"
          >
            +
          </button>
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
          ※ 無垢の枡は10個以上からのご注文となります
        </p>
      </div>

      <div className="divider" />

      {/* 合計 */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs tracking-wider" style={{ color: 'var(--color-muted)' }}>
            合計金額（税別）
          </p>
          <p className="text-2xl font-medium tracking-tight" style={{ color: 'var(--color-accent)' }}>
            &yen;{totalPrice.toLocaleString()}
          </p>
        </div>
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
          {quantity}個
        </p>
      </div>

      {/* 購入ボタン */}
      <div className="space-y-3">
        <a
          href={purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent block w-full text-center"
        >
          FOMUS SHOPで購入する
        </a>
        <Link
          href="/custom"
          className="btn-outline block w-full text-center"
        >
          お見積り相談
        </Link>
      </div>
    </div>
  )
}
