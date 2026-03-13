'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

const subjects = [
  'Sake cups for personal use',
  'Corporate gifts & bulk orders',
  'Custom engraving',
  'Wholesale inquiry',
  'Other',
]

type FormData = {
  name: string
  email: string
  company: string
  subject: string
  quantity: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  subject: '',
  quantity: '',
  message: '',
}

function ContactForm() {
  const searchParams = useSearchParams()
  const defaultSubject = searchParams.get('subject') || ''

  const [form, setForm] = useState<FormData>({
    ...initialFormData,
    subject: defaultSubject || '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          companyName: form.company,
          purpose: form.subject,
          quantity: form.quantity,
          notes: form.message,
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again, or email us directly.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <section className="py-20 md:py-32 text-center">
        <div className="max-w-lg mx-auto px-6">
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
          <h1 className="section-title mb-4">Thank You!</h1>
          <p
            className="text-sm leading-[2] mb-8"
            style={{ color: 'var(--color-muted)' }}
          >
            Your message has been sent successfully. We&apos;ll get back to you within
            2 business days.
            <br />
            For anything urgent, feel free to email us at{' '}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="underline"
              style={{ color: 'var(--color-accent)' }}
            >
              {siteConfig.contactEmail}
            </a>
          </p>
          <Link href="/en" className="btn-outline">
            Back to Home
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
  const inputClass =
    'w-full px-4 py-3 rounded-sm text-sm outline-none transition-colors focus:border-[var(--color-accent)]'

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: `${siteConfig.url}/en` },
          { name: 'Contact', href: `${siteConfig.url}/en/contact` },
        ]}
      />

      {/* Hero */}
      <section
        className="py-16 md:py-24 text-center"
        style={{ background: 'var(--color-subtle)' }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="section-title mb-4">Contact Us</h1>
          <p
            className="text-sm leading-[2]"
            style={{ color: 'var(--color-muted)' }}
          >
            Whether you&apos;re looking for a single sake cup or a thousand
            corporate gifts, we&apos;d love to hear from you.
            <br />
            Most inquiries are answered within 2 business days.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email side by side */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name <span style={{ color: 'var(--color-accent)' }}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email <span style={{ color: 'var(--color-accent)' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className={labelClass}>
                Company / Organization{' '}
                <span className="text-xs font-normal" style={{ color: 'var(--color-muted)' }}>
                  (optional)
                </span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                className={inputClass}
                style={inputStyle}
                placeholder="Your company name"
              />
            </div>

            {/* Subject & Quantity side by side */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="subject" className={labelClass}>
                  Subject <span style={{ color: 'var(--color-accent)' }}>*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="">Please select</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className={labelClass}>
                  Quantity{' '}
                  <span className="text-xs font-normal" style={{ color: 'var(--color-muted)' }}>
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                  placeholder="e.g. 50, 100-500, not sure yet"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={labelClass}>
                Message <span style={{ color: 'var(--color-accent)' }}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-y`}
                style={inputStyle}
                placeholder="Tell us what you're looking for — sizes, designs, timeline, anything at all. No question is too small."
              />
            </div>

            {/* Error */}
            {error && (
              <div
                className="p-4 rounded-sm text-sm"
                style={{
                  background: '#FEF2F2',
                  color: '#991B1B',
                  border: '1px solid #FECACA',
                }}
              >
                {error}{' '}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="underline"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            )}

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={sending}
                className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minWidth: '240px' }}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
              <p
                className="text-xs mt-6 leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                Prefer email? Reach us anytime at{' '}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="underline"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  )
}
