import type { Metadata } from 'next'
import AdminVoiceList from '@/components/voice/AdminVoiceList'

export const metadata: Metadata = {
  title: '購入者アンケートの管理',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default function AdminVoicePage() {
  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-6 pt-10 pb-20">
      <h1 className="section-title mb-3">購入者アンケートの管理</h1>
      <p className="text-[13px] leading-[1.9] mb-8" style={{ color: 'var(--color-muted)' }}>
        サイトに掲載できるのは、本人が掲載に同意して送信した回答だけです。承認すると
        お客様の声・トップページ・該当サイズの商品ページに「購入者アンケートより」として表示されます。
        文章はお客様本人のものなので、こちらで書き換えずに承認・非承認だけを判断してください。
      </p>
      <AdminVoiceList />
    </section>
  )
}
