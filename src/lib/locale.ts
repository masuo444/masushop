/**
 * 日本語ページと英語ページの対応表。
 *
 * 英語版が用意されているページだけを列挙する。ここに無いページで言語を
 * 切り替えた場合は英語トップ（/en）に送る。存在しない URL に飛ばして
 * 404 を見せるより、英語で読める入口に着地させることを優先している。
 */
const jaToEn: Record<string, string> = {
  '/': '/en',
  '/guide': '/en/guide',
  '/history': '/en/history',
  '/care': '/en/care',
  '/faq': '/en/faq',
  '/glossary': '/en/glossary',
  '/gift': '/en/gifts',
  '/sake': '/en/sake-cups',
  '/business': '/en/corporate',
  '/custom': '/en/contact',
  '/products': '/en/sake-cups',
  // 英語版がまだ無いページ（/logo, /order, /order-made, /original など）は
  // 意図的に載せていない。作ったらここに追記する。
}

/**
 * 英語→日本語で 1:1 に戻せないページの行き先。
 * 英語のブログ記事には個別の日本語版が無いため、日本語の読みもの一覧に送る。
 */
const enExtraToJa: Record<string, string> = {
  '/en/blog/japanese-gift-ideas': '/blog',
  '/en/blog/sake-drinking-guide': '/blog',
  '/en/blog/wooden-vs-glass-sake-cups': '/blog',
}

const enToJa: Record<string, string> = Object.entries(jaToEn).reduce<Record<string, string>>(
  (acc, [ja, en]) => {
    // 複数の日本語ページが同じ英語ページを指す場合は、先に定義した方を正とする
    if (!(en in acc)) acc[en] = ja
    return acc
  },
  { ...enExtraToJa },
)

export function isEnglishPath(pathname: string): boolean {
  return pathname === '/en' || pathname.startsWith('/en/')
}

/** 現在のパスに対応する、もう一方の言語のパスを返す */
export function getAlternatePath(pathname: string): string {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname

  if (isEnglishPath(path)) {
    return enToJa[path] ?? '/'
  }
  return jaToEn[path] ?? '/en'
}

/** 対応する翻訳ページが実在するか（無い場合はトップに送られる） */
export function hasDirectTranslation(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  return isEnglishPath(path) ? path in enToJa : path in jaToEn
}
