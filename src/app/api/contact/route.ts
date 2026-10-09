import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import siteConfig from '@/lib/site-config'
import { masuSizes } from '@/lib/masu-data'
import { quantityBucket, isHighValue } from '@/lib/conversion'
import { detectAiSource } from '@/lib/ai-sources'
import { clientIp, withinLimit } from '@/lib/rate-limit'

type DeliveryStatus = 'pending' | 'sent' | 'failed' | 'not_configured' | 'skipped_limit'

type ContactSubmission = {
  id: string
  receivedAt: string
  source: 'masu.fomus.jp'
  status: 'received' | 'completed' | 'email_failed' | 'email_not_configured'
  contact: {
    name: string
    email: string
    company: string
    phone: string
  }
  order: {
    size: string
    quantity: string
    purpose: string
    printMethod: string
    printContent: string
    desiredDelivery: string
    notes: string
  }
  delivery: {
    admin: DeliveryStatus
    customer: DeliveryStatus
  }
  /** どこから来た問い合わせかを後から分析するための計測情報 */
  context: {
    formType: string
    submittedFrom: string
    landingPage: string
    referrer: string
    utmSource: string
    utmMedium: string
    utmCampaign: string
    firstVisitAt: string
    lastLandingPage: string
    lastReferrer: string
    lastVisitAt: string
    visitCount: string
    pageTrail: string
    visitDurationSec: string
    screenSize: string
    language: string
    device: string
    location: string
    aiSource: string
  }
}

/** サイズIDを日本語名に直す（管理メールに 'ichigo' と出さないため） */
function resolveSizeLabel(raw: string) {
  if (!raw) return ''
  const match = masuSizes.find((m) => m.id === raw || m.name === raw)
  return match ? match.name : raw
}

/** ISO日時を管理メール向けの日本時間表記にする */
function formatJst(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
}

/** 秒数を「12分30秒」の形にする */
function formatDuration(raw: string) {
  const sec = Number(raw)
  if (!Number.isFinite(sec) || sec < 0) return raw
  return sec >= 60 ? `${Math.floor(sec / 60)}分${sec % 60}秒` : `${sec}秒`
}

/** 初回訪問から問い合わせまでの経過を「当日」「3日」のように返す */
function daysBetween(fromIso: string, toIso: string) {
  const ms = new Date(toIso).getTime() - new Date(fromIso).getTime()
  if (Number.isNaN(ms)) return '不明'
  const days = Math.floor(ms / (24 * 60 * 60 * 1000))
  return days < 1 ? '当日' : `${days}日`
}

/** User-Agent を「iPhone / Safari」のような管理メール向けの短い表記にする */
function describeDevice(ua: string) {
  if (!ua) return ''
  const os =
    /iPhone/.test(ua) ? 'iPhone'
    : /iPad/.test(ua) ? 'iPad'
    : /Android/.test(ua) ? (/Mobile/.test(ua) ? 'Androidスマホ' : 'Androidタブレット')
    : /Windows/.test(ua) ? 'Windows'
    : /Macintosh/.test(ua) ? 'Mac'
    : 'その他'
  const browser =
    /Line\//.test(ua) ? 'LINE内ブラウザ'
    : /Instagram/.test(ua) ? 'Instagram内ブラウザ'
    : /FBAN|FBAV/.test(ua) ? 'Facebook内ブラウザ'
    : /Edg\//.test(ua) ? 'Edge'
    : /CriOS|Chrome\//.test(ua) ? 'Chrome'
    : /Safari\//.test(ua) ? 'Safari'
    : /Firefox\//.test(ua) ? 'Firefox'
    : 'その他'
  return `${os} / ${browser}`
}

/** Vercel が付けるおおよその地域（IPから推定。市区町村は外れることがある） */
function describeLocation(headers: Headers) {
  const decode = (value: string | null) => {
    if (!value) return ''
    try {
      return decodeURIComponent(value)
    } catch {
      return value
    }
  }
  return [headers.get('x-vercel-ip-country'), decode(headers.get('x-vercel-ip-country-region')), decode(headers.get('x-vercel-ip-city'))]
    .filter(Boolean)
    .join(' / ')
}

class ContactValidationError extends Error {}

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
    throw new ContactValidationError('入力内容の形式が正しくありません。')
  }

  const normalized = value.trim()
  if (normalized.length > maxLength) {
    throw new ContactValidationError('入力内容が長すぎます。')
  }

  return normalized
}

function parseSubmission(body: unknown, headers: Headers): ContactSubmission {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new ContactValidationError('入力内容の形式が正しくありません。')
  }

  const values = body as Record<string, unknown>
  const name = readText(values, ['name'], 200)
  const email = readText(values, ['email'], 320)
  const quantity = readText(values, ['quantity'], 100)

  if (!name || !email || !quantity) {
    throw new ContactValidationError('必須項目を入力してください。')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new ContactValidationError('メールアドレスの形式が正しくありません。')
  }

  return {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    source: 'masu.fomus.jp',
    status: 'received',
    contact: {
      name,
      email,
      company: readText(values, ['company', 'companyName'], 300),
      phone: readText(values, ['phone'], 100),
    },
    order: {
      size: resolveSizeLabel(readText(values, ['size', 'masuSize'], 200)),
      quantity,
      purpose: readText(values, ['purpose'], 500),
      printMethod: readText(values, ['printMethod'], 200),
      printContent: readText(values, ['printContent'], 2_000),
      desiredDelivery: readText(values, ['deadline', 'desiredDelivery'], 500),
      notes: readText(values, ['notes'], 10_000),
    },
    delivery: {
      admin: 'pending',
      customer: 'pending',
    },
    context: {
      formType: readText(values, ['formType'], 60) || 'custom',
      submittedFrom: readText(values, ['submittedFrom'], 500),
      landingPage: readText(values, ['landingPage'], 500),
      referrer: readText(values, ['referrer'], 500),
      utmSource: readText(values, ['utmSource'], 200),
      utmMedium: readText(values, ['utmMedium'], 200),
      utmCampaign: readText(values, ['utmCampaign'], 200),
      firstVisitAt: readText(values, ['firstVisitAt'], 60),
      lastLandingPage: readText(values, ['lastLandingPage'], 500),
      lastReferrer: readText(values, ['lastReferrer'], 500),
      lastVisitAt: readText(values, ['lastVisitAt'], 60),
      visitCount: readText(values, ['visitCount'], 10),
      pageTrail: readText(values, ['pageTrail'], 5_000),
      visitDurationSec: readText(values, ['visitDurationSec'], 10),
      screenSize: readText(values, ['screenSize'], 20),
      language: readText(values, ['language'], 20),
      device: describeDevice(headers.get('user-agent') || ''),
      location: describeLocation(headers),
      aiSource: '',
    },
  }
}

function backupPath(submission: ContactSubmission) {
  const date = submission.receivedAt.slice(0, 10).replaceAll('-', '/')
  return `contact-submissions/${date}/${submission.receivedAt}-${submission.id}.json`
}

async function saveBackup(pathname: string, submission: ContactSubmission) {
  await put(pathname, JSON.stringify(submission, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json; charset=utf-8',
  })
}

async function updateBackup(pathname: string, submission: ContactSubmission) {
  try {
    await saveBackup(pathname, submission)
  } catch (error) {
    // The initial receipt remains available even if a later status update fails.
    console.error('Contact backup status update failed', submission.id, error)
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

async function sendEmail(
  apiKey: string,
  payload: { from: string; to: string; subject: string; html: string },
) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const detail = await response.text()
    console.error('Resend API error', response.status, detail)
    throw new Error(`Resend rejected the email with status ${response.status}`)
  }
}

// 問い合わせ1件の本文はせいぜい数KB。これを大きく超えるものは読まずに断る
const MAX_BODY_BYTES = 50_000
// 同じ接続元からの送信は、10分に5件・1日に20件まで
const PER_IP_LIMITS = [
  { window: 10 * 60, limit: 5 },
  { window: 24 * 60 * 60, limit: 20 },
]
// お客様への自動返信は、サイト全体で1日50通まで（他人のアドレス宛てに大量送信される悪用を防ぐ）
const AUTO_REPLY_DAILY_LIMIT = 50

export async function POST(request: Request) {
  let submission: ContactSubmission

  if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: '送信内容が大きすぎます。' }, { status: 413 })
  }

  const ip = clientIp(request.headers)
  for (const { window, limit } of PER_IP_LIMITS) {
    if (!(await withinLimit(`contact:${window}:${ip}`, limit, window))) {
      console.warn('Contact rate limit exceeded', { window })
      return NextResponse.json(
        {
          error:
            '短時間に送信が集中したため、受付を一時停止しています。お手数ですが時間をおいて再度お試しいただくか、contact@fomus.jpへ直接ご連絡ください。',
        },
        { status: 429 },
      )
    }
  }

  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: '送信内容が大きすぎます。' }, { status: 413 })
    }
    submission = parseSubmission(JSON.parse(raw), request.headers)
  } catch (error) {
    if (error instanceof ContactValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error('Contact form parse error', error)
    return NextResponse.json(
      { error: '入力内容を確認できませんでした。もう一度お試しください。' },
      { status: 400 },
    )
  }

  const { context } = submission
  context.aiSource = detectAiSource(
    context.referrer,
    context.utmSource,
    context.landingPage,
    context.lastReferrer,
    context.lastLandingPage,
  )

  const pathname = backupPath(submission)

  // Save first: a successful response is never returned without a durable copy.
  // If the backup store is unavailable we still attempt the notification emails —
  // a delivered email is itself a durable copy, and losing an inquiry is worse.
  let backupSaved = true
  try {
    await saveBackup(pathname, submission)
  } catch (error) {
    backupSaved = false
    console.error('Contact backup creation failed', submission.id, error)
  }

  const persist = async () => {
    if (!backupSaved) return
    await updateBackup(pathname, submission)
  }

  const adminEmail = siteConfig.adminEmail
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey || !adminEmail) {
    submission.status = 'email_not_configured'
    submission.delivery.admin = 'not_configured'
    submission.delivery.customer = 'not_configured'
    await persist()
    console.error('Contact form email is not configured', submission.id, {
      hasResendApiKey: Boolean(resendApiKey),
      hasAdminEmail: Boolean(adminEmail),
    })
    return NextResponse.json(
      {
        error: backupSaved
          ? '受付内容は保存しましたが通知できませんでした。contact@fomus.jpへ直接お問い合わせください。'
          : '受付できませんでした。お手数ですがcontact@fomus.jpへ直接お問い合わせください。',
      },
      { status: 503 },
    )
  }

  const { contact, order } = submission
  const printLabels: Record<string, string> = {
    branding: '焼印',
    laser: 'レーザー刻印',
    undecided: '相談したい',
  }
  const name = escapeHtml(contact.name)
  const email = escapeHtml(contact.email)
  const company = escapeHtml(contact.company)
  const phone = escapeHtml(contact.phone)
  const size = escapeHtml(order.size)
  const quantity = escapeHtml(order.quantity)
  const purpose = escapeHtml(order.purpose)
  const printMethod = escapeHtml(printLabels[order.printMethod] || order.printMethod)
  const printContent = escapeHtml(order.printContent)
  const desiredDelivery = escapeHtml(order.desiredDelivery)
  const notes = escapeHtml(order.notes)
  const bucket = quantityBucket(order.quantity)
  const quantityLabel =
    bucket === 'unknown' || bucket === 'undecided'
      ? ''
      : `・${bucket === '1' ? '1個' : `${bucket}個`}${isHighValue(bucket) ? '・大口' : ''}`

  const subjectCompany = contact.company.replace(/[\r\n]+/g, ' ')
  const subjectName = contact.name.replace(/[\r\n]+/g, ' ')

  try {
    await sendEmail(resendApiKey, {
      from: siteConfig.contactEmail,
      to: adminEmail,
      // 大口かどうかをメールを開かずに判別できるよう、件名に数量帯を入れる
      subject: `【枡のお見積り${quantityLabel}】${subjectCompany ? subjectCompany + ' ' : ''}${subjectName}様`,
      html: `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
<div style="background:#1A1A1A;padding:24px;text-align:center;"><h1 style="color:#fff;margin:0;font-size:16px;letter-spacing:3px;">MASU-STORE</h1></div>
<div style="padding:24px;background:#fff;border:1px solid #e5e5e5;">
<h2 style="font-size:18px;margin:0 0 20px;">お見積り・ご相談</h2>
<p style="font-size:12px;color:#888;">受付番号: ${submission.id}</p>
<table style="width:100%;font-size:14px;border-collapse:collapse;">
<tr><td style="padding:8px 0;color:#888;width:120px;">お名前</td><td style="padding:8px 0;">${name}</td></tr>
<tr><td style="padding:8px 0;color:#888;">メール</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
${company ? `<tr><td style="padding:8px 0;color:#888;">会社名</td><td style="padding:8px 0;">${company}</td></tr>` : ''}
${phone ? `<tr><td style="padding:8px 0;color:#888;">電話番号</td><td style="padding:8px 0;">${phone}</td></tr>` : ''}
<tr><td colspan="2" style="padding:12px 0 4px;border-top:1px solid #eee;color:#888;font-size:12px;">ご注文内容</td></tr>
${size ? `<tr><td style="padding:8px 0;color:#888;">サイズ</td><td style="padding:8px 0;">${size}</td></tr>` : ''}
<tr><td style="padding:8px 0;color:#888;">数量</td><td style="padding:8px 0;">${quantity}</td></tr>
${purpose ? `<tr><td style="padding:8px 0;color:#888;">用途</td><td style="padding:8px 0;">${purpose}</td></tr>` : ''}
${printMethod ? `<tr><td style="padding:8px 0;color:#888;">名入れ方法</td><td style="padding:8px 0;">${printMethod}</td></tr>` : ''}
${printContent ? `<tr><td style="padding:8px 0;color:#888;">名入れ内容</td><td style="padding:8px 0;">${printContent}</td></tr>` : ''}
${desiredDelivery ? `<tr><td style="padding:8px 0;color:#888;">希望納期</td><td style="padding:8px 0;">${desiredDelivery}</td></tr>` : ''}
${notes ? `<tr><td colspan="2" style="padding:12px 0 4px;border-top:1px solid #eee;color:#888;font-size:12px;">その他ご要望</td></tr><tr><td colspan="2" style="padding:8px 0;white-space:pre-wrap;">${notes}</td></tr>` : ''}
<tr><td colspan="2" style="padding:12px 0 4px;border-top:1px solid #eee;color:#888;font-size:12px;">流入経路</td></tr>
<tr><td style="padding:8px 0;color:#888;">フォーム</td><td style="padding:8px 0;">${escapeHtml(submission.context.formType)}</td></tr>
${submission.context.submittedFrom ? `<tr><td style="padding:8px 0;color:#888;">送信ページ</td><td style="padding:8px 0;">${escapeHtml(submission.context.submittedFrom)}</td></tr>` : ''}
${submission.context.landingPage ? `<tr><td style="padding:8px 0;color:#888;">初回の入口</td><td style="padding:8px 0;">${escapeHtml(submission.context.landingPage)}</td></tr>` : ''}
${submission.context.aiSource ? `<tr><td style="padding:8px 0;color:#888;">AI経由</td><td style="padding:8px 0;font-weight:bold;">${escapeHtml(submission.context.aiSource)}</td></tr>` : ''}
<tr><td style="padding:8px 0;color:#888;">初回の参照元</td><td style="padding:8px 0;">${escapeHtml(submission.context.referrer || '直接アクセス / 不明')}</td></tr>
${submission.context.firstVisitAt ? `<tr><td style="padding:8px 0;color:#888;">初回訪問</td><td style="padding:8px 0;">${escapeHtml(formatJst(submission.context.firstVisitAt))}（問い合わせまで${daysBetween(submission.context.firstVisitAt, submission.receivedAt)}）</td></tr>` : ''}
${submission.context.visitCount ? `<tr><td style="padding:8px 0;color:#888;">訪問回数</td><td style="padding:8px 0;">${escapeHtml(submission.context.visitCount)}回</td></tr>` : ''}
${Number(submission.context.visitCount) > 1 ? `<tr><td style="padding:8px 0;color:#888;">今回の入口</td><td style="padding:8px 0;">${escapeHtml(submission.context.lastLandingPage)}</td></tr><tr><td style="padding:8px 0;color:#888;">今回の参照元</td><td style="padding:8px 0;">${escapeHtml(submission.context.lastReferrer || '直接アクセス / 不明')}</td></tr>` : ''}
${submission.context.utmSource ? `<tr><td style="padding:8px 0;color:#888;">UTM</td><td style="padding:8px 0;">${escapeHtml([submission.context.utmSource, submission.context.utmMedium, submission.context.utmCampaign].filter(Boolean).join(' / '))}</td></tr>` : ''}
${submission.context.visitDurationSec ? `<tr><td style="padding:8px 0;color:#888;">今回の滞在</td><td style="padding:8px 0;">${escapeHtml(formatDuration(submission.context.visitDurationSec))}</td></tr>` : ''}
${submission.context.device ? `<tr><td style="padding:8px 0;color:#888;">端末</td><td style="padding:8px 0;">${escapeHtml([submission.context.device, submission.context.screenSize, submission.context.language].filter(Boolean).join(' / '))}</td></tr>` : ''}
${submission.context.location ? `<tr><td style="padding:8px 0;color:#888;">地域（推定）</td><td style="padding:8px 0;">${escapeHtml(submission.context.location)}</td></tr>` : ''}
${submission.context.pageTrail ? `<tr><td colspan="2" style="padding:12px 0 4px;border-top:1px solid #eee;color:#888;font-size:12px;">見たページの流れ（直近30件）</td></tr><tr><td colspan="2" style="padding:8px 0;white-space:pre-wrap;font-size:13px;">${escapeHtml(submission.context.pageTrail)}</td></tr>` : ''}
</table>
</div></div>`,
    })
    submission.delivery.admin = 'sent'
  } catch (error) {
    submission.status = 'email_failed'
    submission.delivery.admin = 'failed'
    await persist()
    console.error('Contact admin notification failed', submission.id, error)
    return NextResponse.json(
      {
        error: backupSaved
          ? '受付内容は保存しましたが通知できませんでした。contact@fomus.jpへ直接お問い合わせください。'
          : '受付できませんでした。お手数ですがcontact@fomus.jpへ直接お問い合わせください。',
      },
      { status: 503 },
    )
  }

  // 管理者には届いているので受付は完了。自動返信だけ、1日の上限を超えたら送らない
  if (!(await withinLimit('contact-autoreply-daily', AUTO_REPLY_DAILY_LIMIT, 24 * 60 * 60))) {
    console.warn('Contact auto-reply daily limit reached', submission.id)
    submission.delivery.customer = 'skipped_limit'
    submission.status = 'completed'
    await persist()
    return NextResponse.json({ success: true, submissionId: submission.id })
  }

  try {
    await sendEmail(resendApiKey, {
      from: siteConfig.contactEmail,
      to: contact.email,
      subject: '【枡の専門店 MASU-STORE】お問い合わせありがとうございます',
      html: `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
<div style="background:#1A1A1A;padding:24px;text-align:center;"><h1 style="color:#fff;margin:0;font-size:16px;letter-spacing:3px;">MASU-STORE</h1></div>
<div style="padding:24px;background:#fff;border:1px solid #e5e5e5;">
<h2 style="font-size:18px;margin:0 0 20px;">お問い合わせありがとうございます</h2>
<p style="font-size:14px;line-height:1.8;color:#333;">
${name}様<br><br>
枡のお見積り・ご相談をいただきありがとうございます。<br>
内容を確認の上、1〜3営業日以内にご連絡いたします。<br><br>
受付番号: ${submission.id}<br><br>
しばらくお待ちくださいませ。
</p>
</div>
<div style="padding:12px;text-align:center;"><p style="font-size:11px;color:#999;">枡の専門店 MASU-STORE</p></div>
</div>`,
    })
    submission.delivery.customer = 'sent'
  } catch (error) {
    // The durable backup and admin notification have already succeeded.
    submission.status = 'email_failed'
    submission.delivery.customer = 'failed'
    await persist()
    console.error('Contact customer auto-reply failed', submission.id, error)
    return NextResponse.json({ success: true, submissionId: submission.id })
  }

  submission.status = 'completed'
  await persist()
  if (!backupSaved) {
    console.error('Contact stored only via email', submission.id)
  }

  return NextResponse.json({ success: true, submissionId: submission.id })
}
