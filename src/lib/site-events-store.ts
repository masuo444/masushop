import type { SiteEvent } from '@/lib/site-events'

/**
 * 自前の行動記録の保存と読み出し（サーバー専用）。
 * キー: ev:YYYY-MM-DD（日本時間）／フィールド: "行動\tパス\tラベル\t流入元"／値: 回数。120日で消える。
 */

const RETENTION_SEC = 120 * 24 * 60 * 60

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url, token } : null
}

export function hasEventStore() {
  return Boolean(redisConfig())
}

async function pipeline(commands: (string | number)[][]) {
  const config = redisConfig()
  if (!config) return null
  const response = await fetch(`${config.url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`Redis ${response.status} ${await response.text()}`)
  return (await response.json()) as { result: unknown }[]
}

const keyFor = (date: string) => `ev:${date}`

export function jstToday() {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

export async function recordSiteEvent(e: { event: SiteEvent; path: string; label: string; segment: string }) {
  const key = keyFor(jstToday())
  await pipeline([
    ['HINCRBY', key, [e.event, e.path, e.label, e.segment].join('\t'), 1],
    ['EXPIRE', key, RETENTION_SEC],
  ])
}

export type SiteEventRow = { event: SiteEvent; path: string; label: string; segment: string; count: number }

/** 指定した日付（日本時間 YYYY-MM-DD）の記録を、日付ごとに返す */
export async function readSiteEvents(dates: string[]) {
  const results = await pipeline(dates.map((date) => ['HGETALL', keyFor(date)]))
  if (!results) return null
  return results.map((entry) => {
    const flat = (entry.result as string[] | null) ?? []
    const rows: SiteEventRow[] = []
    for (let i = 0; i < flat.length; i += 2) {
      const [event, path, label, segment] = flat[i].split('\t')
      rows.push({ event: event as SiteEvent, path, label: label ?? '', segment: segment ?? '', count: Number(flat[i + 1]) })
    }
    return rows
  })
}

/** 流入元を大分類にする（ai:ChatGPT → ai） */
export const segmentGroup = (segment: string) => (segment.startsWith('ai:') ? 'ai' : segment)
