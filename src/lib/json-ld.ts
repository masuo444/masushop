/**
 * <script type="application/ld+json"> に埋め込むための JSON 文字列。
 * 口コミ本文などお客様の文章が入るので、</script> で抜け出されないよう < > & を逃がす。
 */
export function jsonLd(data: unknown) {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}
