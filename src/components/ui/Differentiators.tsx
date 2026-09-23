import Image from 'next/image'
import styles from './Differentiators.module.css'

const points = [
  { label: '1個から', title: 'たったひとつの、贈りもの。', desc: 'お名前やメッセージを刻んだ、一点ものの枡。大切な人への贈りものも、自分だけの一品も、1個からお作りします。', note: '名入れは1個から。無地の枡は10個から。' },
  { label: 'データ不要', title: '言葉を送る。想いが形になる。', desc: '入れたい文章・お名前・日付を送るだけ。書体選びからレイアウトまで、デザインは私たちにお任せください。', note: 'お見積りと仕上がりイメージは、ご注文前に無料で。' },
  { label: '国産ヒノキ', title: '木のぬくもりに、職人の技を。', desc: '国産ヒノキの香りと、一つずつ異なる木目。職人が丁寧に名入れを施し、手に取るたびに愛着が深まる一品に仕上げます。', note: '1300年受け継がれてきた、日本の木の器。' },
]

export default function Differentiators({ heading = 'この3つが、選ばれている理由です', className = '' }: { heading?: string; className?: string }) {
  return <section id="reasons" className={`${styles.section} ${className}`} aria-labelledby="reasons-title">
    <header className={styles.header}><p className={styles.eyebrow}>WHY MASU-STORE</p><h2 id="reasons-title" className="section-title">{heading === 'この3つが、選ばれている理由です' ? <><span>この3つが、</span><span>選ばれている理由です</span></> : heading}</h2></header>
    <div className={styles.grid}>{points.map((point,index)=><article className={styles.card} key={point.label}>
      <div className={styles.visual}><span className={styles.number}>0{index+1}</span><Image src={`/images/reasons/${['single-masu','design-masu','hinoki-masu'][index]}.webp`} alt="" width={900} height={600} sizes="(max-width: 767px) 100vw, 33vw" className={styles.illustration}/><span className={styles.label}>{point.label}</span></div>
      <div className={styles.copy}><h3>{point.title}</h3><p>{point.desc}</p><p className={styles.note}>{point.note}</p></div>
    </article>)}</div>
  </section>
}
