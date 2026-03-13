'use client'

import { useState } from 'react'
import Image from 'next/image'
import { masuSizes, engravingMethods, optionPrices } from '@/lib/masu-data'
import type { MasuSize } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'

export default function OrderConfigurator() {
  const [selectedSize, setSelectedSize] = useState<MasuSize | null>(null)
  const [engraving, setEngraving] = useState('none')
  const [coating, setCoating] = useState(false)
  const [lid, setLid] = useState(false)
  const [quantity, setQuantity] = useState(10)

  const selectedEngraving = engravingMethods.find((m) => m.id === engraving)
  const engravingPerUnit = selectedEngraving?.pricePerUnit ?? 0
  const engravingSetup = selectedEngraving?.setupFee ?? 0
  const coatingPrice = coating ? optionPrices.coating : 0
  const lidPrice =
    lid && selectedSize?.hasLidOption
      ? selectedSize.id === 'sanjaku'
        ? optionPrices.lid.sanjaku
        : optionPrices.lid.ichigo
      : 0
  const unitPrice = (selectedSize?.priceFrom ?? 0) + engravingPerUnit + coatingPrice + lidPrice
  const totalPrice = unitPrice * quantity + engravingSetup

  const purchaseUrl = selectedSize
    ? `${siteConfig.fomusUrl}?product=${selectedSize.id}&engraving=${engraving}&coating=${coating ? 'yes' : 'no'}&lid=${lid ? 'yes' : 'no'}&qty=${quantity}`
    : '#'

  // Reset options when size changes
  const handleSizeSelect = (size: MasuSize) => {
    setSelectedSize(size)
    setLid(false)
    // Keep other options
  }

  return (
    <div>
      {/* ===== STEP 1: サイズ選択 ===== */}
      <div className="mb-10">
        <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            1
          </span>
          サイズを選ぶ
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {masuSizes.map((m) => {
            const isSelected = selectedSize?.id === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSizeSelect(m)}
                className="text-left rounded-sm p-4 transition-all duration-200"
                style={{
                  border: isSelected
                    ? '2px solid var(--color-accent)'
                    : '1px solid var(--color-border)',
                  background: isSelected ? 'var(--color-accent-light)' : 'var(--background)',
                  padding: isSelected ? '15px' : '16px',
                }}
              >
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  {m.name}
                </p>
                <p className="text-[11px] mb-1" style={{ color: 'var(--color-muted)' }}>
                  {m.capacity} / {m.size}
                </p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                  &yen;{m.priceFrom.toLocaleString()}〜
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* ===== STEP 2〜: オプション（サイズ選択後に表示） ===== */}
      {selectedSize && (
        <div className="space-y-10">
          {/* 選択中のサイズ情報 */}
          <div
            className="flex gap-5 rounded-sm p-5"
            style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
          >
            <div className="w-24 h-24 shrink-0 rounded-sm overflow-hidden">
              <Image
                src="/images/masu-crest.jpg"
                alt={selectedSize.name}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-base font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                {selectedSize.name}
              </h4>
              <p className="text-xs mb-1" style={{ color: 'var(--color-muted)' }}>
                {selectedSize.reading} / {selectedSize.capacity} / {selectedSize.size}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {selectedSize.capacityNote} — {selectedSize.use}
              </p>
            </div>
          </div>

          {/* ===== STEP 2: 名入れ ===== */}
          <div>
            <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                style={{ background: 'var(--color-accent)', color: '#fff' }}
              >
                2
              </span>
              名入れ（オプション）
            </h3>
            <div className="space-y-2">
              {engravingMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setEngraving(method.id)}
                  className="w-full text-left rounded-sm p-4 transition-all duration-200"
                  style={{
                    border:
                      engraving === method.id
                        ? '2px solid var(--color-accent)'
                        : '1px solid var(--color-border)',
                    background:
                      engraving === method.id ? 'var(--color-accent-light)' : 'var(--background)',
                    padding: engraving === method.id ? '15px' : '16px',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      {method.name}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-accent)' }}>
                      {method.id === 'none' && '無料'}
                      {method.id === 'yakiin' &&
                        `金型代 ¥${method.setupFee.toLocaleString()}`}
                      {method.id === 'laser' &&
                        `+¥${method.pricePerUnit.toLocaleString()} / 個`}
                    </span>
                  </div>
                  {method.description && (
                    <p
                      className="text-xs mt-1 leading-relaxed"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {method.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ===== STEP 3: その他オプション ===== */}
          <div>
            <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                style={{ background: 'var(--color-accent)', color: '#fff' }}
              >
                3
              </span>
              その他オプション
            </h3>
            <div className="space-y-2">
              {/* コーティング */}
              <button
                type="button"
                onClick={() => setCoating(!coating)}
                className="w-full text-left rounded-sm p-4 transition-all duration-200"
                style={{
                  border: coating
                    ? '2px solid var(--color-accent)'
                    : '1px solid var(--color-border)',
                  background: coating ? 'var(--color-accent-light)' : 'var(--background)',
                  padding: coating ? '15px' : '16px',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-sm text-xs"
                      style={{
                        border: coating
                          ? '2px solid var(--color-accent)'
                          : '1px solid var(--color-border)',
                        background: coating ? 'var(--color-accent)' : 'transparent',
                        color: coating ? '#fff' : 'transparent',
                      }}
                    >
                      {coating ? '\u2713' : ''}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      特殊コーティング
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--color-accent)' }}>
                    +&yen;{optionPrices.coating.toLocaleString()} / 個
                  </span>
                </div>
                <p
                  className="text-xs mt-1 ml-8 leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  水や汚れに強い特殊コーティングを施します
                </p>
              </button>

              {/* 蓋 */}
              {selectedSize.hasLidOption && (
                <button
                  type="button"
                  onClick={() => setLid(!lid)}
                  className="w-full text-left rounded-sm p-4 transition-all duration-200"
                  style={{
                    border: lid
                      ? '2px solid var(--color-accent)'
                      : '1px solid var(--color-border)',
                    background: lid ? 'var(--color-accent-light)' : 'var(--background)',
                    padding: lid ? '15px' : '16px',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-sm text-xs"
                        style={{
                          border: lid
                            ? '2px solid var(--color-accent)'
                            : '1px solid var(--color-border)',
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
                      +&yen;
                      {(selectedSize.id === 'sanjaku'
                        ? optionPrices.lid.sanjaku
                        : optionPrices.lid.ichigo
                      ).toLocaleString()}{' '}
                      / 個
                    </span>
                  </div>
                  <p
                    className="text-xs mt-1 ml-8 leading-relaxed"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    小物入れやギフトボックスとしてもお使いいただけます
                  </p>
                </button>
              )}
            </div>
          </div>

          {/* ===== STEP 4: 数量 ===== */}
          <div>
            <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                style={{ background: 'var(--color-accent)', color: '#fff' }}
              >
                4
              </span>
              数量
            </h3>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(10, quantity - 10))}
                className="flex h-10 w-10 items-center justify-center rounded-sm text-sm transition-colors"
                style={{ border: '1px solid var(--color-border)', color: 'var(--foreground)' }}
                aria-label="-10"
              >
                -10
              </button>
              <button
                type="button"
                onClick={() => setQuantity(Math.max(10, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-sm text-lg transition-colors"
                style={{ border: '1px solid var(--color-border)', color: 'var(--foreground)' }}
                aria-label="数量を減らす"
              >
                &minus;
              </button>
              <input
                type="number"
                min={10}
                value={quantity}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10)
                  if (!isNaN(v) && v >= 10) setQuantity(v)
                }}
                className="h-10 w-20 rounded-sm text-center text-sm"
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
                style={{ border: '1px solid var(--color-border)', color: 'var(--foreground)' }}
                aria-label="数量を増やす"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 10)}
                className="flex h-10 w-10 items-center justify-center rounded-sm text-sm transition-colors"
                style={{ border: '1px solid var(--color-border)', color: 'var(--foreground)' }}
                aria-label="+10"
              >
                +10
              </button>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
              ※ 10個以上からのご注文となります
            </p>
          </div>

          {/* ===== 合計金額 & 決済ボタン ===== */}
          <div
            className="rounded-sm p-6"
            style={{ background: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}
          >
            <div className="flex items-end justify-between mb-1">
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                合計金額（税別）
              </p>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                {selectedSize.name} &times; {quantity}個
              </p>
            </div>
            <p
              className="text-3xl font-medium tracking-tight mb-1"
              style={{ color: 'var(--color-accent)' }}
            >
              &yen;{totalPrice.toLocaleString()}
            </p>
            <p className="text-xs mb-6" style={{ color: 'var(--color-muted)' }}>
              &yen;{unitPrice.toLocaleString()} / 個 &times; {quantity}個
              {engravingSetup > 0 && (
                <span> ＋ 金型代 &yen;{engravingSetup.toLocaleString()}（初回のみ）</span>
              )}
            </p>

            <div className="space-y-3">
              <a
                href={purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent block w-full text-center"
              >
                決済に進む（FOMUS SHOP）
              </a>
              <a
                href="/custom"
                className="btn-outline block w-full text-center"
              >
                お見積り・ご相談フォームへ
              </a>
            </div>
          </div>
        </div>
      )}

      {/* サイズ未選択時のガイド */}
      {!selectedSize && (
        <p className="text-center text-sm py-8" style={{ color: 'var(--color-muted)' }}>
          上からサイズを選択してください
        </p>
      )}
    </div>
  )
}
