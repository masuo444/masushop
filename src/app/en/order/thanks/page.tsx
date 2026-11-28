import type { Metadata } from 'next'
import Link from 'next/link'
import PurchaseTracker from './PurchaseTracker'

// Stripe の決済完了後に戻ってくるページ（決済リンクの「支払い後の動作」で設定）。検索には出さない。
export const metadata: Metadata = {
  title: 'Thank you for your order',
  robots: { index: false, follow: false },
}

export default function OrderThanksPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <PurchaseTracker />
      <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)]">Order received</p>
      <h1 className="serif text-3xl font-light mt-2">Thank you for your order</h1>
      <p className="text-sm leading-[1.9] mt-6">
        Your payment was successful and a receipt has been sent to your email by Stripe. Your masu are made to order,
        so making and dispatch usually take about 3 weeks (a little longer in busy seasons).
      </p>

      <div className="mt-10 border border-[var(--color-border)] rounded p-6 bg-white">
        <h2 className="text-sm tracking-[0.15em] uppercase">What happens next</h2>
        <ol className="text-sm leading-[1.9] mt-4 list-decimal pl-5 space-y-2">
          <li>We make your masu to order and send them by EMS express mail (usually about 3 weeks after payment).</li>
          <li>We email you the EMS tracking number so you can follow your parcel.</li>
          <li>Delivery usually takes 5–10 days after shipping.</li>
        </ol>
        <p className="text-xs leading-[1.8] text-[var(--color-muted)] mt-5">
          Import VAT and any customs fees in your country are paid by the recipient on delivery, as explained on the
          order page.
        </p>
      </div>

      <p className="text-sm leading-[1.9] mt-10">
        Questions about your order? Email us at{' '}
        <a href="mailto:contact@fomus.jp" className="underline">contact@fomus.jp</a> or use the{' '}
        <Link href="/en/contact" className="underline">contact form</Link>.
      </p>
      <p className="mt-8">
        <Link href="/en" className="text-xs tracking-[0.18em] uppercase underline">Back to MASU-STORE</Link>
      </p>
    </main>
  )
}
