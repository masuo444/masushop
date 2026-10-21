/**
 * 記念品・贈り物が必要になる行事のカレンダー（/calendar と各記事で使う）。
 * 「相談の目安」は、名入れの製作期間（約3週間）＋仕上がりイメージの確認・配送の余裕を見て、行事の約4週間前とする。
 * 100個以上の大口は製作に3〜4週間かかるため、さらに1週間早める。
 * 日付は年によって変わる行事があるので、毎年10月ごろに翌年分へ更新する。
 */

export type CalendarEvent = {
  /** 行事の日付（YYYY-MM-DD）。期間のものは代表日 */
  date: string
  /** 表示用の日付（「1月11日ごろ」「3月中旬〜下旬」など） */
  when: string
  name: string
  /** 誰が・何に使うか */
  use: string
  /** 関連ページ */
  href: string
  linkLabel: string
  business?: boolean
}

export const CALENDAR_PERIOD = '2026年11月〜2027年10月'

export const calendarEvents: CalendarEvent[] = [
  { date: '2026-12-10', when: '12月初旬〜20日ごろ', name: 'お歳暮・年末のご挨拶', use: '取引先への年末の贈り物', href: '/blog/oseibo-onenga-torihikisaki', linkLabel: '取引先への年末年始の贈り物', business: true },
  { date: '2027-01-05', when: '1月1日〜7日ごろ（松の内）', name: 'お年賀・年始のご挨拶', use: '取引先への年始の手土産・社名入りの記念品', href: '/blog/oseibo-onenga-torihikisaki', linkLabel: '取引先への年末年始の贈り物', business: true },
  { date: '2027-01-11', when: '1月11日ごろ（地域差あり）', name: '鏡開き・新年会・賀詞交歓会', use: '樽酒の振る舞い、乾杯用の枡、参加者への記念品', href: '/blog/shinnenkai-enshutsu', linkLabel: '新年会・賀詞交歓会の演出', business: true },
  { date: '2027-02-03', when: '2月3日', name: '節分', use: '豆まき用の枡（五合枡が定番）、店舗・寺社の行事', href: '/blog/masu-setsubun', linkLabel: '節分の枡' },
  { date: '2027-03-15', when: '3月中旬〜下旬', name: '卒業・卒団', use: '学校・部活・チームの記念品、先生や監督へのお礼', href: '/blog/sotsugyo-kinenhin', linkLabel: '卒業記念品・卒団記念品の選び方' },
  { date: '2027-03-25', when: '3月下旬', name: '異動・転勤・退職の送別', use: '部署一同からのプレゼント、退職記念品', href: '/blog/soubetsu-present', linkLabel: '送別会のプレゼント' },
  { date: '2027-04-01', when: '4月1日前後', name: '入社・創立記念・新年度', use: '新入社員への記念品、創立記念日の記念品', href: '/business/anniversary', linkLabel: '周年記念品' , business: true },
  { date: '2027-05-09', when: '5月9日（第2日曜）', name: '母の日', use: '名前やメッセージを刻んだ贈り物', href: '/original', linkLabel: 'オーダーメイドの記念品（1個から）' },
  { date: '2027-06-20', when: '6月20日（第3日曜）', name: '父の日', use: '日本酒好きの父へ、名入れの酒器', href: '/blog/chichinohi-naire-masu', linkLabel: '父の日の名入れ枡' },
  { date: '2027-07-01', when: '7月初旬〜中旬', name: 'お中元・夏の展示会', use: '取引先への贈り物、展示会のノベルティ', href: '/business/novelty', linkLabel: '展示会ノベルティ', business: true },
  { date: '2027-09-20', when: '9月20日（第3月曜）', name: '敬老の日・長寿祝い', use: '還暦・古希・喜寿などのお祝い', href: '/blog/kanreki-taishoku-iwai-masu', linkLabel: '還暦祝い・退職祝いの記念品' },
  { date: '2027-10-01', when: '通年（多いのは年度の節目）', name: '周年記念・竣工式・式典', use: '創業記念、竣工式、表彰式の記念品', href: '/business/ceremony', linkLabel: '式典・鏡開きの枡', business: true },
]

const DAY = 24 * 60 * 60 * 1000

function formatJa(date: Date) {
  return `${date.getUTCMonth() + 1}月${date.getUTCDate()}日`
}

/** 相談の目安（通常・大口）。行事の4週間前と5週間前 */
export function consultBy(event: CalendarEvent) {
  const base = new Date(`${event.date}T00:00:00Z`)
  return {
    normal: formatJa(new Date(base.getTime() - 28 * DAY)),
    large: formatJa(new Date(base.getTime() - 35 * DAY)),
  }
}
