/**
 * 問い合わせ手前の行動を GA4 に送る。毎朝の日報でボタン別・ページ別に集計する。
 * GA4 の既定パラメータ（link_text / link_url / form_id）を使うので、カスタム定義の登録は不要。
 */

type Gtag = (command: string, eventName: string, params?: Record<string, unknown>) => void

const CTA_PATHS = ['/custom', '/order-made', '/contact', '/en/contact', '/en/shipping']
const CONTACT_PATTERN = /^(mailto:|tel:)|line\.me|lin\.ee/

function send(eventName: string, params: Record<string, unknown>) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag !== 'function') return
  try {
    gtag('event', eventName, params)
  } catch {
    // 計測の失敗で画面の操作を妨げない
  }
}

function linkText(element: HTMLElement) {
  return (element.innerText || element.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 80)
}

/** リスナーを登録し、解除関数を返す（useEffect のクリーンアップ用） */
export function trackInteractions() {
  const startedForms = new Set<string>()

  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as HTMLElement | null)?.closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href') || ''
    if (CONTACT_PATTERN.test(href)) {
      send('contact_click', {
        link_text: linkText(anchor),
        link_url: href.replace(/^mailto:([^?]+).*/, 'mailto:$1'),
      })
      return
    }
    const path = href.startsWith('http') ? new URL(href).pathname : href.split(/[?#]/)[0]
    if (CTA_PATHS.some((cta) => path === cta) && path !== window.location.pathname) {
      send('cta_click', { link_text: linkText(anchor), link_url: path })
    }
  }

  const onFocus = (event: FocusEvent) => {
    const field = event.target as HTMLElement | null
    if (!field?.matches?.('input, textarea, select')) return
    const form = field.closest('form')
    if (!form) return
    const formId = `${window.location.pathname}${form.id ? `#${form.id}` : ''}`
    if (startedForms.has(formId)) return
    startedForms.add(formId)
    send('inquiry_form_start', { form_id: formId })
  }

  document.addEventListener('click', onClick, { capture: true })
  document.addEventListener('focusin', onFocus)
  return () => {
    document.removeEventListener('click', onClick, { capture: true })
    document.removeEventListener('focusin', onFocus)
  }
}
