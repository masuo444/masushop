import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteConfig from '@/lib/site-config'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import { masuSizes } from '@/lib/masu-data'
import { KURA_MASTER } from '@/lib/works'

const baseUrl = siteConfig.url
const url = `${baseUrl}/fr`
const minPrice = `${siteConfig.orderMinPrice.toLocaleString('fr-FR')} ¥`

/**
 * フランス語の入口ページ。Kura Master（パリ）の実績が一番効く国に向けて、注文条件と実績を1ページにまとめる。
 * 問い合わせは英語のフォーム（/en/contact）で受ける。フランス語での対応は約束しない。
 */

export const metadata: Metadata = {
  title: 'Masu japonais personnalisés — gravure dès une pièce, livraison en France | MASU-STORE',
  description:
    'Masu en hinoki (cyprès japonais) gravés à votre nom ou logo, dès une seule pièce. Aperçu gratuit avant commande, livraison en France et dans le monde. Créateur des masu commémoratifs des 10 ans de Kura Master à Paris.',
  alternates: {
    canonical: url,
    languages: { ja: baseUrl, en: `${baseUrl}/en`, fr: url },
  },
  openGraph: {
    title: 'Masu japonais personnalisés — gravure dès une pièce',
    description: 'Masu en hinoki gravés, aperçu gratuit, livraison en France. Masu commémoratifs des 10 ans de Kura Master.',
    url,
    locale: 'fr_FR',
    siteName: siteConfig.nameEn,
    images: [{ url: `${baseUrl}${KURA_MASTER.image.src}`, width: KURA_MASTER.image.width, height: KURA_MASTER.image.height }],
  },
}

const faq = [
  {
    q: 'Peut-on commander un seul masu gravé ?',
    a: `Oui. La gravure est possible dès une pièce. Les masu sans gravure se commandent à partir de 10 pièces. Une commande gravée commence à ${minPrice} par commande (TTC au Japon, livraison en sus), conception et aperçu compris.`,
  },
  {
    q: 'Faut-il fournir un fichier graphique ?',
    a: 'Non. Envoyez le texte à graver ou une simple photo de votre logo (carte de visite, enseigne…). Nous réalisons la mise en page et vous envoyons gratuitement un aperçu avec le devis.',
  },
  {
    q: 'Livrez-vous en France ?',
    a: 'Oui, nous expédions depuis le Japon vers la France, l’Europe et le monde entier. Les droits et taxes d’importation éventuels sont à la charge du destinataire.',
  },
  {
    q: 'Quels sont les délais ?',
    a: 'Les masu gravés sont fabriqués et expédiés en 2 à 3 semaines environ (3 à 4 semaines au-delà de 100 pièces), auxquelles s’ajoute le transport.',
  },
  {
    q: 'Dans quelle langue puis-je commander ?',
    a: 'Le formulaire de contact est en anglais. Le texte à graver peut être en français ou dans toute autre langue, accents compris : vous les vérifiez sur l’aperçu avant de commander.',
  },
]

export default function FrenchPage() {
  return (
    <div lang="fr">
      <BreadcrumbJsonLd items={[{ name: 'MASU-STORE', href: url }]} />
      <FAQJsonLd items={faq} />

      <section className="py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: 'var(--color-accent)' }}>
            Masu du Japon
          </p>
          <h1 className="text-2xl md:text-4xl font-light mb-6" style={{ lineHeight: 1.4 }}>
            Masu japonais personnalisés,
            <br className="hidden md:block" /> gravés dès une seule pièce
          </h1>
          <p className="text-sm md:text-base leading-[2] max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            Le masu est la coupe carrée en bois de hinoki (cyprès japonais) dans laquelle on sert le saké depuis des siècles.
            Nous gravons votre nom, une date, un message ou votre logo, et nous l’expédions depuis le Japon.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link href="/en/contact" className="btn-accent">Demander un devis gratuit</Link>
            <Link href="/en/works" className="btn-outline">Nos réalisations</Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6 grid gap-8 md:grid-cols-[1fr_240px] items-center">
          <div>
            <p className="text-[11px] tracking-[0.18em] mb-2" style={{ color: 'var(--color-accent)' }}>PARIS — {KURA_MASTER.edition}</p>
            <h2 className="serif text-xl md:text-2xl font-light mb-4">Les masu des 10 ans de Kura Master</h2>
            <p className="text-sm leading-[2]" style={{ color: 'var(--foreground)' }}>
              Nous avons réalisé les masu commémoratifs du 10e anniversaire de Kura Master, le concours de saké fondé à Paris en 2017
              et jugé par des professionnels français de la gastronomie et du vin. Gravés au laser du logo « Kura Master Paris 10e Anniversaire »,
              ces masu de 180 ml ont été exposés lors de la cérémonie de remise des prix à la Résidence de l’Ambassadeur du Japon en France,
              le 30 septembre 2026, puis offerts aux maisons de saké lauréates.
            </p>
          </div>
          <Image
            src={KURA_MASTER.image.src}
            alt="Masu commémoratifs des 10 ans de Kura Master, gravés au laser, exposés à la Résidence de l’Ambassadeur du Japon en France"
            width={KURA_MASTER.image.width}
            height={KURA_MASTER.image.height}
            sizes="240px"
            className="w-full max-w-[240px] mx-auto rounded-sm"
          />
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-8">Pourquoi commander chez nous</h2>
          <ul className="space-y-4 text-sm leading-[1.9]">
            <li>• <strong>Dès une pièce</strong> — un cadeau unique, un mariage, ou des centaines de pièces pour un événement.</li>
            <li>• <strong>Aucun fichier nécessaire</strong> — envoyez votre texte ou une photo de votre logo, nous faisons la mise en page.</li>
            <li>• <strong>Aperçu gratuit avant commande</strong> — vous recevez une image du masu gravé avec le devis.</li>
            <li>• <strong>Deux techniques</strong> — le marquage au fer (yakiin), chaleureux et traditionnel, ou la gravure laser, précise, avec un nom différent sur chaque pièce.</li>
            <li>• <strong>Hinoki japonais</strong> — fabriqué au Japon, avec le parfum boisé qui accompagne le saké.</li>
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-16" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-8">Les tailles</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  {['Taille', 'Contenance', 'Dimensions'].map((h) => (
                    <th key={h} className="text-left py-3 pr-4 font-medium" style={{ color: 'var(--color-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {masuSizes.map((m) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-3 pr-4">{m.id.charAt(0).toUpperCase() + m.id.slice(1)} <span style={{ color: 'var(--color-muted)' }}>{m.name}</span></td>
                    <td className="py-3 pr-4 whitespace-nowrap">{m.capacity}</td>
                    <td className="py-3 whitespace-nowrap" style={{ color: 'var(--color-muted)' }}>{m.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[13px] mt-4" style={{ color: 'var(--color-muted)' }}>
            Le classique pour le saké : l’Ichigo de 180 ml, aussi le plus choisi pour la gravure.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-8">Questions fréquentes</h2>
          {faq.map((item) => (
            <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium list-none">
                <span>{item.q}</span>
                <span className="ml-4 text-lg transition-transform group-open:rotate-45" style={{ color: 'var(--color-muted)' }}>+</span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 text-center" style={{ background: 'var(--color-subtle)' }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="section-title mb-4">Recevez votre aperçu gratuit</h2>
          <p className="text-sm leading-[2] mb-8" style={{ color: 'var(--color-muted)' }}>
            Indiquez la taille, la quantité et le texte ou le logo à graver. Nous répondons avec un devis et un aperçu du masu gravé.
            Le formulaire est en anglais ; vous pouvez aussi nous écrire à {siteConfig.contactEmail}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/en/contact" className="btn-accent">Demander un devis gratuit</Link>
            <Link href="/en/shipping" className="btn-outline">Livraison internationale</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
