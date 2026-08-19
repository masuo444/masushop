'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { masuSizes, engravingMethods, optionPrices } from '@/lib/masu-data'
import type { MasuSize } from '@/lib/masu-data'
import { useCart } from '@/lib/cart'

const ENGRAVING_LABELS: Record<string, string> = {
  none: 'なし',
  yakiin: '焼印',
  laser: 'レーザー刻印',
}

export default function OrderConfigurator() {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<MasuSize | null>(null)
  const [engraving, setEngraving] = useState('none')
  const [coating, setCoating] = useState(false)
  const [lid, setLid] = useState(false)
  const [quantity, setQuantity] = useState(10)
  const [justAdded, setJustAdded] = useState(false)
  const cartRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

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
  const lineTotal = unitPrice * quantity + engravingSetup

  const handleSizeSelect = (size: MasuSize) => {
    setSelectedSize(size)
    setLid(false)
    setJustAdded(false)
  }

  const handleAddToCart = () => {
    if (!selectedSize) return
    addItem({
      sizeId: selectedSize.id,
      sizeName: selectedSize.name,
      capacity: selectedSize.capacity,
      engraving,
      engravingLabel: ENGRAVING_LABELS[engraving] || 'なし',
      coating,
      lid,
      quantity,
      unitPrice,
      setupFee: engravingSetup,
      lineTotal,
    })
    setJustAdded(true)
    // Scroll to cart
    setTimeout(() => {
      document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 200)
  }

  const handleAddAndContinue = () => {
    handleAddToCart()
    setTimeout(() => {
      setSelectedSize(null)
      setEngraving('none')
      setCoating(false)
      setLid(false)
      setQuantity(10)
      setJustAdded(false)
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 800)
  }

  // Build option summary chips
  const optionChips: string[] = []
  if (engraving !== 'none') optionChips.push(ENGRAVING_LABELS[engraving])
  if (coating) optionChips.push('コーティング')
  if (lid) optionChips.push('蓋あり')

  return (
    <div ref={topRef}>
      {/* ===== サイズ選択 ===== */}
      <div className="mb-8">
        <p className="text-xs font-medium tracking-wider mb-4" style={{ color: 'var(--color-accent)' }}>
          STEP 1 — サイズを選ぶ
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {masuSizes.map((m) => {
            const isSelected = selectedSize?.id === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSizeSelect(m)}
                className="relative text-left rounded-sm overflow-hidden transition-all duration-200"
                style={{
                  border: isSelected
                    ? '2px solid var(--color-accent)'
                    : '1px solid var(--color-border)',
                  background: isSelected ? 'var(--color-accent-light)' : 'var(--background)',
                }}
              >
                {/* Mini image */}
                <div
                  className="h-20 sm:h-24 overflow-hidden"
                  style={{ background: 'var(--color-subtle)' }}
                >
                  <Image
                    src="/images/masu-crest.jpg"
                    alt={m.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    {m.name}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-muted)' }}>
                    {m.capacity} / {m.size}
                  </p>
                  <p className="text-sm font-medium mt-1" style={{ color: 'var(--color-accent)' }}>
                    &yen;{m.priceFrom.toLocaleString()}〜
                  </p>
                </div>
                {isSelected && (
                  <div
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                    style={{ background: 'var(--color-accent)', color: '#fff' }}
                  >
                    &#10003;
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ===== オプション＋数量＋合計（横2カラム on desktop） ===== */}
      {selectedSize && (
        <div className="grid gap-8 lg:grid-cols-5">
          {/* 左: オプション選択 (3col) */}
          <div className="lg:col-span-3 space-y-8">
            {/* 名入れ */}
            <div>
              <p className="text-xs font-medium tracking-wider mb-3" style={{ color: 'var(--color-accent)' }}>
                STEP 2 — 名入れ
              </p>
              <div className="grid grid-cols-3 gap-2">
                {engravingMethods.map((method) => {
                  const isActive = engraving === method.id
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setEngraving(method.id)}
                      className="rounded-sm p-3 text-center transition-all duration-200"
                      style={{
                        border: isActive
                          ? '2px solid var(--color-accent)'
                          : '1px solid var(--color-border)',
                        background: isActive ? 'var(--color-accent-light)' : 'var(--background)',
                      }}
                    >
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        {method.name}
                      </p>
                      <p className="text-[10px] mt-1" style={{ color: 'var(--color-accent)' }}>
                        {method.id === 'none' && '¥0'}
                        {method.id === 'yakiin' && `金型 ¥${method.setupFee.toLocaleString()}`}
                        {method.id === 'laser' && `+¥${method.pricePerUnit}/個`}
                      </p>
                    </button>
                  )
                })}
              </div>
              {engraving !== 'none' && selectedEngraving?.description && (
                <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {selectedEngraving.description}
                </p>
              )}
            </div>

            {/* コーティング・蓋 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium tracking-wider" style={{ color: 'var(--color-accent)' }}>
                  STEP 3 — オプション
                </p>
              </div>
              <div className={`grid gap-2 ${selectedSize.hasLidOption ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <button
                  type="button"
                  onClick={() => setCoating(!coating)}
                  className="flex items-center gap-3 rounded-sm p-4 transition-all duration-200"
                  style={{
                    border: coating ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                    background: coating ? 'var(--color-accent-light)' : 'var(--background)',
                  }}
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-sm text-xs shrink-0"
                    style={{
                      border: coating ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                      background: coating ? 'var(--color-accent)' : 'transparent',
                      color: '#fff',
                    }}
                  >
                    {coating ? '\u2713' : ''}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      コーティング
                    </p>
                    <p className="text-[10px]" style={{ color: 'var(--color-accent)' }}>
                      +&yen;{optionPrices.coating.toLocaleString()}/個
                    </p>
                  </div>
                </button>

                {selectedSize.hasLidOption && (
                  <button
                    type="button"
                    onClick={() => setLid(!lid)}
                    className="flex items-center gap-3 rounded-sm p-4 transition-all duration-200"
                    style={{
                      border: lid ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                      background: lid ? 'var(--color-accent-light)' : 'var(--background)',
                    }}
                  >
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-sm text-xs shrink-0"
                      style={{
                        border: lid ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                        background: lid ? 'var(--color-accent)' : 'transparent',
                        color: '#fff',
                      }}
                    >
                      {lid ? '\u2713' : ''}
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        蓋あり
                      </p>
                      <p className="text-[10px]" style={{ color: 'var(--color-accent)' }}>
                        +&yen;{(selectedSize.id === 'sanjaku' ? optionPrices.lid.sanjaku : optionPrices.lid.ichigo).toLocaleString()}/個
                      </p>
                    </div>
                  </button>
                )}
              </div>
              <Link
                href="/coating"
                className="inline-flex items-center gap-1.5 mt-3 text-[11px] transition-colors hover:underline"
                style={{ color: 'var(--color-accent)' }}
                target="_blank"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                コーティングについて詳しく見る
              </Link>

              {selectedSize.id === 'ichigo' && (
                <div
                  className="mt-4 flex items-center gap-3 rounded-sm p-3"
                  style={{
                    background: 'var(--color-accent-light)',
                    border: '1px solid var(--color-accent)',
                  }}
                >
                  <div className="flex shrink-0 -space-x-2">
                    <Image
                      src="/images/package/ichigo-clear-case.webp"
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-sm border-2 object-cover"
                      style={{ borderColor: 'var(--background)' }}
                    />
                    <Image
                      src="/images/package/ichigo-white-box.webp"
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-sm border-2 object-cover"
                      style={{ borderColor: 'var(--background)' }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
                      一合枡限定：クリアケース・白箱 各&yen;{optionPrices.packaging}/個（税別）
                    </p>
                    <Link
                      href="/products/ichigo#ichigo-packaging-title"
                      className="mt-1 inline-block text-[11px] hover:underline"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      パッケージを見る・見積りを相談する &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 数量 */}
            <div>
              <p className="text-xs font-medium tracking-wider mb-3" style={{ color: 'var(--color-accent)' }}>
                STEP 4 — 数量
              </p>
              <div className="flex items-center gap-2">
                {[10, 20, 50, 100].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuantity(q)}
                    className="px-3 py-2 rounded-sm text-xs transition-all"
                    style={{
                      border: quantity === q ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                      background: quantity === q ? 'var(--color-accent-light)' : 'var(--background)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {q}個
                  </button>
                ))}
                <div className="flex items-center border rounded-sm overflow-hidden ml-2" style={{ borderColor: 'var(--color-border)' }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(10, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-sm"
                    style={{ color: 'var(--foreground)', borderRight: '1px solid var(--color-border)' }}
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
                    className="w-16 h-9 text-center text-sm outline-none"
                    style={{ background: 'var(--background)', color: 'var(--foreground)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-sm"
                    style={{ color: 'var(--foreground)', borderLeft: '1px solid var(--color-border)' }}
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-[11px] mt-2" style={{ color: 'var(--color-muted)' }}>
                10個以上からご注文いただけます
              </p>
            </div>
          </div>

          {/* 右: 注文サマリー (2col) — sticky */}
          <div className="lg:col-span-2" ref={cartRef}>
            <div
              className="rounded-sm overflow-hidden lg:sticky lg:top-28"
              style={{ border: '1px solid var(--color-border)' }}
            >
              {/* Header */}
              <div className="px-5 py-4" style={{ background: 'var(--color-subtle)', borderBottom: '1px solid var(--color-border)' }}>
                <p className="text-xs font-medium tracking-wider" style={{ color: 'var(--color-accent)' }}>
                  注文内容
                </p>
              </div>

              {/* Summary */}
              <div className="px-5 py-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 shrink-0 rounded-sm overflow-hidden">
                    <Image
                      src="/images/masu-crest.jpg"
                      alt={selectedSize.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      {selectedSize.name}
                    </p>
                    <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>
                      {selectedSize.capacity} / {selectedSize.size}
                    </p>
                  </div>
                </div>

                {/* Options */}
                {optionChips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {optionChips.map((chip) => (
                      <span
                        key={chip}
                        className="inline-block rounded-sm px-2 py-0.5 text-[10px]"
                        style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price breakdown */}
                <div
                  className="space-y-1 pt-3 text-xs"
                  style={{ borderTop: '1px solid var(--color-border)' }}
                >
                  <div className="flex justify-between" style={{ color: 'var(--color-muted)' }}>
                    <span>単価</span>
                    <span>&yen;{unitPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between" style={{ color: 'var(--color-muted)' }}>
                    <span>数量</span>
                    <span>&times;{quantity}個</span>
                  </div>
                  {engravingSetup > 0 && (
                    <div className="flex justify-between" style={{ color: 'var(--color-muted)' }}>
                      <span>金型代（初回）</span>
                      <span>&yen;{engravingSetup.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex items-end justify-between pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>小計（税別）</span>
                  <span className="text-xl font-medium" style={{ color: 'var(--color-accent)' }}>
                    &yen;{lineTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 pb-5 space-y-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 rounded-sm text-sm font-medium tracking-wide transition-all duration-300"
                  style={{
                    background: justAdded ? '#16a34a' : 'var(--color-accent)',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  {justAdded ? '\u2713 カートに追加しました' : 'カートに入れる'}
                </button>
                <button
                  type="button"
                  onClick={handleAddAndContinue}
                  className="w-full py-3 rounded-sm text-xs tracking-wide transition-all"
                  style={{
                    border: '1px solid var(--color-border)',
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                    cursor: 'pointer',
                  }}
                >
                  カートに入れて、別のサイズも追加する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedSize && (
        <div
          className="text-center py-12 rounded-sm"
          style={{ border: '1px dashed var(--color-border)', background: 'var(--color-subtle)' }}
        >
          <svg className="mx-auto mb-3 opacity-30" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--foreground)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            サイズを選んで注文を始めましょう
          </p>
        </div>
      )}
    </div>
  )
}
