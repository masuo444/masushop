import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import MasuFinder from '@/components/ui/MasuFinder'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡診断 — あなたにぴったりの枡を見つけよう',
  description:
    '3つの質問に答えるだけで、用途やこだわりに合った最適な枡をAIがご提案。日本酒用、ギフト、節分、インテリア、企業ノベルティなど、あなたにぴったりの枡が見つかります。',
  keywords: '枡 おすすめ,枡 選び方,枡 診断,枡 どれがいい',
  alternates: { canonical: `${baseUrl}/finder` },
}

export default function FinderPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '枡診断', href: `${baseUrl}/finder` },
        ]}
      />

      {/* Hero */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <p className="section-label">MASU FINDER</p>
          <h1 className="section-title mb-6">枡診断</h1>
          <p style={{ color: 'var(--color-muted)' }} className="text-sm leading-relaxed">
            3つの質問に答えるだけで、あなたにぴったりの枡が見つかります
          </p>
        </div>
      </section>

      {/* Finder */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <MasuFinder />
      </section>

      <div className="divider" style={{ maxWidth: 640, margin: '0 auto' }} />

      {/* About results */}
      <section style={{ padding: '3rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.9,
              color: 'var(--color-muted)',
              marginBottom: '1.5rem',
            }}
          >
            診断結果は、用途とこだわりポイントをもとに最適な枡サイズをご提案しています。より詳しいサイズ比較や用途別の選び方は、選び方ガイドをご覧ください。
          </p>
          <Link href="/guide" className="btn-outline">
            選び方ガイドを見る
          </Link>
        </div>
      </section>
    </>
  )
}
