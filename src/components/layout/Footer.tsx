import Link from 'next/link'
import siteConfig from '@/lib/site-config'

const footerLinks = {
  枡について: [
    { href: '/guide', label: '選び方ガイド' },
    { href: '/history', label: '枡の歴史' },
    { href: '/care', label: 'お手入れ' },
    { href: '/sake', label: '枡と日本酒' },
    { href: '/glossary', label: '枡用語辞典' },
    { href: '/finder', label: '枡診断' },
  ],
  '商品・ご注文': [
    { href: '/products', label: '商品一覧' },
    { href: '/products#standard', label: '無垢の枡（10個〜）' },
    { href: '/products#original', label: 'オリジナル枡' },
    { href: '/custom', label: '名入れ・オーダーメイド' },
    { href: '/gift', label: 'ギフトガイド' },
    { href: '/reviews', label: 'お客様の声' },
  ],
  法人のお客様: [
    { href: '/business', label: '法人向けサービス' },
    { href: '/business/anniversary', label: '周年記念品' },
    { href: '/business/novelty', label: '展示会ノベルティ' },
    { href: '/business/ceremony', label: '式典・鏡開き' },
    { href: '/business/oem', label: 'OEM・オリジナル枡' },
    { href: '/business/catalog', label: 'PDFカタログ' },
    { href: '/custom', label: 'お見積り相談' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[var(--color-warm)] text-white/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="serif text-3xl font-light text-white tracking-[0.15em] mb-3">
              枡
            </p>
            <p className="text-[10px] tracking-[0.12em] text-white/30 mb-6">
              MASU-STORE
            </p>
            <p className="serif text-sm leading-relaxed text-white/40 mb-8">
              一三〇〇年の技、一つの枡に。
            </p>
            <p className="text-xs leading-[2] text-white/30">
              国産ヒノキ枡の総合専門サイト。<br />
              販売・名入れ・オーダーメイド対応。
            </p>

            {/* Contact */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-[11px] text-white/50 mb-2">お問い合わせ</p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          {/* Link sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-[11px] text-white/50 mb-5">{category}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/35 hover:text-white/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/20">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.fomusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-white/25 hover:text-white/45 transition-colors"
            >
              FOMUS SHOP
            </a>
            <a
              href={siteConfig.fomusOfficialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-white/25 hover:text-white/45 transition-colors"
            >
              FOMUS 公式サイト
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
