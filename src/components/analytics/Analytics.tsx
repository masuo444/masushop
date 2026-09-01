'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { captureAttribution } from '@/lib/attribution'

const gaId = process.env.NEXT_PUBLIC_GA_ID
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

/**
 * 計測タグ。環境変数が未設定なら何も出力しないので、
 * ローカル開発やプレビューでは自動的に無効になる。
 */
export default function Analytics() {
  useEffect(() => {
    captureAttribution()
  }, [])

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>
        </>
      )}
      {clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  )
}
