import { QUOTE_STEP_NAMES, SEGMENT_LABEL } from '@/lib/site-events'
import type { SiteEventRow } from '@/lib/site-events-store'

/**
 * 自前の行動記録を、日報・週次アドバイス用の表に集計する。
 * 数字はすべて「その行動をした訪問の数」（同じ訪問で同じページ・同じ行動は1回だけ数えている）。
 */

const sum = (rows: SiteEventRow[]) => rows.reduce((s, r) => s + r.count, 0)

const segmentName = (segment: string) =>
  segment.startsWith('ai:') ? `AI（${segment.slice(3)}）` : (SEGMENT_LABEL[segment] ?? segment)

/** 送信したページ・フォームの見積り開始をまとめるため、ラベルから formType を取り出す */
const formOf = (label: string) => label.split(':')[0]

export const FUNNEL_HEAD = ['開いた', '15秒以上', '条件を見た', 'ボタン', '見積り開始', '送信']

function funnel(rows: SiteEventRow[]) {
  const by = (event: string, filter: (r: SiteEventRow) => boolean = () => true) =>
    sum(rows.filter((r) => r.event === event && filter(r)))
  return [
    by('view'),
    by('engaged'),
    by('offer_view', (r) => r.label.startsWith('offer:')),
    by('cta'),
    // 見積り開始 = かんたん見積りの1問目に答えた or 通常フォームに入力し始めた
    by('quote_step', (r) => r.label.endsWith(':1')) + by('form_start', (r) => !r.label.startsWith('quick-quote')),
    by('lead'),
  ]
}

/** ページ別の流れ（開いた数の多い順） */
export function pageFunnel(rows: SiteEventRow[], limit = 12) {
  const paths = new Map<string, SiteEventRow[]>()
  for (const r of rows) paths.set(r.path, [...(paths.get(r.path) ?? []), r])
  return [...paths.entries()]
    .map(([path, list]) => [path, ...funnel(list)] as [string, ...number[]])
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
}

/** 流入元別の流れ（AIは名前ごと） */
export function segmentFunnel(rows: SiteEventRow[]) {
  const segments = new Map<string, SiteEventRow[]>()
  for (const r of rows) segments.set(r.segment, [...(segments.get(r.segment) ?? []), r])
  return [...segments.entries()]
    .map(([segment, list]) => [segmentName(segment), ...funnel(list)] as [string, ...number[]])
    .sort((a, b) => b[1] - a[1])
}

/** かんたん見積りの段階ごとの人数（どこで離れたか）。フォームの種類別 */
export function quoteSteps(rows: SiteEventRow[]) {
  const forms = new Map<string, number[]>()
  for (const r of rows) {
    if (r.event === 'quote_step') {
      const [form, step] = r.label.split(':')
      const counts = forms.get(form) ?? [0, 0, 0, 0, 0]
      const i = Number(step) - 1
      if (i >= 0 && i < 4) counts[i] += r.count
      forms.set(form, counts)
    }
    if (r.event === 'lead' && r.label.startsWith('quick-quote')) {
      const form = formOf(r.label)
      const counts = forms.get(form) ?? [0, 0, 0, 0, 0]
      counts[4] += r.count
      forms.set(form, counts)
    }
  }
  return [...forms.entries()].sort((a, b) => b[1][0] - a[1][0]).map(([form, counts]) => [form, ...counts] as [string, ...number[]])
}

export const QUOTE_STEP_HEAD = [...QUOTE_STEP_NAMES.slice(0, 4).map((n) => `${n}に回答`), '送信']

/** 押されたボタン（行き先別） */
export function ctaTargets(rows: SiteEventRow[]) {
  const totals = new Map<string, number>()
  for (const r of rows.filter((r) => r.event === 'cta')) {
    const key = `${r.path}\t${r.label}`
    totals.set(key, (totals.get(key) ?? 0) + r.count)
  }
  return [...totals.entries()].sort((a, b) => b[1] - a[1]).map(([key, count]) => [...key.split('\t'), count] as [string, string, number])
}

export function totalOf(rows: SiteEventRow[], event: string) {
  return sum(rows.filter((r) => r.event === event))
}
