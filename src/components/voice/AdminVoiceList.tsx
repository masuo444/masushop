'use client'

import { useCallback, useEffect, useState } from 'react'
import { sizeLabel, type VoiceRecord, type VoiceStatus } from '@/lib/voice'

type Item = Omit<VoiceRecord, 'editToken'>
type Filter = 'all' | VoiceStatus

const statusLabels: Record<VoiceStatus, string> = {
  draft: '下書きのみ（未送信）',
  submitted: '送信済み',
  approved: '掲載中',
  rejected: '非承認',
  unpublished: '掲載取り下げ',
}

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'submitted', label: '送信済み' },
  { value: 'approved', label: '掲載中' },
  { value: 'draft', label: '未送信' },
  { value: 'rejected', label: '非承認' },
  { value: 'unpublished', label: '取り下げ' },
]

function formatDateTime(iso: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
}

export default function AdminVoiceList() {
  const [items, setItems] = useState<Item[]>([])
  const [storage, setStorage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [busyId, setBusyId] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/voice', { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '読み込めませんでした')
      setItems(data.items)
      setStorage(data.storage)
    } catch (err) {
      setError(err instanceof Error ? err.message : '読み込めませんでした')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // 初回表示時に一覧を取得する
    void load()
  }, [load])

  const act = async (id: string, action: 'approve' | 'reject' | 'unpublish') => {
    const messages = {
      approve: 'この回答をサイトに掲載しますか？',
      reject: 'この回答を非承認にしますか？（掲載中なら取り下げます）',
      unpublish: 'サイトから取り下げますか？',
    }
    if (!window.confirm(messages[action])) return
    setBusyId(id)
    setError('')
    try {
      const res = await fetch('/api/admin/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '更新できませんでした')
      setItems((prev) => prev.map((item) => (item.id === id ? data.item : item)))
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新できませんでした')
    } finally {
      setBusyId('')
    }
  }

  const visible = filter === 'all' ? items : items.filter((i) => i.status === filter)
  const muted = { color: 'var(--color-muted)' }
  const box = {
    background: 'var(--color-subtle)',
    border: '1px solid var(--color-border)',
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {filters.map((f) => {
          const count = f.value === 'all' ? items.length : items.filter((i) => i.status === f.value).length
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-xs rounded-sm border ${
                filter === f.value
                  ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]'
                  : 'border-[var(--color-border)]'
              }`}
            >
              {f.label}（{count}）
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => void load()}
          className="ml-auto px-3 py-1.5 text-xs rounded-sm border border-[var(--color-border)]"
        >
          再読み込み
        </button>
      </div>

      {storage === 'memory' && (
        <p className="mb-4 text-[13px]" style={{ color: '#c0392b' }}>
          BLOB_READ_WRITE_TOKEN が未設定のため、回答はサーバーのメモリにしか残っていません（再起動で消えます）。
        </p>
      )}
      {error && (
        <p className="mb-4 text-[13px]" style={{ color: '#c0392b' }}>
          {error}
        </p>
      )}
      {loading && <p className="text-sm" style={muted}>読み込み中…</p>}
      {!loading && visible.length === 0 && (
        <p className="text-sm" style={muted}>該当する回答はありません。</p>
      )}

      <div className="space-y-6">
        {visible.map((item) => {
          const a = item.answers
          const changed = item.finalText && item.finalText !== item.draft
          return (
            <article key={item.id} className="rounded-sm p-5" style={box}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-xs" style={muted}>
                <span
                  className="px-2 py-0.5 rounded-sm"
                  style={{
                    background: item.status === 'approved' ? 'var(--color-accent)' : 'var(--background)',
                    color: item.status === 'approved' ? '#fff' : 'var(--foreground)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {statusLabels[item.status]}
                </span>
                <span>{formatDateTime(item.createdAt)}</span>
                <span>{item.id}</span>
                {item.ref && <span>流入元: {item.ref}</span>}
                <span>下書き: {item.draftSource === 'ai' ? 'AI' : 'テンプレート'}</span>
              </div>

              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm mb-4">
                <div><dt className="inline" style={muted}>満足度: </dt><dd className="inline" style={{ color: 'var(--color-accent)' }}>{'★'.repeat(a.rating)}{'☆'.repeat(5 - a.rating)}</dd></div>
                <div><dt className="inline" style={muted}>サイズ: </dt><dd className="inline">{a.sizes.map(sizeLabel).join('、') || '未回答'}</dd></div>
                <div><dt className="inline" style={muted}>用途: </dt><dd className="inline">{a.purpose || '未回答'}</dd></div>
                <div><dt className="inline" style={muted}>加工: </dt><dd className="inline">{a.processing || '未回答'}</dd></div>
                <div className="sm:col-span-2"><dt className="inline" style={muted}>良かった点: </dt><dd className="inline">{a.goodPoints.join('、') || 'なし'}</dd></div>
                {a.concerns && <div className="sm:col-span-2"><dt className="inline" style={muted}>気になった点: </dt><dd className="inline whitespace-pre-wrap">{a.concerns}</dd></div>}
                {a.comment && <div className="sm:col-span-2"><dt className="inline" style={muted}>ひとこと: </dt><dd className="inline whitespace-pre-wrap">{a.comment}</dd></div>}
                <div><dt className="inline" style={muted}>表示名: </dt><dd className="inline">{a.displayName}</dd></div>
                <div><dt className="inline" style={muted}>属性・地域: </dt><dd className="inline">{[a.attribute, a.prefecture].filter(Boolean).join('・') || '未回答'}</dd></div>
                {item.email && <div className="sm:col-span-2"><dt className="inline" style={muted}>メール（非公開）: </dt><dd className="inline"><a href={`mailto:${item.email}`} className="underline">{item.email}</a></dd></div>}
              </dl>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs mb-1" style={muted}>下書き</p>
                  <p className="text-sm leading-[1.9] whitespace-pre-wrap p-3 rounded-sm" style={{ background: 'var(--background)' }}>
                    {item.draft}
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={muted}>
                    本人が送信した文章{changed ? '（書き換えあり）' : item.finalText ? '（下書きのまま）' : ''}
                  </p>
                  <p className="text-sm leading-[1.9] whitespace-pre-wrap p-3 rounded-sm" style={{ background: 'var(--background)' }}>
                    {item.finalText || '（未送信）'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs" style={{ color: item.consent ? 'var(--color-accent)' : 'var(--color-muted)' }}>
                  {item.consent ? 'サイト掲載に同意あり' : 'サイト掲載の同意なし'}
                </span>
                <div className="ml-auto flex gap-2">
                  {item.status !== 'approved' && (
                    <button
                      type="button"
                      disabled={busyId === item.id || !item.consent || !item.finalText}
                      onClick={() => void act(item.id, 'approve')}
                      className="px-4 py-2 text-xs rounded-sm text-white disabled:opacity-40"
                      style={{ background: 'var(--color-accent)' }}
                    >
                      承認して掲載
                    </button>
                  )}
                  {item.status === 'approved' && (
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => void act(item.id, 'unpublish')}
                      className="px-4 py-2 text-xs rounded-sm border border-[var(--color-border)] disabled:opacity-40"
                    >
                      掲載を取り下げ
                    </button>
                  )}
                  {item.status !== 'rejected' && (
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => void act(item.id, 'reject')}
                      className="px-4 py-2 text-xs rounded-sm border border-[var(--color-border)] disabled:opacity-40"
                    >
                      非承認
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
