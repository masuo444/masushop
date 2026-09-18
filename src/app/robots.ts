import type { MetadataRoute } from 'next'
import siteConfig from '@/lib/site-config'

// 管理画面はどのクローラーにも巡回させない。
// 個別に指定したクローラーは * の設定を引き継がないので、全員に同じ disallow を付ける。
const disallow = ['/admin', '/api/admin']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      // AI検索・AIアシスタントのクローラーを明示的に許可（AIO）
      { userAgent: 'GPTBot', allow: '/', disallow },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow },
      { userAgent: 'ChatGPT-User', allow: '/', disallow },
      { userAgent: 'ClaudeBot', allow: '/', disallow },
      { userAgent: 'Claude-Web', allow: '/', disallow },
      { userAgent: 'anthropic-ai', allow: '/', disallow },
      { userAgent: 'PerplexityBot', allow: '/', disallow },
      { userAgent: 'Google-Extended', allow: '/', disallow },
      { userAgent: 'Applebot-Extended', allow: '/', disallow },
      { userAgent: 'cohere-ai', allow: '/', disallow },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
