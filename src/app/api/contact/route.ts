import { NextResponse } from 'next/server'
import siteConfig from '@/lib/site-config'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, email, company, phone, size, quantity, purpose, printMethod, printContent, deadline, jpycPayment, notes } = body

    // Validate required fields
    if (!name || !email || !quantity) {
      return NextResponse.json({ error: '必須項目を入力してください' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'メールアドレスの形式が正しくありません' }, { status: 400 })
    }

    const adminEmail = siteConfig.adminEmail
    const resendApiKey = process.env.RESEND_API_KEY

    // If Resend is configured, send emails
    if (resendApiKey && adminEmail) {
      const printLabels: Record<string, string> = {
        branding: '焼印',
        laser: 'レーザー刻印',
        silk: 'シルクプリント',
        undecided: '相談したい',
      }

      // Send to admin
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: siteConfig.contactEmail,
          to: adminEmail,
          subject: `【枡のお見積り】${company ? company + ' ' : ''}${name}様`,
          html: `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
<div style="background:#1A1A1A;padding:24px;text-align:center;"><h1 style="color:#fff;margin:0;font-size:16px;letter-spacing:3px;">MASU-STORE</h1></div>
<div style="padding:24px;background:#fff;border:1px solid #e5e5e5;">
<h2 style="font-size:18px;margin:0 0 20px;">お見積り・ご相談</h2>
<table style="width:100%;font-size:14px;border-collapse:collapse;">
<tr><td style="padding:8px 0;color:#888;width:120px;">お名前</td><td style="padding:8px 0;">${name}</td></tr>
<tr><td style="padding:8px 0;color:#888;">メール</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
${company ? `<tr><td style="padding:8px 0;color:#888;">会社名</td><td style="padding:8px 0;">${company}</td></tr>` : ''}
${phone ? `<tr><td style="padding:8px 0;color:#888;">電話番号</td><td style="padding:8px 0;">${phone}</td></tr>` : ''}
<tr><td colspan="2" style="padding:12px 0 4px;border-top:1px solid #eee;color:#888;font-size:12px;">ご注文内容</td></tr>
${size ? `<tr><td style="padding:8px 0;color:#888;">サイズ</td><td style="padding:8px 0;">${size}</td></tr>` : ''}
<tr><td style="padding:8px 0;color:#888;">数量</td><td style="padding:8px 0;">${quantity}</td></tr>
${purpose ? `<tr><td style="padding:8px 0;color:#888;">用途</td><td style="padding:8px 0;">${purpose}</td></tr>` : ''}
${printMethod ? `<tr><td style="padding:8px 0;color:#888;">名入れ方法</td><td style="padding:8px 0;">${printLabels[printMethod] || printMethod}</td></tr>` : ''}
${printContent ? `<tr><td style="padding:8px 0;color:#888;">名入れ内容</td><td style="padding:8px 0;">${printContent}</td></tr>` : ''}
${deadline ? `<tr><td style="padding:8px 0;color:#888;">希望納期</td><td style="padding:8px 0;">${deadline}</td></tr>` : ''}
${jpycPayment ? `<tr><td style="padding:8px 0;color:#888;">JPYC決済</td><td style="padding:8px 0;">希望あり</td></tr>` : ''}
${notes ? `<tr><td colspan="2" style="padding:12px 0 4px;border-top:1px solid #eee;color:#888;font-size:12px;">その他ご要望</td></tr><tr><td colspan="2" style="padding:8px 0;white-space:pre-wrap;">${notes}</td></tr>` : ''}
</table>
</div></div>`,
        }),
      })

      // Auto-reply to customer
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: siteConfig.contactEmail,
          to: email,
          subject: '【枡の専門店 MASU-STORE】お問い合わせありがとうございます',
          html: `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
<div style="background:#1A1A1A;padding:24px;text-align:center;"><h1 style="color:#fff;margin:0;font-size:16px;letter-spacing:3px;">MASU-STORE</h1></div>
<div style="padding:24px;background:#fff;border:1px solid #e5e5e5;">
<h2 style="font-size:18px;margin:0 0 20px;">お問い合わせありがとうございます</h2>
<p style="font-size:14px;line-height:1.8;color:#333;">
${name}様<br><br>
枡のお見積り・ご相談をいただきありがとうございます。<br>
内容を確認の上、1〜3営業日以内にご連絡いたします。<br><br>
しばらくお待ちくださいませ。
</p>
</div>
<div style="padding:12px;text-align:center;"><p style="font-size:11px;color:#999;">枡の専門店 MASU-STORE</p></div>
</div>`,
        }),
      })
    } else {
      // Log to console if email not configured
      console.log('=== 枡お見積り受付 ===')
      console.log(JSON.stringify(body, null, 2))
      console.log('=== (RESEND_API_KEY or ADMIN_EMAIL not configured) ===')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: '送信に失敗しました。しばらく経ってからお試しください。' },
      { status: 500 }
    )
  }
}
