import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// .envを読み込む
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env')
const envContent = readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) {
    const val = rest.join('=').trim().replace(/^["']|["']$/g, '')
    process.env[key.trim()] = val
  }
}

const PROJECT_ID = process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID
const API_KEY = process.env.NUXT_PUBLIC_FIREBASE_API_KEY
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`

// Firestore REST APIでドキュメントを作成
async function addDoc(collectionName, data) {
  const fields = toFirestoreFields(data)
  const res = await fetch(`${BASE_URL}/${collectionName}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(`${res.status}: ${JSON.stringify(err.error?.message)}`)
  }
}

// JavaScriptの値をFirestoreのフィールド形式に変換
function toFirestoreFields(obj) {
  const fields = {}
  for (const [key, value] of Object.entries(obj)) {
    fields[key] = toFirestoreValue(value)
  }
  return fields
}

function toFirestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null }
  if (typeof value === 'boolean') return { booleanValue: value }
  if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value }
  if (typeof value === 'string') return { stringValue: value }
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toFirestoreValue) } }
  if (typeof value === 'object') return { mapValue: { fields: toFirestoreFields(value) } }
  return { stringValue: String(value) }
}

// ---- ギャラリー画像プール ----
const gp = (nums) => nums.map((n, i) => ({ src: `/images/garden-photo-${n}.webp`, alt: `園の様子${i + 1}` }))
const gi = (names) => names.map((n, i) => ({ src: `/images/${n}.webp`, alt: `園の様子${i + 1}` }))
const galleryA = gp([20, 21, 22, 39, 40, 41])
const galleryB = gp([42, 43, 44, 45, 46, 47])
const galleryC = gi(['nenkan-entrance-ceremony', 'nenkan-halloween', 'nenkan-sports-day', 'nenkan-excursion', 'nenkan-summer', 'nenkan-tanabata'])
const galleryD = gi(['fv-children', 'photo-children-01', 'photo-children-02', 'photo-kindergarten-01', 'photo-kindergarten-02', 'nenkan-recreation'])

const MSG_IMG = '/images/garden-single-message.webp'
const weekdaysSat = [true, true, true, true, true, true, false]
const weekdaysNote = '月曜日〜土曜日（日曜日、祝日・休日、年末年始（12/29〜1/3）はお休み）'
const stdHours = { hoursStandard: '7：30〜18：30', hoursStandardExtended: '18：31〜19：30', hoursShort: '9：00〜17：00', hoursShortExtended: '7：30〜8：59 / 17：01〜19：30' }
const enrollmentDate = '原則として毎月1日'

const regularAges = (total, a1, a2, a3, a4, a5) => ({
  capacityTotal: total,
  capacityAges: [
    { age: '1歳児', count: a1 }, { age: '2歳児', count: a2 },
    { age: '3歳児', count: a3 }, { age: '4歳児', count: a4 }, { age: '5歳児', count: a5 },
  ],
})
const smallAges = (total, a0, a1, a2) => ({
  capacityTotal: total,
  capacityAges: [
    { age: '0歳児', count: a0 }, { age: '1歳児', count: a1 }, { age: '2歳児', count: a2 },
  ],
})

const gardens = [
  { name: 'しぶや園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '東京都', img: '/images/nenkan-entrance-ceremony.webp', location: { img: '/images/nenkan-entrance-ceremony.webp', heading: '渋谷駅から徒歩2分　利便性の高い立地', text: '桜のこもれびキッズランドしぶや園は、渋谷駅から徒歩2分という利便性の高い立地に位置しています。都心でありながらも自然と調和した環境で、子どもたちが安心して過ごせる場所を提供しています。地域の皆様に愛され、信頼される保育園として、心を込めてお子さまをお預かりしています。' }, gallery: galleryA, message: { img: MSG_IMG, text: '桜のこもれびしぶや園の今年度のテーマは「運動と音楽のコラボレーション・自然と食の融合」です。体操資格、リトミック資格を持った職員を中心に音楽に合わせて体を動かし、個々に持っている潜在的な基礎能力の発達を促します。普段の園の様子は定期的にこもれびだよりに掲載しています。月1回保育園の開放も行っています。職員一同お待ちしていますのでぜひ見学にいらしてください。' }, info: { address: '東京都渋谷区渋谷〇-〇-〇', tel: '03-1234-5678', fax: '03-1234-5679', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(51, 18, 18, 5, 5, 5), staffTotal: '13名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '8名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます', '※保育児童数・年齢に応じたシフトにより、職員を増減します'] } },
  { name: 'しんじゅく園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '東京都', img: '/images/nenkan-halloween.webp', location: { img: '/images/garden-musashino.webp', heading: '新宿駅南口から徒歩3分　都心で緑豊かな環境', text: '桜のこもれびキッズランドしんじゅく園は、新宿駅南口から徒歩3分の好立地にありながら、豊かな緑に囲まれた落ち着いた環境が自慢の保育園です。創造力を育む多彩なプログラムで、子どもたちの可能性を広げています。' }, gallery: galleryB, message: { img: MSG_IMG, text: '桜のこもれびしんじゅく園の今年度のテーマは「創造と表現・仲間との絆」です。絵画・音楽・造形活動を通じて子どもたちの豊かな表現力を育みます。友だちとの関わりを大切にし、思いやりの心を育てていきます。月1回保育園の開放も行っています。職員一同お待ちしていますのでぜひ見学にいらしてください。' }, info: { address: '東京都新宿区新宿〇-〇-〇', tel: '03-2345-6789', fax: '03-2345-6780', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(60, 20, 20, 7, 7, 6), staffTotal: '15名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '10名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'] } },
  { name: 'あかばね園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '東京都', img: '/images/no-image.webp', location: { img: '/images/garden-machida.webp', heading: '赤羽駅から徒歩5分　地域に根ざした保育', text: '桜のこもれびキッズランドあかばね園は、赤羽駅から徒歩5分の場所にあり、地域のみなさんに長年愛されてきた保育園です。近隣の公園や自然環境を活かしたのびのびとした保育を実践しています。' }, gallery: galleryC, message: { img: MSG_IMG, text: '桜のこもれびあかばね園の今年度のテーマは「地域とのつながり・のびのびと遊ぶ力」です。近くの公園での自然遊びや地域行事への参加を通じて、社会性と体力を育みます。保護者の方々と一緒に子どもたちの成長を支えていきます。' }, info: { address: '東京都北区赤羽〇-〇-〇', tel: '03-3456-7890', fax: '03-3456-7891', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(48, 16, 16, 6, 5, 5), staffTotal: '12名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '7名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'] } },
  { name: 'よこはま園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '神奈川県', img: '/images/garden-yokohama.webp', location: { img: '/images/garden-yokohama.webp', heading: 'みなとみらい近く　海の見える保育環境', text: '桜のこもれびキッズランドよこはま園は、横浜みなとみらい近くに位置し、港の景色を感じながら保育が受けられる特別な環境にあります。海を感じるプログラムや国際色豊かな取り組みで、視野の広い子どもを育てます。' }, gallery: galleryD, message: { img: MSG_IMG, text: '桜のこもれびよこはま園の今年度のテーマは「海と自然の探究・心豊かな子どもを育む」です。横浜という国際都市の特色を活かし、多様な文化に触れる機会を設けています。子どもたちの好奇心を大切に、毎日の発見を一緒に喜び合っています。' }, info: { address: '神奈川県横浜市西区みなとみらい〇-〇-〇', tel: '045-234-5678', fax: '045-234-5679', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(75, 25, 25, 10, 8, 7), staffTotal: '18名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '13名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'] } },
  { name: 'さがみはら園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '神奈川県', img: '/images/garden-sagamihara.webp', location: { img: '/images/garden-sagamihara.webp', heading: '相模原市中心部　広々とした園庭が自慢', text: '桜のこもれびキッズランドさがみはら園は、相模原市の中心部に位置し、広い園庭が自慢の保育園です。思いっきり走り回れる空間で、子どもたちの体力と運動能力をのびのびと育てています。' }, gallery: galleryA, message: { img: MSG_IMG, text: '桜のこもれびさがみはら園の今年度のテーマは「体を動かす喜び・自分で考える力」です。広い園庭を活かした戸外活動を中心に、子どもたちが主体的に遊びを創り出す力を大切にしています。体験を通じた学びで、自信あふれる子どもを育てます。' }, info: { address: '神奈川県相模原市中央区〇-〇-〇', tel: '042-345-6789', fax: '042-345-6780', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(54, 18, 18, 6, 6, 6), staffTotal: '14名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '9名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'] } },
  { name: 'かまくら園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '神奈川県', img: '/images/garden-kamakura.webp', location: { img: '/images/garden-kamakura.webp', heading: '鎌倉の自然に囲まれた　歴史薫る保育環境', text: '桜のこもれびキッズランドかまくら園は、豊かな自然と歴史が共存する鎌倉に位置しています。四季折々の自然体験を大切にし、子どもたちが感性豊かに育つ環境を整えています。' }, gallery: galleryB, message: { img: MSG_IMG, text: '桜のこもれびかまくら園の今年度のテーマは「自然との共生・感性を育む豊かな体験」です。鎌倉の豊かな自然環境を最大限に活かし、四季の移ろいを感じながら子どもたちの感受性を育てています。' }, info: { address: '神奈川県鎌倉市〇-〇-〇', tel: '0467-34-5678', fax: '0467-34-5679', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(42, 14, 14, 5, 5, 4), staffTotal: '11名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '7名' }, { role: '調理師', count: '1名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'] } },
  { name: 'さいたま園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '埼玉県', img: '/images/garden-saitama.webp', location: { img: '/images/garden-saitama.webp', heading: '大宮駅から徒歩8分　アクセス便利な立地', text: '桜のこもれびキッズランドさいたま園は、さいたま市大宮区の住宅街に位置し、大宮駅から徒歩8分とアクセスも便利です。落ち着いた住環境の中で、子どもたちが安心して過ごせる温かな保育を行っています。' }, gallery: galleryC, message: { img: MSG_IMG, text: '桜のこもれびさいたま園の今年度のテーマは「チャレンジ精神・思いやりの心を育む」です。' }, info: { address: '埼玉県さいたま市大宮区〇-〇-〇', tel: '048-456-7890', fax: '048-456-7891', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(66, 22, 22, 8, 7, 7), staffTotal: '16名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '11名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'] } },
  { name: 'ちば園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '千葉県', img: '/images/no-image.webp', location: { img: '/images/photo-kindergarten-01.webp', heading: '千葉駅から徒歩10分　地域と連携した保育', text: '桜のこもれびキッズランドちば園は、千葉市中央区に位置し、地域のみなさんと深くつながりながら保育を行っています。' }, gallery: galleryD, message: { img: MSG_IMG, text: '桜のこもれびちば園の今年度のテーマは「つながる・広がる・地域の子どもたちを育む」です。' }, info: { address: '千葉県千葉市中央区〇-〇-〇', tel: '043-456-7890', fax: '043-456-7891', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(51, 18, 18, 5, 5, 5), staffTotal: '13名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '8名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'] } },
  { name: 'さっぽろ園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '北海道', img: '/images/garden-sapporo.webp', location: { img: '/images/garden-sapporo.webp', heading: '大通公園に近く　四季折々の自然を感じる', text: '桜のこもれびキッズランドさっぽろ園は、大通公園の近くに位置し、北海道ならではの四季の移ろいを子どもたちと共に楽しんでいます。' }, gallery: galleryA, message: { img: MSG_IMG, text: '桜のこもれびさっぽろ園の今年度のテーマは「北の大地で育む・自然と遊びの力」です。' }, info: { address: '北海道札幌市中央区〇-〇-〇', tel: '011-567-8901', fax: '011-567-8902', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(60, 20, 20, 7, 7, 6), staffTotal: '15名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '10名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'] } },
  { name: 'むさしの園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '東京都', img: '/images/garden-musashino.webp', location: { img: '/images/garden-musashino.webp', heading: '吉祥寺近く　緑豊かな武蔵野の環境', text: '桜のこもれびキッズランドむさしの園は、吉祥寺の閑静な住宅街に位置しています。武蔵野の豊かな緑に囲まれた環境の中で、子どもたちがのびのびと育つ保育を大切にしています。' }, gallery: galleryB, message: { img: MSG_IMG, text: '桜のこもれびむさしの園の今年度のテーマは「緑の中で育む・探究心と感性の開花」です。' }, info: { address: '東京都武蔵野市〇-〇-〇', tel: '0422-45-6789', fax: '0422-45-6780', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(48, 16, 16, 6, 5, 5), staffTotal: '12名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '7名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'] } },
  { name: 'まちだ園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '東京都', img: '/images/garden-machida.webp', location: { img: '/images/garden-machida.webp', heading: '町田駅から徒歩5分　公園隣接の好立地', text: '桜のこもれびキッズランドまちだ園は、町田駅から徒歩5分、広い公園に隣接した恵まれた立地にあります。' }, gallery: galleryC, message: { img: MSG_IMG, text: '桜のこもれびまちだ園の今年度のテーマは「公園と共に育む・体力と友だちとの絆」です。' }, info: { address: '東京都町田市〇-〇-〇', tel: '042-567-8901', fax: '042-567-8902', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(72, 24, 24, 8, 8, 8), staffTotal: '17名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '12名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'] } },
  { name: 'ふじさわ園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '神奈川県', img: '/images/garden-fujisawa.webp', location: { img: '/images/garden-fujisawa.webp', heading: '藤沢駅から徒歩7分　湘南の海を感じる保育', text: '桜のこもれびキッズランドふじさわ園は、藤沢駅から徒歩7分、湘南の海を感じられる環境に位置しています。' }, gallery: galleryD, message: { img: MSG_IMG, text: '桜のこもれびふじさわ園の今年度のテーマは「海と太陽の子どもたち・元気で明るい笑顔を育む」です。' }, info: { address: '神奈川県藤沢市〇-〇-〇', tel: '0466-45-6789', fax: '0466-45-6780', target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...regularAges(54, 18, 18, 6, 6, 6), staffTotal: '14名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '9名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'] } },
  { name: 'なごや園', typeCategory: '小規模保育所', type: '小規模保育所', prefecture: '愛知県', img: '/images/garden-nagoya.webp', location: { img: '/images/garden-nagoya.webp', heading: '名古屋栄駅近く　都心の利便性と温かな家庭保育', text: '桜のこもれびキッズランドなごや園は、名古屋市栄区の中心部に位置する小規模保育所です。' }, gallery: galleryA, message: { img: MSG_IMG, text: '桜のこもれびなごや園の今年度のテーマは「少人数の温かさ・一人ひとりが輝く保育」です。' }, info: { address: '愛知県名古屋市中区〇-〇-〇', tel: '052-678-9012', fax: '052-678-9013', target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...smallAges(19, 3, 8, 8), staffTotal: '6名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '4名' }, { role: '調理師', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業の基準に準じます'] } },
  { name: 'おおさか園', typeCategory: '小規模保育所', type: '小規模保育所', prefecture: '大阪府', img: '/images/garden-osaka.webp', location: { img: '/images/garden-osaka.webp', heading: '大阪梅田近く　活気ある街での家庭的保育', text: '桜のこもれびキッズランドおおさか園は、大阪市北区の梅田近くに位置する小規模保育所です。' }, gallery: galleryB, message: { img: MSG_IMG, text: '桜のこもれびおおさか園の今年度のテーマは「笑顔あふれる・大阪の子どもたちを育む」です。' }, info: { address: '大阪府大阪市北区〇-〇-〇', tel: '06-7890-1234', fax: '06-7890-1235', target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...smallAges(19, 3, 8, 8), staffTotal: '6名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '4名' }, { role: '調理師', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業の基準に準じます'] } },
  { name: 'こうべ園', typeCategory: '小規模保育所', type: '小規模保育所', prefecture: '兵庫県', img: '/images/garden-kobe.webp', location: { img: '/images/garden-kobe.webp', heading: '神戸三宮近く　異国情緒あふれる環境で', text: '桜のこもれびキッズランドこうべ園は、神戸市中央区三宮近くに位置する小規模保育所です。' }, gallery: galleryC, message: { img: MSG_IMG, text: '桜のこもれびこうべ園の今年度のテーマは「神戸の多様な文化・感性豊かな子どもを育む」です。' }, info: { address: '兵庫県神戸市中央区〇-〇-〇', tel: '078-890-1234', fax: '078-890-1235', target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...smallAges(18, 3, 7, 8), staffTotal: '5名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '3名' }, { role: '調理師', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業の基準に準じます'] } },
  { name: 'きゅうしゅう園', typeCategory: '小規模保育所', type: '小規模保育所', prefecture: '福岡県', img: '/images/letter-hiroshima.webp', location: { img: '/images/letter-hiroshima.webp', heading: '博多駅から徒歩10分　九州の温かさが息づく', text: '桜のこもれびキッズランドきゅうしゅう園は、福岡市博多区に位置する小規模保育所です。' }, gallery: galleryD, message: { img: MSG_IMG, text: '桜のこもれびきゅうしゅう園の今年度のテーマは「九州の温かさ・食と文化で育む子どもたち」です。' }, info: { address: '福岡県福岡市博多区〇-〇-〇', tel: '092-901-2345', fax: '092-901-2346', target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...smallAges(19, 3, 8, 8), staffTotal: '6名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '4名' }, { role: '調理師', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業の基準に準じます'] } },
  { name: 'かわさき園', typeCategory: '小規模保育事業A型', type: '小規模保育事業A型', prefecture: '神奈川県', img: '/images/nenkan-sports-day.webp', location: { img: '/images/nenkan-sports-day.webp', heading: '川崎駅から徒歩5分　アクセス抜群の立地', text: '桜のこもれびキッズランドかわさき園は、川崎駅から徒歩5分の好立地にある小規模保育事業A型の保育所です。' }, gallery: galleryA, message: { img: MSG_IMG, text: '桜のこもれびかわさき園の今年度のテーマは「働く親御さんを支える・安心の保育」です。' }, info: { address: '神奈川県川崎市川崎区〇-〇-〇', tel: '044-012-3456', fax: '044-012-3457', target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...smallAges(19, 3, 8, 8), staffTotal: '6名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '4名' }, { role: '調理師', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業A型の基準に準じます'] } },
  { name: 'なら園', typeCategory: '小規模保育事業A型', type: '小規模保育事業A型', prefecture: '奈良県', img: '/images/nenkan-excursion.webp', location: { img: '/images/nenkan-excursion.webp', heading: '奈良市中心部　歴史と自然に囲まれた保育', text: '桜のこもれびキッズランドなら園は、奈良市の中心部に位置し、歴史ある街並みと豊かな自然環境の中で保育を行っています。' }, gallery: galleryB, message: { img: MSG_IMG, text: '桜のこもれびなら園の今年度のテーマは「奈良の歴史と自然・豊かな感性を育む」です。' }, info: { address: '奈良県奈良市〇-〇-〇', tel: '0742-12-3456', fax: '0742-12-3457', target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...smallAges(18, 3, 7, 8), staffTotal: '5名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '3名' }, { role: '調理師', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業A型の基準に準じます'] } },
  { name: 'おきなわ園', typeCategory: '小規模保育事業A型', type: '小規模保育事業A型', prefecture: '沖縄県', img: '/images/fv-children.webp', location: { img: '/images/fv-children.webp', heading: '那覇市内　豊かな自然と文化に囲まれて', text: '桜のこもれびキッズランドおきなわ園は、那覇市内に位置する小規模保育事業A型の保育所です。' }, gallery: galleryC, message: { img: MSG_IMG, text: '桜のこもれびおきなわ園の今年度のテーマは「沖縄の太陽と海・命を大切にする保育」です。' }, info: { address: '沖縄県那覇市〇-〇-〇', tel: '098-234-5678', fax: '098-234-5679', target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate, openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours, ...smallAges(19, 3, 8, 8), staffTotal: '6名以上', staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '4名' }, { role: '調理師', count: '1名' }], staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業A型の基準に準じます'] } },
]

const letterPosts = [
  { garden: 'なは園', title: 'なは園からのおたより', excerpt: '年長さんクラス、美ら海水族館に遠足に行きました！', date: '2023ねん6がつ15にち', pref: '沖縄県', imageUrl: '/images/letter-naha.webp', body: [{ heading: '巨大なジンベエザメに圧倒される', paragraphs: ['沖縄の美しい海に囲まれたなは園では、年長さんクラスの皆さんが美ら海水族館に遠足に行ってきました！', '特に人気を集めたのはジンベエザメです。子どもたちはその迫力に圧倒され、「すごーい！」と声を上げていました。'] }, { heading: '海の生き物たちとの出会い', paragraphs: ['色鮮やかな熱帯魚たちに大興奮！目を輝かせながら水槽の前で熱心に観察していました。', '今回の遠足を通して、子どもたちは沖縄の自然の素晴らしさを肌で感じることができたようです。'] }] },
  { garden: 'ひろしま園', title: 'ひろしま園からのおたより', excerpt: '年少さん、ピクニックへ♪', date: '2024ねん4がつ6にち', pref: '広島県', imageUrl: '/images/letter-hiroshima.webp', body: [{ heading: '春のお花見ピクニック', paragraphs: ['桜の花が満開の春、ひろしま園の年少さんたちが近くの公園にピクニックへ出かけました！', 'みんなでシートを広げてお弁当を食べました。'] }, { heading: '外遊びで大はしゃぎ', paragraphs: ['お弁当の後は、みんなで鬼ごっこや砂遊びを楽しみました。', '自然の中で過ごした一日は、子どもたちにとって大切な思い出になりました。'] }] },
  { garden: 'しんじゅく園', title: 'しんじゅく園からのおたより', excerpt: '年少さんクラス、お絵描き会', date: '2024ねん2がつ10にち', pref: '東京都', imageUrl: '/images/letter-shinjuku-drawing.webp', body: [{ heading: 'みんなで描こう！お絵描き会', paragraphs: ['しんじゅく園の年少さんクラスで、楽しいお絵描き会を開催しました。テーマは「大好きなもの」です。', '子どもたちは思い思いに絵具やクレヨンを使って描きました。'] }, { heading: '個性あふれる作品たち', paragraphs: ['完成した作品は廊下に飾り、みんなで鑑賞会を行いました。', 'お父さん・お母さんにプレゼントするために持ち帰った子もいて、とても喜ばれたようです。'] }] },
  { garden: 'しぶや園', title: 'しぶや園からのおたより', excerpt: 'しぶや園の日常', date: '2024ねん1がつ21にち', pref: '東京都', imageUrl: '/images/garden-nagoya.webp', body: [{ heading: '冬の園での一コマ', paragraphs: ['寒い冬でも、しぶや園の子どもたちは元気いっぱいです！毎朝、園庭で体操をしてから一日をスタートしています。', '最近は縄跳びが大ブームで、友達と一緒に練習する姿が微笑ましいです。'] }, { heading: 'お正月遊びを楽しもう', paragraphs: ['お正月明けには、こまやけん玉、羽根つきなどの伝統的なお正月遊びを楽しみました。'] }] },
  { garden: 'おおさか園', title: 'おおさか園からのおたより', excerpt: 'ローマ字のお勉強', date: '2023ねん12がつ10にち', pref: '大阪府', imageUrl: '/images/letter-osaka.webp', body: [{ heading: 'はじめてのローマ字', paragraphs: ['おおさか園では、年長さんクラスがローマ字の学習をスタートしました。', '自分の名前をローマ字で書けるようになったとき、子どもたちはとても誇らしそうでした。'] }] },
  { garden: 'よこはま園', title: 'よこはま園からのおたより', excerpt: '年長さんクラス、科学博物館に遠足！', date: '2023ねん11がつ9にち', pref: '神奈川県', imageUrl: '/images/garden-sagamihara.webp', body: [{ heading: '不思議がいっぱい！科学博物館', paragraphs: ['よこはま園の年長さんクラスが、科学博物館に遠足に行ってきました。', 'プラネタリウムでは、満天の星空に「わあ！」と歓声が上がりました。'] }] },
  { garden: 'なは園', title: 'なは園からのおたより', excerpt: '秋の収穫体験、さつまいも掘りに行きました', date: '2023ねん10がつ20にち', pref: '沖縄県', imageUrl: '/images/garden-yokohama.webp', body: [{ heading: '畑でさつまいも掘り体験', paragraphs: ['秋晴れの気持ちいい日に、なは園の子どもたちが農家さんの畑へさつまいも掘り体験に行ってきました！'] }, { heading: '収穫したお芋でおやつ作り', paragraphs: ['掘ってきたさつまいもは園に持ち帰り、翌日みんなで蒸かしいもにして食べました。'] }] },
  { garden: 'しんじゅく園', title: 'しんじゅく園からのおたより', excerpt: '運動会、みんな頑張りました！', date: '2023ねん9がつ30にち', pref: '東京都', imageUrl: '/images/letter-shinjuku-sports.webp', body: [{ heading: 'みんなで力を合わせた運動会', paragraphs: ['しんじゅく園の運動会が晴天のもと開催されました！子どもたちは全力で取り組みました。'] }] },
  { garden: 'ひろしま園', title: 'ひろしま園からのおたより', excerpt: 'たなばた会、笹に願いを込めて', date: '2023ねん7がつ7にち', pref: '広島県', imageUrl: '/images/garden-kobe.webp', body: [{ heading: '七夕飾りを作ったよ', paragraphs: ['7月7日、ひろしま園でたなばた会を行いました。夢いっぱいの短冊が並びました。'] }] },
  { garden: 'きゅうしゅう園', title: 'きゅうしゅう園からのおたより', excerpt: '春の遠足、公園で楽しく遊びました', date: '2023ねん5がつ18にち', pref: '福岡県', imageUrl: '/images/garden-osaka.webp', body: [{ heading: '春の公園で思いっきり遊ぼう', paragraphs: ['きゅうしゅう園の子どもたちが、春の遠足で近くの大きな公園へ行ってきました！'] }] },
  { garden: 'しんじゅく園', title: 'しんじゅく園からのおたより', excerpt: '絵の具あそび、みんな楽しんでいます', date: '2023ねん4がつ5にち', pref: '東京都', imageUrl: '/images/nenkan-halloween.webp', body: [{ heading: '色とりどりの絵の具あそび', paragraphs: ['新年度がスタートしたしんじゅく園では、みんなで絵の具あそびを楽しみました！'] }] },
  { garden: 'しぶや園', title: 'しぶや園からのおたより', excerpt: '新年度スタート！入園式の様子', date: '2023ねん4がつ1にち', pref: '東京都', imageUrl: '/images/nenkan-entrance-ceremony.webp', body: [{ heading: '新しい仲間をお迎えしました', paragraphs: ['しぶや園に新しいお友達がやってきました！入園式では温かい雰囲気の中で式が進みました。'] }] },
]

const infoPosts = [
  { category: 'news', date: '2024-04-01', title: '2024年度 新入園児を募集しています', excerpt: '2024年度の新入園児の募集を開始しました。見学会も随時受け付けております。', imageUrl: '/images/logo.svg', body: [{ heading: '募集要項', paragraphs: ['2024年度の新入園児の募集を開始しました。各園の定員に空きがある場合に随時受け付けております。', 'ご希望の方はお電話またはお問い合わせフォームよりご連絡ください。'] }] },
  { category: 'news', date: '2024-03-15', title: '春の入園説明会のご案内', excerpt: '各園にて春の入園説明会を開催します。お気軽にご参加ください。', imageUrl: '/images/logo.svg', body: [{ heading: '開催日程', paragraphs: ['各園にて入園説明会を開催いたします。保育内容や施設についてご説明します。'] }] },
  { category: 'news', date: '2024-02-01', title: '保育園だより 2月号を発行しました', excerpt: '2月の保育園だよりを発行しました。今月のイベント情報をご確認ください。', imageUrl: '/images/logo.svg', body: [{ heading: '2月の主なイベント', paragraphs: ['節分、バレンタインなど季節のイベントを各園で実施予定です。'] }] },
  { category: 'activity', date: '2024-01-20', title: '冬の自然体験プログラムを実施しました', excerpt: '各園で冬ならではの自然体験プログラムを実施しました。', imageUrl: '/images/logo.svg', body: [{ heading: '冬の体験活動', paragraphs: ['各園で冬ならではの体験活動を実施しました。子どもたちは季節の変化を五感で楽しみました。'] }] },
  { category: 'activity', date: '2023-12-20', title: 'クリスマス発表会を開催しました', excerpt: '各園でクリスマス発表会を開催し、子どもたちの歌や踊りを披露しました。', imageUrl: '/images/logo.svg', body: [{ heading: 'クリスマス発表会', paragraphs: ['子どもたちが練習を重ねてきた歌や踊りを保護者の皆さまにお披露目しました。'] }] },
  { category: 'media', date: '2023-11-10', title: '地域育児支援の取り組みが新聞に掲載されました', excerpt: '当園の地域育児支援の取り組みについて、地方紙に掲載していただきました。', imageUrl: '/images/logo.svg', body: [{ heading: 'メディア掲載のご報告', paragraphs: ['地域育児支援の取り組みについて、地方紙にご紹介いただきました。'] }] },
  { category: 'media', date: '2023-10-05', title: '保育士の働き方改革についてインタビューを受けました', excerpt: '保育士の働き方改革についての取り組みがメディアで紹介されました。', imageUrl: '/images/logo.svg', body: [{ heading: 'メディア掲載', paragraphs: ['保育士の働き方改革についての取り組みについて、専門誌のインタビューを受けました。'] }] },
  { category: 'activity', date: '2023-09-15', title: '秋の運動会を開催しました', excerpt: '秋晴れのもと各園で運動会を開催しました。', imageUrl: '/images/logo.svg', body: [{ heading: '運動会の様子', paragraphs: ['好天に恵まれた中、各園で運動会を開催しました。保護者の皆さまにも多数ご参加いただきました。'] }] },
  { category: 'news', date: '2023-08-01', title: '夏期保育についてのお知らせ', excerpt: '夏期保育の実施スケジュールをお知らせします。', imageUrl: '/images/logo.svg', body: [{ heading: '夏期保育スケジュール', paragraphs: ['夏期保育の実施スケジュールについてお知らせします。詳細は各園までお問い合わせください。'] }] },
  { category: 'activity', date: '2023-06-10', title: '七夕まつりを開催しました', excerpt: '各園で七夕まつりを開催し、子どもたちが願い事を短冊に書きました。', imageUrl: '/images/logo.svg', body: [{ heading: '七夕まつりの様子', paragraphs: ['各園で七夕まつりを開催しました。子どもたちがそれぞれ願い事を書いた短冊を笹に飾りました。'] }] },
  { category: 'media', date: '2023-05-01', title: '保育雑誌に当園の取り組みが掲載されました', excerpt: '保育の質向上に向けた取り組みが専門誌に掲載されました。', imageUrl: '/images/logo.svg', body: [{ heading: '掲載情報', paragraphs: ['保育の質向上に向けた取り組みについて、保育専門誌にご紹介いただきました。'] }] },
  { category: 'news', date: '2023-04-01', title: '2023年度がスタートしました', excerpt: '新しい年度が始まりました。今年度もよろしくお願いいたします。', imageUrl: '/images/logo.svg', body: [{ heading: '新年度のご挨拶', paragraphs: ['2023年度がスタートしました。新入園児の皆さん、ご入園おめでとうございます。今年度もよろしくお願いいたします。'] }] },
]

async function importCollection(collectionName, data) {
  console.log(`\n📦 ${collectionName} をインポート中... (${data.length}件)`)
  for (const item of data) {
    await addDoc(collectionName, item)
    process.stdout.write('.')
  }
  console.log(`\n✅ ${collectionName} 完了`)
}

async function main() {
  console.log(`🚀 プロジェクト: ${PROJECT_ID}`)
  console.log('Firestoreへのインポートを開始します\n')
  await importCollection('gardens', gardens)
  await importCollection('letterPosts', letterPosts)
  await importCollection('infoPosts', infoPosts)
  console.log('\n🎉 すべてのインポートが完了しました！')
  process.exit(0)
}

main().catch((e) => {
  console.error('❌ エラー:', e.message)
  process.exit(1)
})
