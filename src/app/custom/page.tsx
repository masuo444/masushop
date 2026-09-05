'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { masuSizes } from '@/lib/masu-data'
import siteConfig from '@/lib/site-config'
import { getAttribution } from '@/lib/attribution'

const purposes = [
  '企業ノベルティ・記念品',
  '周年記念品',
  '株主優待・株主総会',
  '展示会・イベント',
  '顧客向けギフト',
  '社員向け記念品',
  '飲食店のオリジナル酒器',
  '結婚式の引き出物',
  'インバウンド向け土産',
  '個人のギフト・記念品',
  '節分・鏡開き用',
  'その他',
]

type FormData = {
  companyName: string
  name: string
  email: string
  phone: string
  masuSize: string
  quantity: string
  purpose: string
  printMethod: string
  printContent: string
  desiredDelivery: string
  notes: string
}

const initialFormData: FormData = {
  companyName: '',
  name: '',
  email: '',
  phone: '',
  masuSize: '',
  quantity: '',
  purpose: '',
  printMethod: '相談したい',
  printContent: '',
  desiredDelivery: '',
  notes: '',
}

export default function CustomPage() {
  return (
    <Suspense>
      <CustomPageInner />
    </Suspense>
  )
}

function CustomPageInner() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  // Pre-fill from URL params (e.g. from /business page links)
  useEffect(() => {
    const updates: Partial<FormData> = {}
    const purpose = searchParams.get('purpose')
    const quantity = searchParams.get('quantity')
    const size = searchParams.get('size')
    const type = searchParams.get('type')
    if (purpose) updates.purpose = purpose
    if (quantity) updates.quantity = quantity
    if (size) updates.masuSize = size
    if (type === 'sample') updates.notes = 'サンプル作成を希望します。'
    if (type === 'packaging') {
      updates.notes = '一合枡専用パッケージ（クリアケース・白箱）について相談したいです。'
    }
    if (Object.keys(updates).length > 0) {
      setFormData((prev) => ({ ...prev, ...updates }))
    }
  }, [searchParams])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
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
          formType: 'custom',
          ...getAttribution(),
        }),
      })
      if (!res.ok) throw new Error('送信に失敗しました')
      setIsSuccess(true)
    } catch {
      setError('送信に失敗しました。お手数ですがメールでお問い合わせください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section className="py-20 md:py-32 text-center">
        <div className="max-w-lg mx-auto px-6">
          {/* CheckCircle icon */}
          <svg
            className="mx-auto mb-8"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <h1 className="section-title mb-4">お問い合わせありがとうございます</h1>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
            内容を確認のうえ、2営業日以内にご連絡いたします。
            <br />
            お急ぎの場合は{' '}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              style={{ color: 'var(--color-accent)' }}
              className="underline"
            >
              {siteConfig.contactEmail}
            </a>{' '}
            までご連絡ください。
          </p>
          <Link href="/" className="btn-outline">
            トップページへ戻る
          </Link>
        </div>
      </section>
    )
  }

  const inputStyle = {
    background: 'var(--background)',
    border: '1px solid var(--color-border)',
    color: 'var(--foreground)',
  }

  const labelClass = 'block text-sm font-medium mb-2'
  const inputClass = 'w-full px-4 py-3 rounded-sm text-sm outline-none transition-colors focus:border-[var(--color-accent)]'

  return (
    <>
      {/* Hero */}
      <section
        className="py-16 md:py-24 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="section-title mb-4">名入れ・オーダーメイド枡</h1>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            お見積り・ご相談フォーム
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-lg font-medium mb-6">お客様情報</h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="companyName" className={labelClass}>
                    会社名 / 団体名
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="例：株式会社○○"
                  />
                </div>
                <div>
                  <label htmlFor="name" className={labelClass}>
                    お名前 <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    style={inputStyle}
                    placeholder="例：山田 太郎"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    メールアドレス <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    style={inputStyle}
                    placeholder="例：info@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="例：03-1234-5678"
                  />
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* Order Details */}
            <div>
              <h2 className="text-lg font-medium mb-6">ご注文内容</h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="masuSize" className={labelClass}>
                    枡サイズ
                  </label>
                  <select
                    id="masuSize"
                    name="masuSize"
                    value={formData.masuSize}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">サイズを選択してください</option>
                    {masuSizes.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}（{s.capacity} / {s.size}）
                      </option>
                    ))}
                    <option value="undecided">未定・相談したい</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="quantity" className={labelClass}>
                    数量 <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    style={inputStyle}
                    placeholder="例：1個、10個、100個、未定"
                  />
                </div>
                <div>
                  <label htmlFor="purpose" className={labelClass}>
                    用途
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">用途を選択してください</option>
                    {purposes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 名入れ方法 radio */}
                <div>
                  <p className={labelClass}>名入れ方法</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['焼印', 'レーザー', '相談したい'].map((method) => (
                      <label
                        key={method}
                        className="flex items-center gap-2 p-3 rounded-sm cursor-pointer text-sm transition-colors"
                        style={{
                          border:
                            formData.printMethod === method
                              ? '1px solid var(--color-accent)'
                              : '1px solid var(--color-border)',
                          background:
                            formData.printMethod === method
                              ? 'var(--color-accent-light)'
                              : 'var(--background)',
                        }}
                      >
                        <input
                          type="radio"
                          name="printMethod"
                          value={method}
                          checked={formData.printMethod === method}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span
                          className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                          style={{
                            borderColor:
                              formData.printMethod === method
                                ? 'var(--color-accent)'
                                : 'var(--color-border)',
                          }}
                        >
                          {formData.printMethod === method && (
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: 'var(--color-accent)' }}
                            />
                          )}
                        </span>
                        {method}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="printContent" className={labelClass}>
                    名入れ内容
                  </label>
                  <input
                    type="text"
                    id="printContent"
                    name="printContent"
                    value={formData.printContent}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="例：企業ロゴ、社名、日付、メッセージなど"
                  />
                </div>
                <div>
                  <label htmlFor="desiredDelivery" className={labelClass}>
                    希望納期
                  </label>
                  <input
                    type="text"
                    id="desiredDelivery"
                    name="desiredDelivery"
                    value={formData.desiredDelivery}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="例：2024年12月末まで、3週間以内、急ぎではない"
                  />
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* Additional */}
            <div>
              <h2 className="text-lg font-medium mb-6">その他</h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="notes" className={labelClass}>
                    その他ご要望
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClass} resize-y`}
                    style={inputStyle}
                    placeholder="ご質問、ご要望、デザインのご相談など、なんでもお気軽にお書きください。"
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="p-4 rounded-sm text-sm"
                style={{ background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="text-center">
              <p
                className="text-xs mb-6 leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                内容を確認のうえ、2営業日以内にご連絡いたします。
                <br />
                お急ぎの場合は{' '}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  style={{ color: 'var(--color-accent)' }}
                  className="underline"
                >
                  {siteConfig.contactEmail}
                </a>{' '}
                までご連絡ください。
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minWidth: '240px' }}
              >
                {isSubmitting ? '送信中...' : 'お見積り・ご相談を送信'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
