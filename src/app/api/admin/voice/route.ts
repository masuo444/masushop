import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { isAuthorizedAdmin } from '@/lib/admin-auth'
import { toApprovedReview, VOICE_ID_PATTERN, VOICE_UNKNOWN_SIZE } from '@/lib/voice'
import {
  isBlobConfigured,
  listVoiceRecords,
  loadVoiceRecord,
  removeApprovedReview,
  saveApprovedReview,
  saveVoiceRecord,
} from '@/lib/voice-store'

export const dynamic = 'force-dynamic'

const noStore = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' }

// proxy.ts でも認証しているが、ルート側でも確かめる（proxy の設定漏れがあっても開かないように）
function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: noStore })
}

export async function GET(request: Request) {
  if (!isAuthorizedAdmin(request.headers.get('authorization'))) return unauthorized()

  try {
    const records = await listVoiceRecords()
    // editToken は管理画面でも使わないので返さない
    const items = records.map((r) => {
      const { editToken: _editToken, ...rest } = r
      void _editToken
      return rest
    })
    return NextResponse.json(
      { items, storage: isBlobConfigured() ? 'blob' : 'memory' },
      { headers: noStore },
    )
  } catch (error) {
    console.error('Admin voice list failed', error)
    return NextResponse.json(
      { error: '一覧を読み込めませんでした。' },
      { status: 500, headers: noStore },
    )
  }
}

function revalidateReviewPages(sizes: string[]) {
  revalidatePath('/')
  revalidatePath('/reviews')
  for (const size of sizes) {
    if (size !== VOICE_UNKNOWN_SIZE) revalidatePath(`/products/${size}`)
  }
}

export async function POST(request: Request) {
  if (!isAuthorizedAdmin(request.headers.get('authorization'))) return unauthorized()

  let id: string
  let action: string
  try {
    const body = (await request.json()) as Record<string, unknown>
    id = typeof body.id === 'string' ? body.id : ''
    action = typeof body.action === 'string' ? body.action : ''
  } catch {
    return NextResponse.json({ error: '形式が正しくありません。' }, { status: 400, headers: noStore })
  }

  if (!VOICE_ID_PATTERN.test(id) || !['approve', 'reject', 'unpublish'].includes(action)) {
    return NextResponse.json({ error: '形式が正しくありません。' }, { status: 400, headers: noStore })
  }

  const record = await loadVoiceRecord(id)
  if (!record) {
    return NextResponse.json({ error: '回答が見つかりません。' }, { status: 404, headers: noStore })
  }

  const now = new Date().toISOString()

  try {
    if (action === 'approve') {
      // 掲載への同意と、本人が確定した文章があるものだけを公開できる
      if (!record.consent || !record.finalText) {
        return NextResponse.json(
          { error: '掲載に同意した回答（送信済み）だけを承認できます。' },
          { status: 409, headers: noStore },
        )
      }
      await saveApprovedReview(toApprovedReview(record))
      record.status = 'approved'
    } else {
      await removeApprovedReview(id)
      record.status = action === 'reject' ? 'rejected' : 'unpublished'
    }

    record.reviewedAt = now
    record.updatedAt = now
    await saveVoiceRecord(record)
  } catch (error) {
    console.error('Admin voice action failed', id, action, error)
    return NextResponse.json(
      { error: '更新できませんでした。時間をおいてもう一度お試しください。' },
      { status: 500, headers: noStore },
    )
  }

  revalidateReviewPages(record.answers.sizes)

  const { editToken: _editToken, ...item } = record
  void _editToken
  return NextResponse.json({ item }, { headers: noStore })
}
