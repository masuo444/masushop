const points = [
  {
    label: '1個から',
    title: '1個からお作りします',
    desc: '名入れをする一点ものは1個から承ります。「1個だけ頼めるところが見つからない」という理由でご相談いただくことがよくあります。無地の枡をまとめて買う場合は10個からです。',
  },
  {
    label: 'データ不要',
    title: 'メッセージを送るだけで、デザインまで',
    desc: '入れたい文章・お名前・日付をお送りいただければ、書体選び・レイアウト・配置までこちらで組みます。デザインデータをご用意いただく必要はありません。仕上がりのイメージをお送りし、修正は何度でも無料です。',
  },
  {
    label: '国産ヒノキ',
    title: '国産ヒノキに、職人の手で',
    desc: '印刷した既製品ではなく、1300年使われてきた木の器そのものに刻みます。手に取ったときのヒノキの香りと木目が、贈り物としての価値を決めます。',
  },
]

export default function Differentiators({
  heading = 'この3つが、選ばれている理由です',
  className = '',
}: {
  heading?: string
  className?: string
}) {
  return (
    <section className={`max-w-4xl mx-auto px-6 py-16 ${className}`}>
      <h2 className="section-title mb-10 text-center">{heading}</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {points.map((point) => (
          <div
            key={point.label}
            className="rounded-sm p-6"
            style={{
              background: 'var(--color-subtle)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="text-[11px] tracking-[0.18em] mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              {point.label}
            </p>
            <h3 className="serif text-lg mb-3">{point.title}</h3>
            <p className="text-sm leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
              {point.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
