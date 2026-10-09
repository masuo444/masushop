import { NextResponse } from 'next/server'
import { jstDate } from '@/lib/daily-report'
import siteConfig from '@/lib/site-config'
import { buildWeeklyAdvice } from '@/lib/weekly-advice'

/**
 * 毎週月曜8時（日本時間）に Vercel Cron から呼ばれ、前日までの1週間の改善アドバイスを管理者へメールする。
 * Claude API を1回呼ぶ（1回あたり数十円）。認証は日報と同じ CRON_SECRET。
 */

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const adminEmail = siteConfig.adminEmail
  if (!resendApiKey || !adminEmail) {
    return NextResponse.json({ error: 'email is not configured' }, { status: 503 })
  }

  const date = jstDate(-1)
  let report: { subject: string; html: string }
  try {
    report = await buildWeeklyAdvice(date)
  } catch (error) {
    console.error('Weekly advice failed', error)
    report = {
      subject: `【MASU-STORE 週次アドバイス】作成できませんでした`,
      html: `<p>今週の改善アドバイスを作れませんでした。</p><pre style="white-space:pre-wrap;font-size:12px;color:#888;">${String(error).slice(0, 500).replaceAll('<', '&lt;')}</pre>`,
    }
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendApiKey}` },
    body: JSON.stringify({ from: siteConfig.contactEmail, to: adminEmail, subject: report.subject, html: report.html }),
  })
  if (!response.ok) {
    console.error('Weekly advice email failed', response.status, await response.text())
    return NextResponse.json({ error: 'email failed' }, { status: 502 })
  }
  return NextResponse.json({ ok: true, date, subject: report.subject })
}
