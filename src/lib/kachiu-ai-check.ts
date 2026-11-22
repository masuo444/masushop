import Anthropic from '@anthropic-ai/sdk'

/**
 * KACHIU（kachiu.jp）が AI の答えに出てくるかを毎週しらべる。
 * 人がAIに聞きそうな質問を Claude（ウェブ検索つき）に投げ、答えに KACHIU の名前が出るか・kachiu.jp を出典にしたかを記録する。
 * 1回あたり 10問 × 検索最大3回。費用の目安は1回100円前後（Opus 5.5・検索 $10/1000回）。
 * 枡の質問は入れない（枡は MASU-STORE で扱う方針・2026-11-22）。
 */

export const AI_CHECK_MODEL = 'claude-opus-5-5'

export const AI_CHECK_QUESTIONS = [
  '石和温泉のお土産でおすすめは？',
  '山梨のお土産で、ジャムのおすすめを教えて',
  '山梨の桃を使ったジャムやコンフィチュールでおすすめは？',
  '桃とワインを使ったジャムはありますか？',
  '笛吹市のお土産でおすすめは？',
  '山梨から贈るお歳暮で、おしゃれな食べ物のギフトは？',
  '甲州ワインを使ったお菓子やジャムを知りたい',
  '徒歩鵜（かちう）とは何ですか？',
  '山梨県のお土産の定番は？',
  '石和温泉で買えるお土産の定番は？',
  'KACHIU（かちう）というブランドについて教えて',
]

const BRAND = /KACHIU|かちう|カチウ|kachiu\.jp/i

export type AiCheckRow = {
  question: string
  mentioned: boolean
  cited: boolean
  sources: string[]
  excerpt: string
  error?: string
}

const SYSTEM = [
  'あなたは一般の人の質問に答えるAIアシスタントです。',
  '必ずウェブ検索で調べてから、日本語で200〜400字ほどで答えてください。',
  'おすすめを聞かれたら、具体的な商品名・ブランド名・店名を挙げてください。',
].join('\n')

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

async function ask(client: Anthropic, question: string): Promise<AiCheckRow> {
  const messages: Anthropic.Beta.BetaMessageParam[] = [{ role: 'user', content: question }]
  const sources = new Set<string>()
  let text = ''
  let cited = false
  // サーバー側ツールは長くなると pause_turn で一度止まるので、続きを頼む（最大3回）
  for (let turn = 0; turn < 3; turn++) {
    const message = await client.beta.messages.create({
      model: AI_CHECK_MODEL,
      max_tokens: 16000,
      output_config: { effort: 'low' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: SYSTEM,
      tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: 3, user_location: { type: 'approximate', country: 'JP' } }],
      messages,
    } as Parameters<typeof client.beta.messages.create>[0] & { stream?: false })
    for (const block of message.content) {
      if (block.type === 'web_search_tool_result' && Array.isArray(block.content)) {
        for (const r of block.content) if (r.type === 'web_search_result') sources.add(host(r.url))
      }
      if (block.type === 'text') {
        text += block.text
        for (const c of block.citations ?? []) {
          if ('url' in c && typeof c.url === 'string' && host(c.url).endsWith('kachiu.jp')) cited = true
        }
      }
    }
    if (message.stop_reason === 'refusal') throw new Error('declined')
    if (message.stop_reason !== 'pause_turn') break
    messages.push({ role: 'assistant', content: message.content })
  }
  const mentioned = BRAND.test(text)
  const at = text.search(BRAND)
  const excerpt = (at >= 0 ? text.slice(Math.max(0, at - 60), at + 120) : text.slice(0, 160)).replace(/\s+/g, ' ').trim()
  return { question, mentioned, cited, sources: [...sources].slice(0, 8), excerpt }
}

export async function runKachiuAiCheck(): Promise<AiCheckRow[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')
  const client = new Anthropic({ apiKey, timeout: 200_000, maxRetries: 1 })
  return Promise.all(
    AI_CHECK_QUESTIONS.map((q) =>
      ask(client, q).catch((e) => ({ question: q, mentioned: false, cited: false, sources: [], excerpt: '', error: String(e).slice(0, 120) })),
    ),
  )
}

const esc = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

export function buildAiCheckEmail(date: string, rows: AiCheckRow[]) {
  const ok = rows.filter((r) => !r.error)
  const mentioned = ok.filter((r) => r.mentioned).length
  const cited = ok.filter((r) => r.cited).length
  const domains = new Map<string, number>()
  for (const r of ok) for (const d of r.sources) domains.set(d, (domains.get(d) ?? 0) + 1)
  const top = [...domains.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12)
  const td = 'style="padding:6px 8px;border-bottom:1px solid #eee;vertical-align:top;font-size:13px;"'
  const subject = `【KACHIU AIでの見え方】${date}　${ok.length}問中 名前が出た ${mentioned}・kachiu.jpを出典に ${cited}`
  const html = `<div style="font-family:-apple-system,'Hiragino Sans',sans-serif;max-width:720px;margin:0 auto;color:#222;line-height:1.6;">
<h1 style="font-size:18px;margin:0 0 4px;">KACHIU AIでの見え方（${esc(date)}）</h1>
<p style="font-size:13px;color:#555;">人がAIに聞きそうな${rows.length}問を、ウェブ検索つきのAI（Claude）に毎週聞いて、答えにKACHIUが出るかを見ています。ChatGPTやPerplexityも、似た検索結果をもとに答えます。</p>
<p style="font-size:15px;"><b>名前が出た：${mentioned} / ${ok.length}問</b>　kachiu.jp を出典にした：${cited}問</p>
<table style="border-collapse:collapse;width:100%;">
<tr><th ${td}>質問</th><th ${td}>KACHIU</th><th ${td}>答えの一部</th></tr>
${rows.map((r) => `<tr><td ${td}>${esc(r.question)}</td><td ${td}>${r.error ? 'エラー' : r.mentioned ? (r.cited ? '◎ 出典つき' : '○ 名前のみ') : '—'}</td><td ${td}>${esc(r.error ?? r.excerpt)}</td></tr>`).join('\n')}
</table>
<h2 style="font-size:15px;margin-top:24px;">AIが参考にしたサイト（多い順）</h2>
<p style="font-size:12px;color:#666;">ここに KACHIU が載ると、AIの答えに出やすくなります。</p>
<table style="border-collapse:collapse;">${top.map(([d, n]) => `<tr><td ${td}>${esc(d)}</td><td ${td}>${n}問</td></tr>`).join('')}</table>
<p style="font-size:11px;color:#aaa;margin-top:32px;">MASU-STORE の仕組み（/api/cron/kachiu-ai-check）から毎週月曜に送られています。</p>
</div>`
  return { subject, html }
}
