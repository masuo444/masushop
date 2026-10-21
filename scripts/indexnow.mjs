/**
 * 新しいページ・更新したページを Bing などの検索エンジンに即時に知らせる（IndexNow）。
 * ChatGPT の検索は Bing の索引を使うため、AI検索への反映も早くなる。
 *
 * 使い方: node scripts/indexnow.mjs /works /en/works   （パスを並べる。省略すると sitemap の全URL）
 * キーファイル public/0cff055492fb41f4c5c04f574d4c3b8a.txt を公開しておく必要がある（消さないこと）。
 */
const HOST = 'masu.fomus.jp'
const KEY = '0cff055492fb41f4c5c04f574d4c3b8a'

let paths = process.argv.slice(2)
if (!paths.length) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
  paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
}
const urlList = paths.map((p) => `https://${HOST}${p === '/' ? '' : p}`)
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})
console.log(res.status, res.statusText, `${urlList.length} URLs`)
