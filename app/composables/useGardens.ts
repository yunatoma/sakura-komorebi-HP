export interface GardenInfo {
  address: string
  tel: string
  fax: string
  target: string
  enrollmentDate: string
  openDays: boolean[]  // [月, 火, 水, 木, 金, 土, 日]
  openDaysNote: string
  hoursStandard: string
  hoursStandardExtended: string
  hoursShort: string
  hoursShortExtended: string
  capacityTotal: number
  capacityAges: { age: string; count: number }[]
  staffTotal: string
  staffRoles: { role: string; count: string }[]
  staffNotes: string[]
}

export interface Garden {
  id: number
  name: string
  typeCategory: string
  type: string
  prefecture: string
  img: string
  location: { img: string; heading: string; text: string }
  gallery: { src: string; alt: string }[]
  message: { img: string; text: string }
  info: GardenInfo
}

// ---- Gallery image pools ----
const gp = (nums: number[]) => nums.map((n, i) => ({ src: `/images/garden-photo-${n}.webp`, alt: `園の様子${i + 1}` }))
const gi = (names: string[]) => names.map((n, i) => ({ src: `/images/${n}.webp`, alt: `園の様子${i + 1}` }))

const galleryA = gp([20, 21, 22, 39, 40, 41])
const galleryB = gp([42, 43, 44, 45, 46, 47])
const galleryC = gi(['nenkan-entrance-ceremony', 'nenkan-halloween', 'nenkan-sports-day', 'nenkan-excursion', 'nenkan-summer', 'nenkan-tanabata'])
const galleryD = gi(['fv-children', 'photo-children-01', 'photo-children-02', 'photo-kindergarten-01', 'photo-kindergarten-02', 'nenkan-recreation'])

const MSG_IMG = '/images/garden-single-message.webp'

// ---- Shared base info ----
const weekdaysSat: boolean[] = [true, true, true, true, true, true, false]
const weekdaysNote = '月曜日〜土曜日（日曜日、祝日・休日、年末年始（12/29〜1/3）はお休み）'
const stdHours = { hoursStandard: '7：30〜18：30', hoursStandardExtended: '18：31〜19：30', hoursShort: '9：00〜17：00', hoursShortExtended: '7：30〜8：59 / 17：01〜19：30' }
const enrollmentDate = '原則として毎月1日'

const regularAges = (total: number, a1: number, a2: number, a3: number, a4: number, a5: number) => ({
  capacityTotal: total,
  capacityAges: [
    { age: '1歳児', count: a1 },
    { age: '2歳児', count: a2 },
    { age: '3歳児', count: a3 },
    { age: '4歳児', count: a4 },
    { age: '5歳児', count: a5 },
  ],
})

const smallAges = (total: number, a0: number, a1: number, a2: number) => ({
  capacityTotal: total,
  capacityAges: [
    { age: '0歳児', count: a0 },
    { age: '1歳児', count: a1 },
    { age: '2歳児', count: a2 },
  ],
})

export const useGardens = () => {
  const allGardens: Garden[] = [
    // ---- 1. しぶや園 ----
    {
      id: 1, name: 'しぶや園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '東京都',
      img: '/images/nenkan-entrance-ceremony.webp',
      location: {
        img: '/images/nenkan-entrance-ceremony.webp',
        heading: '渋谷駅から徒歩2分　利便性の高い立地',
        text: '桜のこもれびキッズランドしぶや園は、渋谷駅から徒歩2分という利便性の高い立地に位置しています。都心でありながらも自然と調和した環境で、子どもたちが安心して過ごせる場所を提供しています。地域の皆様に愛され、信頼される保育園として、心を込めてお子さまをお預かりしています。',
      },
      gallery: galleryA,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびしぶや園の今年度のテーマは「運動と音楽のコラボレーション・自然と食の融合」です。体操資格、リトミック資格を持った職員を中心に音楽に合わせて体を動かし、個々に持っている潜在的な基礎能力の発達を促します。普段の園の様子は定期的にこもれびだよりに掲載しています。月1回保育園の開放も行っています。職員一同お待ちしていますのでぜひ見学にいらしてください。',
      },
      info: {
        address: '東京都渋谷区渋谷〇-〇-〇', tel: '03-1234-5678', fax: '03-1234-5679',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(51, 18, 18, 5, 5, 5),
        staffTotal: '13名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '8名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます', '※保育児童数・年齢に応じたシフトにより、職員を増減します'],
      },
    },
    // ---- 2. しんじゅく園 ----
    {
      id: 2, name: 'しんじゅく園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '東京都',
      img: '/images/nenkan-halloween.webp',
      location: {
        img: '/images/garden-musashino.webp',
        heading: '新宿駅南口から徒歩3分　都心で緑豊かな環境',
        text: '桜のこもれびキッズランドしんじゅく園は、新宿駅南口から徒歩3分の好立地にありながら、豊かな緑に囲まれた落ち着いた環境が自慢の保育園です。創造力を育む多彩なプログラムで、子どもたちの可能性を広げています。',
      },
      gallery: galleryB,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびしんじゅく園の今年度のテーマは「創造と表現・仲間との絆」です。絵画・音楽・造形活動を通じて子どもたちの豊かな表現力を育みます。友だちとの関わりを大切にし、思いやりの心を育てていきます。月1回保育園の開放も行っています。職員一同お待ちしていますのでぜひ見学にいらしてください。',
      },
      info: {
        address: '東京都新宿区新宿〇-〇-〇', tel: '03-2345-6789', fax: '03-2345-6780',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(60, 20, 20, 7, 7, 6),
        staffTotal: '15名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '10名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'],
      },
    },
    // ---- 3. あかばね園 ----
    {
      id: 3, name: 'あかばね園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '東京都',
      img: '/images/no-image.webp',
      location: {
        img: '/images/garden-machida.webp',
        heading: '赤羽駅から徒歩5分　地域に根ざした保育',
        text: '桜のこもれびキッズランドあかばね園は、赤羽駅から徒歩5分の場所にあり、地域のみなさんに長年愛されてきた保育園です。近隣の公園や自然環境を活かしたのびのびとした保育を実践しています。',
      },
      gallery: galleryC,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびあかばね園の今年度のテーマは「地域とのつながり・のびのびと遊ぶ力」です。近くの公園での自然遊びや地域行事への参加を通じて、社会性と体力を育みます。保護者の方々と一緒に子どもたちの成長を支えていきます。',
      },
      info: {
        address: '東京都北区赤羽〇-〇-〇', tel: '03-3456-7890', fax: '03-3456-7891',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(48, 16, 16, 6, 5, 5),
        staffTotal: '12名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '7名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'],
      },
    },
    // ---- 4. よこはま園 ----
    {
      id: 4, name: 'よこはま園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '神奈川県',
      img: '/images/garden-yokohama.webp',
      location: {
        img: '/images/garden-yokohama.webp',
        heading: 'みなとみらい近く　海の見える保育環境',
        text: '桜のこもれびキッズランドよこはま園は、横浜みなとみらい近くに位置し、港の景色を感じながら保育が受けられる特別な環境にあります。海を感じるプログラムや国際色豊かな取り組みで、視野の広い子どもを育てます。',
      },
      gallery: galleryD,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびよこはま園の今年度のテーマは「海と自然の探究・心豊かな子どもを育む」です。横浜という国際都市の特色を活かし、多様な文化に触れる機会を設けています。子どもたちの好奇心を大切に、毎日の発見を一緒に喜び合っています。',
      },
      info: {
        address: '神奈川県横浜市西区みなとみらい〇-〇-〇', tel: '045-234-5678', fax: '045-234-5679',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(75, 25, 25, 10, 8, 7),
        staffTotal: '18名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '13名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'],
      },
    },
    // ---- 5. さがみはら園 ----
    {
      id: 5, name: 'さがみはら園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '神奈川県',
      img: '/images/garden-sagamihara.webp',
      location: {
        img: '/images/garden-sagamihara.webp',
        heading: '相模原市中心部　広々とした園庭が自慢',
        text: '桜のこもれびキッズランドさがみはら園は、相模原市の中心部に位置し、広い園庭が自慢の保育園です。思いっきり走り回れる空間で、子どもたちの体力と運動能力をのびのびと育てています。',
      },
      gallery: galleryA,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびさがみはら園の今年度のテーマは「体を動かす喜び・自分で考える力」です。広い園庭を活かした戸外活動を中心に、子どもたちが主体的に遊びを創り出す力を大切にしています。体験を通じた学びで、自信あふれる子どもを育てます。',
      },
      info: {
        address: '神奈川県相模原市中央区〇-〇-〇', tel: '042-345-6789', fax: '042-345-6780',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(54, 18, 18, 6, 6, 6),
        staffTotal: '14名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '9名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'],
      },
    },
    // ---- 6. かまくら園 ----
    {
      id: 6, name: 'かまくら園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '神奈川県',
      img: '/images/garden-kamakura.webp',
      location: {
        img: '/images/garden-kamakura.webp',
        heading: '鎌倉の自然に囲まれた　歴史薫る保育環境',
        text: '桜のこもれびキッズランドかまくら園は、豊かな自然と歴史が共存する鎌倉に位置しています。四季折々の自然体験を大切にし、子どもたちが感性豊かに育つ環境を整えています。鎌倉の歴史・文化を日々の保育に取り入れ、子どもたちの学びを深めます。',
      },
      gallery: galleryB,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびかまくら園の今年度のテーマは「自然との共生・感性を育む豊かな体験」です。鎌倉の豊かな自然環境を最大限に活かし、四季の移ろいを感じながら子どもたちの感受性を育てています。歴史的な環境の中での保育は、子どもたちに特別な体験をもたらします。',
      },
      info: {
        address: '神奈川県鎌倉市〇-〇-〇', tel: '0467-34-5678', fax: '0467-34-5679',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(42, 14, 14, 5, 5, 4),
        staffTotal: '11名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '7名' }, { role: '調理師', count: '1名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'],
      },
    },
    // ---- 7. さいたま園 ----
    {
      id: 7, name: 'さいたま園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '埼玉県',
      img: '/images/garden-saitama.webp',
      location: {
        img: '/images/garden-saitama.webp',
        heading: '大宮駅から徒歩8分　アクセス便利な立地',
        text: '桜のこもれびキッズランドさいたま園は、さいたま市大宮区の住宅街に位置し、大宮駅から徒歩8分とアクセスも便利です。落ち着いた住環境の中で、子どもたちが安心して過ごせる温かな保育を行っています。',
      },
      gallery: galleryC,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびさいたま園の今年度のテーマは「チャレンジ精神・思いやりの心を育む」です。子どもたちが新しいことに積極的に挑戦できるよう、温かく見守りながらサポートしています。友だちへの思いやりと助け合いの精神を日々の生活の中で育てます。',
      },
      info: {
        address: '埼玉県さいたま市大宮区〇-〇-〇', tel: '048-456-7890', fax: '048-456-7891',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(66, 22, 22, 8, 7, 7),
        staffTotal: '16名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '11名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'],
      },
    },
    // ---- 8. ちば園 ----
    {
      id: 8, name: 'ちば園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '千葉県',
      img: '/images/no-image.webp',
      location: {
        img: '/images/photo-kindergarten-01.webp',
        heading: '千葉駅から徒歩10分　地域と連携した保育',
        text: '桜のこもれびキッズランドちば園は、千葉市中央区に位置し、地域のみなさんと深くつながりながら保育を行っています。近隣の小学校や地域のお年寄りとの交流を大切にし、社会性豊かな子どもたちを育てています。',
      },
      gallery: galleryD,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびちば園の今年度のテーマは「つながる・広がる・地域の子どもたちを育む」です。地域の方々との多世代交流を積極的に取り入れ、子どもたちが幅広い人間関係の中で育ちを深める環境を整えています。',
      },
      info: {
        address: '千葉県千葉市中央区〇-〇-〇', tel: '043-456-7890', fax: '043-456-7891',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(51, 18, 18, 5, 5, 5),
        staffTotal: '13名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '8名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'],
      },
    },
    // ---- 9. さっぽろ園 ----
    {
      id: 9, name: 'さっぽろ園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '北海道',
      img: '/images/garden-sapporo.webp',
      location: {
        img: '/images/garden-sapporo.webp',
        heading: '大通公園に近く　四季折々の自然を感じる',
        text: '桜のこもれびキッズランドさっぽろ園は、大通公園の近くに位置し、北海道ならではの四季の移ろいを子どもたちと共に楽しんでいます。冬の雪遊びから夏の緑豊かな戸外活動まで、豊かな自然体験が子どもたちの成長を支えます。',
      },
      gallery: galleryA,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびさっぽろ園の今年度のテーマは「北の大地で育む・自然と遊びの力」です。北海道の豊かな自然環境を最大限に活用し、雪・氷・緑など四季それぞれの素材を使った体験活動を大切にしています。寒さにも負けない元気な子どもたちを育てています。',
      },
      info: {
        address: '北海道札幌市中央区〇-〇-〇', tel: '011-567-8901', fax: '011-567-8902',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(60, 20, 20, 7, 7, 6),
        staffTotal: '15名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '10名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'],
      },
    },
    // ---- 10. むさしの園 ----
    {
      id: 10, name: 'むさしの園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '東京都',
      img: '/images/garden-musashino.webp',
      location: {
        img: '/images/garden-musashino.webp',
        heading: '吉祥寺近く　緑豊かな武蔵野の環境',
        text: '桜のこもれびキッズランドむさしの園は、吉祥寺の閑静な住宅街に位置しています。武蔵野の豊かな緑に囲まれた環境の中で、子どもたちがのびのびと育つ保育を大切にしています。',
      },
      gallery: galleryB,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびむさしの園の今年度のテーマは「緑の中で育む・探究心と感性の開花」です。武蔵野の豊かな自然を毎日の保育に取り入れ、子どもたちが自ら発見し考える力を育てています。自然の中での体験が、生涯の宝となる感受性を養います。',
      },
      info: {
        address: '東京都武蔵野市〇-〇-〇', tel: '0422-45-6789', fax: '0422-45-6780',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(48, 16, 16, 6, 5, 5),
        staffTotal: '12名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '7名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'],
      },
    },
    // ---- 11. まちだ園 ----
    {
      id: 11, name: 'まちだ園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '東京都',
      img: '/images/garden-machida.webp',
      location: {
        img: '/images/garden-machida.webp',
        heading: '町田駅から徒歩5分　公園隣接の好立地',
        text: '桜のこもれびキッズランドまちだ園は、町田駅から徒歩5分、広い公園に隣接した恵まれた立地にあります。広大な公園を庭代わりに利用し、子どもたちが自然の中でのびのびと体を動かせる環境を整えています。',
      },
      gallery: galleryC,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびまちだ園の今年度のテーマは「公園と共に育む・体力と友だちとの絆」です。隣接する公園での自由な外遊びを通じて、体力づくりと友だちとの関わり方を学んでいます。思いっきり遊んで、思いっきり食べて、よく眠る、健康な子どもたちを育てます。',
      },
      info: {
        address: '東京都町田市〇-〇-〇', tel: '042-567-8901', fax: '042-567-8902',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(72, 24, 24, 8, 8, 8),
        staffTotal: '17名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '12名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'],
      },
    },
    // ---- 12. ふじさわ園 ----
    {
      id: 12, name: 'ふじさわ園', typeCategory: '認定保育所', type: '認可保育所', prefecture: '神奈川県',
      img: '/images/garden-fujisawa.webp',
      location: {
        img: '/images/garden-fujisawa.webp',
        heading: '藤沢駅から徒歩7分　湘南の海を感じる保育',
        text: '桜のこもれびキッズランドふじさわ園は、藤沢駅から徒歩7分、湘南の海を感じられる環境に位置しています。潮風と太陽の恵みを受けながら、元気いっぱいの子どもたちを育てています。',
      },
      gallery: galleryD,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびふじさわ園の今年度のテーマは「海と太陽の子どもたち・元気で明るい笑顔を育む」です。湘南の開放的な雰囲気の中で、子どもたちが明るく元気に育つ保育を実践しています。海への遠足や砂浜遊びなど、地域の自然を活かした特別な体験を大切にしています。',
      },
      info: {
        address: '神奈川県藤沢市〇-〇-〇', tel: '0466-45-6789', fax: '0466-45-6780',
        target: '１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...regularAges(54, 18, 18, 6, 6, 6),
        staffTotal: '14名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '9名' }, { role: '調理師', count: '2名' }, { role: '看護師', count: '1名' }, { role: '事務員', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は認可保育所の基準に準じます'],
      },
    },
    // ---- 13. なごや園（小規模） ----
    {
      id: 13, name: 'なごや園', typeCategory: '小規模保育所', type: '小規模保育所', prefecture: '愛知県',
      img: '/images/garden-nagoya.webp',
      location: {
        img: '/images/garden-nagoya.webp',
        heading: '名古屋栄駅近く　都心の利便性と温かな家庭保育',
        text: '桜のこもれびキッズランドなごや園は、名古屋市栄区の中心部に位置する小規模保育所です。少人数ならではのアットホームな雰囲気の中で、一人ひとりの子どもにじっくりと向き合う保育を実践しています。',
      },
      gallery: galleryA,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびなごや園の今年度のテーマは「少人数の温かさ・一人ひとりが輝く保育」です。小規模保育の強みを活かし、子ども一人ひとりの発達段階に寄り添ったきめ細やかな保育を提供しています。家庭的な雰囲気の中で、子どもたちが安心して育ちます。',
      },
      info: {
        address: '愛知県名古屋市中区〇-〇-〇', tel: '052-678-9012', fax: '052-678-9013',
        target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...smallAges(19, 3, 8, 8),
        staffTotal: '6名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '4名' }, { role: '調理師', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業の基準に準じます'],
      },
    },
    // ---- 14. おおさか園（小規模） ----
    {
      id: 14, name: 'おおさか園', typeCategory: '小規模保育所', type: '小規模保育所', prefecture: '大阪府',
      img: '/images/garden-osaka.webp',
      location: {
        img: '/images/garden-osaka.webp',
        heading: '大阪梅田近く　活気ある街での家庭的保育',
        text: '桜のこもれびキッズランドおおさか園は、大阪市北区の梅田近くに位置する小規模保育所です。大阪の活気ある街の中心でありながら、子どもたちが落ち着いて過ごせる温かな空間を作っています。',
      },
      gallery: galleryB,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびおおさか園の今年度のテーマは「笑顔あふれる・大阪の子どもたちを育む」です。大阪らしい明るく元気な雰囲気の中で、子どもたちがのびのびと育つ保育を実践しています。少人数だからこそできるきめ細やかなサポートを大切にしています。',
      },
      info: {
        address: '大阪府大阪市北区〇-〇-〇', tel: '06-7890-1234', fax: '06-7890-1235',
        target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...smallAges(19, 3, 8, 8),
        staffTotal: '6名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '4名' }, { role: '調理師', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業の基準に準じます'],
      },
    },
    // ---- 15. こうべ園（小規模） ----
    {
      id: 15, name: 'こうべ園', typeCategory: '小規模保育所', type: '小規模保育所', prefecture: '兵庫県',
      img: '/images/garden-kobe.webp',
      location: {
        img: '/images/garden-kobe.webp',
        heading: '神戸三宮近く　異国情緒あふれる環境で',
        text: '桜のこもれびキッズランドこうべ園は、神戸市中央区三宮近くに位置する小規模保育所です。異国情緒あふれる神戸の街の雰囲気を活かし、国際的な感覚を育てる保育を実践しています。',
      },
      gallery: galleryC,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびこうべ園の今年度のテーマは「神戸の多様な文化・感性豊かな子どもを育む」です。神戸の異文化交流の土地柄を活かし、多様性を受け入れる心を育てています。少人数の温かな環境の中で、子どもたちの個性を大切にしています。',
      },
      info: {
        address: '兵庫県神戸市中央区〇-〇-〇', tel: '078-890-1234', fax: '078-890-1235',
        target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...smallAges(18, 3, 7, 8),
        staffTotal: '5名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '3名' }, { role: '調理師', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業の基準に準じます'],
      },
    },
    // ---- 16. きゅうしゅう園（小規模） ----
    {
      id: 16, name: 'きゅうしゅう園', typeCategory: '小規模保育所', type: '小規模保育所', prefecture: '福岡県',
      img: '/images/letter-hiroshima.webp',
      location: {
        img: '/images/letter-hiroshima.webp',
        heading: '博多駅から徒歩10分　九州の温かさが息づく',
        text: '桜のこもれびキッズランドきゅうしゅう園は、福岡市博多区に位置する小規模保育所です。九州の温かい人情と豊かな食文化を大切にしながら、子どもたちを育てています。地域の方々の温かいサポートの中で運営しています。',
      },
      gallery: galleryD,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびきゅうしゅう園の今年度のテーマは「九州の温かさ・食と文化で育む子どもたち」です。九州の豊かな食材を使った給食や、地域の伝統文化に触れる活動を通じて、子どもたちのふるさと愛を育てています。',
      },
      info: {
        address: '福岡県福岡市博多区〇-〇-〇', tel: '092-901-2345', fax: '092-901-2346',
        target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...smallAges(19, 3, 8, 8),
        staffTotal: '6名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '4名' }, { role: '調理師', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業の基準に準じます'],
      },
    },
    // ---- 17. かわさき園（A型） ----
    {
      id: 17, name: 'かわさき園', typeCategory: '小規模保育事業A型', type: '小規模保育事業A型', prefecture: '神奈川県',
      img: '/images/nenkan-sports-day.webp',
      location: {
        img: '/images/nenkan-sports-day.webp',
        heading: '川崎駅から徒歩5分　アクセス抜群の立地',
        text: '桜のこもれびキッズランドかわさき園は、川崎駅から徒歩5分の好立地にある小規模保育事業A型の保育所です。共働きのご家庭を全力でサポートする、使いやすい保育環境を整えています。',
      },
      gallery: galleryA,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびかわさき園の今年度のテーマは「働く親御さんを支える・安心の保育」です。保護者の方が安心してお子さまを預けられるよう、きめ細やかな連絡と丁寧な保育を心がけています。少人数だからこそできる手厚いサポートを提供します。',
      },
      info: {
        address: '神奈川県川崎市川崎区〇-〇-〇', tel: '044-012-3456', fax: '044-012-3457',
        target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...smallAges(19, 3, 8, 8),
        staffTotal: '6名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '4名' }, { role: '調理師', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業A型の基準に準じます'],
      },
    },
    // ---- 18. なら園（A型） ----
    {
      id: 18, name: 'なら園', typeCategory: '小規模保育事業A型', type: '小規模保育事業A型', prefecture: '奈良県',
      img: '/images/nenkan-excursion.webp',
      location: {
        img: '/images/nenkan-excursion.webp',
        heading: '奈良市中心部　歴史と自然に囲まれた保育',
        text: '桜のこもれびキッズランドなら園は、奈良市の中心部に位置し、歴史ある街並みと豊かな自然環境の中で保育を行っています。世界遺産に囲まれた特別な環境が、子どもたちの豊かな感性を育てます。',
      },
      gallery: galleryB,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびなら園の今年度のテーマは「奈良の歴史と自然・豊かな感性を育む」です。奈良公園での遠足や地域の伝統行事への参加を通じて、子どもたちが日本の文化と自然の美しさを感じる機会を大切にしています。',
      },
      info: {
        address: '奈良県奈良市〇-〇-〇', tel: '0742-12-3456', fax: '0742-12-3457',
        target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...smallAges(18, 3, 7, 8),
        staffTotal: '5名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '3名' }, { role: '調理師', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業A型の基準に準じます'],
      },
    },
    // ---- 19. おきなわ園（A型） ----
    {
      id: 19, name: 'おきなわ園', typeCategory: '小規模保育事業A型', type: '小規模保育事業A型', prefecture: '沖縄県',
      img: '/images/fv-children.webp',
      location: {
        img: '/images/fv-children.webp',
        heading: '那覇市内　豊かな自然と文化に囲まれて',
        text: '桜のこもれびキッズランドおきなわ園は、那覇市内に位置する小規模保育事業A型の保育所です。沖縄の温暖な気候と豊かな自然、独自の文化を活かした保育で、子どもたちの心身の発達を支えています。',
      },
      gallery: galleryC,
      message: {
        img: MSG_IMG,
        text: '桜のこもれびおきなわ園の今年度のテーマは「沖縄の太陽と海・命を大切にする保育」です。沖縄の豊かな自然と独自の文化を保育に取り入れ、子どもたちが命の大切さと生きる喜びを感じられる環境を作っています。ちゅらかーぎー（美しい心）を育てます。',
      },
      info: {
        address: '沖縄県那覇市〇-〇-〇', tel: '098-234-5678', fax: '098-234-5679',
        target: '０歳児から２歳児（産休・育休明けの乳幼児）', enrollmentDate,
        openDays: weekdaysSat, openDaysNote: weekdaysNote, ...stdHours,
        ...smallAges(19, 3, 8, 8),
        staffTotal: '6名以上',
        staffRoles: [{ role: '園長', count: '1名' }, { role: '保育士', count: '4名' }, { role: '調理師', count: '1名' }],
        staffNotes: ['※嘱託医 1名', '※保育士は小規模保育事業A型の基準に準じます'],
      },
    },
  ]

  const getGardenById = (id: number) => allGardens.find(g => g.id === id)

  return { allGardens, getGardenById }
}
