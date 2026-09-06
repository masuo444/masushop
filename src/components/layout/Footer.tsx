'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import siteConfig from '@/lib/site-config'
import { isEnglishPath } from '@/lib/locale'
import LanguageToggle from './LanguageToggle'

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
    { href: '/original', label: 'オリジナル枡（1個〜）' },
    { href: '/order-made', label: 'オーダーメイド記念品' },
    { href: '/logo', label: 'ロゴ入れ' },
    { href: '/order', label: '依頼方法・納期' },
    { href: '/custom', label: '名入れのお見積り' },
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

const enFooterLinks = {
  'About Masu': [
    { href: '/en/sake-cups', label: 'Japanese Sake Cups' },
    { href: '/en/history', label: 'History' },
    { href: '/en/care', label: 'Care & Maintenance' },
    { href: '/en/glossary', label: 'Glossary' },
    { href: '/en/guide', label: 'Size Guide' },
  ],
  'Shop & Order': [
    { href: '/en/gifts', label: 'Gifts' },
    { href: '/en/corporate', label: 'Corporate Orders' },
    { href: '/en/contact', label: 'Request a Quote' },
    { href: '/en/faq', label: 'FAQ' },
  ],
  Reading: [
    { href: '/en/blog/japanese-gift-ideas', label: 'Japanese Gift Ideas' },
    { href: '/en/blog/sake-drinking-guide', label: 'How to Drink Sake' },
    { href: '/en/blog/wooden-vs-glass-sake-cups', label: 'Wood vs Glass Cups' },
  ],
}

const copy = {
  ja: {
    tagline: '一三〇〇年の技、一つの枡に。',
    description: (
      <>
        国産ヒノキ枡の総合専門サイト。
        <br />
        販売・名入れ・オーダーメイド対応。
      </>
    ),
    contactLabel: 'お問い合わせ',
  },
  en: {
    tagline: 'Thirteen centuries of craft, in a single cup.',
    description: (
      <>
        Handcrafted Japanese hinoki cypress masu.
        <br />
        Custom engraving and worldwide shipping.
      </>
    ),
    contactLabel: 'Contact',
  },
}

export default function Footer() {
  const pathname = usePathname()
  const isEnglish = isEnglishPath(pathname)
  const links = isEnglish ? enFooterLinks : footerLinks
  const t = isEnglish ? copy.en : copy.ja

  return (
    <footer className="bg-[var(--color-warm)] text-white/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="serif text-3xl font-light text-white tracking-[0.15em] mb-3">
              枡
            </p>
            <p className="text-xs tracking-[0.12em] text-white/60 mb-6">
              MASU-STORE
            </p>
            <p className="serif text-base leading-relaxed text-white/70 mb-8">
              {t.tagline}
            </p>
            <p className="text-sm leading-[2] text-white/65">{t.description}</p>

            {/* Contact */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm text-white/70 mb-2">{t.contactLabel}</p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-sm text-white/75 hover:text-white transition-colors"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          {/* Link sections */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-sm text-white/75 mb-5">{category}</p>
              <ul className="space-y-3">
                {items.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 hover:text-white transition-colors"
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
          <p className="text-xs text-white/55">
            &copy; {new Date().getFullYear()} {isEnglish ? 'MASU-STORE' : siteConfig.name}
          </p>
          <LanguageToggle className="[&_a]:!text-white/65 [&_span]:!text-white/45" />
        </div>
      </div>
    </footer>
  )
}
