import { NextResponse } from 'next/server'
import { isCronAuthorized } from '@/lib/cron-auth'
import { jstDate } from '@/lib/daily-report'
import { buildKachiuReport } from '@/lib/kachiu-report'
import siteConfig from '@/lib/site-config'

/**
 * KACHIU（kachiu.jp）の日報。毎朝8時5分（日本時間）に Vercel Cron から呼ばれ、前日分を管理者へメールする。
 * 手動で送り直すときは ?date=YYYY-MM-DD（同じ認証が必要）。
 */

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const requested = new URL(request.url).searchParams.get('date')
  const date = requested && /^\d{4}-\d{2}-\d{2}$/.test(requested) ? requested : jstDate(-1)

  const resendApiKey = process.env.RESEND_API_KEY
  const adminEmail = siteConfig.adminEmail
  if (!resendApiKey || !adminEmail) {
    return NextResponse.json({ error: 'email is not configured' }, { status: 503 })
  }

  const report = await buildKachiuReport(date)
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendApiKey}` },
    body: JSON.stringify({ from: siteConfig.contactEmail, to: adminEmail, subject: report.subject, html: report.html }),
  })
  if (!response.ok) {
    console.error('KACHIU report email failed', response.status, await response.text())
    return NextResponse.json({ error: 'email failed' }, { status: 502 })
  }
  return NextResponse.json({ ok: true, date, subject: report.subject })
}
