'use client'

import { useState } from 'react'
import Link from 'next/link'
import { masuSizes } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { getAttribution } from '@/lib/attribution'
import { trackLead } from '@/lib/conversion'

const occasions = [
  '贈り物（誕生日・記念日）',
  '結婚祝い・プロポーズ',
  '出産祝い・命名記念',
  '還暦・退職・卒業のお祝い',
  '海外の方へのプレゼント',
  '自分用・記念に残したい',
  'お店・施設で使う一点もの',
  'その他・まだ決まっていない',
]

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  companyName: '',
  masuSize: '',
  quantity: '1個',
  purpose: '',
  printMethod: '相談したい',
  printContent: '',
  desiredDelivery: '',
  notes: '',
}

export default function OrderMadeForm({
  formType = 'original',
}: {
  /** 送信元のページを通知メールで識別するための値 */
  formType?: string
} = {}) {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
          ...formData,
          formType,
          ...getAttribution(),
        }),
      })
      if (!res.ok) throw new Error('送信に失敗しました')
      trackLead({
        formType,
        quantity: formData.quantity,
        purpose: formData.purpose,
        masuSize: formData.masuSize,
      })
      setIsSuccess(true)
    } catch {
      setError(
        '送信に失敗しました。お手数ですがメールでお問い合わせください。',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle = {
    background: 'var(--background)',
    border: '1px solid var(--color-border)',
    color: 'var(--foreground)',
  }
  const labelClass = 'block text-sm font-medium mb-2'
  const inputClass =
    'w-full px-4 py-3 rounded-sm text-sm outline-none transition-colors focus:border-[var(--color-accent)]'

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        <p
          className="serif text-2xl font-light mb-4"
          style={{ color: 'var(--foreground)' }}
        >
          ご相談ありがとうございます
        </p>
        <p
          className="text-[13px] leading-[2] mb-8"
          style={{ color: 'var(--color-muted)' }}
        >
          内容を確認のうえ、通常1〜2営業日以内にご連絡いたします。
          <br />
          自動返信メールが届かない場合は、迷惑メールフォルダをご確認ください。
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 text-sm border border-[var(--color-border)] rounded-sm"
          style={{ color: 'var(--foreground)' }}
        >
          トップページへ戻る
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="om-name" className={labelClass}>
            お名前 <span style={{ color: 'var(--color-accent)' }}>*</span>
          </label>
          <input
            type="text"
            id="om-name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            placeholder="例：山田 太郎"
          />
        </div>
        <div>
          <label htmlFor="om-email" className={labelClass}>
            メールアドレス{' '}
            <span style={{ color: 'var(--color-accent)' }}>*</span>
          </label>
          <input
            type="email"
            id="om-email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            placeholder="例：taro@example.com"
          />
        </div>
        <div>
          <label htmlFor="om-phone" className={labelClass}>
            電話番号（任意）
          </label>
          <input
            type="tel"
            id="om-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            placeholder="例：090-1234-5678"
          />
        </div>
        <div>
          <label htmlFor="om-companyName" className={labelClass}>
            会社名・店名（法人・店舗の方のみ）
          </label>
          <input
            type="text"
            id="om-companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            placeholder="個人の方は空欄で構いません"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="om-quantity" className={labelClass}>
            ご希望個数 <span style={{ color: 'var(--color-accent)' }}>*</span>
          </label>
          <input
            type="text"
            id="om-quantity"
            name="quantity"
            required
            value={formData.quantity}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            placeholder="例：1個"
          />
          <p
            className="text-[11px] mt-2"
            style={{ color: 'var(--color-muted)' }}
          >
            1個からご相談いただけます。
          </p>
        </div>
        <div>
          <label htmlFor="om-masuSize" className={labelClass}>
            枡のサイズ
          </label>
          <select
            id="om-masuSize"
            name="masuSize"
            value={formData.masuSize}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
          >
            <option value="">まだ決まっていない・相談したい</option>
            {masuSizes.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}（{s.capacity}）
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="om-purpose" className={labelClass}>
          どんな場面で使いますか？
        </label>
        <select
          id="om-purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
        >
          <option value="">選択してください</option>
          {occasions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="om-printMethod" className={labelClass}>
            名入れの方法
          </label>
          <select
            id="om-printMethod"
            name="printMethod"
            value={formData.printMethod}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
          >
            <option value="相談したい">相談したい</option>
            <option value="レーザー刻印">レーザー刻印（写真・手書き可）</option>
            <option value="焼印">焼印（伝統技法）</option>
            <option value="名入れなし">名入れなし</option>
          </select>
        </div>
        <div>
          <label htmlFor="om-desiredDelivery" className={labelClass}>
            希望納期
          </label>
          <input
            type="text"
            id="om-desiredDelivery"
            name="desiredDelivery"
            value={formData.desiredDelivery}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
            placeholder="例：9月20日までに、急ぎではない"
          />
        </div>
      </div>

      <div>
        <label htmlFor="om-printContent" className={labelClass}>
          入れたい文字・デザイン
        </label>
        <textarea
          id="om-printContent"
          name="printContent"
          rows={3}
          value={formData.printContent}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="例：「祝 還暦 2026.9.20 山田太郎」／英語のメッセージ／手書きの文字をそのまま入れたい など"
        />
      </div>

      <div>
        <label htmlFor="om-notes" className={labelClass}>
          ご相談内容・ご要望
        </label>
        <textarea
          id="om-notes"
          name="notes"
          rows={5}
          value={formData.notes}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="イメージしている雰囲気、贈る相手、ご予算の目安などがあればお書きください。画像でイメージを共有いただく場合は、送信後の返信メールに添付してお送りいただけます。"
        />
      </div>

      {error && (
        <p className="text-[13px]" style={{ color: '#c0392b' }}>
          {error}
        </p>
      )}

      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-block px-10 py-3 text-sm text-white rounded-sm transition-opacity disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          {isSubmitting ? '送信中…' : 'この内容で相談する'}
        </button>
        <p
          className="text-[11px] mt-4 leading-[1.9]"
          style={{ color: 'var(--color-muted)' }}
        >
          ご相談・お見積りは無料です。しつこい営業はいたしません。
          <br />
          メールでのご相談は {siteConfig.contactEmail} でも承ります。
        </p>
      </div>
    </form>
  )
}
