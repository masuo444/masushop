'use client'

import { useEffect } from 'react'
import siteConfig from '@/lib/site-config'
import { masuSizes } from '@/lib/masu-data'

// ── Volume pricing (tax-excluded unit prices) ──
const volumePricing = [
  { size: '三勺枡', capacity: '54ml', p10: 500, p50: 475, p100: 450, p300: 425 },
  { size: '五勺枡', capacity: '100ml', p10: 600, p50: 570, p100: 540, p300: 510 },
  { size: '八勺枡', capacity: '144ml', p10: 700, p50: 665, p100: 630, p300: 595 },
  { size: '一合枡', capacity: '180ml', p10: 800, p50: 760, p100: 720, p300: 680 },
  { size: '二合半枡', capacity: '450ml', p10: 1200, p50: 1140, p100: 1080, p300: 1020 },
  { size: '五合枡', capacity: '900ml', p10: 1800, p50: 1710, p100: 1620, p300: 1530 },
  { size: '一升枡', capacity: '1800ml', p10: 2500, p50: 2375, p100: 2250, p300: 2125 },
]

// ── Options pricing ──
const options = [
  { name: '焼印', price: '内容と数量に応じてお見積り' },
  { name: 'レーザー刻印', price: '内容と数量に応じてお見積り' },
  { name: '特殊コーティング', price: '¥800/個' },
  { name: '蓋（三勺枡）', price: '¥800/個' },
  { name: '蓋（一合枡）', price: '¥1,000/個' },
]

// ── Delivery timeline ──
const deliveryTimelines = [
  { type: '無地枡（名入れなし）', lead: '約2週間' },
  { type: '焼印入り枡', lead: '約3週間' },
  { type: 'レーザー刻印入り枡', lead: '約3週間' },
  { type: '大口注文（300個以上）', lead: '約4週間' },
]

// ── Order flow ──
const orderSteps = [
  { step: 1, title: 'お問い合わせ', desc: 'サイズ・数量・加工方法・ご希望納期をお伝えください。' },
  { step: 2, title: 'デザイン確認', desc: 'ロゴデータを元にレイアウトをご提案。修正は何度でも無料。' },
  { step: 3, title: 'サンプル確認', desc: 'ご希望に応じて実物サンプルを製作。量産前に仕上がりを確認。' },
  { step: 4, title: '量産・製作', desc: '国産ヒノキで一つずつ丁寧に製作。進捗はメールでご報告。' },
  { step: 5, title: '検品・納品', desc: '一つひとつ検品し、丁寧に梱包してお届け。' },
]

export default function CatalogPage() {
  // Inject print styles on mount
  useEffect(() => {
    const styleId = 'catalog-print-styles'
    if (document.getElementById(styleId)) return

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @media print {
        /* Hide site chrome */
        header, footer, nav,
        [data-site-header], [data-site-footer],
        .site-header, .site-footer {
          display: none !important;
        }

        /* Hide the download button */
        .catalog-no-print {
          display: none !important;
        }

        /* Force white background */
        html, body {
          background: #fff !important;
          color: #1a1a1a !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        /* A4 margins */
        @page {
          size: A4;
          margin: 15mm 18mm;
        }

        /* Prevent breaks inside sections */
        .catalog-section {
          break-inside: avoid;
        }

        /* Ensure tables print well */
        table {
          break-inside: avoid;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      const el = document.getElementById(styleId)
      if (el) el.remove()
    }
  }, [])

  const today = new Date()
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '48px 32px',
        background: '#fff',
        color: '#1a1a1a',
        fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
        lineHeight: 1.8,
      }}
    >
      {/* ━━━ Download button (hidden in print) ━━━ */}
      <div className="catalog-no-print" style={{ marginBottom: 40, textAlign: 'center' }}>
        <button
          onClick={() => window.print()}
          style={{
            background: 'var(--color-accent)',
            color: '#fff',
            border: 'none',
            padding: '14px 40px',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            borderRadius: 2,
          }}
        >
          PDFとしてダウンロード
        </button>
        <p style={{ fontSize: 11, color: 'var(--color-muted)', marginTop: 8 }}>
          ブラウザの印刷ダイアログで「PDFとして保存」を選択してください
        </p>
      </div>

      {/* ━━━ 1. Company header ━━━ */}
      <div
        className="catalog-section"
        style={{
          textAlign: 'center',
          paddingBottom: 32,
          borderBottom: '2px solid #1a1a1a',
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 300, letterSpacing: '0.15em', margin: 0 }}>
          MASU-STORE
        </h1>
        <p style={{ fontSize: 13, letterSpacing: '0.3em', marginTop: 6, color: '#666' }}>
          枡の専門店
        </p>
        <p style={{ fontSize: 10, letterSpacing: '0.2em', marginTop: 4, color: '#999' }}>
          by FOMUS
        </p>
        <p style={{ fontSize: 20, fontWeight: 300, marginTop: 24, letterSpacing: '0.08em' }}>
          法人向け枡カタログ
        </p>
        <p style={{ fontSize: 10, color: '#999', marginTop: 8 }}>
          発行日: {dateStr}
        </p>
      </div>

      {/* ━━━ 2. Product lineup ━━━ */}
      <div className="catalog-section" style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>商品ラインナップ</h2>
        <p style={{ fontSize: 10, color: '#999', marginBottom: 16 }}>
          全7サイズの国産ヒノキ（檜）枡
        </p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 12,
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '8px 8px 8px 0', fontWeight: 600, fontSize: 11, color: '#666' }}>
                サイズ名
              </th>
              <th style={{ textAlign: 'left', padding: '8px', fontWeight: 600, fontSize: 11, color: '#666' }}>
                外寸
              </th>
              <th style={{ textAlign: 'center', padding: '8px', fontWeight: 600, fontSize: 11, color: '#666' }}>
                容量
              </th>
              <th style={{ textAlign: 'right', padding: '8px 0 8px 8px', fontWeight: 600, fontSize: 11, color: '#666' }}>
                単価（税別）
              </th>
            </tr>
          </thead>
          <tbody>
            {masuSizes.map((masu) => (
              <tr key={masu.id} style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '8px 8px 8px 0', fontWeight: 500 }}>
                  {masu.name}
                  <span style={{ fontSize: 10, color: '#999', marginLeft: 6 }}>
                    ({masu.reading})
                  </span>
                </td>
                <td style={{ padding: '8px', fontSize: 11, color: '#555' }}>
                  {masu.size}
                </td>
                <td style={{ padding: '8px', textAlign: 'center', fontSize: 11 }}>
                  {masu.capacity}
                </td>
                <td style={{ padding: '8px 0 8px 8px', textAlign: 'right', fontWeight: 500 }}>
                  &yen;{masu.priceFrom.toLocaleString()}〜
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ fontSize: 10, color: '#999', marginTop: 8 }}>
          ※ 表示価格は10個以上ご注文時の税別単価です。数量に応じた割引がございます。
        </p>
      </div>

      {/* ━━━ 3. Volume pricing table ━━━ */}
      <div className="catalog-section" style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>数量別価格表</h2>
        <p style={{ fontSize: 10, color: '#999', marginBottom: 16 }}>
          まとめ買いほどお得に。表示価格は枡本体の税別単価です。
        </p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 11,
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '8px 6px 8px 0', fontWeight: 600, fontSize: 10, color: '#666' }}>
                サイズ
              </th>
              <th style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 600, fontSize: 10, color: '#666' }}>
                10〜49個
              </th>
              <th style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 600, fontSize: 10, color: '#666' }}>
                50〜99個
              </th>
              <th style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 600, fontSize: 10, color: '#666' }}>
                100〜299個
              </th>
              <th style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 600, fontSize: 10, color: '#666' }}>
                300〜499個
              </th>
              <th style={{ textAlign: 'center', padding: '8px 0 8px 6px', fontWeight: 600, fontSize: 10, color: '#666' }}>
                500個〜
              </th>
            </tr>
          </thead>
          <tbody>
            {volumePricing.map((row) => (
              <tr key={row.size} style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '8px 6px 8px 0', fontWeight: 500 }}>
                  {row.size}
                  <span style={{ fontSize: 10, color: '#999', marginLeft: 4 }}>
                    {row.capacity}
                  </span>
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                  &yen;{row.p10.toLocaleString()}
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                  &yen;{row.p50.toLocaleString()}
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 600 }}>
                  &yen;{row.p100.toLocaleString()}
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                  &yen;{row.p300.toLocaleString()}
                </td>
                <td style={{ padding: '8px 0 8px 6px', textAlign: 'center', color: '#999', fontSize: 10 }}>
                  別途見積
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ━━━ 4. Options pricing ━━━ */}
      <div className="catalog-section" style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>オプション価格</h2>
        <p style={{ fontSize: 10, color: '#999', marginBottom: 16 }}>
          名入れ・コーティング・蓋などのオプション一覧
        </p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 12,
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '8px 8px 8px 0', fontWeight: 600, fontSize: 11, color: '#666' }}>
                オプション
              </th>
              <th style={{ textAlign: 'left', padding: '8px 0 8px 8px', fontWeight: 600, fontSize: 11, color: '#666' }}>
                価格
              </th>
            </tr>
          </thead>
          <tbody>
            {options.map((opt) => (
              <tr key={opt.name} style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '8px 8px 8px 0', fontWeight: 500 }}>
                  {opt.name}
                </td>
                <td style={{ padding: '8px 0 8px 8px' }}>
                  {opt.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ fontSize: 10, color: '#999', marginTop: 8 }}>
          ※ 焼印は版（金型）を一度製作すれば、リピート注文時の版代は不要です。
        </p>
      </div>

      {/* ━━━ 5. Delivery timeline ━━━ */}
      <div className="catalog-section" style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>納期の目安</h2>
        <p style={{ fontSize: 10, color: '#999', marginBottom: 16 }}>
          ご注文確定後の目安納期です。お急ぎの場合はご相談ください。
        </p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 12,
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '8px 8px 8px 0', fontWeight: 600, fontSize: 11, color: '#666' }}>
                種類
              </th>
              <th style={{ textAlign: 'left', padding: '8px 0 8px 8px', fontWeight: 600, fontSize: 11, color: '#666' }}>
                納期
              </th>
            </tr>
          </thead>
          <tbody>
            {deliveryTimelines.map((d) => (
              <tr key={d.type} style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '8px 8px 8px 0', fontWeight: 500 }}>
                  {d.type}
                </td>
                <td style={{ padding: '8px 0 8px 8px' }}>
                  {d.lead}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ━━━ 6. Order flow ━━━ */}
      <div className="catalog-section" style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>ご注文の流れ</h2>

        <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
          {orderSteps.map((s, i) => (
            <div
              key={s.step}
              style={{
                flex: 1,
                textAlign: 'center',
                position: 'relative',
                padding: '0 4px',
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#1a1a1a',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  margin: '0 auto 8px',
                }}
              >
                {s.step}
              </div>

              {/* Arrow connector */}
              {i < orderSteps.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: -4,
                    fontSize: 12,
                    color: '#ccc',
                  }}
                >
                  →
                </div>
              )}

              <p style={{ fontSize: 11, fontWeight: 600, marginBottom: 2 }}>
                {s.title}
              </p>
              <p style={{ fontSize: 9, color: '#888', lineHeight: 1.5 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━ Divider ━━━ */}
      <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '32px 0' }} />

      {/* ━━━ 7. Contact ━━━ */}
      <div className="catalog-section" style={{ textAlign: 'center', paddingTop: 8 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>お問い合わせ</h2>
        <p style={{ fontSize: 12, marginBottom: 6 }}>
          お見積り・ご相談は下記までお気軽にご連絡ください。
        </p>

        <div
          style={{
            display: 'inline-block',
            textAlign: 'left',
            padding: '20px 32px',
            border: '1px solid #e5e5e5',
            borderRadius: 2,
            marginTop: 12,
            marginBottom: 16,
          }}
        >
          <p style={{ fontSize: 12, marginBottom: 6 }}>
            <span style={{ fontWeight: 600, display: 'inline-block', width: 80 }}>メール</span>
            {siteConfig.contactEmail}
          </p>
          <p style={{ fontSize: 12 }}>
            <span style={{ fontWeight: 600, display: 'inline-block', width: 80 }}>Web</span>
            {siteConfig.url}/custom
          </p>
        </div>

        <p style={{ fontSize: 10, color: '#999', marginTop: 8 }}>
          {siteConfig.name} / FOMUS
        </p>
        <p style={{ fontSize: 9, color: '#bbb', marginTop: 16 }}>
          本カタログの価格は{dateStr}時点のものです。内容は予告なく変更される場合がございます。
        </p>
      </div>
    </div>
  )
}
