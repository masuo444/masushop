import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { faqItems, masuSizes } from '@/lib/masu-data'
import { KURA_MASTER } from '@/lib/works'

/**
 * AI向けの詳しい版（llms-full.txt）。llms.txt の内容に、全サイズの詳細・よくある質問の全文・実績を足す。
 * サイトのデータから作るので、FAQやサイズを直せば自動で揃う。
 */
export const dynamic = 'force-static'

export async function GET() {
  const base = await readFile(path.join(process.cwd(), 'public', 'llms.txt'), 'utf8')
  const sizes = masuSizes
    .map((m) => `- ${m.name}（${m.reading}）: 容量 ${m.capacity}（${m.capacityNote}）/ 外寸 ${m.size} / 用途: ${m.use}`)
    .join('\n')
  const categories = [...new Set(faqItems.map((f) => f.category))]
  const faq = categories
    .map(
      (c) =>
        `### ${c}\n` +
        faqItems
          .filter((f) => f.category === c)
          .map((f) => `Q. ${f.q}\nA. ${f.a}`)
          .join('\n\n'),
    )
    .join('\n\n')
  const body = `${base.trim()}

## 全サイズの詳細
${sizes}

## 制作実績の詳細
- ${KURA_MASTER.ja.title}: ${KURA_MASTER.ja.lead}${KURA_MASTER.ja.use}${KURA_MASTER.ja.detail}
- ${KURA_MASTER.ja.about}
- ${KURA_MASTER.en.title}: ${KURA_MASTER.en.lead} ${KURA_MASTER.en.use} ${KURA_MASTER.en.detail}

## よくある質問（全文）
${faq}
`
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
