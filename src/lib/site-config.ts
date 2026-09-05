const siteConfig = {
  name: '枡の専門店 MASU-STORE',
  nameEn: 'MASU-STORE',
  description: '国産ヒノキ（檜）枡の総合専門サイト。全8サイズの枡を販売。名入れ・焼印・レーザー刻印・オーダーメイド対応。法人ノベルティ・記念品・ギフトに。1300年の伝統を受け継ぐ枡職人の技。',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://masu.fomus.jp',
  contactEmail: 'contact@fomus.jp',
  adminEmail: process.env.ADMIN_EMAIL || '',
  // Minimum order for standard masu (plain/unbranded)
  standardMasuMinOrder: 10,
}

export default siteConfig
