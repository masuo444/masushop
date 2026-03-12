type BreadcrumbItem = {
  name: string
  href: string
}

type FAQItem = {
  q: string
  a: string
}

type HowToStep = {
  name: string
  text: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: HowToStep[]
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ArticleJsonLd({
  headline,
  description,
  datePublished,
  dateModified,
  url,
}: {
  headline: string
  description: string
  datePublished: string
  dateModified: string
  url: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    dateModified,
    url,
    author: {
      '@type': 'Organization',
      name: 'MASU-STORE',
      url: 'https://masu.fomus.jp',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MASU-STORE',
      url: 'https://masu.fomus.jp',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function DefinedTermSetJsonLd({
  terms,
}: {
  terms: { name: string; description: string }[]
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: '枡用語辞典',
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.name,
      description: t.description,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
