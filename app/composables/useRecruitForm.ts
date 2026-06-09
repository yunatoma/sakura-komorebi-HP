export interface RecruitFormData {
  inquiryType: string
  inquiryContent: string
  graduation: string
  name: string
  kana: string
  birthdate: string
  gender: string
  zip: string
  prefecture: string
  city: string
  street: string
  phone: string
  email: string
  school: string
  department: string
  jobType: string
  employmentType: string
  area: string
  message: string
  agreed: boolean
}

export const useRecruitForm = () => {
  return useState<RecruitFormData>('recruitForm', () => ({
    inquiryType: '採用',
    inquiryContent: '採用試験について詳しく教えていただきたいです。',
    graduation: '2024年3月',
    name: 'やまだ　たろう',
    kana: 'やまだ　たろう',
    birthdate: '2001年4月1日',
    gender: '男性',
    zip: '000-0000',
    prefecture: '東京都',
    city: '渋谷区〇〇市',
    street: '0-0-0',
    phone: '000-0000-0000',
    email: 'example@gmail.com',
    school: '〇〇大学',
    department: '〇〇学部',
    jobType: '保育士（保育士免許あり）',
    employmentType: '正社員',
    area: '都内',
    message: 'お問い合わせ内容が入ります。',
    agreed: true,
  }))
}
