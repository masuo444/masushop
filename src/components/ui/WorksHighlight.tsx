import Image from 'next/image'
import Link from 'next/link'
import { KURA_MASTER } from '@/lib/works'

/** 主な実績（Kura Master 10周年記念枡）を短く見せる帯。法人ページ・英語ページに置く */
export default function WorksHighlight({ lang = 'ja', className = '' }: { lang?: 'ja' | 'en'; className?: string }) {
  const ja = lang === 'ja'
  return (
    <section className={`py-12 md:py-14 ${className}`} aria-label={ja ? '主な制作実績' : 'Featured work'}>
      <div className="max-w-3xl mx-auto px-6">
        <div
          className="rounded-sm p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8"
          style={{ border: '1px solid var(--color-border)', background: 'var(--background)' }}
        >
          <Image
            src={KURA_MASTER.image.src}
            alt={ja ? KURA_MASTER.ja.imageAlt : KURA_MASTER.en.imageAlt}
            width={KURA_MASTER.image.width}
            height={KURA_MASTER.image.height}
            sizes="160px"
            className="w-32 md:w-36 h-40 md:h-44 object-cover rounded-sm shrink-0"
          />
          <div className="flex-1">
            <p className="text-[11px] tracking-[0.18em] mb-2" style={{ color: 'var(--color-accent)' }}>
              {ja ? '制作実績' : 'FEATURED WORK'} — PARIS {KURA_MASTER.edition}
            </p>
            <p className="serif text-lg leading-relaxed mb-2" style={{ color: 'var(--foreground)' }}>
              {ja ? KURA_MASTER.ja.title : KURA_MASTER.en.title}
            </p>
            <p className="text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
              {ja
                ? `${KURA_MASTER.ja.lead}${KURA_MASTER.ja.use}`
                : `${KURA_MASTER.en.lead} ${KURA_MASTER.en.use}`}
            </p>
          </div>
          <Link
            href={ja ? '/works' : '/en/works'}
            className="btn-outline text-center whitespace-nowrap"
            style={{ padding: '11px 22px', fontSize: '13px' }}
          >
            {ja ? '制作実績を見る →' : 'See our work →'}
          </Link>
        </div>
      </div>
    </section>
  )
}
