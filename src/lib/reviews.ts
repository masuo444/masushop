export interface Review {
  id: string
  author: string
  rating: number // 1-5
  date: string // ISO date
  product: string // product name
  size: string // masu size
  purpose: string // what they bought it for
  title: string
  body: string
  verified: boolean
}

const reviews: Review[] = [
  // 1-3: 日本酒用（一合枡、八勺枡）
  {
    id: 'r01',
    author: 'T.K.',
    rating: 5,
    date: '2025-11-15',
    product: '一合枡',
    size: '一合枡（180ml）',
    purpose: '日本酒',
    title: 'もっきりの雰囲気が自宅で味わえる',
    body: '居酒屋で出てくるもっきりを自宅でも楽しみたくて購入しました。ヒノキの香りがふわっと立ち上がり、日本酒の味わいが格段に上がります。角の面取りも丁寧で、口当たりが良いです。',
    verified: true,
  },
  {
    id: 'r02',
    author: 'S.M.',
    rating: 5,
    date: '2025-10-22',
    product: '八勺枡',
    size: '八勺枡（144ml）',
    purpose: '日本酒',
    title: '晩酌にちょうど良いサイズ',
    body: '一合だと少し多いので八勺枡を選びました。女性の手にもしっくり馴染むサイズ感で、毎晩の晩酌が楽しみになりました。木目も美しく、眺めているだけで癒されます。',
    verified: true,
  },
  {
    id: 'r03',
    author: 'Y.D.',
    rating: 4,
    date: '2025-09-08',
    product: '一合枡',
    size: '一合枡（180ml）',
    purpose: '日本酒',
    title: '日本酒好きの友人へのプレゼントに',
    body: '友人の誕生日に名入れなしの一合枡を2つ購入しました。ヒノキの香りに友人も大喜びで、一緒に飲む時間が特別なものになりました。次回は名入れで注文したいと思います。',
    verified: true,
  },
  // 4-6: ギフト用（五勺枡、一合枡）
  {
    id: 'r04',
    author: 'S.Y.',
    rating: 5,
    date: '2025-08-30',
    product: '五勺枡',
    size: '五勺枡（100ml）',
    purpose: 'ギフト',
    title: '結婚祝いに「益す」の縁起物',
    body: '友人の結婚祝いにペアの五勺枡を贈りました。「幸せが増す」という意味を添えて渡したところ、とても喜んでもらえました。上品な木の質感がお祝いの品にぴったりです。',
    verified: true,
  },
  {
    id: 'r05',
    author: 'T.T.',
    rating: 5,
    date: '2025-06-14',
    product: '一合枡',
    size: '一合枡（180ml）',
    purpose: 'ギフト',
    title: '父の日に贈って大正解',
    body: '日本酒が好きな父に一合枡を贈りました。「こういうのが欲しかった」と言って、毎晩使ってくれています。既製品とは違う本物のヒノキの質感に父も感動していました。',
    verified: true,
  },
  {
    id: 'r06',
    author: 'M.J.',
    rating: 5,
    date: '2025-07-20',
    product: '五勺枡',
    size: '五勺枡（100ml）',
    purpose: 'ギフト',
    title: '海外の友人に日本文化を伝えるギフト',
    body: 'アメリカに住む友人への手土産として購入しました。日本の伝統工芸品としてとても喜ばれ、インテリアとして飾ってくれています。軽くてコンパクトなので持ち運びにも便利でした。',
    verified: true,
  },
  // 7-9: 企業ノベルティ（一合枡）
  {
    id: 'r07',
    author: 'N.様（株式会社テクノス）',
    rating: 5,
    date: '2025-05-10',
    product: '一合枡（焼印入り）',
    size: '一合枡（180ml）',
    purpose: 'ノベルティ',
    title: '創業30周年の記念品として100個発注',
    body: '会社のロゴを焼印で入れていただきました。焼印の仕上がりが非常に美しく、取引先に配ったところ大変好評でした。納期も相談に乗っていただき、スムーズに準備できました。',
    verified: true,
  },
  {
    id: 'r08',
    author: 'W.様（合同会社クラフトラボ）',
    rating: 4,
    date: '2025-04-18',
    product: '一合枡（レーザー刻印）',
    size: '一合枡（180ml）',
    purpose: 'ノベルティ',
    title: '展示会の配布物として好評',
    body: 'IT系の展示会でブース来場者への記念品として配布しました。木製品は珍しいので足を止めてくれる方が多く、ブースの集客にも貢献してくれました。QRコードもレーザーできれいに刻印できました。',
    verified: true,
  },
  {
    id: 'r09',
    author: 'K.様（NPO法人まちづくり協議会）',
    rating: 5,
    date: '2025-03-25',
    product: '一合枡（レーザー刻印）',
    size: '一合枡（180ml）',
    purpose: 'ノベルティ',
    title: '地域イベントの記念品に最適',
    body: '地域の祭りで振る舞い酒用として50個注文しました。ロゴをレーザー刻印で入れていただき、参加者にそのまま記念品としてお持ち帰りいただきました。大変喜ばれました。',
    verified: true,
  },
  // 10-11: 節分・行事（五合枡、一升枡）
  {
    id: 'r10',
    author: 'I.K.',
    rating: 5,
    date: '2025-02-03',
    product: '五合枡',
    size: '五合枡（900ml）',
    purpose: '行事',
    title: '家族で豆まき、子供も大喜び',
    body: '節分用に五合枡を購入しました。子供たちが枡に豆を入れて「鬼は外！」と元気よく投げていました。プラスチック製とは違う本物の質感に、大人も満足しています。毎年使える丈夫さも嬉しいです。',
    verified: true,
  },
  {
    id: 'r11',
    author: 'M.K.',
    rating: 4,
    date: '2025-01-15',
    product: '一升枡',
    size: '一升枡（1800ml）',
    purpose: '行事',
    title: '新年会の鏡開きに使用',
    body: '会社の新年会で鏡開き用に一升枡を購入しました。存在感があり、場の雰囲気を盛り上げてくれました。しっかりとした作りで、来年以降も繰り返し使えそうです。',
    verified: true,
  },
  // 12-13: インテリア（三勺枡、二合半枡）
  {
    id: 'r12',
    author: 'K.A.',
    rating: 5,
    date: '2024-12-10',
    product: '三勺枡',
    size: '三勺枡（54ml）',
    purpose: 'インテリア',
    title: 'デスクのペン立てとして愛用中',
    body: '小さな三勺枡をペン立てとして使っています。ヒノキの香りがほのかに漂い、仕事中もリラックスできます。見た目も和モダンで、デスク周りが一気におしゃれになりました。',
    verified: true,
  },
  {
    id: 'r13',
    author: 'Y.T.',
    rating: 4,
    date: '2024-11-28',
    product: '二合半枡',
    size: '二合半枡（450ml）',
    purpose: 'インテリア',
    title: '玄関の小物入れとして活躍',
    body: '鍵や小銭の置き場として二合半枡を玄関に置いています。ちょうど良いサイズ感で、来客時に「素敵ですね」と言われることも多いです。生活に和の要素を取り入れたい方におすすめです。',
    verified: true,
  },
  // 14-15: 名入れ（焼印、レーザー）
  {
    id: 'r14',
    author: 'K.M.',
    rating: 5,
    date: '2024-10-05',
    product: '一合枡（焼印入り）',
    size: '一合枡（180ml）',
    purpose: 'ギフト',
    title: '焼印の仕上がりに感動',
    body: '夫婦の名前を焼印で入れていただきました。手彫りのような温かみがあり、機械的な刻印とは全く違う風合いです。木の色と焼印のコントラストが美しく、一生ものの品だと感じました。',
    verified: true,
  },
  {
    id: 'r15',
    author: 'S.S.',
    rating: 5,
    date: '2024-09-12',
    product: '一合枡（レーザー刻印）',
    size: '一合枡（180ml）',
    purpose: 'ギフト',
    title: 'レーザー刻印の精度に驚き',
    body: '細かいイラストをレーザーで刻印してもらいました。線の一本一本がくっきりと再現されており、職人技とテクノロジーの融合を感じます。贈った相手にも「こんな繊細な加工ができるんだ」と驚かれました。',
    verified: true,
  },
]

export function getAllReviews(): Review[] {
  return reviews
}

export function getReviewsByProduct(product: string): Review[] {
  return reviews.filter((r) => r.product.includes(product))
}

export function getAverageRating(): number {
  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  return Math.round((total / reviews.length) * 10) / 10
}

export function getReviewCount(): number {
  return reviews.length
}
