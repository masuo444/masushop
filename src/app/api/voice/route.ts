import { randomBytes, randomUUID, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { masuSizes } from '@/lib/masu-data'
import {
  prefectures,
  VOICE_UNKNOWN_SIZE,
  voiceAttributes,
  voiceGoodPoints,
  voiceProcessings,
  voicePurposes,
  type VoiceAnswers,
  type VoiceRecord,
} from '@/lib/voice'
import { generateVoiceDraft } from '@/lib/voice-draft'
import { notifyAdminOfVoice } from '@/lib/voice-notify'
import { loadVoiceRecord, saveVoiceRecord } from '@/lib/voice-store'

/** これより大きいリクエストは読まない（アンケートの回答が20KBを超えることはない） */
const MAX_BODY_BYTES = 20_000

class VoiceValidationError extends Error {}

function readText(
  body: Record<string, unknown>,
  keys: string[],
  maxLength: number,
) {
  const value = keys
    .map((key) => body[key])
    .find(
      (candidate) =>
        candidate != null &&
        (typeof candidate !== 'string' || candidate.trim().length > 0),
    )

  if (value == null) return ''
  if (typeof value !== 'string') {
    throw new VoiceValidationError('入力内容の形式が正しくありません。')
  }

  const normalized = value.trim()
  if (normalized.length > maxLength) {
    throw new VoiceValidationError('入力内容が長すぎます。')
  }

  return normalized
}

/** 決まった選択肢の中から1つ。選択肢にない値は受け付けない */
function readChoice(
  body: Record<string, unknown>,
  key: string,
  choices: readonly string[],
) {
  const value = readText(body, [key], 100)
  if (value && !choices.includes(value)) {
    throw new VoiceValidationError('選択肢にない値が送られました。')
  }
  return value
}

/** 決まった選択肢の中から複数。重複は除く */
function readChoices(
  body: Record<string, unknown>,
  key: string,
  choices: readonly string[],
) {
  const value = body[key]
  if (value == null) return []
  if (!Array.isArray(value) || value.length > choices.length) {
    throw new VoiceValidationError('入力内容の形式が正しくありません。')
  }
  const picked = new Set<string>()
  for (const item of value) {
    if (typeof item !== 'string' || !choices.includes(item)) {
      throw new VoiceValidationError('選択肢にない値が送られました。')
    }
    picked.add(item)
  }
  // 選択肢の並び順にそろえる
  return choices.filter((c) => picked.has(c))
}

/** 1行の短い文字列（件名などに入るので改行を消す） */
function oneLine(value: string) {
  return value.replace(/[\r\n\t]+/g, ' ').trim()
}

async function readBody(request: Request) {
  const declared = Number(request.headers.get('content-length') || 0)
  if (declared > MAX_BODY_BYTES) {
    throw new VoiceValidationError('送信内容が大きすぎます。')
  }
  const raw = await request.text()
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    throw new VoiceValidationError('送信内容が大きすぎます。')
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new VoiceValidationError('入力内容の形式が正しくありません。')
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new VoiceValidationError('入力内容の形式が正しくありません。')
  }
  return parsed as Record<string, unknown>
}

const sizeChoices = [...masuSizes.map((m) => m.id), VOICE_UNKNOWN_SIZE]

function parseAnswers(values: Record<string, unknown>): VoiceAnswers {
  const rating = values.rating
  if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new VoiceValidationError('総合満足度を選んでください。')
  }

  let sizes = readChoices(values, 'sizes', sizeChoices)
  // 「わからない」と具体的なサイズが両方選ばれていたら、具体的なサイズを優先する
  if (sizes.length > 1) sizes = sizes.filter((s) => s !== VOICE_UNKNOWN_SIZE)

  return {
    sizes,
    purpose: readChoice(values, 'purpose', voicePurposes),
    processing: readChoice(values, 'processing', voiceProcessings),
    rating,
    goodPoints: readChoices(values, 'goodPoints', voiceGoodPoints),
    concerns: readText(values, ['concerns'], 1_000),
    comment: readText(values, ['comment'], 1_000),
    displayName: oneLine(readText(values, ['displayName'], 30)) || '匿名',
    attribute: readChoice(values, 'attribute', voiceAttributes),
    prefecture: readChoice(values, 'prefecture', prefectures),
  }
}

function readEmail(values: Record<string, unknown>) {
  const email = readText(values, ['email'], 320)
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new VoiceValidationError('メールアドレスの形式が正しくありません。')
  }
  return email
}

function readRef(values: Record<string, unknown>) {
  const ref = readText(values, ['ref'], 60)
  return ref.replace(/[^A-Za-z0-9_.-]/g, '').slice(0, 60)
}

function newVoiceId(now: Date) {
  const yyyy = now.getUTCFullYear()
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `${yyyy}${mm}-${randomUUID().replaceAll('-', '').slice(0, 12)}`
}

// ===== 軽い連投対策 =====
// 同じ接続元からの AI 下書きは短時間に数回まで。超えた分は型どおりの下書きにする（受付は止めない）。
// サーバーのインスタンスごとの数え方なので厳密ではないが、API 費用の暴走を防ぐには十分。
const AI_WINDOW_MS = 10 * 60 * 1000
const AI_MAX_PER_WINDOW = 5
const aiUsage = new Map<string, number[]>()

function allowAiDraft(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  const now = Date.now()
  const recent = (aiUsage.get(ip) ?? []).filter((t) => now - t < AI_WINDOW_MS)
  if (recent.length >= AI_MAX_PER_WINDOW) {
    aiUsage.set(ip, recent)
    return false
  }
  recent.push(now)
  aiUsage.set(ip, recent)
  if (aiUsage.size > 5_000) aiUsage.clear()
  return true
}

function badRequest(error: unknown, context: string) {
  if (error instanceof VoiceValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  console.error(context, error)
  return NextResponse.json(
    { error: '入力内容を確認できませんでした。もう一度お試しください。' },
    { status: 400 },
  )
}

/** アンケートの回答を受け取り、口コミの下書きを返す */
export async function POST(request: Request) {
  let values: Record<string, unknown>
  let answers: VoiceAnswers
  let email: string
  let ref: string

  try {
    values = await readBody(request)
    answers = parseAnswers(values)
    email = readEmail(values)
    ref = readRef(values)
  } catch (error) {
    return badRequest(error, 'Voice survey parse error')
  }

  // 人には見えない入力欄（honeypot）が埋まっていたら機械的な送信とみなし、保存も通知もしない。
  // 相手に判別されないよう、見た目は通常と同じ応答を返す。
  if (readText(values, ['website'], 500)) {
    const { draft } = await generateVoiceDraft(answers, { allowAi: false })
    return NextResponse.json({
      id: newVoiceId(new Date()),
      editToken: randomBytes(24).toString('base64url'),
      draft,
      stored: true,
    })
  }

  const { draft, source } = await generateVoiceDraft(answers, {
    allowAi: allowAiDraft(request),
  })

  const now = new Date()
  const record: VoiceRecord = {
    id: newVoiceId(now),
    editToken: randomBytes(24).toString('base64url'),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    status: 'draft',
    ref,
    answers,
    email,
    draft,
    draftSource: source,
    finalText: '',
    consent: false,
    submittedAt: null,
    reviewedAt: null,
  }

  // 保存できなくても下書きは返す（お客様の手間を無駄にしない）。失敗はログに残す。
  let stored = true
  try {
    const where = await saveVoiceRecord(record)
    if (where === 'memory') {
      console.warn('Voice record kept in memory only (Blob is not configured)', record.id)
    }
  } catch (error) {
    stored = false
    console.error('Voice record could not be saved', record.id, error)
  }

  await notifyAdminOfVoice(record, 'received')

  return NextResponse.json({
    id: record.id,
    editToken: record.editToken,
    draft,
    stored,
  })
}

function tokenMatches(given: string, expected: string) {
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

/** お客様が書き直した最終の文章と、サイト掲載の同意を受け取る */
export async function PATCH(request: Request) {
  let id: string
  let editToken: string
  let finalText: string
  let consent: boolean

  try {
    const values = await readBody(request)
    id = readText(values, ['id'], 40)
    editToken = readText(values, ['editToken'], 100)
    finalText = readText(values, ['finalText'], 2_000)
    if (typeof values.consent !== 'boolean') {
      throw new VoiceValidationError('入力内容の形式が正しくありません。')
    }
    consent = values.consent
    if (!id || !editToken) {
      throw new VoiceValidationError('受付番号が確認できませんでした。')
    }
    if (!finalText) {
      throw new VoiceValidationError('感想の文章が空になっています。')
    }
  } catch (error) {
    return badRequest(error, 'Voice survey update parse error')
  }

  let record: VoiceRecord | null
  try {
    record = await loadVoiceRecord(id)
  } catch (error) {
    console.error('Voice record could not be loaded', id, error)
    return NextResponse.json(
      { error: '一時的に保存できませんでした。時間をおいてもう一度お試しください。' },
      { status: 503 },
    )
  }

  if (!record || !tokenMatches(editToken, record.editToken)) {
    return NextResponse.json(
      { error: '受付内容が見つかりませんでした。お手数ですが最初からご回答ください。' },
      { status: 404 },
    )
  }

  if (record.status !== 'draft' && record.status !== 'submitted') {
    return NextResponse.json(
      { error: 'この回答はすでに確認済みのため変更できません。' },
      { status: 409 },
    )
  }

  const now = new Date().toISOString()
  record.finalText = finalText
  record.consent = consent
  record.status = 'submitted'
  record.submittedAt = now
  record.updatedAt = now

  try {
    await saveVoiceRecord(record)
  } catch (error) {
    console.error('Voice record update failed', id, error)
    return NextResponse.json(
      { error: '一時的に保存できませんでした。時間をおいてもう一度お試しください。' },
      { status: 503 },
    )
  }

  if (consent) await notifyAdminOfVoice(record, 'consented')

  return NextResponse.json({ success: true })
}
