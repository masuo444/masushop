import { AI_SOURCE_GA_REGEX, detectAiSource } from '@/lib/ai-sources'
import { getGoogleAccessToken, hasGoogleCredentials } from '@/lib/google-auth'

/**
 * KACHIU（kachiu.jp・桃のコンフィチュールと枡のブランド）の毎朝の日報。
 * サイト本体は Cloudflare Pages の静的サイトでサーバーを持たないため、
 * メール送信の仕組みがある MASU-STORE の Cron に相乗りしている。
 * GA4（アクセス）と Search Console（検索）の前日分＋直近28日をまとめる。どちらか取れなくても送る。
 */

const GA4_PROPERTY = '553045188'
const GSC_SITE = 'sc-domain:kachiu.jp'
const SITE = 'https://kachiu.jp'
const DAY_MS = 24 * 60 * 60 * 1000

const shift = (date: string, days: number) =>
  new Date(Date.parse(`${date}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10)

// ---------- GA4 ----------

type Row = { dims: string[]; values: number[] }
type GaQuery = {
  dimensions?: string[]
  metrics: string[]
  limit?: number
  days?: number
  endOffset?: number
  eventNames?: string[]
  aiOnly?: boolean
}

async function ga(token: string, date: string, q: GaQuery): Promise<Row[]> {
  const end = shift(date, q.endOffset ?? 0)
  const body: Record<string, unknown> = {
    dateRanges: [{ startDate: shift(end, 1 - (q.days ?? 1)), endDate: end }],
    dimensions: (q.dimensions ?? []).map((name) => ({ name })),
    metrics: q.metrics.map((name) => ({ name })),
    limit: q.limit ?? 10,
  }
  if (q.dimensions?.length) body.orderBys = [{ metric: { metricName: q.metrics[0] }, desc: true }]
  const filters: Record<string, unknown>[] = []
  if (q.eventNames) filters.push({ filter: { fieldName: 'eventName', inListFilter: { values: q.eventNames } } })
  if (q.aiOnly)
    filters.push({
      filter: {
        fieldName: 'sessionSource',
        stringFilter: { matchType: 'PARTIAL_REGEXP', value: AI_SOURCE_GA_REGEX, caseSensitive: false },
      },
    })
  if (filters.length === 1) body.dimensionFilter = filters[0]
  if (filters.length > 1) body.dimensionFilter = { andGroup: { expressions: filters } }
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`GA4 ${res.status} ${await res.text()}`)
  const data = (await res.json()) as {
    rows?: { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }[]
  }
  return (data.rows ?? []).map((r) => ({
    dims: (r.dimensionValues ?? []).map((d) => d.value),
    values: (r.metricValues ?? []).map((m) => Number(m.value)),
  }))
}

const SUMMARY = ['totalUsers', 'newUsers', 'sessions', 'screenPageViews', 'engagedSessions', 'averageSessionDuration']
const ACTIONS = ['store_click', 'inquiry_click', 'line_click', 'generate_lead']

async function fetchGa(date: string) {
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/analytics.readonly'])
  const sum = async (q: Omit<GaQuery, 'metrics'>) => (await ga(token, date, { ...q, metrics: SUMMARY }))[0]?.values ?? SUMMARY.map(() => 0)
  const [today, prevDay, lastWeek, week, month, prevMonth] = await Promise.all([
    sum({}),
    sum({ endOffset: -1 }),
    sum({ endOffset: -7 }),
    sum({ days: 7 }),
    sum({ days: 28 }),
    sum({ days: 28, endOffset: -28 }),
  ])
  const [channels, channelsMonth, landings, landingsMonth, pages, countriesMonth, devicesMonth, actionsDay, actionsMonth, actionPages, aiDay, aiMonth, aiLandings] =
    await Promise.all([
      ga(token, date, { dimensions: ['sessionDefaultChannelGroup'], metrics: ['sessions'] }),
      ga(token, date, { dimensions: ['sessionDefaultChannelGroup'], metrics: ['sessions'], days: 28 }),
      ga(token, date, { dimensions: ['landingPage'], metrics: ['sessions', 'engagedSessions'] }),
      ga(token, date, { dimensions: ['landingPage'], metrics: ['sessions', 'engagedSessions'], days: 28, limit: 12 }),
      ga(token, date, { dimensions: ['pagePath'], metrics: ['screenPageViews', 'userEngagementDuration'] }),
      ga(token, date, { dimensions: ['country'], metrics: ['sessions'], days: 28, limit: 8 }),
      ga(token, date, { dimensions: ['deviceCategory'], metrics: ['sessions'], days: 28 }),
      ga(token, date, { dimensions: ['eventName'], metrics: ['eventCount'], eventNames: ACTIONS }),
      ga(token, date, { dimensions: ['eventName'], metrics: ['eventCount'], eventNames: ACTIONS, days: 28 }),
      ga(token, date, { dimensions: ['eventName', 'pagePath'], metrics: ['eventCount'], eventNames: ACTIONS, days: 28, limit: 12 }),
      ga(token, date, { dimensions: ['sessionSource'], metrics: ['sessions'], aiOnly: true }),
      ga(token, date, { dimensions: ['sessionSource'], metrics: ['sessions'], aiOnly: true, days: 28 }),
      ga(token, date, { dimensions: ['sessionSource', 'landingPage'], metrics: ['sessions'], aiOnly: true, days: 28 }),
    ])
  return { today, prevDay, lastWeek, week, month, prevMonth, channels, channelsMonth, landings, landingsMonth, pages, countriesMonth, devicesMonth, actionsDay, actionsMonth, actionPages, aiDay, aiMonth, aiLandings }
}

// ---------- Search Console ----------

type GscRow = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }

async function fetchGsc(date: string) {
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/webmasters.readonly'])
  const query = async (startDate: string, endDate: string, dimensions: string[], rowLimit: number) => {
    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate, dimensions, rowLimit }),
      },
    )
    if (!res.ok) throw new Error(`GSC ${res.status} ${(await res.text()).slice(0, 160)}`)
    return (((await res.json()) as { rows?: GscRow[] }).rows ?? [])
  }
  const start28 = shift(date, -27)
  const [day, month, prevMonth, queries, pages, chances] = await Promise.all([
    query(date, date, [], 1),
    query(start28, date, [], 1),
    query(shift(start28, -28), shift(date, -28), [], 1),
    query(start28, date, ['query'], 20),
    query(start28, date, ['page'], 10),
    query(start28, date, ['query', 'page'], 200),
  ])
  // あと少しで1ページ目：順位4〜20位で表示が多い検索語
  const nearTop = chances
    .filter((r) => r.position >= 4 && r.position <= 20 && r.impressions >= 5)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 8)
  return { day: day[0], month: month[0], prevMonth: prevMonth[0], queries, pages, nearTop }
}

// ---------- HTML ----------

const esc = (v: unknown) =>
  String(v ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const num = (n: number) => Math.round(n).toLocaleString('ja-JP')
const pos = (n?: number) => (n ? n.toFixed(1) : '-')
const sec = (n: number) => {
  const s = Math.round(n)
  return s >= 60 ? `${Math.floor(s / 60)}分${s % 60}秒` : `${s}秒`
}
function diff(cur: number, base: number) {
  if (!base) return cur ? '<span style="color:#888;">（比較なし）</span>' : ''
  const p = Math.round(((cur - base) / base) * 100)
  const c = p > 0 ? '#2e7d32' : p < 0 ? '#c62828' : '#888'
  return `<span style="color:${c};">${p > 0 ? '+' : ''}${p}%</span>`
}
const th = 'text-align:left;padding:6px 8px;border-bottom:1px solid #ddd;color:#888;font-weight:normal;font-size:12px;'
const td = 'padding:6px 8px;border-bottom:1px solid #f0f0f0;vertical-align:top;'
function table(headers: string[], rows: (string | number)[][]) {
  if (!rows.length) return '<p style="color:#888;font-size:13px;">データなし</p>'
  return `<table style="width:100%;border-collapse:collapse;font-size:13px;"><tr>${headers
    .map((h, i) => `<th style="${th}${i ? 'text-align:right;' : ''}">${h}</th>`)
    .join('')}</tr>${rows
    .map((r) => `<tr>${r.map((c, i) => `<td style="${td}${i ? 'text-align:right;white-space:nowrap;' : ''}">${c}</td>`).join('')}</tr>`)
    .join('')}</table>`
}
const section = (title: string, body: string) =>
  `<h2 style="font-size:15px;margin:28px 0 8px;padding-bottom:4px;border-bottom:2px solid #c96f5a;">${title}</h2>${body}`
const note = (t: string) => `<p style="font-size:12px;color:#888;margin:12px 0 4px;">${t}</p>`

const PAGE_JA: Record<string, string> = {
  '/': 'トップ',
  '/items/': 'アイテム',
  '/gift/': 'ギフト',
  '/gift/winter/': 'お歳暮',
  '/gift/bulk/': 'まとめて贈る',
  '/about/': 'KACHIUについて',
  '/corporate/': '法人',
  '/bespoke/': 'お誂え',
  '/contact/': 'お問い合わせ',
  '/souvenirs/': 'お土産',
  '/stockists/': '取扱店',
  '/enjoy/': '食べ方',
  '/journal/': '読みもの一覧',
  '/journal/masu-care/': '記事：枡の使い方とお手入れ',
  '/journal/yamanashi-peach/': '記事：山梨の桃',
  '/journal/kachiu-ukai/': '記事：石和の鵜飼',
  '/journal/confiture-jam/': '記事：コンフィチュールとジャム',
  '/journal/how-to-enjoy/': '記事：食べ方',
  '/journal/peach-and-wine/': '記事：桃とワイン',
  '/journal/gift-jam-guide/': '記事：ジャムを贈る',
}
const page = (raw: string) => {
  const path = raw.replace(SITE, '').replace(/\?.*$/, '') || '/'
  const key = path.endsWith('/') ? path : `${path}/`
  const label = PAGE_JA[key] ?? PAGE_JA[path]
  return label ? `${esc(label)} <span style="color:#aaa;font-size:11px;">${esc(path)}</span>` : esc(path)
}
const CHANNEL_JA: Record<string, string> = {
  'Organic Search': '検索（Google・Bingなど）',
  Direct: '直接（ブックマーク・URL入力・アプリ内など）',
  'Organic Social': 'SNS',
  Referral: '他のサイトのリンク',
  'AI Assistant': 'AI（ChatGPTなど）',
  'Paid Search': '検索広告',
  Email: 'メール',
  Unassigned: '不明',
}
const ACTION_JA: Record<string, string> = {
  store_click: 'ストア（BASE）へ',
  inquiry_click: '問い合わせボタン',
  line_click: '公式LINEへ',
  generate_lead: '問い合わせ送信',
}
const DEVICE_JA: Record<string, string> = { mobile: 'スマホ', desktop: 'PC', tablet: 'タブレット' }

function mergeAi(rows: Row[]) {
  const m = new Map<string, number>()
  for (const r of rows) {
    const name = detectAiSource(r.dims[0]) || r.dims[0]
    m.set(name, (m.get(name) ?? 0) + r.values[0])
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1])
}

export async function buildKachiuReport(date: string) {
  const notes: string[] = []
  const gscDate = shift(date, -2) // Search Console は2〜3日遅れて確定する
  const [g, s] = await Promise.all([
    hasGoogleCredentials()
      ? fetchGa(date).catch((e) => (notes.push(`アクセス解析（GA4）を取得できませんでした: ${String(e).slice(0, 200)}`), null))
      : (notes.push('GOOGLE_SA_JSON が未設定です。'), null),
    hasGoogleCredentials()
      ? fetchGsc(gscDate).catch((e) => {
          const msg = String(e)
          notes.push(
            msg.includes('403')
              ? 'Search Console の数字はまだ載せられません。kachiu.jp のプロパティに、日報用のアカウント（terroir-reports@terroir-hub-reports.iam.gserviceaccount.com）を「制限付き」で追加すると、翌朝から検索の数字が入ります。'
              : `Search Console を取得できませんでした: ${msg.slice(0, 200)}`,
          )
          return null
        })
      : null,
  ])

  const parts: string[] = []
  const headline: string[] = []

  if (g) {
    headline.push(`訪問 ${num(g.today[2])}`)
    const labels = ['訪問者', 'うち初めての人', '訪問（セッション）', 'ページ表示', 'しっかり見た訪問', '1訪問の平均時間']
    parts.push(
      section(
        'アクセス',
        table(
          ['', '昨日', '前日比', '先週同曜日比', '7日', '28日', '28日の前期比'],
          labels.map((l, i) => {
            const f = i === 5 ? sec : num
            return [l, f(g.today[i]), diff(g.today[i], g.prevDay[i]), diff(g.today[i], g.lastWeek[i]), f(g.week[i]), f(g.month[i]), diff(g.month[i], g.prevMonth[i])]
          }),
        ),
      ),
    )
    const monthSessions = g.month[2] || 1
    parts.push(
      section(
        'どこから来たか',
        table(
          ['経路', '昨日', '28日', '28日の割合'],
          g.channelsMonth.map((r) => [
            esc(CHANNEL_JA[r.dims[0]] ?? r.dims[0]),
            num(g.channels.find((c) => c.dims[0] === r.dims[0])?.values[0] ?? 0),
            num(r.values[0]),
            `${Math.round((r.values[0] / monthSessions) * 100)}%`,
          ]),
        ),
      ),
    )
    const aiDay = mergeAi(g.aiDay)
    const aiMonth = mergeAi(g.aiMonth)
    const aiDayTotal = aiDay.reduce((a, [, v]) => a + v, 0)
    const aiMonthTotal = aiMonth.reduce((a, [, v]) => a + v, 0)
    headline.push(`AI経由 ${num(aiDayTotal)}`)
    parts.push(
      section(
        `AIから来た訪問　昨日${num(aiDayTotal)}件 / 28日${num(aiMonthTotal)}件`,
        note('ChatGPT・Perplexity・Gemini・Copilot などで紹介されて来た人。Googleの「AIによる概要」経由は通常の検索と区別できないため含まない。') +
          table(['AI', '28日'], aiMonth.map(([n, v]) => [esc(n), num(v)])) +
          (g.aiLandings.length
            ? note('AIから入ったページ（28日）') +
              table(['ページ', '訪問'], g.aiLandings.map((r) => [`${page(r.dims[1])}<br><span style="color:#888;font-size:11px;">${esc(detectAiSource(r.dims[0]) || r.dims[0])}</span>`, num(r.values[0])]))
            : ''),
      ),
    )
    const act = (rows: Row[], name: string) => rows.find((r) => r.dims[0] === name)?.values[0] ?? 0
    headline.push(`ストアへ ${num(act(g.actionsDay, 'store_click'))}`)
    parts.push(
      section(
        '購入・問い合わせにつながる行動',
        table(['行動', '昨日', '28日'], ACTIONS.map((a) => [ACTION_JA[a], num(act(g.actionsDay, a)), num(act(g.actionsMonth, a))])) +
          (g.actionPages.length
            ? note('どのページで押されたか（28日）') +
              table(['ページ', '回数'], g.actionPages.map((r) => [`${page(r.dims[1])}<br><span style="color:#888;font-size:11px;">${esc(ACTION_JA[r.dims[0]] ?? r.dims[0])}</span>`, num(r.values[0])]))
            : '') +
          note('「ストアへ」は BASE の商品ページへのクリック。実際の注文数は BASE の管理画面で確認する。'),
      ),
    )
    parts.push(
      section(
        '入口になったページ',
        note('昨日') +
          table(['ページ', '訪問', 'しっかり見た'], g.landings.map((r) => [page(r.dims[0]), num(r.values[0]), num(r.values[1])])) +
          note('直近28日') +
          table(['ページ', '訪問', 'しっかり見た'], g.landingsMonth.map((r) => [page(r.dims[0]), num(r.values[0]), num(r.values[1])])),
      ),
    )
    parts.push(
      section('昨日よく見られたページ', table(['ページ', '表示', '合計の滞在'], g.pages.map((r) => [page(r.dims[0]), num(r.values[0]), sec(r.values[1])]))),
    )
    parts.push(
      section(
        '見た人の国と端末（28日）',
        table(['国', '訪問'], g.countriesMonth.map((r) => [esc(r.dims[0]), num(r.values[0])])) +
          '<div style="height:8px;"></div>' +
          table(['端末', '訪問'], g.devicesMonth.map((r) => [esc(DEVICE_JA[r.dims[0]] ?? r.dims[0]), num(r.values[0])])),
      ),
    )
  }

  if (s) {
    headline.push(`検索表示 ${num(s.month?.impressions ?? 0)}/28日`)
    parts.splice(
      1,
      0,
      section(
        'Google検索',
        note(`Search Console は2〜3日遅れて確定するため、${gscDate} の分と、そこまでの28日分。`) +
          table(
            ['', `${gscDate}`, '28日', '28日の前期比'],
            [
              ['検索結果に表示された回数', num(s.day?.impressions ?? 0), num(s.month?.impressions ?? 0), diff(s.month?.impressions ?? 0, s.prevMonth?.impressions ?? 0)],
              ['クリックされた回数', num(s.day?.clicks ?? 0), num(s.month?.clicks ?? 0), diff(s.month?.clicks ?? 0, s.prevMonth?.clicks ?? 0)],
              ['平均順位', pos(s.day?.position), pos(s.month?.position), ''],
            ],
          ) +
          note('検索された言葉（28日・表示の多い順）') +
          table(['検索語', '表示', 'クリック', '平均順位'], s.queries.map((r) => [esc(r.keys?.[0]), num(r.impressions), num(r.clicks), pos(r.position)])) +
          note('検索から見られたページ（28日）') +
          table(['ページ', '表示', 'クリック', '平均順位'], s.pages.map((r) => [page(r.keys?.[0] ?? ''), num(r.impressions), num(r.clicks), pos(r.position)])) +
          (s.nearTop.length
            ? note('あと少しで1ページ目（順位4〜20位で表示が多い組み合わせ）。題名や本文を少し直すと上がりやすい') +
              table(['検索語 → ページ', '表示', '平均順位'], s.nearTop.map((r) => [`${esc(r.keys?.[0])}<br>${page(r.keys?.[1] ?? '')}`, num(r.impressions), pos(r.position)]))
            : ''),
      ),
    )
  }

  const subject = `【KACHIU 日報】${date}　${headline.join('・') || 'データなし'}`
  const html = `<div style="font-family:-apple-system,'Hiragino Sans',sans-serif;max-width:720px;margin:0 auto;color:#222;line-height:1.6;">
<h1 style="font-size:18px;margin:0 0 4px;">KACHIU 日報（${esc(date)}）</h1>
<p style="font-size:12px;color:#888;margin:0;"><a href="${SITE}/" style="color:#888;">kachiu.jp</a> ／ ストア: store.kachiu.jp（BASE）</p>
${notes.map((n) => `<p style="font-size:13px;background:#fff7e6;border-left:3px solid #e0a040;padding:8px 10px;margin:12px 0;">${esc(n)}</p>`).join('')}
${parts.join('\n')}
<p style="font-size:11px;color:#aaa;margin-top:32px;">このメールは MASU-STORE の仕組み（/api/cron/kachiu-report）から毎朝8時に送られています。</p>
</div>`
  return { subject, html }
}
