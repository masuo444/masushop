import Anthropic from '@anthropic-ai/sdk'
import { hasBotStore, readAiBotVisits } from '@/lib/ai-bots'
import { GSC_SITE, esc, fetchInquiries, runGaReport, shiftDate } from '@/lib/daily-report'
import { getGoogleAccessToken, hasGoogleCredentials } from '@/lib/google-auth'
import { quantityBucket } from '@/lib/conversion'

/**
 * 毎週月曜の「問い合わせを増やすための改善アドバイス」。
 * 直近7日・28日のデータ（GA4・Search Console・AIクローラー・問い合わせ）を Claude に読ませ、
 * 直すべきページと直し方を返させて管理者へメールする。1回あたり数十円。
 * お客様の名前・メール・会社名は Claude に渡さない（数量と用途と流入経路だけ）。
 */

export const ADVICE_MODEL = 'claude-opus-5-5'

/** サイトの事実と表現ルール。アドバイスがこれに反しないよう前提として渡す */
const SITE_RULES = `
## サイトの概要
- masu.fomus.jp「枡の専門店 MASU-STORE」。国産ヒノキ枡の名入れ・オーダーメイド専門店。運営は合同会社FOMUS
- 目的は問い合わせ（お見積り・オーダーメイド相談）の獲得。受注は1個の一点ものから法人の大口まで
- 問い合わせ導線は2本：/custom（法人・大口の見積り）と /order-made（一点もの・1個から）。/business は法人向けの入口
- 日本語がメイン、/en に英語版（海外発送対応）

## 提供内容の事実（これ以外を約束する提案はしない）
- ある：注文前に見積りと一緒に「仕上がりイメージ」を無料で送る（一番の売り）／デザインデータ不要（文章を送るだけ）／名入れは1個から・無地は10個から／請求書払い／海外発送
- ない：「修正何度でも無料」「サンプル製作」→ 提案に含めない
- 価格：名入れは1回の注文の最低額が税込4,400円〜（送料別、デザイン作成と仕上がりイメージ込み）。2個目以降は割安。無地・法人は見積り

## 表現ルール
- 導入事例・口コミに法人名を出さない（「法人のお客様」）。実在確認の取れていない口コミや数字を作らない
- 競合（工場直販の枡メーカーなど）の名前をサイトに出さない。立ち位置は「文章を送るだけで任せられる専門店」
- 嘘・誇張・根拠のない「No.1」などは書かない。データのないことは書かない
- 「AIっぽい」過剰な装飾や煽り文句は避ける。落ち着いた職人・専門店のトーン
`.trim()

const SYSTEM_PROMPT = `あなたは中小ECサイトのCRO（問い合わせ率改善）とSEO・AIO（AI検索対策）の専門家です。
渡されたアクセスデータだけを根拠に、このサイトの問い合わせを増やすための改善を日本語で提案します。

${SITE_RULES}

## 提案のしかた
- 根拠は必ず渡されたデータの数字で示す（例：「/sake は28日で表示820回、見積りボタンのクリック2回」）。データにないことを推測で断定しない
- 数字が少なくて判断できないときは、そう書く（無理に結論を出さない）。小さいサイトなので1件の増減に振り回されない
- 「何を・どこに・どう変えるか」まで具体的に。見出し案や追加するQ&Aの文案など、そのまま使える形で書く
- 優先順位は「問い合わせへの近さ × 直す手間の小ささ × データの確かさ」で付ける
- 上の「提供内容の事実」「表現ルール」に反する提案はしない
- 検索順位の改善は、表示回数が多く順位が5〜20位あたりの言葉を優先する
- AI対策は、AIに読まれている・AIから人が来ているページを優先し、AIが引用しやすい形（はっきりした答え、FAQ、比較表、具体的な数字や条件）を提案する`

const ADVICE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['summary', 'changes', 'actions', 'aio_actions', 'watch_next', 'caveats'],
  properties: {
    summary: { type: 'string', description: '今週の状況を3〜4文で' },
    changes: {
      type: 'array',
      description: '先週と比べた大きな変化（最大4つ）',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['point', 'evidence'],
        properties: { point: { type: 'string' }, evidence: { type: 'string' } },
      },
    },
    actions: {
      type: 'array',
      description: '問い合わせを増やすために直すべきこと。優先順に3〜5個',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['page', 'problem', 'evidence', 'changes', 'expected', 'effort'],
        properties: {
          page: { type: 'string', description: '対象ページのパス' },
          problem: { type: 'string', description: '何が問題か' },
          evidence: { type: 'string', description: '根拠になるデータの数字' },
          changes: {
            type: 'array',
            items: { type: 'string' },
            description: '具体的な直し方（文案があれば含める）',
          },
          expected: { type: 'string', description: '期待できる効果' },
          effort: { type: 'string', enum: ['小', '中', '大'] },
        },
      },
    },
    aio_actions: {
      type: 'array',
      description: 'AI検索（ChatGPT・Perplexity・GoogleのAIによる概要）に紹介されやすくする改善。0〜3個',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['page', 'change', 'evidence'],
        properties: {
          page: { type: 'string' },
          change: { type: 'string' },
          evidence: { type: 'string' },
        },
      },
    },
    watch_next: {
      type: 'array',
      items: { type: 'string' },
      description: '来週注目して見るべき数字（2〜3個）',
    },
    caveats: {
      type: 'array',
      items: { type: 'string' },
      description: 'データ不足など、判断の注意点',
    },
  },
} as const

type Advice = {
  summary: string
  changes: { point: string; evidence: string }[]
  actions: {
    page: string
    problem: string
    evidence: string
    changes: string[]
    expected: string
    effort: string
  }[]
  aio_actions: { page: string; change: string; evidence: string }[]
  watch_next: string[]
  caveats: string[]
}

// ---------- データ集め ----------

type Rows = { dims: string[]; values: number[] }[]
const toTable = (headers: string[], rows: Rows) => [
  headers,
  ...rows.map((r) => [...r.dims, ...r.values.map((v) => Math.round(v * 10) / 10)]),
]

async function gscQuery(token: string, start: string, end: string, dimensions: string[], rowLimit: number) {
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate: start, endDate: end, dimensions, rowLimit }),
    },
  )
  if (!response.ok) throw new Error(`GSC ${response.status} ${await response.text()}`)
  const data = (await response.json()) as {
    rows?: { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }[]
  }
  return (data.rows ?? []).map((r) => [
    ...(r.keys ?? []),
    r.impressions,
    r.clicks,
    Math.round(r.position * 10) / 10,
  ])
}

async function collectData(date: string) {
  const data: Record<string, unknown> = { 対象期間の最終日: date }
  const notes: string[] = []

  if (hasGoogleCredentials()) {
    try {
      const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/analytics.readonly'])
      const ga = (q: Parameters<typeof runGaReport>[2], end = date) => runGaReport(token, end, q)
      const summaryMetrics = ['activeUsers', 'newUsers', 'sessions', 'screenPageViews', 'engagedSessions', 'averageSessionDuration']
      const leadEvents = ['generate_lead', 'inquiry_form_start', 'cta_click', 'contact_click']
      const [
        week, prevWeek, month, channels, landings, landingLeads, pages, pageEvents, devices, countries,
        aiSources, aiLandings, ctas,
      ] = await Promise.all([
        ga({ metrics: summaryMetrics, days: 7 }),
        ga({ metrics: summaryMetrics, days: 7 }, shiftDate(date, -7)),
        ga({ metrics: summaryMetrics, days: 28 }),
        ga({ dimensions: ['sessionDefaultChannelGroup'], metrics: ['sessions', 'engagedSessions'], days: 28 }),
        ga({ dimensions: ['landingPage'], metrics: ['sessions', 'engagedSessions', 'averageSessionDuration'], days: 28, limit: 30 }),
        ga({ dimensions: ['landingPage', 'eventName'], metrics: ['eventCount'], eventNames: leadEvents, days: 28, limit: 60 }),
        ga({ dimensions: ['pagePath'], metrics: ['screenPageViews', 'userEngagementDuration'], days: 28, limit: 40 }),
        ga({ dimensions: ['pagePath', 'eventName'], metrics: ['eventCount'], eventNames: leadEvents, days: 28, limit: 80 }),
        ga({ dimensions: ['deviceCategory'], metrics: ['sessions', 'engagedSessions'], days: 28 }),
        ga({ dimensions: ['country'], metrics: ['sessions'], days: 28, limit: 8 }),
        ga({ dimensions: ['sessionSource'], metrics: ['sessions', 'engagedSessions'], aiOnly: true, days: 28 }),
        ga({ dimensions: ['sessionSource', 'landingPage'], metrics: ['sessions'], aiOnly: true, days: 28, limit: 20 }),
        ga({ dimensions: ['linkText', 'linkUrl', 'pagePath'], metrics: ['eventCount'], eventNames: ['cta_click', 'contact_click'], days: 28, limit: 30 }),
      ])
      const head = ['訪問者', '初めての人', '訪問', 'ページ表示', 'しっかり見た訪問', '平均滞在秒']
      data['アクセス概要'] = {
        直近7日: Object.fromEntries(head.map((h, i) => [h, Math.round(week[0]?.values[i] ?? 0)])),
        その前の7日: Object.fromEntries(head.map((h, i) => [h, Math.round(prevWeek[0]?.values[i] ?? 0)])),
        直近28日: Object.fromEntries(head.map((h, i) => [h, Math.round(month[0]?.values[i] ?? 0)])),
      }
      data['流入経路_28日'] = toTable(['経路', '訪問', 'しっかり見た'], channels)
      data['入口ページ_28日'] = toTable(['入口', '訪問', 'しっかり見た', '平均滞在秒'], landings)
      data['入口ページ別の行動_28日'] = toTable(['入口', '行動', '回数'], landingLeads)
      data['ページ別の表示と滞在_28日'] = toTable(['ページ', '表示', '合計滞在秒'], pages)
      data['ページ別の行動_28日'] = toTable(['ページ', '行動', '回数'], pageEvents)
      data['行動の意味'] = {
        generate_lead: '見積り・問い合わせの送信',
        inquiry_form_start: 'フォームに入力し始めた',
        cta_click: '見積り・相談ページへのボタンを押した',
        contact_click: 'メール・電話・LINEを押した',
      }
      data['押されたボタン_28日'] = toTable(['ボタン', '行き先', '押したページ', '回数'], ctas)
      data['端末_28日'] = toTable(['端末', '訪問', 'しっかり見た'], devices)
      data['国_28日'] = toTable(['国', '訪問'], countries)
      data['AIから来た訪問_28日'] = toTable(['AI', '訪問', 'しっかり見た'], aiSources)
      data['AIから入ったページ_28日'] = toTable(['AI', '入口', '訪問'], aiLandings)
    } catch (error) {
      notes.push(`GA4: ${String(error).slice(0, 200)}`)
    }

    try {
      const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/webmasters.readonly'])
      // Search Console は2〜3日遅れで確定するので、2日前までの28日間を見る
      const end = shiftDate(date, -2)
      const start = shiftDate(end, -27)
      const [queries, queryPages, gscPages] = await Promise.all([
        gscQuery(token, start, end, ['query'], 60),
        gscQuery(token, start, end, ['query', 'page'], 80),
        gscQuery(token, start, end, ['page'], 40),
      ])
      data['Google検索_期間'] = `${start}〜${end}`
      data['Google検索ワード_28日'] = [['検索ワード', '表示', 'クリック', '平均順位'], ...queries]
      data['Google検索ワードとページ_28日'] = [['検索ワード', 'ページ', '表示', 'クリック', '平均順位'], ...queryPages]
      data['Google検索のページ別_28日'] = [['ページ', '表示', 'クリック', '平均順位'], ...gscPages]
    } catch (error) {
      notes.push(`Search Console: ${String(error).slice(0, 200)}`)
    }
  }

  if (hasBotStore()) {
    try {
      const days = await readAiBotVisits(Array.from({ length: 28 }, (_, i) => shiftDate(date, -i)))
      const totals = new Map<string, number>()
      for (const v of days?.flat() ?? []) {
        const key = `${v.kind}\t${v.bot}\t${v.path}`
        totals.set(key, (totals.get(key) ?? 0) + v.count)
      }
      data['AIのプログラムが読みに来たページ_28日'] = [
        ['種類（answer=利用者の質問に答えるため / search=AI検索の収集 / training=学習用）', 'AI', 'ページ', '回数'],
        ...[...totals.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 60)
          .map(([key, count]) => [...key.split('\t'), count]),
      ]
    } catch (error) {
      notes.push(`AIクローラー記録: ${String(error).slice(0, 200)}`)
    }
  }

  try {
    const inquiries = await fetchInquiries(date, 28)
    if (inquiries) {
      // 個人情報（名前・メール・会社名）は渡さない
      data['問い合わせ_28日'] = inquiries.map((item) => {
        const c = item.context ?? {}
        return {
          日時: item.receivedAt,
          数量の区分: quantityBucket(item.order?.quantity ?? ''),
          用途: item.order?.purpose ?? '',
          フォーム: c.formType ?? '',
          送信ページ: c.submittedFrom ?? '',
          初回の入口: c.landingPage ?? '',
          初回の参照元: c.referrer ? (URL.canParse(c.referrer) ? new URL(c.referrer).hostname : c.referrer) : '直接/不明',
          AI経由: c.aiSource ?? '',
          訪問回数: c.visitCount ?? '',
          見たページ: (c.pageTrail ?? '').replace(/\d+\/\d+ \d+:\d+ /g, '').split('\n').slice(-15).join(' > '),
        }
      })
    }
  } catch (error) {
    notes.push(`問い合わせの控え: ${String(error).slice(0, 200)}`)
  }

  return { data, notes }
}

// ---------- Claude ----------

async function askClaude(data: Record<string, unknown>) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')
  const client = new Anthropic({ apiKey, timeout: 240_000, maxRetries: 1 })

  const stream = client.beta.messages.stream({
    model: ADVICE_MODEL,
    max_tokens: 32000,
    output_config: {
      effort: 'high',
      format: { type: 'json_schema', schema: ADVICE_SCHEMA as unknown as Record<string, unknown> },
    },
    // 安全判定で断られたときは、サーバー側で推奨モデルに自動で引き継ぐ
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `以下が masu.fomus.jp の直近のデータです（JSON）。これだけを根拠に、問い合わせを増やすための今週の改善提案を作ってください。\n\n${JSON.stringify(data)}`,
      },
    ],
  } as Parameters<typeof client.beta.messages.stream>[0])
  const message = await stream.finalMessage()

  if (message.stop_reason === 'refusal') throw new Error('Claude declined the request')
  if (message.stop_reason === 'max_tokens') throw new Error('Claude output was cut off (max_tokens)')
  const text = message.content.map((block) => (block.type === 'text' ? block.text : '')).join('')
  return {
    advice: JSON.parse(text) as Advice,
    usage: message.usage,
  }
}

// ---------- HTML ----------

const h2 = (title: string) =>
  `<h2 style="font-size:15px;margin:28px 0 8px;padding-bottom:4px;border-bottom:2px solid #7a5c2e;">${title}</h2>`

function renderAdvice(advice: Advice) {
  const p = (text: string) => `<p style="margin:6px 0;line-height:1.8;">${esc(text)}</p>`
  const small = (text: string) => `<div style="font-size:12px;color:#888;margin-top:4px;line-height:1.7;">${esc(text)}</div>`
  return [
    h2('今週のまとめ'),
    p(advice.summary),
    advice.changes.length ? h2('先週からの変化') : '',
    ...advice.changes.map((c) => `<div style="margin:10px 0;">${p(`・${c.point}`)}${small(c.evidence)}</div>`),
    h2('問い合わせを増やすために直すこと'),
    ...advice.actions.map(
      (a, i) => `<div style="margin:14px 0;padding:12px 14px;background:#faf7f2;border-radius:6px;">
<div style="font-weight:bold;font-size:15px;">${i + 1}. ${esc(a.page)}　<span style="font-weight:normal;font-size:12px;color:#7a5c2e;">手間：${esc(a.effort)}</span></div>
${p(a.problem)}
${small(`根拠：${a.evidence}`)}
<ul style="margin:8px 0;padding-left:20px;line-height:1.8;">${a.changes.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
${small(`期待できる効果：${a.expected}`)}
</div>`,
    ),
    advice.aio_actions.length ? h2('AI検索に紹介されやすくする') : '',
    ...advice.aio_actions.map((a) => `<div style="margin:10px 0;">${p(`・${a.page}：${a.change}`)}${small(`根拠：${a.evidence}`)}</div>`),
    h2('来週見る数字'),
    `<ul style="margin:6px 0;padding-left:20px;line-height:1.8;">${advice.watch_next.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>`,
    advice.caveats.length
      ? `<div style="margin-top:20px;font-size:12px;color:#888;line-height:1.7;">注意：${advice.caveats.map(esc).join(' / ')}</div>`
      : '',
  ].join('\n')
}

export async function buildWeeklyAdvice(date: string) {
  const { data, notes } = await collectData(date)
  const { advice, usage } = await askClaude(data)
  const start = shiftDate(date, -6)
  const subject = `【MASU-STORE 週次アドバイス】${start.slice(5).replace('-', '/')}〜${date.slice(5).replace('-', '/')}`
  const html = `<div style="font-family:-apple-system,'Hiragino Sans',sans-serif;max-width:680px;margin:0 auto;padding:20px;color:#222;">
<p style="font-size:12px;color:#888;margin:0;">masu.fomus.jp の直近7日・28日のデータを Claude が読んで作った改善案です。サイトに反映するときは、内容が事実と合っているか確認してから使ってください。</p>
${renderAdvice(advice)}
${notes.length ? `<div style="margin-top:20px;padding:12px;background:#fff8e1;font-size:12px;color:#795548;">取得できなかったデータ：${notes.map(esc).join('<br>')}</div>` : ''}
<p style="font-size:11px;color:#bbb;margin-top:24px;">${esc(ADVICE_MODEL)} / 入力 ${usage.input_tokens} tokens・出力 ${usage.output_tokens} tokens</p>
</div>`
  return { subject, html }
}
