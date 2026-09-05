'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/finder', label: '枡診断' },
  { href: '/guide', label: '選び方' },
  { href: '/products', label: '商品一覧' },
  { href: '/order-made', label: '記念品・名入れ' },
  { href: '/original', label: 'オリジナル枡' },
  { href: '/logo', label: 'ロゴ入れ' },
  { href: '/business', label: '法人の方' },
  { href: '/blog', label: '読みもの' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
          <Link href="/" className="flex items-center gap-2">
            <span className="serif text-2xl font-light text-[var(--foreground)]">
              枡
            </span>
            <span className="text-[11px] tracking-[0.12em] text-[var(--foreground)]/60 hidden sm:inline mt-1">
              MASU-STORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/custom"
              className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent)]/70 transition-colors"
            >
              お見積り
            </Link>
          </nav>

          {/* Mobile: menu */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              className="p-2 text-[var(--foreground)]/50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
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
      >
        <div className="absolute inset-0 bg-black/20" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 w-full max-w-xs h-full bg-[var(--background)] shadow-xl transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="px-8 py-8 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-base text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors border-b border-[var(--color-border)]/50"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link
                href="/custom"
                className="text-base text-[var(--color-accent)]"
                onClick={() => setMenuOpen(false)}
              >
                お見積り・ご相談
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
