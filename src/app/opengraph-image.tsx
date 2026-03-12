import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '枡の専門店 MASU-STORE'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1A1A1A',
          color: '#FAF8F5',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 300, marginBottom: 20 }}>枡</div>
        <div style={{ fontSize: 24, letterSpacing: '0.3em', color: '#888888', marginBottom: 40 }}>
          MASU-STORE
        </div>
        <div style={{ fontSize: 32, fontWeight: 300, maxWidth: 800, textAlign: 'center', lineHeight: 1.6 }}>
          国産ヒノキ枡の専門店
        </div>
        <div style={{ fontSize: 16, color: '#8B6914', marginTop: 20, letterSpacing: '0.2em' }}>
          全7サイズ — 名入れ対応 — 1個からOK
        </div>
      </div>
    ),
    { ...size }
  )
}
