import Link from 'next/link'
import siteConfig from '@/lib/site-config'

const footerLinks = {
  枡を知る: [
    { href: '/finder', label: '枡診断' },
    { href: '/guide', label: '枡の選び方ガイド' },
    { href: '/history', label: '枡の歴史（1300年）' },
    { href: '/care', label: 'お手入れ方法' },
    { href: '/sake', label: '枡と日本酒・もっきり' },
    { href: '/glossary', label: '枡用語辞典' },
  ],
  購入する: [
    { href: '/products', label: '商品一覧' },
    { href: '/products#standard', label: '無垢の枡（10個〜）' },
    { href: '/products#original', label: 'FOMUS オリジナル枡' },
    { href: '/custom', label: '名入れ・オーダーメイド' },
    { href: '/gift', label: '枡ギフトガイド' },
    { href: '/reviews', label: 'お客様の声' },
  ],
  法人のお客様: [
    { href: '/business', label: '法人向けサービス' },
    { href: '/business#novelty', label: 'ノベルティ・記念品' },
    { href: '/business#oem', label: 'OEM・大口注文' },
    { href: '/custom', label: 'お見積り相談' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-white/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <p className="text-xl font-light text-white tracking-[0.2em] mb-4" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif' }}>枡</p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 mb-6">MASU-STORE</p>
            <p className="text-xs leading-[2] text-white/30">
              国産ヒノキ枡の総合専門サイト。<br />
              1300年の伝統を受け継ぐ枡職人の技。<br />
              販売・名入れ・オーダーメイド対応。
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-5">{category}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-xs text-white/30 hover:text-white/60 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/20">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Powered by FOMUS.
          </p>
          <div className="flex items-center gap-6">
            <a href={siteConfig.fomusUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/20 hover:text-white/40 transition-colors">
              FOMUS SHOP
            </a>
            <a href={siteConfig.fomusOfficialUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/20 hover:text-white/40 transition-colors">
              FOMUS 公式サイト
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
