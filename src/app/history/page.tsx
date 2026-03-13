import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, SpeakableJsonLd } from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/ui/Breadcrumb'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: '枡の歴史 — 1300年の伝統を詳しく解説',
  description:
    '枡（ます）は約1300年前の奈良時代から使われてきた日本の木製計量器です。大宝律令、太閤検地による京枡統一、江戸時代の枡座、明治のメートル法導入まで、枡の歴史を年代順に詳しく解説します。',
  keywords: [
    '枡 歴史',
    '升 歴史',
    '京枡',
    '太閤検地 枡',
    '枡の歴史',
    '枡座',
    '江戸枡',
    '大宝律令 枡',
    '枡 奈良時代',
    '枡 大垣',
  ].join(','),
  openGraph: {
    title: '枡の歴史 — 1300年の伝統を詳しく解説',
    description:
      '奈良時代から現代まで、1300年にわたる枡の歴史を詳しく解説。太閤検地、京枡統一、枡座、メートル法導入による変遷をたどります。',
    url: `${baseUrl}/history`,
    type: 'article',
    siteName: siteConfig.name,
    locale: 'ja_JP',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: `${baseUrl}/history`, languages: { ja: `${baseUrl}/history`, en: `${baseUrl}/en/history` } },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '枡の歴史 — 1300年の伝統を詳しく解説',
  description:
    '枡は約1300年前の奈良時代から使われてきた日本の木製計量器です。太閤検地による京枡統一、江戸の枡座、明治のメートル法導入まで年代順に解説。',
  author: { '@type': 'Organization', name: siteConfig.name },
  publisher: { '@type': 'Organization', name: siteConfig.name },
  mainEntityOfPage: `${baseUrl}/history`,
}

const breadcrumbItems = [
  { name: 'ホーム', href: baseUrl },
  { name: '枡の歴史', href: `${baseUrl}/history` },
]

export default function HistoryPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SpeakableJsonLd url={`${baseUrl}/history`} cssSelectors={['[data-speakable]', '.section-title']} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '枡の歴史' }]} />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="section-title mt-4">枡の歴史 — 1300年の物語</h1>
        <p className="mt-6 text-sm text-[var(--color-muted)] leading-[2] max-w-2xl mx-auto">
          穀物を量る素朴な木の器から、天下統一の道具へ、そして縁起物・酒器として愛される現代へ。<br />
          枡が歩んだ1300年の歴史をたどります。
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-8">
        <Image
          src="/images/generated/masu-history.jpg"
          alt="歴史ある計量用の枡"
          width={800}
          height={500}
          style={{ width: '100%', height: 'auto' }}
          className="rounded"
        />
      </div>

      {/* Quick Answer Box */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div data-speakable className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-8 rounded">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)] mb-3">まとめ</p>
          <p className="text-sm leading-[2.2] text-[var(--foreground)]">
            枡は約1300年前、奈良時代から使われてきた日本の伝統的な木製計量器です。豊臣秀吉の太閤検地で全国統一され、明治時代に計量器としての役割を終えた後、酒器や縁起物として現代に受け継がれています。
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-24">

        {/* 飛鳥〜奈良時代 */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">7世紀 — 8世紀</p>
          <h2 className="serif text-2xl font-light mb-6">
            飛鳥〜奈良時代 — 日本最古の枡
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              日本における枡の歴史は、飛鳥時代にまで遡ります。中国大陸から律令制度とともに度量衡（ものの長さ・重さ・体積を量る仕組み）が伝わり、穀物の収穫量を正確に記録する必要から、木製の計量器である枡が使われ始めました。
            </p>
            <p>
              記録として明確に確認できるのは、701年（大宝元年）に制定された「大宝律令」です。大宝律令は日本初の本格的な法典であり、そのなかに度量衡に関する規定が含まれていました。これにより、税として納める米の量を量るための基準器として、枡の使用が法的に定められたのです。
            </p>
            <p>
              当時の日本は豊かな森林資源に恵まれた「木の国」でした。建築、船、日用品のほとんどが木で作られていた時代に、計量器もまた木で作られるのは自然なことでした。特にヒノキは耐久性と防腐性に優れ、水にも比較的強いことから、液体も量る枡の素材として適していました。
            </p>
            <p>
              奈良時代の正倉院にはこの時代の度量衡にまつわる資料が残されており、当時の枡は現代のものと比べるとやや小ぶりで、形状にもばらつきがあったことがわかっています。まだ全国的な統一基準はなく、地域ごとに異なるサイズの枡が使われていた時代でした。
            </p>
          </div>
        </section>

        {/* 平安〜室町時代 */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">9世紀 — 16世紀</p>
          <h2 className="serif text-2xl font-light mb-6">
            平安〜室町時代 — 暮らしに根づいた計量器
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              平安時代に入ると、枡は穀物だけでなく、酒や油といった液体の計量にも広く使われるようになりました。荘園制度のもと、各地の領主が年貢として米を徴収する際に枡は不可欠な道具であり、農民にとっても日々の生活に欠かせない存在でした。
            </p>
            <p>
              しかし、この時代の枡には大きな問題がありました。全国統一の基準が事実上機能しておらず、地方の領主が独自の大きさの枡を使うことが横行していたのです。なかには、年貢を徴収するときは大きな枡を使い、自らが支給するときには小さな枡を使うという不正も行われていました。枡の大きさひとつで農民の生活が左右されるため、「枡の大きさ」は権力の象徴でもありました。
            </p>
            <p>
              鎌倉時代・室町時代を通じて、この「枡の不統一」問題は日本社会に根深く存在し続けました。京都で使われていた「京枡」と呼ばれる枡がある程度の基準として認識されていたものの、強制力はなく、各地でさまざまなサイズの枡が並存する混乱した状態が続いていました。
            </p>
            <p>
              一方で、この時代の枡は単なる計量器を超えた文化的な意味も帯びていきます。神社への奉納品を量る祭器としての役割、市場での取引の公正さを保証する道具としての役割など、枡は社会の信頼の基盤を支える器でもあったのです。
            </p>
          </div>
        </section>

        {/* 安土桃山時代 */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">16世紀後半</p>
          <h2 className="serif text-2xl font-light mb-6">
            安土桃山時代 — 太閤検地と京枡の全国統一
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              戦国の世から天下統一へ向かうこの時代、枡の歴史に最大の転換点が訪れます。織田信長は「楽市楽座」政策で自由な商取引を推進し、市場経済の発展とともに統一された計量基準の必要性が高まりました。
            </p>
            <p>
              そして、信長の後を継いだ豊臣秀吉が、1582年から全国規模で実施した「太閤検地」によって、枡の歴史は大きく変わります。太閤検地は、全国の田畑の面積と収穫量を測量し直す大事業でしたが、その際に計量の基準となる枡を「京枡」に全国統一したのです。
            </p>
            <p>
              秀吉が定めた京枡の規格は「方4寸9分、深さ2寸7分」。現代の単位に換算すると、約148.5mm四方、深さ約81.8mmとなり、容量は一升（約1.8リットル）に相当します。この寸法は厳格に管理され、全国どこでも同じ枡を使って米の収穫量を計測することが義務づけられました。
            </p>
            <p>
              太閤検地の目的は単なる土地調査にとどまりません。全国の石高（米の生産力）を正確に把握することで、合理的な税制と軍役の基盤を築くことが狙いでした。そのためには、計量の基準器である枡の統一が不可欠だったのです。「枡を統一した者が天下を取る」と言われるゆえんがここにあります。
            </p>
            <p>
              この統一により、それまで800年以上にわたって続いていた「枡の不統一」に終止符が打たれました。京枡は全国の標準となり、以後の日本の度量衡の基礎を築いたのです。
            </p>
          </div>
        </section>

        {/* 江戸時代 */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">17世紀 — 19世紀</p>
          <h2 className="serif text-2xl font-light mb-6">
            江戸時代 — 枡座と「百万石」の時代
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              徳川幕府が開かれると、枡の管理はさらに厳格化されます。しかし、統一されたはずの枡にも課題が残っていました。秀吉が定めた「京枡」と、江戸で独自に使われ始めた「江戸枡」の間に微妙な容量の差があったのです。江戸枡は京枡よりもわずかに大きく、取引の現場で混乱を招いていました。
            </p>
            <p>
              この問題を解決するため、幕府は1669年（寛文9年）に改めて京枡を全国の公式標準と定め、枡の製造・検定を管理する「枡座」を設立しました。枡座は江戸の日本橋に置かれ、全国で使用される枡の品質と寸法を一元管理する機関として機能しました。
            </p>
            <p>
              枡座が管理する公認の枡には焼印が押され、焼印のない枡の使用は禁止されました。これは現代でいう計量器の検定制度の原型であり、日本の度量衡行政の出発点ともいえます。枡座の存在により、枡の信頼性が制度的に担保されるようになったのです。
            </p>
            <p>
              江戸時代の社会は「石高制」で成り立っていました。大名の力は「何万石」という米の生産力で表され、加賀藩の「百万石」はその象徴です。一石は一升枡で量った米の千杯分、つまり約180リットル（約150kg）に相当します。石高を正確に算出するためには、基準となる枡の正確さが絶対的に必要でした。
            </p>
            <p>
              また、江戸時代には枡にまつわる縁起担ぎも庶民の間に広まりました。「枡（ます）」は「益す」「増す」に通じることから、商売繁盛や五穀豊穣を願って枡を飾る風習が生まれました。節分の豆まきに枡を使う習慣も、この時代に定着したとされています。枡は計量器であると同時に、福を招く縁起物としての二つの顔を持つようになったのです。
            </p>
          </div>
        </section>

        {/* 明治〜昭和 */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">19世紀後半 — 20世紀</p>
          <h2 className="serif text-2xl font-light mb-6">
            明治〜昭和 — 計量器から酒器へ
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              明治維新を迎えると、日本は急速に近代化を進めます。1885年（明治18年）、日本はメートル条約に加盟し、国際的な計量単位であるメートル法の導入が始まりました。しかし、枡を使った尺貫法は人々の生活に深く根付いており、すぐに切り替わることはありませんでした。
            </p>
            <p>
              1891年（明治24年）に「度量衡法」が制定され、メートル法と尺貫法の併用期間が始まります。その後、1921年（大正10年）の改正で、メートル法を主とし尺貫法を従とする方針が打ち出されました。そして1959年（昭和34年）、「計量法」の施行により、商取引における尺貫法の使用が正式に禁止されます。
            </p>
            <p>
              これにより、約1300年にわたって日本の計量の中心を担ってきた枡は、法的な意味での計量器としての役割を終えました。しかし、それは枡の終わりではなく、新たな始まりでした。
            </p>
            <p>
              昭和30年代（1955年〜）、テレビの普及とともに日本酒を枡で飲む映像が全国に広まりました。居酒屋や料亭で日本酒を枡に注いで提供するスタイルが「粋」な飲み方として人気を博し、枡は計量器から酒器・祝い酒の器へと華麗な転身を遂げたのです。
            </p>
            <p>
              岐阜県大垣市の枡職人たちは、この変化にいち早く対応しました。計量器としての需要が減る一方で、酒器・ギフト・縁起物としての需要を開拓し、枡の文化を次の世代へとつなげていったのです。
            </p>
          </div>
        </section>

        {/* 現代 */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">21世紀</p>
          <h2 className="serif text-2xl font-light mb-6">
            現代 — 縁起物・ギフト・文化の器
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              計量器としての実用を離れた現代の枡は、日本文化を象徴する多彩な顔を持っています。正月の祝い酒、節分の豆まき、結婚式の鏡開き、企業のノベルティ、海外へのお土産——枡が活躍する場面は実に幅広く、むしろ計量器時代よりも多様な使われ方をしています。
            </p>
            <p>
              特に注目すべきは、枡に由来する単位が現代の日常に深く根付いていることです。「一合炊き」の炊飯器、「一升瓶」の日本酒、「一升餅」のお祝い——これらはすべて枡の容量単位に基づいています。法的にはメートル法に統一されたにもかかわらず、私たちの生活の中に枡の単位は息づいているのです。
            </p>
            <p>
              縁起物としての枡の人気も衰えることがありません。「枡（ます）」は「益す」「増す」に通じることから、結婚式では「幸せが益す」、商売では「商い益々繁盛」の意味を込めて贈られます。名入れ技術の進化により、レーザー刻印で自由なデザインが可能になったことも、ギフトとしての需要拡大を後押ししています。
            </p>
            <p>
              近年では、サステナビリティへの関心の高まりとともに、天然ヒノキで作られた枡の環境負荷の低さも再評価されています。プラスチック製品の代替として枡を選ぶ動きや、建築端材を有効活用する枡づくりのエコロジカルな側面が注目を集めています。
            </p>
            <p>
              1300年の歴史を持つ枡は、時代の変化に応じてその役割を柔軟に変えながら、日本人の暮らしに寄り添い続けています。計量器から酒器へ、酒器から縁起物へ——枡の歴史は「変わることで生き続ける」日本のものづくりの精神そのものです。
            </p>
          </div>
        </section>
      </div>

      <div className="divider max-w-4xl mx-auto" />

      {/* 漢字解説 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">
          「升・枡・桝」— 3つの漢字の違い
        </h2>
        <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
          <p>
            「ます」を表す漢字には「升」「枡」「桝」の3種類があります。いずれも同じものを指しますが、それぞれに歴史と使い分けがあります。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
              <p className="serif text-3xl font-light mb-3 text-center">升</p>
              <p className="text-xs leading-[2] text-[var(--color-muted)]">
                最も古い漢字。中国から伝来した文字で、「一升」「一合」などの体積単位として現在も広く使われています。元来は「すくい上げる」ことを意味する象形文字です。
              </p>
            </div>
            <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
              <p className="serif text-3xl font-light mb-3 text-center">枡</p>
              <p className="text-xs leading-[2] text-[var(--color-muted)]">
                日本で作られた国字（和製漢字）。「木」と「升」を組み合わせ、木製の計量器そのものを表します。木でできた器としての「ます」を指す最も一般的な表記です。
              </p>
            </div>
            <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
              <p className="serif text-3xl font-light mb-3 text-center">桝</p>
              <p className="text-xs leading-[2] text-[var(--color-muted)]">
                同じく「木」と「升」の組み合わせによる異体字。「排水桝」「側溝桝」など建築・土木用語で使われることが多く、人名（桝田、桝本など）にも見られます。
              </p>
            </div>
          </div>
          <p>
            一般的に、木製の計量器・酒器としての「ます」を指す場合は「枡」の表記が最も広く使われています。当サイトでも「枡」を標準表記として採用しています。
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* 大垣市 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">
          枡の産地・岐阜県大垣市
        </h2>
        <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
          <p>
            現在、日本で生産される枡の約80%は岐阜県大垣市で製造されています。大垣市は日本最大の枡の産地であり、年間約200万個の枡が出荷されています。
          </p>
          <p>
            大垣市が枡の一大産地となった背景には、地理的な条件が深く関わっています。大垣市は日本有数のヒノキの産地である東濃地方（岐阜県南東部）に隣接しており、良質な国産ヒノキを安定的に調達できる立地にあります。また、木曽三川（木曽川・長良川・揖斐川）の水運により、木材の輸送にも恵まれていました。
          </p>
          <p>
            大垣での枡づくりの起源は、明治時代に一人の職人が始めたことに遡ります。計量法の変遷により枡の需要構造が変化するなかで、大垣の職人たちは伝統の技術を守りながらも、酒器や贈答品など新たな用途の枡づくりに果敢に挑戦し続けました。
          </p>
          <p>
            現在の大垣の枡メーカーでは、伝統的な手仕事と現代の機械技術を融合させた製造体制が確立されています。木材の乾燥から、モルダー加工、ほぞ切り、組み、仕上げ削り、面取りまでの各工程は、職人の目と手の感覚が品質を支えています。一方で、名入れ加工にはレーザー刻印などの最新技術も導入され、多様なニーズに対応しています。
          </p>
          <p>
            また、近年の大垣の枡づくりは環境への配慮でも注目を集めています。建築材として使われた後のヒノキ端材を原材料として活用し、梱包材にもヒノキの削り節を使うなど、脱プラスチックと森林資源の有効活用を同時に実現するサステナブルなものづくりが行われています。
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-[var(--color-muted)] leading-[2] mb-8">
          1300年の歴史を持つ枡を、あなたの暮らしに取り入れてみませんか。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/guide" className="btn-primary">
            枡の選び方ガイド
          </Link>
          <Link href="/sake" className="btn-outline">
            枡と日本酒
          </Link>
        </div>
      </section>
    </>
  )
}
