import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="パンくずリスト"
      className="max-w-5xl mx-auto px-6 py-3"
    >
      <ol className="flex flex-wrap items-center gap-1 text-[11px]" style={{ color: 'var(--color-muted)' }}>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span className="mx-1">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:underline" style={{ color: 'var(--color-muted)' }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: 'var(--foreground)' }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
