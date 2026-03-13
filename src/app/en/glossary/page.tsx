import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, SpeakableJsonLd, DefinedTermSetJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'Japanese Sake & Craft Glossary — Key Terms Explained',
  description: 'Essential Japanese terms for understanding sake culture and traditional woodcraft. From gō (合) to mokkiri (盛り切り), learn the vocabulary of Japan\'s wooden cup tradition.',
  keywords: 'Japanese sake terms, sake glossary, mokkiri meaning, kagami-biraki meaning, gō measurement, Japanese drinking culture, sake vocabulary, Japanese craft terms',
  alternates: {
    canonical: `${baseUrl}/en/glossary`,
    languages: { ja: `${baseUrl}/glossary`, en: `${baseUrl}/en/glossary` },
  },
  openGraph: {
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
    locale: 'en_US',
  },
}

const breadcrumbItems = [
  { name: 'Home', href: baseUrl },
  { name: 'English', href: `${baseUrl}/en` },
  { name: 'Glossary', href: `${baseUrl}/en/glossary` },
]

type GlossaryCategory = {
  id: string
  label: string
  terms: {
    term: string
    kanji: string
    romaji: string
    definition: string
  }[]
}

const glossaryCategories: GlossaryCategory[] = [
  {
    id: 'sizes',
    label: 'Sizes & Units',
    terms: [
      {
        term: 'Shaku',
        kanji: '勺',
        romaji: 'shaku',
        definition: 'The smallest traditional Japanese unit of liquid volume. One shaku equals approximately 18ml. Ten shaku make one gō. Used in masu naming — for example, "sanjaku-masu" (three-shaku masu) holds 54ml.',
      },
      {
        term: 'Gō',
        kanji: '合',
        romaji: 'gō',
        definition: 'The standard Japanese unit for sake and rice measurement. One gō equals 180ml (10 shaku). A single tokkuri (sake flask) typically holds one gō. The ichigō-masu (one-gō masu) is the most popular masu size. Still used daily in Japan — rice cookers measure in gō.',
      },
      {
        term: 'Shō',
        kanji: '升',
        romaji: 'shō',
        definition: 'A larger traditional unit of volume. One shō equals 1,800ml (10 gō). The familiar "isshōbin" (一升瓶) sake bottle holds exactly one shō. The isshō-masu is the largest standard masu size. The kanji 升 is also used to write "masu" itself.',
      },
      {
        term: 'To',
        kanji: '斗',
        romaji: 'to',
        definition: 'A bulk measurement unit equal to 18,000ml (10 shō = 18 liters). Historically used in rice granaries and sake breweries. Rarely encountered today except in the term "itto-kan" (一斗缶), an 18-liter tin can still used in food service.',
      },
    ],
  },
  {
    id: 'types',
    label: 'Masu Types',
    terms: [
      {
        term: 'Sanjaku-masu',
        kanji: '三勺枡',
        romaji: 'sanjaku-masu',
        definition: 'The smallest masu at 54ml (3 shaku). About the size of a large sake cup (ochoko). Popular as miniature display pieces, accessory holders, and novelty gifts. Fits in the palm of your hand.',
      },
      {
        term: 'Goshaku-masu',
        kanji: '五勺枡',
        romaji: 'goshaku-masu',
        definition: 'A 100ml masu (5 shaku). Slightly smaller than the standard size, ideal for sipping sake slowly or as a pair set for wedding gifts and petit favors.',
      },
      {
        term: 'Hasshaku-masu',
        kanji: '八勺枡',
        romaji: 'hasshaku-masu',
        definition: 'A 144ml masu (8 shaku). The size most commonly used in izakaya for the "mokkiri" overflowing-sake style, where a glass sits inside the masu and sake is poured until it spills over.',
      },
      {
        term: 'Ichigō-masu',
        kanji: '一合枡',
        romaji: 'ichigō-masu',
        definition: 'The 180ml (one gō) masu — the most popular and iconic size. Holds exactly one standard sake serving. Used for drinking sake, Setsubun beans, corporate gifts, wedding favors, and engraved keepsakes. The definitive masu.',
      },
      {
        term: 'Nigōhan-masu',
        kanji: '二合半枡',
        romaji: 'nigōhan-masu',
        definition: 'A 450ml masu (2.5 gō). A mid-sized masu used as a pen holder, small planter, desk organizer, or Setsubun bean container. About the size of a large coffee mug.',
      },
      {
        term: 'Gogō-masu',
        kanji: '五合枡',
        romaji: 'gogō-masu',
        definition: 'A 900ml masu (5 gō). The most popular size for Setsubun bean-throwing — large enough to hold a family\'s portion of beans while still easy to carry. Also used for displays and kagami-biraki ceremonies.',
      },
      {
        term: 'Isshō-masu',
        kanji: '一升枡',
        romaji: 'isshō-masu',
        definition: 'The largest standard masu at 1,800ml (one shō). Holds an entire isshōbin sake bottle. Used at kagami-biraki ceremonies, temple Setsubun festivals, and large-scale event displays. An imposing, impressive piece.',
      },
    ],
  },
  {
    id: 'techniques',
    label: 'Crafting Techniques',
    terms: [
      {
        term: 'Arale-gumi',
        kanji: 'あられ組',
        romaji: 'arale-gumi',
        definition: 'The signature interlocking finger-joint technique used at each corner of a masu. Four side boards are cut with alternating tenons that mesh together without nails or glue, creating a watertight seal. The distinctive corner pattern is the visual hallmark of authentic masu craftsmanship.',
      },
      {
        term: 'Yakiin',
        kanji: '焼印',
        romaji: 'yakiin',
        definition: 'Traditional branding-iron engraving. A copper plate heated to approximately 400°C is pressed into the wood surface, burning a design in rich brown tones. Ideal for logos and text in large production runs — once the plate is made, stamping is fast and consistent.',
      },
      {
        term: 'Laser Engraving',
        kanji: 'レーザー刻印',
        romaji: 'rēzā kokuin',
        definition: 'Modern precision engraving using a laser beam to carve detailed designs into the wood surface. Capable of fine gradations, photographs, QR codes, and intricate patterns that yakiin cannot reproduce. Suited for small-to-medium runs and one-off custom pieces.',
      },
      {
        term: 'Mentori',
        kanji: '面取り',
        romaji: 'mentori',
        definition: 'The final finishing step in masu production: chamfering (rounding) all twelve edges of the box. This gives the masu a softer feel in the hand and a smoother lip for comfortable sake drinking. A skilled artisan\'s touch is essential for consistent, beautiful mentori.',
      },
    ],
  },
  {
    id: 'materials',
    label: 'Materials',
    terms: [
      {
        term: 'Hinoki',
        kanji: '檜',
        romaji: 'hinoki',
        definition: 'Japanese cypress (Chamaecyparis obtusa) — the traditional and preferred wood for masu. Prized for its fine, straight grain, natural resistance to moisture and decay, pleasant aroma, and antibacterial properties. Also the wood of choice for Shinto shrines and imperial palaces.',
      },
      {
        term: 'Phytoncide',
        kanji: 'フィトンチッド',
        romaji: 'fitonchiddo',
        definition: 'A class of natural volatile organic compounds released by trees. Hinoki is exceptionally rich in phytoncides, which provide the "forest bathing" (shinrin-yoku) relaxation effect and natural antimicrobial action. The fresh, clean scent you notice when sake is poured into a new masu comes from phytoncides.',
      },
      {
        term: 'Hinokitiol',
        kanji: 'ヒノキチオール',
        romaji: 'hinokichiōru',
        definition: 'A specific aromatic compound found in hinoki wood with strong antibacterial and antifungal properties. It contributes to hinoki\'s characteristic scent and is credited with giving masu-zake (sake in masu) its distinctive mellow quality. Also used in cosmetics and food preservation.',
      },
    ],
  },
  {
    id: 'culture',
    label: 'Cultural Terms',
    terms: [
      {
        term: 'Mokkiri',
        kanji: '盛り切り',
        romaji: 'mokkiri',
        definition: 'A sake-serving style popular at izakaya and sake bars. A glass is placed inside a masu, and sake is poured until it overflows from the glass into the masu below. The overflowing sake signals generosity, and drinkers enjoy sake from both the glass and the masu. Hasshaku-masu and ichigō-masu are commonly used.',
      },
      {
        term: 'Masu-zake',
        kanji: '枡酒',
        romaji: 'masu-zake',
        definition: 'Sake served directly in a masu, without a glass. The hinoki aroma blends with the sake\'s flavor to create a drinking experience unique to wooden vessels. Phytoncides and hinokitiol from the wood are said to add a subtle mellowness. A traditional way to drink at New Year and celebrations.',
      },
      {
        term: 'Kagami-biraki',
        kanji: '鏡開き',
        romaji: 'kagami-biraki',
        definition: 'The ceremony of breaking open a sake barrel (the lid is called "kagami," meaning mirror) with wooden mallets. Performed at weddings, corporate anniversaries, building completions, and championship celebrations. The barrel sake is then served to guests in branded masu — making engraved ichigō-masu a staple of kagami-biraki events.',
      },
      {
        term: 'Setsubun',
        kanji: '節分',
        romaji: 'setsubun',
        definition: 'A traditional festival held around February 3rd marking the division between winter and spring. Families throw roasted soybeans while chanting "Oni wa soto! Fuku wa uchi!" (Demons out! Fortune in!). Masu are the traditional vessel for holding the beans — because "masu" sounds like "to increase," they symbolize increasing good fortune.',
      },
      {
        term: 'Engi',
        kanji: '縁起',
        romaji: 'engi',
        definition: 'The concept of good fortune, auspiciousness, or lucky omens in Japanese culture. Masu are considered strong "engi" items because the word "masu" (枡) is a homophone of "masu" (益す/増す), meaning "to increase" or "to prosper." This makes masu popular gifts for weddings ("happiness increases"), businesses ("prosperity increases"), and New Year ("fortune increases").',
      },
    ],
  },
]

// Flatten all terms for DefinedTermSet schema
const allTermsForSchema = glossaryCategories.flatMap((cat) =>
  cat.terms.map((t) => ({
    name: `${t.term} (${t.kanji})`,
    description: t.definition,
  }))
)

export default function GlossaryPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SpeakableJsonLd url={`${baseUrl}/en/glossary`} cssSelectors={['[data-speakable]', '.section-title']} />
      <DefinedTermSetJsonLd terms={allTermsForSchema} />

      {/* ===== HERO ===== */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="section-title mb-6">Masu Glossary</h1>
          <p data-speakable style={{ color: 'var(--color-muted)' }} className="text-sm leading-relaxed">
            Key terms for understanding Japanese wooden cups
          </p>
        </div>
      </section>

      {/* ===== QUICK NAVIGATION ===== */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="serif text-lg font-medium mb-6">Browse by Category</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            {glossaryCategories.map((cat) => (
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
                  {cat.terms.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== TERMS BY CATEGORY ===== */}
      {glossaryCategories.map((cat, catIndex) => (
        <section
          key={cat.id}
          id={`cat-${cat.id}`}
          className="py-16 md:py-20"
          style={{
            background: catIndex % 2 === 1 ? 'var(--color-subtle)' : 'var(--background)',
          }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="serif section-title mb-12">{cat.label}</h2>
            <div>
              {cat.terms.map((term) => (
                <div
                  key={term.romaji}
                  className="py-4"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-sm font-medium">{term.term} ({term.kanji})</h3>
                    <span className="text-xs" style={{ color: 'var(--color-accent)' }}>{term.romaji}</span>
                  </div>
                  <p className="text-xs leading-[2]" style={{ color: 'var(--color-muted)' }}>{term.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="divider" style={{ maxWidth: 960, margin: '0 auto' }} />

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="serif section-title mb-6">Learn More About Masu</h2>
          <p className="text-sm mb-10 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Explore the full history and craft behind these iconic Japanese wooden cups.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/en/history" className="btn-primary">
              History of Masu
            </Link>
            <Link href="/glossary" className="btn-outline">
              日本語版を読む
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
