/**
 * 連続送信・総当たりの対策。Upstash Redis（AIクローラー記録と同じ置き場）で回数を数える。
 * 置き場が使えないときは止めない（本物のお客様の問い合わせを落とさないことを優先する）。
 */

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url, token } : null
}

export function clientIp(headers: Headers) {
  return (
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

/**
 * key の回数を1増やし、windowSec 秒のうちに limit 回を超えたら false を返す。
 * peek: true なら増やさずに今の回数だけ見る（失敗した回だけ数えたいとき用）。
 */
export async function withinLimit(
  key: string,
  limit: number,
  windowSec: number,
  options: { peek?: boolean } = {},
) {
  const config = redisConfig()
  if (!config) return true
  const redisKey = `rl:${key}`
  const commands = options.peek
    ? [['GET', redisKey]]
    : [
        ['INCR', redisKey],
        ['EXPIRE', redisKey, windowSec, 'NX'],
      ]
  try {
    const response = await fetch(`${config.url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(commands),
      cache: 'no-store',
    })
    if (!response.ok) return true
    const [first] = (await response.json()) as { result: unknown }[]
    const count = Number(first?.result ?? 0)
    return options.peek ? count < limit : count <= limit
  } catch {
    return true
  }
}
