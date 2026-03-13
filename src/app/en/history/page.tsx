import type { Metadata } from 'next'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, SpeakableJsonLd, ArticleJsonLd } from '@/components/seo/JsonLd'

const baseUrl = siteConfig.url

export const metadata: Metadata = {
  title: 'The Story Behind Japanese Wooden Sake Cups — 1,300 Years of Craft',
  description: 'How a simple wooden box became Japan\'s most iconic sake vessel. The fascinating 1,300-year journey of masu — from grain measurement to cultural symbol.',
  keywords: 'Japanese sake cup history, wooden sake cup origin, Japanese traditional crafts, Japanese woodworking, hinoki cypress history, Japanese artisan craft, Ogaki Gifu masu',
  alternates: {
    canonical: `${baseUrl}/en/history`,
    languages: { ja: `${baseUrl}/history`, en: `${baseUrl}/en/history` },
  },
  openGraph: {
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    locale: 'en_US',
  },
}

const breadcrumbItems = [
  { name: 'Home', href: baseUrl },
  { name: 'English', href: `${baseUrl}/en` },
  { name: 'History', href: `${baseUrl}/en/history` },
]

export default function HistoryPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ArticleJsonLd
        headline="The 1,300-Year History of Japanese Wooden Sake Cups"
        description="How a simple wooden box became Japan's most iconic sake vessel."
        datePublished="2025-01-01"
        dateModified="2025-06-01"
        url={`${baseUrl}/en/history`}
      />
      <SpeakableJsonLd url={`${baseUrl}/en/history`} cssSelectors={['[data-speakable]', '.section-title']} />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="section-title mt-4">The 1,300-Year History of Masu</h1>
        <p className="mt-6 text-sm text-[var(--color-muted)] leading-[2] max-w-2xl mx-auto">
          From a simple wooden grain measure to a symbol of celebration and prosperity —<br />
          trace the remarkable journey of Japan&apos;s iconic wooden cup across thirteen centuries.
        </p>
      </section>

      {/* Quick Answer Box */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div data-speakable className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-8 rounded">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)] mb-3">Quick Answer</p>
          <p className="text-sm leading-[2.2] text-[var(--foreground)]">
            Masu originated in 701 AD when Japan&apos;s Taiho Code standardized grain measurements. Originally a practical measuring tool, masu evolved into a cultural symbol of prosperity, used today for sake drinking, celebrations, and gifting.
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-24">

        {/* 701 AD — The Taiho Code */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">701 AD</p>
          <h2 className="serif text-2xl font-light mb-6">
            The Taiho Code — Japan&apos;s First Standardized Measurements
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              The history of masu begins in Japan&apos;s Asuka period, when the Chinese-influenced ritsuryō legal system introduced standardized weights and measures to the islands. Rice was the backbone of Japan&apos;s economy, and accurately recording harvests required reliable measuring tools. Wooden box-shaped vessels — masu — became the instrument of choice.
            </p>
            <p>
              The earliest verifiable record dates to 701 AD, when the Taiho Code (大宝律令) was enacted. Japan&apos;s first comprehensive legal code included specific regulations on weights and measures, officially mandating the use of masu for calculating rice tax yields. From this point on, the wooden measuring cup was embedded in Japan&apos;s legal and economic framework.
            </p>
            <p>
              Japan was a nation of abundant forests, and nearly everything — from temples to ships to daily utensils — was crafted from wood. Hinoki (Japanese cypress) proved ideal for masu: naturally resistant to decay, remarkably durable, and tolerant of moisture, making it suitable for measuring both grain and liquid.
            </p>
            <p>
              Artifacts from the Shōsōin Repository in Nara confirm that early masu were smaller and less uniform than modern versions. Without a nationwide enforcement mechanism, regional variations in size were common — a problem that would persist for centuries.
            </p>
          </div>
        </section>

        {/* Heian to Muromachi */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">9th — 16th Century</p>
          <h2 className="serif text-2xl font-light mb-6">
            Heian to Muromachi — Centuries of Inconsistency
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              During the Heian period, masu expanded beyond grain to measure sake, oil, and other liquids. Under the estate (shōen) system, feudal lords collected rice taxes using masu — making the cups essential to both agriculture and governance.
            </p>
            <p>
              However, a critical problem emerged: there was no effective nationwide standard. Regional lords used masu of varying sizes, and some exploited this inconsistency, collecting taxes with oversized masu while distributing with smaller ones. The size of a masu became a tool of power.
            </p>
            <p>
              The &quot;Kyōmasu&quot; (Kyoto-standard masu) gained some recognition as an informal reference, but without enforcement it could not resolve the chaos. For over 800 years, masu sizes varied wildly across Japan — a situation that would not be resolved until a unifier emerged.
            </p>
          </div>
        </section>

        {/* Azuchi-Momoyama */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">Late 16th Century</p>
          <h2 className="serif text-2xl font-light mb-6">
            Toyotomi Hideyoshi — Unifying Masu, Unifying Japan
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              The pivotal moment in masu history came during the Azuchi-Momoyama period. Oda Nobunaga&apos;s free-market policies accelerated trade, increasing the urgency for standardized measurements. But it was his successor, Toyotomi Hideyoshi, who changed everything.
            </p>
            <p>
              Beginning in 1582, Hideyoshi launched the Taikō Kenchi (太閤検地) — a nationwide land survey that measured every rice paddy in Japan. To ensure accuracy, he mandated a single standard masu across the entire country: the Kyōmasu, specified at approximately 148.5mm square and 81.8mm deep, holding exactly one shō (about 1.8 liters).
            </p>
            <p>
              The Taikō Kenchi was far more than a survey. By knowing the exact rice output of every domain, Hideyoshi could set rational tax rates and military obligations. Standardizing the masu was essential to this vision — and it ended over 800 years of measurement chaos.
            </p>
            <p>
              A Japanese saying captures the significance: &quot;He who unifies the masu, unifies the nation.&quot;
            </p>
          </div>
        </section>

        {/* Edo Period */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">1603 — 1868</p>
          <h2 className="serif text-2xl font-light mb-6">
            Edo Period — The Masu-za and the Age of Rice
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              Under the Tokugawa shogunate, masu management became even more rigorous. A minor discrepancy between the Kyōmasu and a locally developed &quot;Edo masu&quot; caused confusion in trade. To resolve this, the shogunate reaffirmed the Kyōmasu as the sole national standard in 1669 and established the Masu-za (枡座) — a government office in Nihonbashi, Edo (modern Tokyo) — to regulate the manufacture and inspection of all masu.
            </p>
            <p>
              Only masu bearing the official branding stamp from the Masu-za could be used in commerce. Unstamped masu were prohibited. This was, in effect, Japan&apos;s first measurement certification system — a precursor to modern metrology agencies.
            </p>
            <p>
              Edo-period Japan ran on the &quot;kokudaka&quot; system, where a domain&apos;s wealth and military obligations were expressed in koku of rice (one koku = 1,000 shō, about 180 liters). The famous Kaga Domain was known as &quot;Hyakumangoku&quot; — one million koku. Accurate masu were literally the foundation of the national economy.
            </p>
            <p>
              During this era, masu also acquired cultural significance. The word &quot;masu&quot; sounds like the Japanese verb &quot;masu&quot; (益す/増す), meaning &quot;to increase&quot; or &quot;to prosper.&quot; Merchants began displaying masu as good-luck charms for business success, and the custom of using masu for bean-throwing on Setsubun (February 3rd) became established.
            </p>
          </div>
        </section>

        {/* Meiji Era */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">1868 — 1912</p>
          <h2 className="serif text-2xl font-light mb-6">
            Meiji Era — The Metric System Arrives
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              Japan&apos;s rapid modernization following the Meiji Restoration brought the metric system to its shores. In 1885, Japan joined the Metre Convention, and the Weights and Measures Act of 1891 introduced a transition period during which the old shakkanhō (traditional Japanese units) coexisted with metric measurements.
            </p>
            <p>
              A 1921 revision prioritized the metric system, and in 1959 the Measurement Act officially banned shakkanhō units from commercial transactions. After approximately 1,300 years, the masu lost its legal role as a measuring instrument.
            </p>
            <p>
              Yet this was not the end of the masu — it was a reinvention.
            </p>
          </div>
        </section>

        {/* Modern Era */}
        <section>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)] mb-3">20th — 21st Century</p>
          <h2 className="serif text-2xl font-light mb-6">
            Modern Era — From Measure to Cultural Icon
          </h2>
          <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
            <p>
              As television spread across Japan in the late 1950s, images of sake being poured into hinoki masu at izakaya and ryotei captivated the nation. Drinking sake from a masu became associated with elegance and tradition, and the wooden cup transitioned seamlessly from measuring tool to sake vessel and celebratory object.
            </p>
            <p>
              Masu artisans in Ogaki, Gifu Prefecture, adapted swiftly. While demand for measuring tools declined, they pioneered new markets: sake cups, wedding favors, corporate gifts, and ceremony vessels. Advances in laser engraving enabled intricate custom designs, expanding the possibilities for branded and personalized masu.
            </p>
            <p>
              Today, masu appear at New Year celebrations, Setsubun bean-throwing festivals, kagami-biraki sake-barrel-opening ceremonies, and corporate milestone events. They serve as wedding favors, art canvases, desk organizers, and souvenirs for international visitors. The traditional units live on in everyday language — &quot;ichigō&quot; rice cookers, &quot;isshōbin&quot; sake bottles, &quot;isshō mochi&quot; first-birthday celebrations.
            </p>
            <p>
              In recent years, sustainability-conscious consumers have embraced masu as an eco-friendly alternative to plastic drinkware. Made from natural hinoki, often using offcuts from construction lumber, masu represent a circular approach to woodcraft that resonates with contemporary environmental values.
            </p>
          </div>
        </section>
      </div>

      <div className="divider max-w-4xl mx-auto" />

      {/* Why Masu Are Square */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">
          Why Are Masu Square?
        </h2>
        <div data-speakable className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
          <p>
            Unlike round cups and bowls common elsewhere, masu have always been square. This is not an aesthetic choice — it is deeply practical.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
              <p className="serif text-lg font-light mb-3">Watertight Joints</p>
              <p className="text-xs leading-[2] text-[var(--color-muted)]">
                Four flat boards can be joined with the arale-gumi interlocking technique, creating a box that holds liquid without any adhesive. A round vessel would require bending or coopering — far more complex with simple wood.
              </p>
            </div>
            <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
              <p className="serif text-lg font-light mb-3">Stackable &amp; Efficient</p>
              <p className="text-xs leading-[2] text-[var(--color-muted)]">
                Square masu stack neatly with no wasted space — critical when thousands were stored in granaries and warehouses for rice tax collection.
              </p>
            </div>
            <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] p-6 rounded">
              <p className="serif text-lg font-light mb-3">Precise Measurement</p>
              <p className="text-xs leading-[2] text-[var(--color-muted)]">
                A square box with known dimensions makes volume calculation straightforward: length x width x depth. Inspectors could verify capacity with a simple ruler.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* Masu Production Center */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">
          Ogaki, Gifu — Japan&apos;s Masu Capital
        </h2>
        <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
          <p>
            Approximately 80% of all masu produced in Japan come from Ogaki City in Gifu Prefecture, where about two million masu are shipped annually. Ogaki&apos;s dominance is no accident — the city sits adjacent to the Tōnō region, one of Japan&apos;s premier hinoki-producing areas, ensuring a steady supply of high-quality cypress.
          </p>
          <p>
            Historically, the Kiso Three Rivers (Kiso, Nagara, and Ibi) provided waterway transport for timber from mountain forests to Ogaki&apos;s workshops. Today, Ogaki&apos;s masu makers blend traditional hand-finishing with modern machinery — four-axis molders shape boards to uniform thickness, while skilled artisans handle final assembly, edge chamfering (mentori), and quality inspection by eye and touch.
          </p>
          <p>
            Many Ogaki producers now emphasize sustainability, using hinoki offcuts from the construction industry as raw material and packing finished masu in hinoki shavings instead of plastic wrap.
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* The Arale-gumi Technique */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="serif text-2xl font-light mb-8">
          The Arale-gumi Technique
        </h2>
        <div className="space-y-4 text-sm leading-[2.2] text-[var(--foreground)]">
          <p>
            Look closely at any masu and you will see its most distinctive feature: the arale-gumi (あられ組) joint at each corner. This traditional Japanese woodworking technique interlocks four side boards by cutting alternating fingers (tenons) at each end, which mesh together like interlaced fingers.
          </p>
          <p>
            The precision of arale-gumi is remarkable. When properly cut and assembled, the joints create a watertight seal without glue, nails, or any adhesive. The natural expansion of hinoki when moistened actually tightens the joints further, making masu even more leakproof with use.
          </p>
          <p>
            Beyond function, arale-gumi gives masu their characteristic visual identity — the alternating end-grain pattern at each corner is instantly recognizable and has become an aesthetic hallmark of Japanese woodcraft.
          </p>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-[var(--color-muted)] leading-[2] mb-8">
          Discover the 1,300-year tradition for yourself.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/en/glossary" className="btn-primary">
            Masu Glossary
          </Link>
          <Link href="/history" className="btn-outline">
            日本語版を読む
          </Link>
        </div>
      </section>
    </>
  )
}
