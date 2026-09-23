import Link from 'next/link'
import { orderFlowSteps } from '@/lib/order-flow'
import styles from './OrderFlow.module.css'

const summaries = [
  { title: 'ご相談', text: '用途・入れたい文字・個数の目安をお知らせください。デザインデータは不要です。', note: '未定の項目は、そのままで大丈夫。' },
  { title: 'お見積りと仕上がり確認', text: '金額とレイアウト画像をお送りします。書体や配置も、こちらでご提案します。', note: '通常1〜2営業日以内にご返信。' },
  { title: 'ご注文確定', text: '金額と仕上がりをご確認いただき、ご納得いただいてからご注文へ。', note: '法人の請求書払いもご相談可能。' },
  { title: '製作', text: '国産ヒノキの枡に、職人が一つずつ丁寧に名入れを施します。', note: '焼印・レーザー刻印に対応。' },
  { title: 'お届け', text: '一つずつ検品し、ヒノキの削り節で包んでお届けします。', note: '海外発送にも対応しています。' },
]

function StepIcon({ step }: { step: number }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {step === 0 && <><path d="M6 5.5h20v16H15l-7 5v-5H6z" /><path d="M11 11h10M11 16h6" /></>}
      {step === 1 && <><rect x="6" y="3.5" width="20" height="25" rx="2" /><path d="M11 9h10M11 13h6M11 23h10" /><path d="m11 19 3-3 4 4 3-2" /></>}
      {step === 2 && <><circle cx="16" cy="16" r="11.5" /><path d="m10.5 16 3.5 3.5 7.5-8" /></>}
      {step === 3 && <><path d="m4.5 14 11.5-6 11.5 6v11L16 30 4.5 25zM4.5 14 16 20l11.5-6M16 20v10" /><path d="m20 4 2 2M24 1l-6 9-2 1 1-3 6-8" /></>}
      {step === 4 && <><path d="M3 8h17v15H3zM20 13h5l4 5v5h-9M23 13v6h6" /><circle cx="8" cy="24" r="3" fill="var(--background)" /><circle cx="24" cy="24" r="3" fill="var(--background)" /></>}
    </svg>
  )
}

export default function OrderFlow({
  id = 'flow',
  heading = 'ご依頼の流れ',
  lead = '金額と仕上がりを確認してから、ご注文を決められます。',
  ctaHref = '#quote',
  ctaLabel = '無料で見積りを依頼',
  background = 'subtle',
  className = '',
}: {
  id?: string
  heading?: string
  lead?: string
  ctaHref?: string
  ctaLabel?: string
  background?: 'subtle' | 'plain'
  className?: string
}) {
  return (
    <section id={id} className={`${styles.section} ${className}`} style={{ background: background === 'subtle' ? 'var(--color-subtle)' : 'var(--background)' }} aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>HOW TO ORDER</p>
          <h2 id={`${id}-title`} className="section-title">{heading}</h2>
          <p className={styles.lead}>{lead}</p>
        </header>

        <div className={styles.phases}>
          <p><span>01 — 02</span> ご相談・仕上がり確認 <strong>無料</strong></p>
          <p><span>03 — 05</span> ご注文・製作・お届け</p>
        </div>
        <ol className={styles.steps}>
          {orderFlowSteps.map((step, index) => (
            <li key={step.step} className={index < 2 ? styles.freeStep : styles.orderStep}>
              {(index === 0 || index === 2) && <p className={styles.mobilePhase}>{index === 0 ? 'まずは無料で、ご相談・仕上がり確認' : 'ご納得いただいてから、ご注文へ'}</p>}
              <div className={styles.card}>
                <div className={styles.stepTop}><span className={styles.number}><small>STEP</small>{step.step}</span><span className={styles.icon}><StepIcon step={index} /></span></div>
                <div className={styles.copy}>
                  <h3>{index === 1 ? <>お見積りと<span>仕上がり確認</span></> : summaries[index].title}</h3>
                  <p>{summaries[index].text}</p>
                  <p className={styles.note}>{summaries[index].note}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <details className={styles.details}>
          <summary>各ステップの詳しい内容 <span aria-hidden="true">＋</span></summary>
          <ol>{orderFlowSteps.map((step) => <li key={step.step}><span className={styles.detailNumber}>{step.step}</span><div><h3>{step.title}</h3><p>{step.desc}</p></div></li>)}</ol>
        </details>

        {ctaHref && <div className={styles.cta}>
          <div><p className={styles.ctaTitle}>まずは、イメージを見てから。</p><p>ご相談・お見積り・仕上がりイメージは、すべて無料です。</p></div>
          <Link href={ctaHref} className="btn-accent">{ctaLabel}<span aria-hidden="true"> →</span></Link>
        </div>}
      </div>
    </section>
  )
}
