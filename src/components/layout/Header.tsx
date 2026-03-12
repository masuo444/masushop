'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/finder', label: '枡診断' },
  { href: '/guide', label: '枡の選び方' },
  { href: '/history', label: '枡の歴史' },
  { href: '/care', label: 'お手入れ' },
  { href: '/sake', label: '枡と日本酒' },
  { href: '/products', label: '商品一覧' },
  { href: '/business', label: '法人のお客様' },
  { href: '/custom', label: 'オーダーメイド' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl tracking-[0.2em] font-light text-[var(--foreground)]" style={{ fontFamily: 'var(--font-serif-jp), Georgia, serif' }}>
              枡
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-muted)] hidden sm:inline">
              MASU-STORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.05em] text-[var(--color-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile menu */}
          <div className="flex items-center gap-4">
            <Link href="/custom" className="hidden md:inline-block text-[10px] tracking-[0.1em] uppercase px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity">
              お見積り相談
            </Link>

            <button
              className="lg:hidden p-1 text-[var(--color-muted)]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[var(--color-border)] py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-[var(--color-muted)] hover:text-[var(--foreground)]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[var(--color-border)]">
              <Link href="/custom" className="btn-primary block text-center" onClick={() => setMenuOpen(false)}>
                お見積り相談
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
