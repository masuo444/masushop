import { NextResponse } from 'next/server'
import { isCronAuthorized } from '@/lib/cron-auth'
import { jstDate } from '@/lib/daily-report'
import { buildAiCheckEmail, runKachiuAiCheck } from '@/lib/kachiu-ai-check'
import siteConfig from '@/lib/site-config'

/**
 * KACHIU が AI の答えに出るかの週次チェック。毎週月曜8時10分（日本時間）に Vercel Cron から呼ばれる。
 * Claude API（ウェブ検索つき）を10回呼ぶ（1回あたり100円前後）。認証は日報と同じ CRON_SECRET。
 */

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const resendApiKey = process.env.RESEND_API_KEY
  const adminEmail = siteConfig.adminEmail
  if (!resendApiKey || !adminEmail) {
    return NextResponse.json({ error: 'email is not configured' }, { status: 503 })
  }

  const date = jstDate(0)
  let report: { subject: string; html: string }
  try {
    report = buildAiCheckEmail(date, await runKachiuAiCheck())
  } catch (error) {
    console.error('KACHIU AI check failed', error)
    report = { subject: '【KACHIU AIでの見え方】しらべられませんでした', html: `<pre style="white-space:pre-wrap;font-size:12px;">${String(error).slice(0, 500).replaceAll('<', '&lt;')}</pre>` }
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendApiKey}` },
    body: JSON.stringify({ from: siteConfig.contactEmail, to: adminEmail, subject: report.subject, html: report.html }),
  })
  if (!response.ok) {
    console.error('KACHIU AI check email failed', response.status, await response.text())
    return NextResponse.json({ error: 'email failed' }, { status: 502 })
  }
  return NextResponse.json({ ok: true, date, subject: report.subject })
}
