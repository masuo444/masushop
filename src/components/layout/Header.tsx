'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useId } from 'react'
import { isEnglishPath } from '@/lib/locale'
import { masuSizes } from '@/lib/masu-data'
import LanguageToggle from './LanguageToggle'

type NavLink = { href: string; label: string }

const jaNavLinks: NavLink[] = [
  { href: '/original', label: 'オーダーメイド' },
  { href: '/logo', label: 'ロゴ入れ' },
  { href: '/products', label: '商品一覧' },
  { href: '/business', label: '法人の方' },
  { href: '/blog', label: '読みもの' },
]

const enNavLinks: NavLink[] = [
  { href: '/en/sake-cups', label: 'Sake Cups' },
  { href: '/en/gifts', label: 'Gifts' },
  { href: '/en/corporate', label: 'Corporate' },
  { href: '/en/guide', label: 'Guide' },
  { href: '/en/faq', label: 'FAQ' },
]

// 「商品一覧」配下のメニュー。全ページから1クリックで各サイズ・比較ページに届くようにする。
const productSizeLinks: NavLink[] = masuSizes.map((m) => ({
  href: `/products/${m.id}`,
  label: `${m.name}（${m.capacity}）`,
}))

const productGuideLinks: NavLink[] = [
  { href: '/products/sizes', label: 'サイズ比較（全7サイズ）' },
  { href: '/products/engraving', label: '名入れ方法（焼印・レーザー刻印）' },
  { href: '/coating', label: '特殊コーティング' },
  { href: '/faq', label: 'よくある質問' },
]

export default function Header() {
  const pathname = usePathname()
  const isEnglish = isEnglishPath(pathname)
  const navLinks = isEnglish ? enNavLinks : jaNavLinks
  const homeHref = isEnglish ? '/en' : '/'
  const contactHref = isEnglish ? '/en/contact' : '/custom'
  const contactLabel = isEnglish ? 'Contact' : '無料で見積り'
  const menuLabel = isEnglish ? 'Menu' : 'メニュー'

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const productsMenuId = useId()
  const mobileProductsMenuId = useId()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // ドロップダウン：外側クリックと Esc で閉じる
  useEffect(() => {
    if (!productsOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProductsOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [productsOpen])

  const desktopLinkClass =
    'text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors'

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--color-border)]'
          : 'bg-[var(--background)] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={homeHref} className="flex items-center gap-2">
            <span className="serif text-2xl font-light text-[var(--foreground)]">
              枡
            </span>
            <span className="text-[11px] tracking-[0.12em] text-[var(--foreground)]/60 hidden sm:inline mt-1">
              MASU-STORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="メインナビゲーション">
            {navLinks.map((link) => {
              if (!isEnglish && link.href === '/products') {
                return (
                  <div
                    key={link.href}
                    ref={productsRef}
                    className="relative"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setProductsOpen(false)
                      }
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <Link href="/products" className={desktopLinkClass}>
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        className="p-1 text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors"
                        aria-label="商品一覧のメニューを開く"
                        aria-haspopup="true"
                        aria-expanded={productsOpen}
                        aria-controls={productsMenuId}
                        onClick={(e) => {
                          // マウスはホバーで既に開いているので「開く」に固定。
                          // キーボード操作（detail === 0）のときだけ開閉を切り替える。
                          if (e.detail === 0) setProductsOpen((v) => !v)
                          else setProductsOpen(true)
                        }}
                      >
                        <svg
                          className={`w-3.5 h-3.5 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                    </div>

                    <div
                      id={productsMenuId}
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-opacity duration-200 ${
                        productsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                      }`}
                      aria-hidden={!productsOpen}
                    >
                      <div
                        className="w-[560px] rounded-sm shadow-xl p-6 grid grid-cols-2 gap-8"
                        style={{
                          background: 'var(--background)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div>
                          <p className="text-[11px] tracking-[0.15em] mb-3" style={{ color: 'var(--color-accent)' }}>
                            サイズから選ぶ
                          </p>
                          <ul className="space-y-0.5">
                            {productSizeLinks.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  tabIndex={productsOpen ? 0 : -1}
                                  onClick={() => setProductsOpen(false)}
                                  className="block py-1.5 text-sm text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[11px] tracking-[0.15em] mb-3" style={{ color: 'var(--color-accent)' }}>
                            比較・ガイド
                          </p>
                          <ul className="space-y-0.5">
                            <li>
                              <Link
                                href="/products"
                                tabIndex={productsOpen ? 0 : -1}
                                onClick={() => setProductsOpen(false)}
                                className="block py-1.5 text-sm text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors"
                              >
                                商品一覧（全7サイズ）
                              </Link>
                            </li>
                            {productGuideLinks.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  tabIndex={productsOpen ? 0 : -1}
                                  onClick={() => setProductsOpen(false)}
                                  className="block py-1.5 text-sm text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                            <Link
                              href="/original"
                              tabIndex={productsOpen ? 0 : -1}
                              onClick={() => setProductsOpen(false)}
                              className="block text-sm underline"
                              style={{ color: 'var(--color-accent)' }}
                            >
                              名入れは1個から →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              return (
                <Link key={link.href} href={link.href} className={desktopLinkClass}>
                  {link.label}
                </Link>
              )
            })}
            <LanguageToggle />
            <Link
              href={contactHref}
              className="text-sm px-5 py-2.5 rounded-sm font-medium transition-opacity hover:opacity-85 whitespace-nowrap"
              style={{ background: 'var(--color-accent)', color: '#fff' }}
            >
              {contactLabel}
            </Link>
          </nav>

          {/* Mobile: menu */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href={contactHref}
              className="text-xs px-4 py-2 rounded-sm font-medium transition-opacity hover:opacity-85 whitespace-nowrap"
              style={{ background: 'var(--color-accent)', color: '#fff' }}
            >
              {contactLabel}
            </Link>
            <button
              className="p-2 text-[var(--foreground)]/50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuLabel}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 top-16 md:top-20 z-40 lg:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-black/20" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 w-full max-w-xs h-full bg-[var(--background)] shadow-xl overflow-y-auto transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="px-8 py-8 flex flex-col gap-1" aria-label="モバイルナビゲーション">
            {navLinks.map((link) => {
              if (!isEnglish && link.href === '/products') {
                return (
                  <div key={link.href} className="border-b border-[var(--color-border)]/50">
                    <div className="flex items-center justify-between">
                      <Link
                        href="/products"
                        className="block py-3 text-base text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors"
                        onClick={() => setMenuOpen(false)}
                        tabIndex={menuOpen ? 0 : -1}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        className="p-2 text-[var(--foreground)]/50"
                        aria-label="サイズ別の商品ページを表示"
                        aria-expanded={mobileProductsOpen}
                        aria-controls={mobileProductsMenuId}
                        onClick={() => setMobileProductsOpen((v) => !v)}
                        tabIndex={menuOpen ? 0 : -1}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                    </div>
                    <div id={mobileProductsMenuId} hidden={!mobileProductsOpen} className="pb-3 pl-4">
                      <ul className="space-y-0.5">
                        {productSizeLinks.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block py-1.5 text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors"
                              onClick={() => setMenuOpen(false)}
                              tabIndex={menuOpen && mobileProductsOpen ? 0 : -1}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-2 pt-2 space-y-0.5" style={{ borderTop: '1px solid var(--color-border)' }}>
                        {productGuideLinks.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block py-1.5 text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors"
                              onClick={() => setMenuOpen(false)}
                              tabIndex={menuOpen && mobileProductsOpen ? 0 : -1}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-base text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors border-b border-[var(--color-border)]/50"
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-6">
              <Link
                href={contactHref}
                className="block text-center text-base px-6 py-3 rounded-sm font-medium"
                style={{ background: 'var(--color-accent)', color: '#fff' }}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {isEnglish ? 'Contact Us' : '無料で見積り・ご相談'}
              </Link>
              <LanguageToggle
                className="mt-6 justify-center"
                onNavigate={() => setMenuOpen(false)}
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
