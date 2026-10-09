import { get, list } from '@vercel/blob'
import { getGoogleAccessToken, hasGoogleCredentials } from '@/lib/google-auth'

/**
 * 毎朝の「前日1日分」レポート。GA4（アクセス）・Search Console（検索ワード）・
 * 問い合わせの控え（Vercel Blob）をまとめて管理者メール用のHTMLにする。
 * どれか1つが取れなくても、取れた分だけで送る。
 */

const GA4_PROPERTY = '552274675'
const GSC_SITE = 'sc-domain:masu.fomus.jp'
const DAY_MS = 24 * 60 * 60 * 1000
const JST_OFFSET_MS = 9 * 60 * 60 * 1000

/** 日本時間の YYYY-MM-DD。offsetDays=-1 で昨日。 */
export function jstDate(offsetDays: number, base = Date.now()) {
  return new Date(base + JST_OFFSET_MS + offsetDays * DAY_MS).toISOString().slice(0, 10)
}

function shiftDate(date: string, days: number) {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10)
}

// ---------- GA4 ----------

type GaRow = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }
type GaQuery = {
  dimensions?: string[]
  metrics: string[]
  limit?: number
  eventNames?: string[]
}

async function runGaReport(token: string, date: string, query: GaQuery) {
  const body: Record<string, unknown> = {
    dateRanges: [{ startDate: date, endDate: date }],
    dimensions: (query.dimensions ?? []).map((name) => ({ name })),
    metrics: query.metrics.map((name) => ({ name })),
    limit: query.limit ?? 10,
  }
  if (query.metrics.length && query.dimensions?.length) {
    body.orderBys = [{ metric: { metricName: query.metrics[0] }, desc: true }]
  }
  if (query.eventNames) {
    body.dimensionFilter = {
      filter: { fieldName: 'eventName', inListFilter: { values: query.eventNames } },
    }
  }
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  )
  if (!response.ok) throw new Error(`GA4 ${response.status} ${await response.text()}`)
  const data = (await response.json()) as { rows?: GaRow[] }
  return (data.rows ?? []).map((row) => ({
    dims: (row.dimensionValues ?? []).map((v) => v.value),
    values: (row.metricValues ?? []).map((v) => Number(v.value)),
  }))
}

const SUMMARY_METRICS = [
  'activeUsers',
  'newUsers',
  'sessions',
  'screenPageViews',
  'engagedSessions',
  'averageSessionDuration',
]

async function fetchGa(date: string) {
  const token = await getGoogleAccessToken([
    'https://www.googleapis.com/auth/analytics.readonly',
  ])
  const summaryFor = async (d: string) =>
    (await runGaReport(token, d, { metrics: SUMMARY_METRICS }))[0]?.values ??
    SUMMARY_METRICS.map(() => 0)

  const [today, prevDay, lastWeek, channels, sources, landings, pages, devices, countries, actions, ctas] =
    await Promise.all([
      summaryFor(date),
      summaryFor(shiftDate(date, -1)),
      summaryFor(shiftDate(date, -7)),
      runGaReport(token, date, { dimensions: ['sessionDefaultChannelGroup'], metrics: ['sessions'] }),
      runGaReport(token, date, { dimensions: ['sessionSourceMedium'], metrics: ['sessions'], limit: 8 }),
      runGaReport(token, date, {
        dimensions: ['landingPagePlusQueryString'],
        metrics: ['sessions', 'engagedSessions'],
      }),
      runGaReport(token, date, {
        dimensions: ['pagePath'],
        metrics: ['screenPageViews', 'userEngagementDuration'],
      }),
      runGaReport(token, date, { dimensions: ['deviceCategory'], metrics: ['sessions'] }),
      runGaReport(token, date, { dimensions: ['country'], metrics: ['sessions'], limit: 6 }),
      runGaReport(token, date, {
        dimensions: ['eventName'],
        metrics: ['eventCount'],
        eventNames: ['generate_lead', 'inquiry_form_start', 'cta_click', 'contact_click'],
      }),
      runGaReport(token, date, {
        dimensions: ['linkText', 'linkUrl', 'pagePath'],
        metrics: ['eventCount'],
        eventNames: ['cta_click', 'contact_click'],
      }),
    ])
  return { today, prevDay, lastWeek, channels, sources, landings, pages, devices, countries, actions, ctas }
}

// ---------- Search Console ----------

async function fetchGsc(date: string) {
  const token = await getGoogleAccessToken([
    'https://www.googleapis.com/auth/webmasters.readonly',
  ])
  const query = async (dimensions: string[], rowLimit: number) => {
    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate: date, endDate: date, dimensions, rowLimit }),
      },
    )
    if (!response.ok) throw new Error(`GSC ${response.status} ${await response.text()}`)
    const data = (await response.json()) as {
      rows?: { keys?: string[]; clicks: number; impressions: number; position: number }[]
    }
    return data.rows ?? []
  }
  const [totals, queries] = await Promise.all([query([], 1), query(['query'], 15)])
  return { totals: totals[0], queries }
}

// ---------- 問い合わせの控え ----------

type StoredInquiry = {
  receivedAt: string
  contact?: { name?: string; company?: string }
  order?: { quantity?: string; purpose?: string; size?: string }
  context?: Record<string, string>
}

async function fetchInquiries(date: string) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  // 控えのパスはUTC日付。日本時間の1日はUTCの2日にまたがる
  const start = Date.parse(`${date}T00:00:00+09:00`)
  const end = start + DAY_MS
  const prefixes = [shiftDate(date, -1), date].map(
    (d) => `contact-submissions/${d.replaceAll('-', '/')}/`,
  )
  const blobs = (await Promise.all(prefixes.map((prefix) => list({ prefix })))).flatMap(
    (result) => result.blobs,
  )
  const inquiries: StoredInquiry[] = []
  for (const blob of blobs) {
    const result = await get(blob.pathname, { access: 'private' })
    if (!result || result.statusCode !== 200) continue
    const item = JSON.parse(await new Response(result.stream).text()) as StoredInquiry
    const at = Date.parse(item.receivedAt)
    if (at >= start && at < end) inquiries.push(item)
  }
  return inquiries.sort((a, b) => a.receivedAt.localeCompare(b.receivedAt))
}

// ---------- HTML ----------

function esc(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

const num = (n: number) => Math.round(n).toLocaleString('ja-JP')

function diff(current: number, base: number) {
  if (!base) return current ? '<span style="color:#888;">（比較なし）</span>' : ''
  const pct = Math.round(((current - base) / base) * 100)
  const color = pct > 0 ? '#2e7d32' : pct < 0 ? '#c62828' : '#888'
  return `<span style="color:${color};">${pct > 0 ? '+' : ''}${pct}%</span>`
}

function seconds(n: number) {
  const s = Math.round(n)
  return s >= 60 ? `${Math.floor(s / 60)}分${s % 60}秒` : `${s}秒`
}

const th = 'text-align:left;padding:6px 8px;border-bottom:1px solid #ddd;color:#888;font-weight:normal;font-size:12px;'
const td = 'padding:6px 8px;border-bottom:1px solid #f0f0f0;vertical-align:top;'
const tdNum = `${td}text-align:right;white-space:nowrap;`

function table(headers: string[], rows: (string | number)[][], numericFrom = 1) {
  if (!rows.length) return '<p style="color:#888;font-size:13px;">データなし</p>'
  return `<table style="width:100%;border-collapse:collapse;font-size:13px;">
<tr>${headers.map((h, i) => `<th style="${th}${i >= numericFrom ? 'text-align:right;' : ''}">${h}</th>`).join('')}</tr>
${rows
  .map(
    (row) =>
      `<tr>${row.map((cell, i) => `<td style="${i >= numericFrom ? tdNum : td}">${cell}</td>`).join('')}</tr>`,
  )
  .join('\n')}
</table>`
}

const section = (title: string, body: string) =>
  `<h2 style="font-size:15px;margin:28px 0 8px;padding-bottom:4px;border-bottom:2px solid #7a5c2e;">${title}</h2>${body}`

const CHANNEL_JA: Record<string, string> = {
  'Organic Search': '自然検索',
  Direct: '直接',
  Referral: '他サイトのリンク',
  'Organic Social': 'SNS',
  'Paid Search': '検索広告',
  'Paid Social': 'SNS広告',
  Email: 'メール',
  Unassigned: '不明',
}
const DEVICE_JA: Record<string, string> = { mobile: 'スマホ', desktop: 'PC', tablet: 'タブレット' }
const EVENT_JA: Record<string, string> = {
  generate_lead: '見積り・問い合わせの送信',
  inquiry_form_start: 'フォームに入力し始めた',
  cta_click: '見積り・相談ボタンのクリック',
  contact_click: 'メール・電話・LINEのクリック',
}

export async function buildDailyReport(date: string) {
  const notes: string[] = []
  const gscDate = shiftDate(date, -2) // Search Console は2〜3日遅れて確定する

  const [ga, gsc, inquiries] = await Promise.all([
    hasGoogleCredentials()
      ? fetchGa(date).catch((error) => {
          notes.push(`アクセス解析（GA4）を取得できませんでした: ${String(error).slice(0, 200)}`)
          return null
        })
      : (notes.push('GOOGLE_SA_JSON が未設定のため、アクセス数・検索ワードは載せていません。'), null),
    hasGoogleCredentials()
      ? fetchGsc(gscDate).catch((error) => {
          notes.push(`検索ワード（Search Console）を取得できませんでした: ${String(error).slice(0, 200)}`)
          return null
        })
      : null,
    fetchInquiries(date).catch((error) => {
      notes.push(`問い合わせの控えを読めませんでした: ${String(error).slice(0, 200)}`)
      return null
    }),
  ])

  const parts: string[] = []

  if (ga) {
    const labels = ['訪問者', 'うち初めての人', '訪問（セッション）', 'ページ表示', 'しっかり見た訪問', '1訪問の平均時間']
    parts.push(
      section(
        'アクセス',
        table(
          ['', '昨日', '前日比', '先週同曜日比'],
          labels.map((label, i) => [
            label,
            i === 5 ? seconds(ga.today[i]) : num(ga.today[i]),
            diff(ga.today[i], ga.prevDay[i]),
            diff(ga.today[i], ga.lastWeek[i]),
          ]),
        ),
      ),
    )
    const sessions = ga.today[2] || 1
    parts.push(
      section(
        'どこから来たか',
        table(
          ['経路', '訪問', '割合'],
          ga.channels.map((r) => [
            esc(CHANNEL_JA[r.dims[0]] ?? r.dims[0]),
            num(r.values[0]),
            `${Math.round((r.values[0] / sessions) * 100)}%`,
          ]),
        ) +
          '<p style="font-size:12px;color:#888;margin:12px 0 4px;">参照元の内訳</p>' +
          table(['参照元 / 種類', '訪問'], ga.sources.map((r) => [esc(r.dims[0]), num(r.values[0])])),
      ),
    )
    parts.push(
      section(
        '入口になったページ',
        table(
          ['ページ', '訪問', 'しっかり見た'],
          ga.landings.map((r) => [esc(r.dims[0]), num(r.values[0]), num(r.values[1])]),
        ),
      ),
    )
    parts.push(
      section(
        'よく見られたページ',
        table(
          ['ページ', '表示', '合計の滞在'],
          ga.pages.map((r) => [esc(r.dims[0]), num(r.values[0]), seconds(r.values[1])]),
        ),
      ),
    )
    parts.push(
      section(
        '見た人の端末と国',
        table(['端末', '訪問'], ga.devices.map((r) => [esc(DEVICE_JA[r.dims[0]] ?? r.dims[0]), num(r.values[0])])) +
          '<div style="height:8px;"></div>' +
          table(['国', '訪問'], ga.countries.map((r) => [esc(r.dims[0]), num(r.values[0])])),
      ),
    )
    const actionCount = (name: string) => ga.actions.find((r) => r.dims[0] === name)?.values[0] ?? 0
    parts.push(
      section(
        '問い合わせにつながる行動',
        table(
          ['行動', '回数'],
          Object.keys(EVENT_JA).map((name) => [EVENT_JA[name], num(actionCount(name))]),
        ) +
          (ga.ctas.length
            ? '<p style="font-size:12px;color:#888;margin:12px 0 4px;">押されたボタン</p>' +
              table(
                ['ボタン', '行き先', '押したページ', '回数'],
                ga.ctas.map((r) => [esc(r.dims[0]), esc(r.dims[1]), esc(r.dims[2]), num(r.values[0])]),
                3,
              )
            : ''),
      ),
    )
  }

  if (inquiries) {
    parts.push(
      section(
        `問い合わせ ${inquiries.length}件`,
        inquiries.length
          ? table(
              ['時刻', 'お客様', '数量・用途', '経路'],
              inquiries.map((item) => {
                const c = item.context ?? {}
                const time = new Date(item.receivedAt).toLocaleTimeString('ja-JP', {
                  timeZone: 'Asia/Tokyo',
                  hour: '2-digit',
                  minute: '2-digit',
                })
                const route = [
                  c.landingPage && `入口 ${c.landingPage}`,
                  `参照元 ${c.referrer || '直接 / 不明'}`,
                  c.visitCount && `${c.visitCount}回目の訪問`,
                  c.submittedFrom && `送信 ${c.submittedFrom}`,
                ]
                  .filter(Boolean)
                  .map((line) => esc(line))
                  .join('<br>')
                return [
                  time,
                  esc([item.contact?.company, item.contact?.name && `${item.contact.name}様`].filter(Boolean).join(' ')),
                  esc([item.order?.quantity, item.order?.purpose].filter(Boolean).join(' / ')),
                  route,
                ]
              }),
              9,
            )
          : '<p style="color:#888;font-size:13px;">昨日の問い合わせはありませんでした。</p>',
      ),
    )
  }

  if (gsc) {
    const t = gsc.totals
    parts.push(
      section(
        `Googleで検索された言葉（${gscDate.slice(5).replace('-', '/')}分）`,
        `<p style="font-size:12px;color:#888;margin:0 0 8px;">Search Consoleは2〜3日遅れで確定するため、この欄だけ少し前の日の数字です。${
          t ? `合計：表示 ${num(t.impressions)}回 / クリック ${num(t.clicks)}回 / 平均 ${t.position.toFixed(1)}位` : ''
        }</p>` +
          table(
            ['検索ワード', '表示', 'クリック', '平均順位'],
            gsc.queries.map((r) => [
              esc(r.keys?.[0]),
              num(r.impressions),
              num(r.clicks),
              r.position.toFixed(1),
            ]),
          ),
      ),
    )
  }

  if (notes.length) {
    parts.push(
      `<div style="margin-top:28px;padding:12px;background:#fff8e1;font-size:12px;color:#795548;">${notes
        .map(esc)
        .join('<br>')}</div>`,
    )
  }

  const leads = inquiries?.length
  const visitors = ga?.today[0]
  const subject = `【MASU-STORE 日報】${date.slice(5).replace('-', '/')} ${
    visitors != null ? `訪問者${num(visitors)}人` : ''
  }${leads != null ? ` / 問い合わせ${leads}件` : ''}`.trim()

  const html = `<div style="font-family:-apple-system,'Hiragino Sans',sans-serif;max-width:680px;margin:0 auto;padding:20px;color:#222;">
<p style="font-size:12px;color:#888;margin:0;">masu.fomus.jp の ${esc(date)}（日本時間）1日分</p>
${parts.join('\n')}
</div>`

  return { subject, html }
}
