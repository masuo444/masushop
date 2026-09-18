'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { masuSizes } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { getAttribution } from '@/lib/attribution'
import { trackLead } from '@/lib/conversion'
import { orderMinPriceShort } from '@/lib/pricing'

/**
 * 「30秒かんたん見積り」
 * 1画面1問のステップ形式で、用途・サイズ・個数・加工を選んで連絡先を送るだけ。
 * 送信先は既存の /api/contact（formType: 'quick-quote'）。
 */

const purposeOptions = [
  '退職・還暦などのお祝い',
  '結婚祝い・引き出物',
  '企業ノベルティ・周年記念',
  '展示会・イベント',
  '飲食店・店舗で使う',
  '節分・鏡開き',
  '自分用・その他',
  'まだ決まっていない',
]

const UNKNOWN_SIZE = 'unknown'

const quantityOptions = ['1個', '2〜9個', '10〜49個', '50〜99個', '100〜299個', '300個以上']

const methodOptions = [
  { value: 'レーザー刻印', label: 'レーザー名入れ', note: '写真・1個ずつ違う内容も' },
  { value: '焼印', label: '焼印', note: '伝統技法。同じロゴをまとめて' },
  { value: '名入れなし', label: '名入れなし', note: '無地の枡（10個から）' },
  { value: '相談したい', label: '相談したい', note: '内容を見てご提案します' },
]

type Answers = {
  purpose: string
  size: string
  quantity: string
  method: string
}

type Contact = {
  name: string
  email: string
  companyName: string
  printContent: string
}

const STEP_COUNT = 5

const stepTitles = [
  'どんな用途でお使いですか？',
  '枡のサイズは？',
  'おおよその個数は？',
  '名入れの方法は？',
  'お見積りの送り先',
]

export default function QuickQuote({
  id = 'quote',
  defaultSize = '',
  heading = '30秒かんたん見積り',
  lead = '4つ選んで送るだけ。1〜2営業日以内に、お見積りと仕上がりイメージをお送りします。',
  formType = 'quick-quote',
  className = '',
}: {
  id?: string
  /** 商品ページから渡すサイズID（例: 'ichigo'）。渡すとそのサイズを選んだ状態で始まる */
  defaultSize?: string
  heading?: string
  lead?: string
  formType?: string
  className?: string
}) {
  const presetSize = masuSizes.some((m) => m.id === defaultSize) ? defaultSize : ''
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    purpose: '',
    size: presetSize,
    quantity: '',
    method: '',
  })
  const [contact, setContact] = useState<Contact>({
    name: '',
    email: '',
    companyName: '',
    printContent: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  // ステップが変わったら質問の見出しにフォーカスを移す（キーボード・読み上げ対応）
  useEffect(() => {
    if (!touched) return
    headingRef.current?.focus({ preventScroll: true })
  }, [step, touched])

  const goTo = (next: number) => {
    setTouched(true)
    setStep(Math.min(Math.max(next, 0), STEP_COUNT - 1))
  }

  const choose = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    goTo(step + 1)
  }

  const currentValue = (['purpose', 'size', 'quantity', 'method'] as const)[step]
  const hasCurrent = step < 4 && Boolean(answers[currentValue])

  const sizeLabel = (value: string) => {
    if (value === UNKNOWN_SIZE) return 'サイズは相談したい'
    const m = masuSizes.find((s) => s.id === value)
    return m ? `${m.name}（${m.capacity}）` : ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          companyName: contact.companyName,
          quantity: answers.quantity || '未定',
          masuSize: answers.size === UNKNOWN_SIZE ? 'サイズは相談したい' : answers.size,
          purpose: answers.purpose,
          printMethod: answers.method,
          printContent: contact.printContent,
          notes: 'かんたん見積りフォームからの送信です。お見積りと仕上がりイメージを希望します。',
          formType,
          ...getAttribution(),
        }),
      })
      if (!res.ok) throw new Error('送信に失敗しました')
      trackLead({
        formType,
        quantity: answers.quantity,
        purpose: answers.purpose,
        masuSize: answers.size,
      })
      setIsSuccess(true)
    } catch {
      setError('送信に失敗しました。お手数ですがメールでお問い合わせください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const cardStyle = {
    background: 'var(--background)',
    border: '1px solid var(--color-border)',
  }

  const optionClass =
    'w-full min-h-14 px-4 py-3 rounded-sm text-left text-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]'
  const optionStyle = (selected: boolean) => ({
    border: selected ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
    background: selected ? 'var(--color-accent-light)' : 'var(--background)',
    color: 'var(--foreground)',
  })

  const inputStyle = {
    background: 'var(--background)',
    border: '1px solid var(--color-border)',
    color: 'var(--foreground)',
  }
  const inputClass =
    'w-full px-4 py-3 rounded-sm text-sm outline-none transition-colors focus:border-[var(--color-accent)]'
  const labelClass = 'block text-sm font-medium mb-2'

  return (
    <section
      id={id}
      className={`py-20 md:py-24 scroll-mt-20 ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="max-w-2xl mx-auto px-6">
        <p
          className="text-[11px] tracking-[0.18em] text-center mb-3"
          style={{ color: 'var(--color-accent)' }}
        >
          FREE QUOTE
        </p>
        <h2 id={`${id}-title`} className="section-title text-center mb-4">
          {heading}
        </h2>
        <p className="lead text-center mb-10">{lead}</p>

        <div className="rounded-sm p-6 md:p-8" style={cardStyle}>
          {isSuccess ? (
            <div className="text-center py-6">
              <p className="serif text-2xl font-light mb-4" style={{ color: 'var(--foreground)' }}>
                ありがとうございます
              </p>
              <p className="text-sm leading-[2] mb-2" style={{ color: 'var(--foreground)' }}>
                1〜2営業日以内に、お見積りと仕上がりイメージをお送りします。
              </p>
              <p className="text-[13px] leading-[1.9] mb-2" style={{ color: 'var(--color-muted)' }}>
                イメージを見てから、ご注文をご判断ください。
                <br />
                自動返信メールが届かない場合は、迷惑メールフォルダをご確認ください。
              </p>
              <p className="text-[13px] mb-8" style={{ color: 'var(--color-muted)' }}>
                {orderMinPriceShort}
              </p>
              <Link href="/products" className="btn-outline">
                枡の商品一覧を見る
              </Link>
            </div>
          ) : (
            <>
              {/* 進捗 */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] tracking-[0.1em]" style={{ color: 'var(--color-muted)' }}>
                  <span aria-live="polite">
                    {step + 1} / {STEP_COUNT}
                  </span>
                </p>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    className="text-[13px] underline underline-offset-4 cursor-pointer"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    ← 戻る
                  </button>
                )}
              </div>
              <div
                className="h-px w-full mb-8"
                style={{ background: 'var(--color-border)' }}
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={STEP_COUNT}
                aria-valuenow={step + 1}
                aria-label="入力の進み具合"
              >
                <div
                  className="h-px transition-all duration-300"
                  style={{
                    width: `${((step + 1) / STEP_COUNT) * 100}%`,
                    background: 'var(--color-accent)',
                  }}
                />
              </div>

              <h3
                ref={headingRef}
                tabIndex={-1}
                className="serif text-xl md:text-2xl font-normal mb-6 outline-none"
                style={{ color: 'var(--foreground)' }}
              >
                {stepTitles[step]}
              </h3>

              {/* 1. 用途 */}
              {step === 0 && (
                <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="用途">
                  {purposeOptions.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => choose('purpose', p)}
                      className={optionClass}
                      style={optionStyle(answers.purpose === p)}
                      aria-pressed={answers.purpose === p}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}

              {/* 2. サイズ */}
              {step === 1 && (
                <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="サイズ">
                  {masuSizes.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => choose('size', m.id)}
                      className={optionClass}
                      style={optionStyle(answers.size === m.id)}
                      aria-pressed={answers.size === m.id}
                    >
                      <span className="block">{m.name}</span>
                      <span className="block text-[13px]" style={{ color: 'var(--color-muted)' }}>
                        {m.capacity}・{m.capacityNote}
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => choose('size', UNKNOWN_SIZE)}
                    className={optionClass}
                    style={optionStyle(answers.size === UNKNOWN_SIZE)}
                    aria-pressed={answers.size === UNKNOWN_SIZE}
                  >
                    <span className="block">わからない・相談したい</span>
                    <span className="block text-[13px]" style={{ color: 'var(--color-muted)' }}>
                      用途に合うサイズをご提案します
                    </span>
                  </button>
                </div>
              )}

              {/* 3. 個数 */}
              {step === 2 && (
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3" role="group" aria-label="個数">
                  {quantityOptions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => choose('quantity', q)}
                      className={`${optionClass} text-center`}
                      style={optionStyle(answers.quantity === q)}
                      aria-pressed={answers.quantity === q}
                    >
                      {q}
                    </button>
                  ))}
                  <p className="col-span-full text-[13px] mt-1" style={{ color: 'var(--color-muted)' }}>
                    名入れは1個から、無地の枡は10個から。数量が増えるほど単価は下がります。
                  </p>
                </div>
              )}

              {/* 4. 加工 */}
              {step === 3 && (
                <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="名入れの方法">
                  {methodOptions.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => choose('method', m.value)}
                      className={optionClass}
                      style={optionStyle(answers.method === m.value)}
                      aria-pressed={answers.method === m.value}
                    >
                      <span className="block">{m.label}</span>
                      <span className="block text-[13px]" style={{ color: 'var(--color-muted)' }}>
                        {m.note}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* 選択済みなら「次へ」で確定できる（商品ページからサイズ指定で来た場合など） */}
              {step < 4 && hasCurrent && (
                <div className="mt-6 text-right">
                  <button
                    type="button"
                    onClick={() => goTo(step + 1)}
                    className="btn-outline cursor-pointer"
                    style={{ padding: '10px 24px', fontSize: '14px' }}
                  >
                    このまま次へ →
                  </button>
                </div>
              )}

              {/* 5. 連絡先 */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* 選んだ内容の確認（押すとその質問に戻れる） */}
                  <ul
                    className="flex flex-wrap gap-2 mb-2"
                    style={{ listStyle: 'none' }}
                    aria-label="選択した内容"
                  >
                    {[
                      { label: answers.purpose, to: 0 },
                      { label: sizeLabel(answers.size), to: 1 },
                      { label: answers.quantity, to: 2 },
                      { label: answers.method, to: 3 },
                    ]
                      .filter((c) => c.label)
                      .map((c) => (
                        <li key={c.to}>
                          <button
                            type="button"
                            onClick={() => goTo(c.to)}
                            className="text-[13px] px-3 py-1.5 rounded-sm cursor-pointer"
                            style={{
                              background: 'var(--color-subtle)',
                              border: '1px solid var(--color-border)',
                              color: 'var(--foreground)',
                            }}
                            aria-label={`${c.label} を変更する`}
                          >
                            {c.label}
                          </button>
                        </li>
                      ))}
                  </ul>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor={`${id}-name`} className={labelClass}>
                        お名前 <span style={{ color: 'var(--color-accent)' }}>*</span>
                      </label>
                      <input
                        id={`${id}-name`}
                        type="text"
                        required
                        autoComplete="name"
                        value={contact.name}
                        onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                        className={inputClass}
                        style={inputStyle}
                        placeholder="例：山田 太郎"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${id}-email`} className={labelClass}>
                        メールアドレス <span style={{ color: 'var(--color-accent)' }}>*</span>
                      </label>
                      <input
                        id={`${id}-email`}
                        type="email"
                        required
                        autoComplete="email"
                        value={contact.email}
                        onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                        className={inputClass}
                        style={inputStyle}
                        placeholder="例：taro@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${id}-company`} className={labelClass}>
                      会社名・店名（任意）
                    </label>
                    <input
                      id={`${id}-company`}
                      type="text"
                      autoComplete="organization"
                      value={contact.companyName}
                      onChange={(e) => setContact((c) => ({ ...c, companyName: e.target.value }))}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="個人の方は空欄で構いません"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${id}-content`} className={labelClass}>
                      入れたい文字・ご要望（任意）
                    </label>
                    <textarea
                      id={`${id}-content`}
                      rows={3}
                      value={contact.printContent}
                      onChange={(e) => setContact((c) => ({ ...c, printContent: e.target.value }))}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="例：「祝 還暦 2026.9.20 山田太郎」／社名ロゴを正面に／まだ決まっていない"
                    />
                    <p className="text-[11px] mt-2" style={{ color: 'var(--color-muted)' }}>
                      文章だけで構いません。書体・レイアウトはこちらで組み、仕上がりイメージをお送りします。
                    </p>
                  </div>

                  {error && (
                    <p className="text-[13px]" style={{ color: '#c0392b' }}>
                      {error}{' '}
                      <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
                        {siteConfig.contactEmail}
                      </a>
                    </p>
                  )}

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-accent w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? '送信中…' : '見積りと仕上がりイメージを受け取る（無料）'}
                    </button>
                    <p className="text-[13px] mt-4" style={{ color: 'var(--color-muted)' }}>
                      {orderMinPriceShort}／デザイン作成・仕上がりイメージ込み
                    </p>
                    <p className="text-[11px] mt-2 leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
                      ご相談・お見積りは無料です。しつこい営業はいたしません。
                      <br />
                      詳しく書いて相談したい方は{' '}
                      <Link href="/custom" className="underline underline-offset-4">
                        お問い合わせフォーム
                      </Link>
                      {' '}へ。
                    </p>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
