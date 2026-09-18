'use client'

import { useState } from 'react'
import Link from 'next/link'
import { masuSizes } from '@/lib/masu-data'
import {
  prefectures,
  VOICE_UNKNOWN_SIZE,
  voiceAttributes,
  voiceGoodPoints,
  voiceProcessings,
  voicePurposes,
} from '@/lib/voice'

/** Googleビジネスプロフィールの「口コミを書く」URL。未設定ならボタン自体を出さない */
const googleReviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || ''

const ratingLabels: Record<number, string> = {
  1: '不満',
  2: 'やや不満',
  3: 'ふつう',
  4: '満足',
  5: 'とても満足',
}

const initialForm = {
  sizes: [] as string[],
  purpose: '',
  processing: '',
  rating: 0,
  goodPoints: [] as string[],
  concerns: '',
  comment: '',
  displayName: '',
  attribute: '',
  prefecture: '',
  email: '',
  website: '',
}

type Step = 'form' | 'result' | 'done'

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // 古いブラウザ向け
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(area)
    return ok
  }
}

export default function VoiceSurvey() {
  const [form, setForm] = useState(initialForm)
  const [step, setStep] = useState<Step>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [record, setRecord] = useState<{ id: string; editToken: string } | null>(null)
  const [text, setText] = useState('')
  const [consent, setConsent] = useState(false)
  const [copied, setCopied] = useState(false)

  const inputStyle = {
    background: 'var(--background)',
    border: '1px solid var(--color-border)',
    color: 'var(--foreground)',
  }
  const labelClass = 'block text-sm font-medium mb-3'
  const inputClass =
    'w-full px-4 py-3 rounded-sm text-base sm:text-sm outline-none transition-colors focus:border-[var(--color-accent)]'
  const hintClass = 'text-[12px] mt-2'

  const setField = (name: keyof typeof initialForm, value: string | number) =>
    setForm((prev) => ({ ...prev, [name]: value }))

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setField(e.target.name as keyof typeof initialForm, e.target.value)

  const toggle = (name: 'sizes' | 'goodPoints', value: string) =>
    setForm((prev) => {
      const current = prev[name]
      let next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      // 「わからない」とサイズは同時に選べないようにする
      if (name === 'sizes' && value === VOICE_UNKNOWN_SIZE && next.includes(value)) {
        next = [VOICE_UNKNOWN_SIZE]
      } else if (name === 'sizes' && value !== VOICE_UNKNOWN_SIZE) {
        next = next.filter((v) => v !== VOICE_UNKNOWN_SIZE)
      }
      return { ...prev, [name]: next }
    })

  const chip = (selected: boolean) =>
    `px-4 py-2.5 rounded-sm text-sm transition-colors border ${
      selected
        ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
        : 'border-[var(--color-border)] bg-[var(--background)] text-[var(--foreground)]'
    }`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.rating === 0) {
      setError('総合満足度を選んでください。')
      document.getElementById('voice-rating')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setIsSubmitting(true)
    setError('')

    try {
      const ref = new URLSearchParams(window.location.search).get('ref') || ''
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ref }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || '送信に失敗しました')
      setRecord({ id: data.id, editToken: data.editToken })
      setText(data.draft || '')
      setStep('result')
      window.scrollTo({ top: 0 })
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : '送信に失敗しました。時間をおいてもう一度お試しください。',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopy = async () => {
    const ok = await copyText(text)
    setCopied(ok)
    if (ok) window.setTimeout(() => setCopied(false), 2500)
  }

  const handleGoogle = () => {
    // コピーを始めてから、同じクリックの中で新しいタブを開く（ポップアップブロック対策）
    void copyText(text).then((ok) => {
      setCopied(ok)
      if (ok) window.setTimeout(() => setCopied(false), 2500)
    })
    window.open(googleReviewUrl, '_blank', 'noopener,noreferrer')
  }

  const handleFinish = async () => {
    if (!record) return
    if (!text.trim()) {
      setError('感想の文章が空になっています。')
      return
    }
    setIsSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/voice', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: record.id,
          editToken: record.editToken,
          finalText: text,
          consent,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || '送信に失敗しました')
      setStep('done')
      window.scrollTo({ top: 0 })
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : '送信に失敗しました。時間をおいてもう一度お試しください。',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === 'done') {
    return (
      <div className="py-12 text-center">
        <p className="serif text-2xl font-light mb-4">ご回答ありがとうございました</p>
        <p className="text-[13px] leading-[2] mb-8" style={{ color: 'var(--color-muted)' }}>
          いただいた感想は、今後の枡づくりとご案内の改善に使わせていただきます。
          {consent && (
            <>
              <br />
              サイトへの掲載は、内容を確認したうえで行います。
            </>
          )}
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 text-sm border border-[var(--color-border)] rounded-sm"
          style={{ color: 'var(--foreground)' }}
        >
          トップページへ
        </Link>
      </div>
    )
  }

  if (step === 'result') {
    const length = [...text].length
    return (
      <div className="space-y-6">
        <div>
          <h2 className="serif text-xl mb-3">ご回答ありがとうございました</h2>
          <p className="text-[13px] leading-[1.9]" style={{ color: 'var(--color-muted)' }}>
            いただいた回答だけをもとに、感想の下書きを作りました。
          </p>
        </div>

        <div
          className="rounded-sm p-4 text-[13px] leading-[1.9]"
          style={{ background: 'var(--color-accent-light)', borderLeft: '3px solid var(--color-accent)' }}
        >
          自由に書き換えてください。ご自身の言葉での投稿をお願いします。
        </div>

        <div>
          <label htmlFor="voice-text" className="sr-only">
            感想の文章
          </label>
          <textarea
            id="voice-text"
            rows={9}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={2000}
            className={`${inputClass} leading-[1.9]`}
            style={inputStyle}
          />
          <p className="text-[12px] mt-1 text-right" style={{ color: 'var(--color-muted)' }}>
            {length}字
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-3 text-sm rounded-sm border border-[var(--color-border)]"
            style={{ color: 'var(--foreground)', background: 'var(--background)' }}
          >
            {copied ? 'コピーしました' : '文章をコピー'}
          </button>
          {googleReviewUrl && (
            <button
              type="button"
              onClick={handleGoogle}
              className="flex-1 py-3 text-sm rounded-sm border border-[var(--color-border)]"
              style={{ color: 'var(--foreground)', background: 'var(--background)' }}
            >
              Googleに口コミを書く
            </button>
          )}
        </div>
        {googleReviewUrl && (
          <p className="text-[12px] leading-[1.8]" style={{ color: 'var(--color-muted)' }}>
            「Googleに口コミを書く」を押すと文章がコピーされ、Googleの投稿画面が開きます。貼り付けて、内容を確かめてから投稿してください。投稿するかどうかは自由です。
          </p>
        )}

        <div className="divider" />

        <label className="flex items-start gap-3 text-sm leading-[1.8] cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1.5 h-4 w-4 shrink-0 accent-[var(--color-accent)]"
          />
          <span>
            この感想をMASU-STOREのサイトに掲載してよい
            <span className="block text-[12px]" style={{ color: 'var(--color-muted)' }}>
              公開するのは感想・満足度と、表示名・用途・サイズ・加工（入力した場合は属性・都道府県）のみです。メールアドレスは公開しません。
            </span>
          </span>
        </label>

        {error && (
          <p className="text-[13px]" style={{ color: '#c0392b' }}>
            {error}
          </p>
        )}

        <div className="text-center">
          <button
            type="button"
            onClick={handleFinish}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-12 py-3 text-sm text-white rounded-sm transition-opacity disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            {isSubmitting ? '送信中…' : '送信して完了'}
          </button>
          <p className="text-[12px] mt-3" style={{ color: 'var(--color-muted)' }}>
            サイトへの掲載に同意しない場合も、このまま送信できます。
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10" noValidate>
      {/* 人には見えない入力欄（機械的な送信の判別用） */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="voice-website">Website</label>
        <input
          type="text"
          id="voice-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      <fieldset>
        <legend className={labelClass}>購入したサイズ（複数可）</legend>
        <div className="flex flex-wrap gap-2">
          {masuSizes.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={form.sizes.includes(s.id)}
              onClick={() => toggle('sizes', s.id)}
              className={chip(form.sizes.includes(s.id))}
            >
              {s.name}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={form.sizes.includes(VOICE_UNKNOWN_SIZE)}
            onClick={() => toggle('sizes', VOICE_UNKNOWN_SIZE)}
            className={chip(form.sizes.includes(VOICE_UNKNOWN_SIZE))}
          >
            わからない
          </button>
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="voice-purpose" className={labelClass}>
            用途
          </label>
          <select
            id="voice-purpose"
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
          >
            <option value="">選択してください</option>
            {voicePurposes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="voice-processing" className={labelClass}>
            加工
          </label>
          <select
            id="voice-processing"
            name="processing"
            value={form.processing}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
          >
            <option value="">選択してください</option>
            {voiceProcessings.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset id="voice-rating">
        <legend className={labelClass}>
          総合満足度 <span style={{ color: 'var(--color-accent)' }}>*</span>
        </legend>
        <div role="radiogroup" aria-label="総合満足度" className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={form.rating === n}
              aria-label={`${n}（${ratingLabels[n]}）`}
              onClick={() => setField('rating', n)}
              className="text-[2rem] leading-none px-1 py-1"
              style={{ color: n <= form.rating ? 'var(--color-accent)' : 'var(--color-border)' }}
            >
              ★
            </button>
          ))}
          <span className="ml-3 text-sm" style={{ color: 'var(--color-muted)' }}>
            {form.rating > 0 ? ratingLabels[form.rating] : ''}
          </span>
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>良かった点（複数可）</legend>
        <div className="flex flex-wrap gap-2">
          {voiceGoodPoints.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={form.goodPoints.includes(p)}
              onClick={() => toggle('goodPoints', p)}
              className={chip(form.goodPoints.includes(p))}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="voice-concerns" className={labelClass}>
          気になった点（任意）
        </label>
        <textarea
          id="voice-concerns"
          name="concerns"
          rows={3}
          maxLength={1000}
          value={form.concerns}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="例：思っていたより小さかった／届くまでの連絡がもう少し欲しかった"
        />
      </div>

      <div>
        <label htmlFor="voice-comment" className={labelClass}>
          ひとこと感想（任意）
        </label>
        <textarea
          id="voice-comment"
          name="comment"
          rows={3}
          maxLength={1000}
          value={form.comment}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="例：父の還暦祝いに名前を入れて贈りました。晩酌で毎日使ってくれています。"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="voice-displayName" className={labelClass}>
            表示名
          </label>
          <input
            type="text"
            id="voice-displayName"
            name="displayName"
            maxLength={30}
            value={form.displayName}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            placeholder="匿名"
          />
          <p className={hintClass} style={{ color: 'var(--color-muted)' }}>
            空欄なら「匿名」。イニシャルやニックネームがおすすめです。
          </p>
        </div>
        <div>
          <label htmlFor="voice-attribute" className={labelClass}>
            属性（任意）
          </label>
          <select
            id="voice-attribute"
            name="attribute"
            value={form.attribute}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
          >
            <option value="">選択しない</option>
            {voiceAttributes.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="voice-prefecture" className={labelClass}>
            都道府県（任意）
          </label>
          <select
            id="voice-prefecture"
            name="prefecture"
            value={form.prefecture}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
          >
            <option value="">選択しない</option>
            {prefectures.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="voice-email" className={labelClass}>
          メールアドレス（任意）
        </label>
        <input
          type="email"
          id="voice-email"
          name="email"
          maxLength={320}
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="例：taro@example.com"
        />
        <p className={hintClass} style={{ color: 'var(--color-muted)' }}>
          気になった点について、こちらからご連絡する場合にだけ使います。公開はしません。
        </p>
      </div>

      {error && (
        <p className="text-[13px]" style={{ color: '#c0392b' }}>
          {error}
        </p>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-12 py-3 text-sm text-white rounded-sm transition-opacity disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          {isSubmitting ? '下書きを作成中…' : '回答して感想の下書きを見る'}
        </button>
        <p className="text-[12px] mt-3 leading-[1.8]" style={{ color: 'var(--color-muted)' }}>
          次の画面で、回答をもとにした感想の下書きが表示されます。
          <br />
          掲載や投稿は、ご本人が確認してからです。勝手に公開することはありません。
        </p>
      </div>
    </form>
  )
}
