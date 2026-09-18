/**
 * 管理画面（/admin, /api/admin）の Basic 認証。
 * ユーザー名は admin、パスワードは環境変数 ADMIN_PASSWORD。
 * ADMIN_PASSWORD が未設定なら、誰も入れない。
 */
export const ADMIN_USERNAME = 'admin'

/** 長さの違いや一致位置で応答時間が変わらないように比較する */
function safeEqual(a: string, b: string) {
  const encoder = new TextEncoder()
  const left = encoder.encode(a)
  const right = encoder.encode(b)
  let diff = left.length ^ right.length
  const length = Math.max(left.length, right.length)
  for (let i = 0; i < length; i++) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0)
  }
  return diff === 0
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD)
}

export function isAuthorizedAdmin(authorization: string | null) {
  const password = process.env.ADMIN_PASSWORD
  if (!password || !authorization?.startsWith('Basic ')) return false

  let decoded: string
  try {
    const bytes = Uint8Array.from(atob(authorization.slice(6).trim()), (c) => c.charCodeAt(0))
    decoded = new TextDecoder().decode(bytes)
  } catch {
    return false
  }

  const separator = decoded.indexOf(':')
  if (separator < 0) return false
  const username = decoded.slice(0, separator)
  const givenPassword = decoded.slice(separator + 1)
  // 両方とも比較してから判定する（片方だけで早く返さない）
  const userOk = safeEqual(username, ADMIN_USERNAME)
  const passwordOk = safeEqual(givenPassword, password)
  return userOk && passwordOk
}
