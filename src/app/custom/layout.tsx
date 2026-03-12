import type { Metadata } from 'next'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '名入れ・オーダーメイド枡 お見積り・ご相談',
  description:
    '枡の名入れ・オーダーメイドのお見積り・ご相談フォーム。焼印・レーザー・シルクプリント対応。法人ノベルティ・記念品・ギフトのご注文を承ります。',
  keywords:
    '枡 名入れ,枡 オーダーメイド,枡 見積り,枡 相談,枡 注文,枡 ノベルティ 注文',
  openGraph: {
    title: `名入れ・オーダーメイド枡 お見積り・ご相談 | ${siteConfig.name}`,
    description: '枡の名入れ・オーダーメイドのお見積り・ご相談。焼印・レーザー・シルクプリント対応。',
  },
  alternates: { canonical: `${baseUrl}/custom` },
}

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'ホーム', href: '/' },
        { name: '名入れ・オーダーメイド', href: '/custom' },
      ]} />
      {children}
    </>
  )
}
