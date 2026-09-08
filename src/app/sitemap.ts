import type { MetadataRoute } from 'next'
import siteConfig from '@/lib/site-config'
import { masuSizes } from '@/lib/masu-data'
import { getAllArticles } from '@/lib/blog-articles'

/**
 * ページごとの最終更新日。
 *
 * 以前は全URLに new Date() を入れていたため、デプロイのたびに全ページが
 * 「今更新された」と申告される状態だった。Google は信用できない lastmod を
 * 無視するので、実際にページを更新した日を明示する。
 * ページを大きく書き換えたときは、ここの日付も更新する。
 */
const pageUpdatedAt: Record<string, string> = {
  '/': '2026-09-08',
  '/blog': '2026-03-13',
  '/business': '2026-09-08',
  '/business/anniversary': '2026-09-08',
  '/business/catalog': '2026-09-05',
  '/business/ceremony': '2026-09-01',
  '/business/novelty': '2026-09-08',
  '/business/oem': '2026-09-08',
  '/care': '2026-09-04',
  '/coating': '2026-09-05',
  '/custom': '2026-09-06',
  '/en': '2026-09-06',
  '/en/blog/japanese-gift-ideas': '2026-03-13',
  '/en/blog/sake-drinking-guide': '2026-03-13',
  '/en/blog/wooden-vs-glass-sake-cups': '2026-03-13',
  '/en/care': '2026-03-13',
  '/en/contact': '2026-09-06',
  '/en/corporate': '2026-09-08',
  '/en/faq': '2026-03-13',
  '/en/gifts': '2026-09-08',
  '/en/glossary': '2026-03-13',
  '/en/guide': '2026-03-13',
  '/en/history': '2026-03-13',
  '/en/sake-cups': '2026-03-13',
  '/faq': '2026-03-13',
  '/finder': '2026-03-13',
  '/gift': '2026-09-08',
  '/glossary': '2026-09-04',
  '/guide': '2026-09-05',
  '/history': '2026-09-04',
  '/logo': '2026-09-08',
  '/original': '2026-09-08',
  '/products': '2026-09-05',
  '/products/engraving': '2026-09-06',
  '/products/sizes': '2026-09-06',
  '/reviews': '2026-03-13',
  '/sake': '2026-09-04',
}

// 商品詳細ページはサイズ別解説を追加した日
const PRODUCT_UPDATED_AT = '2026-09-08'

function lastModified(path: string): Date {
  return new Date(pageUpdatedAt[path] ?? PRODUCT_UPDATED_AT)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  const productDetailPages: MetadataRoute.Sitemap = masuSizes.map((m) => ({
    url: `${baseUrl}/products/${m.id}`,
    lastModified: new Date(PRODUCT_UPDATED_AT),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: baseUrl,
      lastModified: lastModified('/'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: lastModified('/guide'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/history`,
      lastModified: lastModified('/history'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/care`,
      lastModified: lastModified('/care'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sake`,
      lastModified: lastModified('/sake'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: lastModified('/products'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...productDetailPages,
    {
      url: `${baseUrl}/products/sizes`,
      lastModified: lastModified('/products/sizes'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/engraving`,
      lastModified: lastModified('/products/engraving'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: lastModified('/business'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/original`,
      lastModified: lastModified('/original'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/logo`,
      lastModified: lastModified('/logo'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/custom`,
      lastModified: lastModified('/custom'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/coating`,
      lastModified: lastModified('/coating'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastModified('/faq'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business/catalog`,
      lastModified: lastModified('/business/catalog'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/business/anniversary`,
      lastModified: lastModified('/business/anniversary'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business/novelty`,
      lastModified: lastModified('/business/novelty'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business/ceremony`,
      lastModified: lastModified('/business/ceremony'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business/oem`,
      lastModified: lastModified('/business/oem'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/finder`,
      lastModified: lastModified('/finder'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gift`,
      lastModified: lastModified('/gift'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: lastModified('/glossary'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: lastModified('/reviews'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastModified('/blog'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // ブログ記事は記事データの updatedAt をそのまま使う
    ...getAllArticles().map((a) => ({
      url: `${baseUrl}/blog/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/en`,
      lastModified: lastModified('/en'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/guide`,
      lastModified: lastModified('/en/guide'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/history`,
      lastModified: lastModified('/en/history'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/care`,
      lastModified: lastModified('/en/care'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/glossary`,
      lastModified: lastModified('/en/glossary'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/faq`,
      lastModified: lastModified('/en/faq'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/sake-cups`,
      lastModified: lastModified('/en/sake-cups'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/gifts`,
      lastModified: lastModified('/en/gifts'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/corporate`,
      lastModified: lastModified('/en/corporate'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: lastModified('/en/contact'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/blog/sake-drinking-guide`,
      lastModified: lastModified('/en/blog/sake-drinking-guide'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/blog/wooden-vs-glass-sake-cups`,
      lastModified: lastModified('/en/blog/wooden-vs-glass-sake-cups'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/blog/japanese-gift-ideas`,
      lastModified: lastModified('/en/blog/japanese-gift-ideas'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
