import type { Metadata } from 'next'
import QRCode from 'qrcode'

// 商品に同梱する印刷用カード。検索には出さない
export const metadata: Metadata = {
  title: 'アンケート案内カード（印刷用）',
  robots: { index: false, follow: false },
}

const surveyUrl = 'https://masu.fomus.jp/voice?ref=card'

// 印刷時はサイトのヘッダー・フッターと説明文を消し、A6 用紙1枚にカードだけを出す
const printCss = `
@page { size: 105mm 148mm; margin: 0; }
.voice-card svg { display: block; width: 100%; height: 100%; }
@media print {
  body > header, body > footer, .voice-card-help { display: none !important; }
  body, .site-main { background: #fff !important; }
  .voice-card-wrap { padding: 0 !important; min-height: 0 !important; }
  .voice-card { box-shadow: none !important; border: none !important; }
}
`

export default async function VoiceCardPage() {
  // ビルド時に SVG として生成する（実行時の外部サービスに頼らない）
  const qrSvg = await QRCode.toString(surveyUrl, {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'M',
    color: { dark: '#2C2420', light: '#FFFFFF' },
  })

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printCss }} />
      <div className="voice-card-wrap flex flex-col items-center gap-8 px-4 py-12 min-h-[80vh]">
        <div
          className="voice-card-help max-w-md text-[13px] leading-[1.9]"
          style={{ color: 'var(--color-muted)' }}
        >
          <p className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>
            印刷のしかた
          </p>
          ブラウザの印刷で、用紙サイズを「A6」、倍率を「100%」、余白を「なし」にして印刷してください。
          QRコードは {surveyUrl} を開きます（流入元「card」として記録されます）。
        </div>

        <div
          className="voice-card flex flex-col items-center justify-between text-center bg-white"
          style={{
            width: '105mm',
            height: '148mm',
            padding: '14mm 12mm 11mm',
            border: '1px solid var(--color-border)',
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
            color: '#2C2420',
          }}
        >
          <p className="text-[9pt] tracking-[0.3em]" style={{ color: '#7B5B2A' }}>
            MASU-STORE
          </p>

          <div>
            <p className="serif text-[15pt] leading-[1.7] mb-3">
              ご購入ありがとうございます
            </p>
            <p className="text-[9.5pt] leading-[1.9]">
              使い心地を教えてください
              <br />
              （約2分）
            </p>
          </div>

          <div
            aria-label="アンケートページのQRコード"
            role="img"
            style={{ width: '38mm', height: '38mm' }}
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />

          <div className="text-[7.5pt] leading-[1.8]" style={{ color: '#6F675F' }}>
            <p>良かった点も、気になった点も、率直にお聞かせください。</p>
            <p className="mt-1">masu.fomus.jp/voice</p>
          </div>
        </div>
      </div>
    </>
  )
}
