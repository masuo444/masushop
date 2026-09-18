import Link from 'next/link'
import { orderFlowSteps } from '@/lib/order-flow'

/**
 * 「ご依頼の流れ」セクション。トップ・法人ページなどで共通に使う。
 * 文言は src/lib/order-flow.ts に集約している。
 */
export default function OrderFlow({
  id = 'flow',
  heading = 'ご依頼の流れ',
  lead = 'ご注文を決める前に、お見積りと一緒に仕上がりイメージを無料でお送りします。イメージを見てからご注文を判断できます。',
  ctaHref = '#quote',
  ctaLabel = '30秒でかんたん見積り',
  background = 'subtle',
  className = '',
}: {
  id?: string
  heading?: string
  lead?: string
  /** 空文字ならボタンを出さない */
  ctaHref?: string
  ctaLabel?: string
  background?: 'subtle' | 'plain'
  className?: string
}) {
  return (
    <section
      id={id}
      className={`py-20 md:py-24 ${className}`}
      style={{ background: background === 'subtle' ? 'var(--color-subtle)' : 'var(--background)' }}
      aria-labelledby={`${id}-title`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2 id={`${id}-title`} className="section-title text-center mb-4">
          {heading}
        </h2>
        <p className="lead text-center mb-12">{lead}</p>

        <ol className="grid gap-6 md:grid-cols-5 md:gap-4" style={{ listStyle: 'none' }}>
          {orderFlowSteps.map((s, i) => (
            <li
              key={s.step}
              className="relative flex gap-5 md:block md:pt-5"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              {/* モバイルでは番号を左に、PCでは上に置く */}
              <div className="flex flex-col items-center md:items-start shrink-0 pt-5 md:pt-0">
                <span
                  className="serif text-2xl leading-none"
                  style={{ color: 'var(--color-accent)', letterSpacing: '0.04em' }}
                >
                  {s.step}
                </span>
                {i < orderFlowSteps.length - 1 && (
                  <span
                    className="mt-3 flex-1 w-px md:hidden"
                    style={{ background: 'var(--color-border)' }}
                    aria-hidden
                  />
                )}
              </div>
              <div className="pt-5 pb-2 md:pt-4 md:pb-0">
                <h3 className="text-sm font-medium mb-2 flex flex-wrap items-center gap-2">
                  <span>{s.title}</span>
                  {s.badge && (
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-sm"
                      style={{
                        background: 'var(--color-accent-light)',
                        color: 'var(--color-accent)',
                        border: '1px solid var(--color-accent)',
                        lineHeight: 1.6,
                      }}
                    >
                      {s.badge}
                    </span>
                  )}
                </h3>
                <p className="text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                  {s.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {ctaHref && (
          <div className="mt-12 text-center">
            <Link href={ctaHref} className="btn-accent">
              {ctaLabel}
            </Link>
            <p className="text-[11px] mt-4" style={{ color: 'var(--color-muted)' }}>
              ご相談・お見積り・仕上がりイメージはすべて無料です。
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
