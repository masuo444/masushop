import type { Metadata } from 'next'
import VoiceSurvey from '@/components/voice/VoiceSurvey'

// 購入者だけに案内するページ。検索結果・サイトマップ・ナビには出さない
export const metadata: Metadata = {
  title: 'ご購入者アンケート',
  description: 'MASU-STOREで枡をご購入いただいた方へのアンケートです。',
  robots: { index: false, follow: false },
}

export default function VoicePage() {
  return (
    <section className="mx-auto max-w-2xl px-5 sm:px-6 pt-12 pb-20">
      <h1 className="section-title mb-4">ご購入者アンケート</h1>
      <p className="text-[13px] leading-[2] mb-10" style={{ color: 'var(--color-muted)' }}>
        枡をご購入いただき、ありがとうございます。使い心地を教えてください（約2分）。
        <br />
        満足度の高い・低いにかかわらず、率直なご意見をお聞かせいただけるとうれしいです。
      </p>
      <VoiceSurvey />
    </section>
  )
}
