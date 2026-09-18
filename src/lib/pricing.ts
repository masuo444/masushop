import siteConfig from '@/lib/site-config'

/**
 * 名入れ枡の最低注文額の表示文言。金額・税表記は site-config の1か所から出す。
 * 「1回のご注文」の最低額であって1個あたりの単価ではないため、
 * Product 構造化データの offers には使わない。
 */
export const orderMinPriceAmount = `${siteConfig.orderMinPrice.toLocaleString('ja-JP')}円〜`

/** 例: 4,400円〜（税込・送料別） */
export const orderMinPriceText = `${orderMinPriceAmount}（${siteConfig.orderMinPriceTaxLabel}・送料別）`

/** 例: 税抜4,000円 */
export const orderMinPriceExTaxNote = `税抜${siteConfig.orderMinPriceExcludingTax.toLocaleString('ja-JP')}円`

/** 例: 目安：1回のご注文 4,400円〜（税込・送料別） */
export const orderMinPriceShort = `目安：1回のご注文 ${orderMinPriceText}`

/** 説明つきの標準文 */
export const orderMinPriceNote = `名入れのご注文は ${orderMinPriceText}／デザイン作成と仕上がりイメージ込み。データのご用意は不要です。2個目以降は割安になります。`

/** FAQ 向けの回答文 */
export const orderMinPriceFaqAnswer = `名入れ枡は、1回のご注文につき ${orderMinPriceText}（${orderMinPriceExTaxNote}）です。デザイン作成と仕上がりイメージの制作を含んだ金額で、デザインデータをご用意いただく必要はありません。1個あたりの単価ではなく、同じデザインで個数を増やす場合、2個目以降は割安になります。無地の枡だけの場合はこれより安くなり、法人・10個以上のご注文は数量に応じてお見積りします。ご注文前に、お見積りと仕上がりイメージを無料でお送りします。`
