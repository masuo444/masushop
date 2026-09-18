/**
 * アンケート回答の管理者通知（Resend）。サーバー専用。
 * RESEND_API_KEY / ADMIN_EMAIL が未設定なら送らずに終える（問い合わせフォームと同じ環境変数）。
 */
import siteConfig from '@/lib/site-config'
import { sizeLabel, type VoiceRecord } from '@/lib/voice'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function row(label: string, value: string) {
  if (!value) return ''
  return `<tr><td style="padding:8px 0;color:#888;width:120px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 0;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
}

export async function notifyAdminOfVoice(
  record: VoiceRecord,
  kind: 'received' | 'consented',
) {
  const apiKey = process.env.RESEND_API_KEY
  const adminEmail = siteConfig.adminEmail
  if (!apiKey || !adminEmail) {
    console.warn('Voice notification skipped: email is not configured', record.id)
    return 'not_configured' as const
  }

  const { answers } = record
  const subject =
    kind === 'consented'
      ? `【購入者アンケート・掲載承認待ち】★${answers.rating} ${answers.displayName}`
      : `【購入者アンケート】★${answers.rating} ${answers.purpose || '用途未回答'}`

  const text = kind === 'consented' ? record.finalText : record.draft
  const html = `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
<div style="background:#1A1A1A;padding:24px;text-align:center;"><h1 style="color:#fff;margin:0;font-size:16px;letter-spacing:3px;">MASU-STORE</h1></div>
<div style="padding:24px;background:#fff;border:1px solid #e5e5e5;">
<h2 style="font-size:18px;margin:0 0 20px;">${kind === 'consented' ? 'サイト掲載に同意した回答があります' : '購入者アンケートの回答がありました'}</h2>
<p style="font-size:12px;color:#888;">受付番号: ${escapeHtml(record.id)}</p>
<table style="width:100%;font-size:14px;border-collapse:collapse;">
${row('満足度', `${answers.rating} / 5`)}
${row('サイズ', answers.sizes.map(sizeLabel).join('、'))}
${row('用途', answers.purpose)}
${row('加工', answers.processing)}
${row('良かった点', answers.goodPoints.join('、'))}
${row('気になった点', answers.concerns)}
${row('ひとこと', answers.comment)}
${row('表示名', answers.displayName)}
${row('属性', answers.attribute)}
${row('都道府県', answers.prefecture)}
${row('メール', record.email)}
${row('流入元', record.ref)}
${row(kind === 'consented' ? '最終の文章' : '下書き', text)}
</table>
<p style="font-size:13px;margin-top:20px;"><a href="${siteConfig.url}/admin/voice">管理画面で確認する</a></p>
</div></div>`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from: siteConfig.contactEmail, to: adminEmail, subject, html }),
    })
    if (!response.ok) {
      console.error('Voice notification rejected', response.status, await response.text())
      return 'failed' as const
    }
    return 'sent' as const
  } catch (error) {
    console.error('Voice notification failed', record.id, error)
    return 'failed' as const
  }
}
