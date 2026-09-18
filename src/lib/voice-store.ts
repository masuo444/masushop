/**
 * アンケート回答の保存先（Vercel Blob・private）。サーバー専用。
 *
 * Blob が使えない環境（ローカル開発で BLOB_READ_WRITE_TOKEN が無い等）でも
 * 画面の流れを確認できるよう、そのときはプロセス内のメモリに置く。
 * メモリの内容は再起動で消えるので、本番では必ず Blob を設定すること。
 */
import { del, get, list, put } from '@vercel/blob'
import {
  approvedPathname,
  voicePathname,
  type ApprovedReview,
  type VoiceRecord,
} from '@/lib/voice'

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID)
}

// ルートごとにモジュールが別々に読み込まれても同じ置き場を共有するよう globalThis に置く
const globalForVoice = globalThis as typeof globalThis & {
  __voiceMemoryStore?: Map<string, string>
}
const memoryStore = (globalForVoice.__voiceMemoryStore ??= new Map<string, string>())

async function writeJson(pathname: string, data: unknown) {
  const body = JSON.stringify(data, null, 2)
  if (!isBlobConfigured()) {
    memoryStore.set(pathname, body)
    return 'memory' as const
  }
  await put(pathname, body, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json; charset=utf-8',
  })
  return 'blob' as const
}

async function readJson<T>(pathname: string): Promise<T | null> {
  if (!isBlobConfigured()) {
    const body = memoryStore.get(pathname)
    return body ? (JSON.parse(body) as T) : null
  }
  // 管理画面で更新した直後の内容を読むため、CDNキャッシュを通さない
  const result = await get(pathname, { access: 'private', useCache: false })
  if (!result || result.statusCode !== 200 || !result.stream) return null
  const text = await new Response(result.stream).text()
  return JSON.parse(text) as T
}

async function listPathnames(prefix: string) {
  if (!isBlobConfigured()) {
    return [...memoryStore.keys()].filter((key) => key.startsWith(prefix))
  }
  const pathnames: string[] = []
  let cursor: string | undefined
  do {
    const page = await list({ prefix, cursor, limit: 1000 })
    pathnames.push(...page.blobs.map((b) => b.pathname))
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)
  return pathnames
}

async function removeJson(pathname: string) {
  if (!isBlobConfigured()) {
    memoryStore.delete(pathname)
    return
  }
  await del(pathname)
}

export async function saveVoiceRecord(record: VoiceRecord) {
  const pathname = voicePathname(record.id)
  if (!pathname) throw new Error(`Invalid voice id: ${record.id}`)
  return writeJson(pathname, record)
}

export async function loadVoiceRecord(id: string) {
  const pathname = voicePathname(id)
  if (!pathname) return null
  return readJson<VoiceRecord>(pathname)
}

export async function listVoiceRecords() {
  const pathnames = await listPathnames('voice/')
  const records = await Promise.all(
    pathnames
      .filter((p) => p.endsWith('.json'))
      .map(async (p) => {
        try {
          return await readJson<VoiceRecord>(p)
        } catch (error) {
          console.error('Voice record read failed', p, error)
          return null
        }
      }),
  )
  return records
    .filter((r): r is VoiceRecord => r !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function saveApprovedReview(review: ApprovedReview) {
  return writeJson(approvedPathname(review.id), review)
}

export async function removeApprovedReview(id: string) {
  return removeJson(approvedPathname(id))
}

export async function listApprovedReviewRecords() {
  const pathnames = await listPathnames('reviews/approved/')
  const reviews = await Promise.all(
    pathnames
      .filter((p) => p.endsWith('.json'))
      .map(async (p) => {
        try {
          return await readJson<ApprovedReview>(p)
        } catch (error) {
          console.error('Approved review read failed', p, error)
          return null
        }
      }),
  )
  return reviews.filter((r): r is ApprovedReview => r !== null)
}

/**
 * AI下書きの利用回数の上限（費用の上限）。
 * 1日・1か月の回数を Blob に記録し、上限を超えたらAIを使わずテンプレの下書きにする。
 * 記録に失敗したときも費用が膨らまないよう、AIは使わない側に倒す。
 * voice/ の外に置くのは、回答一覧（voice/ 配下を全件読む）に混ざらないようにするため。
 */
type AiUsage = { month: string; total: number; days: Record<string, number> }

function readLimit(name: string, fallback: number) {
  const value = Number(process.env[name])
  return Number.isFinite(value) && value >= 0 ? Math.floor(value) : fallback
}

export const VOICE_AI_DAILY_LIMIT = readLimit('VOICE_AI_DAILY_LIMIT', 20)
export const VOICE_AI_MONTHLY_LIMIT = readLimit('VOICE_AI_MONTHLY_LIMIT', 200)

export async function reserveAiDraftQuota(now = new Date()) {
  // 日付の区切りは日本時間
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString()
  const month = jst.slice(0, 7)
  const day = jst.slice(8, 10)
  const pathname = `usage/voice-ai-${month}.json`
  try {
    const usage = (await readJson<AiUsage>(pathname)) ?? { month, total: 0, days: {} }
    const today = usage.days[day] ?? 0
    if (usage.total >= VOICE_AI_MONTHLY_LIMIT || today >= VOICE_AI_DAILY_LIMIT) return false
    usage.total += 1
    usage.days[day] = today + 1
    await writeJson(pathname, usage)
    return true
  } catch (error) {
    console.error('Voice AI quota check failed', error)
    return false
  }
}
