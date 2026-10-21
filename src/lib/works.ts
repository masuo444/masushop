/**
 * 制作実績。サイトの各所（実績ページ・法人ページ・英語ページ・llms.txt・構造化データ）で同じ事実を使う。
 * 確認できた事実だけを書く。数量・使われ方など未確認のことは書かない（分かったら追記する）。
 */

export const KURA_MASTER = {
  name: 'Kura Master',
  url: 'https://kuramaster.com/',
  edition: 2026,
  image: { src: '/images/works/kura-master-10e-anniversaire.jpg', width: 1200, height: 1600 },
  ja: {
    title: 'Kura Master 2026（開催10周年）記念枡',
    lead: 'フランス・パリの日本酒コンクール「Kura Master」の開催10周年を記念する枡を制作しました。',
    about:
      'Kura Master は2017年にフランス・パリで創設された日本酒のコンクールです。フランス国家最優秀職人章（MOF）を持つ職人や、五つ星ホテル・星付きレストランのソムリエなど、フランスの食の専門家が審査します。2026年大会は、創設から10周年の節目の大会でした。',
    short: 'パリの日本酒コンクール「Kura Master」開催10周年の記念枡を制作',
    use: '会場での展示と、受賞した酒蔵への記念品として使われました。',
    method: 'レーザー刻印',
    detail: '枡の正面に、Kura Master のロゴと「PARIS 10e Anniversaire」の文字をレーザー刻印で入れています。',
    imageAlt: 'Kura Master 開催10周年の記念枡。ロゴと「10e Anniversaire」をレーザー刻印したヒノキの枡が、会場に積み上げて展示されている',
  },
  en: {
    title: 'Kura Master 2026 — 10th Anniversary Commemorative Masu',
    lead: 'We made the commemorative masu for the 10th anniversary of Kura Master, the sake competition held in Paris, France.',
    about:
      'Kura Master is a Japanese sake competition founded in Paris in 2017. Its judges are French food and beverage professionals, including holders of the Meilleur Ouvrier de France (MOF) title and sommeliers from five-star hotels and Michelin-starred restaurants. The 2026 edition marked the competition’s 10th anniversary.',
    short: 'Commemorative masu for the 10th anniversary of Kura Master, the Paris sake competition',
    use: 'They were displayed at the venue and given to the award-winning sake breweries as a keepsake.',
    method: 'Laser engraving',
    detail: 'The Kura Master logo and “PARIS 10e Anniversaire” are laser-engraved on the front of each masu.',
    imageAlt: 'Kura Master 10th anniversary masu: hinoki cups laser-engraved with the logo and “10e Anniversaire”, stacked on display at the venue',
  },
} as const
