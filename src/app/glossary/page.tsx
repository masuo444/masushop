import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡用語辞典 — 枡に関する用語・単位・文化を解説',
  description:
    '枡（ます）に関する用語を50音順で解説。枡・升・桝の違い、勺・合・升の単位、もっきり、あられ組、焼印など、枡にまつわる専門用語から文化まで。',
  keywords:
    '枡 とは,升 読み方,合 単位,勺 単位,もっきり 意味,あられ組,焼印 枡,枡 用語,枡 辞典,枡 種類,枡 サイズ,枡 単位,枡 文化,枡 歴史,ヒノキ 枡,フィトンチッド,枡酒,鏡開き 枡,節分 枡',
  alternates: { canonical: `${baseUrl}/glossary`, languages: { ja: `${baseUrl}/glossary`, en: `${baseUrl}/en/glossary` } },
  openGraph: {
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
}

type GlossaryTerm = {
  id: string
  term: string
  reading: string
  category: string
  definition: string
  related: string[]
}

const categories = [
  { id: 'types', label: '枡の種類', labelEn: 'TYPES' },
  { id: 'units', label: '単位', labelEn: 'UNITS' },
  { id: 'techniques', label: '製法・技術', labelEn: 'TECHNIQUES' },
  { id: 'culture', label: '文化', labelEn: 'CULTURE' },
  { id: 'materials', label: '素材', labelEn: 'MATERIALS' },
]

const glossaryTerms: GlossaryTerm[] = [
  // ===== 枡の種類 =====
  {
    id: 'masu',
    term: '枡（ます）',
    reading: 'ます',
    category: 'types',
    definition:
      '国産ヒノキ（檜）で作られる日本の伝統的な木製の器。約1300年前から穀物や液体の計量器として使われ、現在では日本酒の酒器、ギフト、インテリア、企業ノベルティとして幅広く親しまれている。漢字では「枡」「升」「桝」の3通りの表記がある。「枡」は「木」と「升」を組み合わせた国字（日本で作られた漢字）で、木製の計量器そのものを表す。「升」は最も古い漢字で一升・一合などの単位にも使われる。「桝」は建築分野で排水桝などにも使われる表記。一般的に木製の器としては「枡」の表記が最も広く用いられている。',
    related: ['ichigo-masu', 'goshaku-masu', 'masu-no-engi'],
  },
  {
    id: 'ichigo-masu',
    term: '一合枡',
    reading: 'いちごうます',
    category: 'types',
    definition:
      '容量180ml（外寸85×85×56mm）の枡。日本酒一合分がぴったり入る最も標準的なサイズで、日本酒の酒器、名入れギフト、企業記念品、節分の豆入れなど、最も幅広い用途に使われる定番の枡。牛乳瓶1本分とほぼ同じ容量。',
    related: ['gou', 'masu', 'goshaku-masu'],
  },
  {
    id: 'goshaku-masu',
    term: '五勺枡',
    reading: 'ごしゃくます',
    category: 'types',
    definition:
      '容量100ml（外寸67×67×47mm）の枡。一合枡よりひと回り小さく、少量の日本酒をゆっくり味わいたい方や、おちょこ代わりに最適。結婚祝いのペア枡や引き出物のプチギフトとしても人気が高いサイズ。',
    related: ['shaku', 'ichigo-masu', 'masu'],
  },
  {
    id: 'hasshaku-masu',
    term: '八勺枡',
    reading: 'はっしゃくます',
    category: 'types',
    definition:
      '容量144ml（外寸76×76×51mm）の枡。居酒屋や日本酒バーで「もっきり」スタイルに使われることが多いサイズ。グラスを枡の中に置き、日本酒を溢れさせて注ぐ提供方法にちょうどよい大きさ。乾杯枡や記念品としても使われる。',
    related: ['shaku', 'mokkiri', 'ichigo-masu'],
  },
  {
    id: 'sanjaku-masu',
    term: '三勺枡',
    reading: 'さんしゃくます',
    category: 'types',
    definition:
      '容量54ml（外寸56×56×39mm）の枡。全サイズの中で最も小さく、おちょこ約1杯分の容量。インテリアの飾り枡、アクセサリー入れ、ミニギフトとして人気。手のひらに収まるかわいらしいサイズ感が特徴。',
    related: ['shaku', 'masu', 'goshaku-masu'],
  },
  {
    id: 'nigohan-masu',
    term: '二合半枡',
    reading: 'にごうはんます',
    category: 'types',
    definition:
      '容量450ml（外寸117×117×75mm）の枡。ペットボトル約半分の容量で、小物入れやペン立て、ディスプレイ用途に適した中型サイズ。節分の豆入れとしても手頃な大きさ。',
    related: ['gou', 'gogo-masu', 'masu'],
  },
  {
    id: 'gogo-masu',
    term: '五合枡',
    reading: 'ごごうます',
    category: 'types',
    definition:
      '容量900ml（外寸135×135×92mm）の枡。一升瓶の半分の容量で、節分の豆まきに最も一般的に使われるサイズ。家族分の豆がしっかり入り、手で持って撒きやすい。インテリアや鏡開きにも使われる。',
    related: ['gou', 'setsubun', 'issho-masu'],
  },
  {
    id: 'issho-masu',
    term: '一升枡',
    reading: 'いっしょうます',
    category: 'types',
    definition:
      '容量1800ml（外寸170×170×92mm）の枡。一升瓶1本分がぴったり入る最も大きなサイズ。鏡開きやイベント、大型ディスプレイに使用される。神社や寺院の節分祭でも使われる迫力のある枡。',
    related: ['shou', 'kagami-biraki', 'masu'],
  },

  // ===== 単位 =====
  {
    id: 'shaku',
    term: '勺（しゃく）',
    reading: 'しゃく',
    category: 'units',
    definition:
      '日本の伝統的な体積の単位で、1勺＝約18ml。1合の10分の1にあたる。枡のサイズでは「三勺枡（54ml＝3勺）」「五勺枡（100ml＝約5.5勺）」「八勺枡（144ml＝8勺）」のように使われる。料理のレシピでも「大さじ1杯＝約15ml≒0.83勺」程度の目安として参考になる。',
    related: ['gou', 'shou', 'goshaku-masu'],
  },
  {
    id: 'gou',
    term: '合（ごう）',
    reading: 'ごう',
    category: 'units',
    definition:
      '日本の伝統的な体積の単位で、1合＝180ml。枡や日本酒の基準となる最も重要な単位。米1合＝約150gで、炊くとお茶碗約2杯分になる。日本酒1合は一般的な徳利1本分。「一合枡」はこの1合がぴったり入るサイズとして最も広く使われている。1合＝10勺＝0.1升。',
    related: ['shaku', 'shou', 'ichigo-masu'],
  },
  {
    id: 'shou',
    term: '升（しょう）',
    reading: 'しょう',
    category: 'units',
    definition:
      '日本の伝統的な体積の単位で、1升＝1,800ml＝10合。日本酒の「一升瓶」はこの単位に由来する。一升枡は1升の液体がぴったり入る最大サイズの枡。漢字の「升」は枡そのものを指す場合にも使われ、「枡」「升」「桝」は同義。',
    related: ['gou', 'to', 'issho-masu'],
  },
  {
    id: 'to',
    term: '斗（と）',
    reading: 'と',
    category: 'units',
    definition:
      '日本の伝統的な体積の単位で、1斗＝18,000ml＝18リットル＝10升。かつて酒蔵や米問屋で大量の穀物・液体を計量するために使われた大きな単位。現在では「一斗缶（18リットル缶）」の呼称に名残がある。枡のサイズとしては一般的には作られない。',
    related: ['shou', 'gou', 'masu'],
  },

  // ===== 製法・技術 =====
  {
    id: 'arare-gumi',
    term: 'あられ組',
    reading: 'あられぐみ',
    category: 'techniques',
    definition:
      '枡の四隅に見られる伝統的な木組み技法。4枚の側板の端に交互に溝（ほぞ）を切り、噛み合わせるように組み上げる。この精密な組み方により、釘を使わずに強固な箱型構造が実現し、液体を入れても漏れない高い密閉性を持つ。枡の美しい外観を特徴づける要素でもある。',
    related: ['masu', 'mentori', 'moruder'],
  },
  {
    id: 'yakiin',
    term: '焼印（やきいん）',
    reading: 'やきいん',
    category: 'techniques',
    definition:
      '約400度に熱した銅版を木の表面に押し付けて文字やデザインを焼き付ける伝統的な名入れ技法。焦げ茶色の味わいある仕上がりが特徴で、白黒（単色）のみだが温かみのある風合いが人気。大量生産に向いており、一度版を作れば高速に加工できるため、企業ノベルティや記念品に広く使われる。',
    related: ['laser', 'masu'],
  },
  {
    id: 'laser',
    term: 'レーザー刻印',
    reading: 'れーざーこくいん',
    category: 'techniques',
    definition:
      'レーザー光線で木の表面を彫刻する名入れ方法。焼印では表現できない細密なデザイン、濃淡表現、写真、QRコードなどの高精度な刻印が可能。白黒のみだが繊細なグラデーション表現ができる。少量〜中量の製作に向いており、1個からのオーダーにも対応しやすい。',
    related: ['yakiin', 'masu'],
  },
  {
    id: 'moruder',
    term: 'モルダー加工',
    reading: 'もるだーかこう',
    category: 'techniques',
    definition:
      '4軸モルダーを使い、ヒノキの板材の4面を同時に削る加工工程。枡の製造工程の初期段階で行われ、均一な厚みと滑らかな面に仕上げる。一合枡の場合、1日におよそ2,000枚の板材を加工する効率的な工程。',
    related: ['arare-gumi', 'mentori', 'masu'],
  },
  {
    id: 'mentori',
    term: '面取り',
    reading: 'めんとり',
    category: 'techniques',
    definition:
      '枡の製造工程の最終段階で、製品の12辺すべての角を丸く削り落とす仕上げ作業。これにより手触りが柔らかくなり、日本酒を飲む際の口当たりもなめらかに仕上がる。職人の感覚と技術が問われる重要な工程。',
    related: ['arare-gumi', 'moruder', 'masu'],
  },

  // ===== 文化 =====
  {
    id: 'mokkiri',
    term: 'もっきり',
    reading: 'もっきり',
    category: 'culture',
    definition:
      '「盛り切り」が語源とされる、居酒屋や日本酒バーでの日本酒の提供スタイル。グラスを枡の中に置き、グラスから溢れるまで日本酒を注ぐ。枡に溜まった日本酒も楽しめるため「お得感」があり、日本酒ファンに人気の飲み方。八勺枡や一合枡が使われることが多い。',
    related: ['masu-zake', 'hasshaku-masu', 'ichigo-masu'],
  },
  {
    id: 'masu-zake',
    term: '枡酒（ますざけ）',
    reading: 'ますざけ',
    category: 'culture',
    definition:
      '枡に直接日本酒を注いで飲むスタイル。ヒノキの清々しい香りが日本酒の風味と調和し、グラスでは味わえない独特の美味しさが楽しめる。ヒノキに含まれる天然の芳香成分（ヒノキチオール、フィトンチッド）が日本酒にまろやかさを加えるとも言われる。お正月の祝い酒にも古くから用いられてきた。',
    related: ['mokkiri', 'masu', 'hinoki'],
  },
  {
    id: 'kagami-biraki',
    term: '鏡開き（かがみびらき）',
    reading: 'かがみびらき',
    category: 'culture',
    definition:
      '祝い事の席で酒樽の蓋（鏡）を木槌で割り開く儀式。開運や前途を祝う意味があり、結婚披露宴、企業の周年記念、竣工式、スポーツの優勝祝賀会などで行われる。割り開いた樽酒を参加者に振る舞う際には、名入れ一合枡や八勺枡が乾杯用に配布されることが多い。',
    related: ['issho-masu', 'ichigo-masu', 'masu-zake'],
  },
  {
    id: 'setsubun',
    term: '節分と枡',
    reading: 'せつぶんとます',
    category: 'culture',
    definition:
      '毎年2月3日頃に行われる節分の豆まきでは、炒り大豆を枡に入れて「鬼は外、福は内」と撒く風習がある。枡は「益す＝増す」に通じる縁起物であるため、福を「増す」器として使われてきた。一般家庭では五合枡（900ml）が最もよく使われ、神社仏閣の節分祭では一升枡が使われることもある。',
    related: ['gogo-masu', 'issho-masu', 'masu-no-engi'],
  },
  {
    id: 'masu-no-engi',
    term: '「益す」の縁起',
    reading: 'ますのえんぎ',
    category: 'culture',
    definition:
      '枡（ます）は「益す」＝「増す」＝「益々繁栄」に通じることから、古くから縁起の良いものとされてきた。結婚式では「幸せが益す」、商売では「商い益々繁盛」、お正月には「福が増す」の意味を込めて、祝いの席で枡酒を飲む習慣がある。この縁起の良さが、ギフトや記念品として枡が選ばれる大きな理由のひとつ。',
    related: ['masu', 'masu-zake', 'setsubun'],
  },

  // ===== 素材 =====
  {
    id: 'hinoki',
    term: 'ヒノキ（檜）',
    reading: 'ひのき',
    category: 'materials',
    definition:
      '枡の主要な素材となる日本の針葉樹。耐久性・耐水性に優れ、美しい木目と清々しい芳香が特徴。古くから神社仏閣の建築材としても用いられてきた高級木材。枡の産地として有名な岐阜県は、日本有数のヒノキの産地を擁し、良質な国産ヒノキを使った枡作りが盛ん。建築材として使われた後のヒノキの端材を有効活用して枡が作られる。',
    related: ['phytoncide', 'hinokitiol', 'masu'],
  },
  {
    id: 'phytoncide',
    term: 'フィトンチッド',
    reading: 'ふぃとんちっど',
    category: 'materials',
    definition:
      '樹木が発散する天然の揮発性物質の総称。ヒノキには特に多くのフィトンチッドが含まれ、森林浴のようなリラックス効果、天然の抗菌・防カビ作用をもたらす。ヒノキ枡に日本酒を注いだ時に感じる爽やかな木の香りは、このフィトンチッドによるもの。',
    related: ['hinoki', 'hinokitiol', 'masu-zake'],
  },
  {
    id: 'hinokitiol',
    term: 'ヒノキチオール',
    reading: 'ひのきちおーる',
    category: 'materials',
    definition:
      'ヒノキに含まれる天然の芳香成分のひとつ。強い抗菌・抗真菌作用を持ち、ヒノキ特有の香りの元となる物質。枡で日本酒を飲む際、この成分が微かに溶け出すことで日本酒にまろやかさを加えると言われている。化粧品や食品保存料としても利用される。',
    related: ['hinoki', 'phytoncide', 'masu-zake'],
  },
]

// Build DefinedTermSet JSON-LD
function buildDefinedTermSetJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: '枡用語辞典',
    description: '枡（ます）に関する用語・単位・文化を網羅的に解説する用語集',
    url: `${baseUrl}/glossary`,
    hasDefinedTerm: glossaryTerms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      url: `${baseUrl}/glossary#${t.id}`,
    })),
  }
}

function getTermById(id: string) {
  return glossaryTerms.find((t) => t.id === id)
}

export default function GlossaryPage() {
  const definedTermSetJsonLd = buildDefinedTermSetJsonLd()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', href: baseUrl },
          { name: '枡用語辞典', href: `${baseUrl}/glossary` },
        ]}
      />
      <SpeakableJsonLd url={`${baseUrl}/glossary`} cssSelectors={['[data-speakable]', '.section-title']} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="section-title mb-6">枡用語辞典</h1>
          <p data-speakable style={{ color: 'var(--color-muted)' }} className="text-sm leading-relaxed">
            枡に関する用語・単位・文化を網羅的に解説します
          </p>
        </div>
      </section>

      {/* ===== QUICK NAVIGATION ===== */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2
            className="serif text-lg font-medium mb-6"
          >
            カテゴリから探す
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="text-sm px-5 py-3 no-underline transition-colors"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--foreground)',
                }}
              >
                {cat.label}
                <span
                  className="ml-2 text-xs"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {glossaryTerms.filter((t) => t.category === cat.id).length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== TERMS BY CATEGORY ===== */}
      {categories.map((cat) => {
        const terms = glossaryTerms.filter((t) => t.category === cat.id)
        return (
          <section
            key={cat.id}
            id={`cat-${cat.id}`}
            className="py-16 md:py-20"
            style={{
              background:
                categories.indexOf(cat) % 2 === 1
                  ? 'var(--color-subtle)'
                  : 'var(--background)',
            }}
          >
            <div className="max-w-4xl mx-auto px-6">
              <h2
                className="serif section-title mb-12"
              >
                {cat.label}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {terms.map((term) => (
                  <div
                    key={term.id}
                    id={term.id}
                    style={{
                      borderLeft: '3px solid var(--color-accent)',
                      padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      paddingLeft: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      background:
                        categories.indexOf(cat) % 2 === 1
                          ? 'var(--background)'
                          : 'var(--color-subtle)',
                    }}
                  >
                    <div style={{ marginBottom: '0.5rem' }}>
                      <span
                        className="text-xs px-2 py-0.5 mr-2"
                        style={{
                          background: 'var(--color-accent-light)',
                          color: 'var(--color-accent)',
                          fontSize: '0.7rem',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {cat.label}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {term.reading}
                      </span>
                    </div>
                    <h3
                      className="serif"
                      style={{
                        fontWeight: 500,
                        fontSize: '1.15rem',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {term.term}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.9,
                        color: 'var(--color-muted)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {term.definition}
                    </p>
                    {term.related.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--color-muted)',
                          }}
                        >
                          関連：
                        </span>
                        {term.related.map((relId) => {
                          const relTerm = getTermById(relId)
                          if (!relTerm) return null
                          return (
                            <a
                              key={relId}
                              href={`#${relId}`}
                              className="text-xs no-underline transition-colors"
                              style={{
                                color: 'var(--color-accent)',
                                borderBottom: '1px solid var(--color-accent-light)',
                                paddingBottom: '1px',
                              }}
                            >
                              {relTerm.term}
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="serif section-title mb-6"
          >
            枡について詳しく知る
          </h2>
          <p className="text-sm mb-10 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            枡の選び方や名入れについて、さらに詳しく知りたい方はこちらをご覧ください。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/guide" className="btn-primary">
              枡の選び方ガイド
            </Link>
            <Link href="/gift" className="btn-outline">
              枡ギフトガイド
            </Link>
            <Link href="/history" className="btn-outline">
              枡の歴史
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
