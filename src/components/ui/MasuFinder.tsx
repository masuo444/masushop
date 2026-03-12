'use client'

import { useState } from 'react'
import Link from 'next/link'
import { masuSizes } from '@/lib/masu-data'

type Purpose = '日本酒を飲む' | 'ギフト・お祝い' | '節分・行事' | 'インテリア・小物入れ' | '企業ノベルティ' | '海外の方へ'
type Priority = '定番・王道' | '少量・おしゃれ' | '大きめ・存在感' | '名入れしたい'

type Recommendation = {
  masuId: string
  reason: string
  withEngraving: boolean
}

const purposes: { label: Purpose; desc: string }[] = [
  { label: '日本酒を飲む', desc: 'ヒノキの香りで一杯' },
  { label: 'ギフト・お祝い', desc: '結婚・出産・還暦に' },
  { label: '節分・行事', desc: '豆まき・鏡開きに' },
  { label: 'インテリア・小物入れ', desc: '暮らしに和の趣を' },
  { label: '企業ノベルティ', desc: '記念品・販促に' },
  { label: '海外の方へ', desc: '日本の伝統工芸を贈る' },
]

const priorities: { label: Priority; desc: string }[] = [
  { label: '定番・王道', desc: '迷ったらこれ' },
  { label: '少量・おしゃれ', desc: 'コンパクトで上品' },
  { label: '大きめ・存在感', desc: '迫力・インパクト重視' },
  { label: '名入れしたい', desc: '名前やロゴを刻印' },
]

function getRecommendation(purpose: Purpose, priority: Priority): Recommendation {
  // 節分・行事 — priority matters less, but check for 大きめ
  if (purpose === '節分・行事') {
    if (priority === '大きめ・存在感') {
      return { masuId: 'issho', reason: '鏡開きやイベントには、迫力の一升枡が場を盛り上げます。', withEngraving: false }
    }
    return { masuId: 'gogo', reason: '節分の豆まきに最も一般的なサイズ。家族分の豆がしっかり入ります。', withEngraving: false }
  }

  // 企業ノベルティ — always ichigo + engraving
  if (purpose === '企業ノベルティ') {
    return { masuId: 'ichigo', reason: '企業ロゴや社名を刻印できる定番サイズ。ノベルティ・記念品に最適です。', withEngraving: true }
  }

  // 海外の方へ — always ichigo + engraving
  if (purpose === '海外の方へ') {
    return { masuId: 'ichigo', reason: '日本の伝統工芸品として喜ばれる一合枡。ローマ字の名入れも人気です。', withEngraving: true }
  }

  // 日本酒を飲む
  if (purpose === '日本酒を飲む') {
    if (priority === '少量・おしゃれ') {
      return { masuId: 'goshaku', reason: '少量をゆっくり味わいたい方に。おちょこより大きく上品なサイズ感です。', withEngraving: false }
    }
    if (priority === '大きめ・存在感') {
      return { masuId: 'hasshaku', reason: 'もっきりスタイルにも最適。一合枡より少し小さく、手に馴染むサイズです。', withEngraving: false }
    }
    if (priority === '名入れしたい') {
      return { masuId: 'ichigo', reason: '名入れ映えする定番サイズ。特別な一杯を自分だけの枡で。', withEngraving: true }
    }
    return { masuId: 'ichigo', reason: '日本酒一合分がぴったり入る、最も定番の枡です。', withEngraving: false }
  }

  // ギフト・お祝い
  if (purpose === 'ギフト・お祝い') {
    if (priority === '名入れしたい') {
      return { masuId: 'goshaku', reason: '名前や日付を刻印して世界に一つだけのギフトに。ペアで贈るのも人気です。', withEngraving: true }
    }
    if (priority === '少量・おしゃれ') {
      return { masuId: 'goshaku', reason: 'コンパクトで上品なサイズ。プチギフトやお祝いの席に最適です。', withEngraving: false }
    }
    return { masuId: 'ichigo', reason: '贈り物の定番サイズ。「益す」の縁起を込めた一合枡です。', withEngraving: false }
  }

  // インテリア・小物入れ
  if (purpose === 'インテリア・小物入れ') {
    if (priority === '少量・おしゃれ') {
      return { masuId: 'sanjaku', reason: 'アクセサリー入れやミニ飾り枡に。コンパクトで可愛らしいサイズです。', withEngraving: false }
    }
    if (priority === '大きめ・存在感') {
      return { masuId: 'nigohan', reason: 'ペン立てや小物入れにぴったり。存在感のあるインテリアになります。', withEngraving: false }
    }
    if (priority === '名入れしたい') {
      return { masuId: 'ichigo', reason: '名入れでオリジナルのインテリア小物に。ヒノキの香りも楽しめます。', withEngraving: true }
    }
    return { masuId: 'nigohan', reason: '小物入れやディスプレイに最適なサイズ。暮らしに和の趣を添えます。', withEngraving: false }
  }

  // Default
  return { masuId: 'ichigo', reason: '迷ったらまずは一合枡。日本酒からギフトまで万能な定番サイズです。', withEngraving: false }
}

export default function MasuFinder() {
  const [step, setStep] = useState(1)
  const [purpose, setPurpose] = useState<Purpose | null>(null)
  const [priority, setPriority] = useState<Priority | null>(null)

  const handlePurpose = (p: Purpose) => {
    setPurpose(p)
    setStep(2)
  }

  const handlePriority = (p: Priority) => {
    setPriority(p)
    setStep(3)
  }

  const handleBack = () => {
    if (step === 2) {
      setPurpose(null)
      setStep(1)
    } else if (step === 3) {
      setPriority(null)
      setStep(2)
    }
  }

  const handleReset = () => {
    setPurpose(null)
    setPriority(null)
    setStep(1)
  }

  const recommendation = purpose && priority ? getRecommendation(purpose, priority) : null
  const recommendedMasu = recommendation ? masuSizes.find((m) => m.id === recommendation.masuId) : null

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      {/* Progress bar */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2.5rem',
        }}
      >
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: 3,
              background: s <= step ? 'var(--color-accent)' : 'var(--color-border)',
              transition: 'background 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* Step indicator */}
      <p
        style={{
          fontSize: '10px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
          marginBottom: '0.75rem',
        }}
      >
        STEP {step} / 3
      </p>

      {/* ===== STEP 1: Purpose ===== */}
      <div
        style={{
          opacity: step === 1 ? 1 : 0,
          maxHeight: step === 1 ? 800 : 0,
          overflow: 'hidden',
          transition: 'opacity 0.4s ease, max-height 0.4s ease',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-serif-jp), Georgia, serif',
            fontSize: '1.25rem',
            fontWeight: 400,
            marginBottom: '1.5rem',
          }}
        >
          用途を選んでください
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {purposes.map((p) => (
            <button
              key={p.label}
              onClick={() => handlePurpose(p.label)}
              style={{
                padding: '1.25rem 1rem',
                border: '1px solid var(--color-border)',
                background: 'var(--background)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.3s, background 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.background = 'var(--color-subtle)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.background = 'var(--background)'
              }}
            >
              <p style={{ fontWeight: 500, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{p.label}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ===== STEP 2: Priority ===== */}
      <div
        style={{
          opacity: step === 2 ? 1 : 0,
          maxHeight: step === 2 ? 800 : 0,
          overflow: 'hidden',
          transition: 'opacity 0.4s ease, max-height 0.4s ease',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-serif-jp), Georgia, serif',
            fontSize: '1.25rem',
            fontWeight: 400,
            marginBottom: '0.5rem',
          }}
        >
          こだわりポイントは？
        </h3>
        {purpose && (
          <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
            用途：{purpose}
          </p>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          {priorities.map((p) => (
            <button
              key={p.label}
              onClick={() => handlePriority(p.label)}
              style={{
                padding: '1.25rem 1rem',
                border: '1px solid var(--color-border)',
                background: 'var(--background)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.3s, background 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.background = 'var(--color-subtle)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.background = 'var(--background)'
              }}
            >
              <p style={{ fontWeight: 500, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{p.label}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{p.desc}</p>
            </button>
          ))}
        </div>
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem',
            color: 'var(--color-muted)',
            padding: '0.5rem 0',
          }}
        >
          ← 戻る
        </button>
      </div>

      {/* ===== STEP 3: Result ===== */}
      <div
        style={{
          opacity: step === 3 ? 1 : 0,
          maxHeight: step === 3 ? 1200 : 0,
          overflow: 'hidden',
          transition: 'opacity 0.4s ease, max-height 0.4s ease',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-serif-jp), Georgia, serif',
            fontSize: '1.25rem',
            fontWeight: 400,
            marginBottom: '1.5rem',
          }}
        >
          あなたにおすすめの枡
        </h3>

        {recommendedMasu && recommendation && (
          <>
            {/* Result card */}
            <div
              style={{
                border: '2px solid var(--color-accent)',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                background: 'var(--color-subtle)',
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: '0.75rem',
                  fontWeight: 500,
                }}
              >
                RECOMMENDED
              </p>
              <h4
                style={{
                  fontFamily: 'var(--font-serif-jp), Georgia, serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 400,
                  marginBottom: '0.5rem',
                }}
              >
                {recommendedMasu.name}
                {recommendation.withEngraving && ' + 名入れ'}
              </h4>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                {recommendedMasu.reading}
              </p>

              {/* Details */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  padding: '1.25rem',
                  background: 'var(--background)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    外寸
                  </p>
                  <p style={{ fontWeight: 500, fontSize: '0.9rem' }}>{recommendedMasu.size}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    容量
                  </p>
                  <p style={{ fontWeight: 500, fontSize: '0.9rem' }}>{recommendedMasu.capacity}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    参考価格
                  </p>
                  <p style={{ fontWeight: 500, fontSize: '0.9rem' }}>{recommendedMasu.priceFrom.toLocaleString()}円〜</p>
                </div>
              </div>

              {/* Reason */}
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--foreground)' }}>
                {recommendation.reason}
              </p>
            </div>

            {/* Selections summary */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem',
                fontSize: '0.8rem',
                color: 'var(--color-muted)',
              }}
            >
              <span>用途：{purpose}</span>
              <span>こだわり：{priority}</span>
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <Link href="/products" className="btn-accent">
                商品を見る
              </Link>
              {recommendation.withEngraving && (
                <Link href="/custom" className="btn-outline">
                  名入れ・お問い合わせ
                </Link>
              )}
              {!recommendation.withEngraving && (
                <Link href="/custom" className="btn-outline">
                  お問い合わせ
                </Link>
              )}
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                color: 'var(--color-muted)',
                padding: '0.5rem 0',
              }}
            >
              ← 最初からやり直す
            </button>
          </>
        )}
      </div>
    </div>
  )
}
