export interface ContactFormData {
  name: string
  childAge: string
  zip: string
  prefecture: string
  city: string
  street: string
  phone: string
  email: string
  nursery: string
  message: string
  agreed: boolean
}

export const useContactForm = () => {
  return useState<ContactFormData>('contactForm', () => ({
    name: 'やまだ　はなこ',
    childAge: '3歳',
    zip: '150-0001',
    prefecture: '東京都',
    city: '渋谷区神宮前',
    street: '1-2-3 サクラマンション101',
    phone: '090-1234-5678',
    email: 'hanako@example.com',
    nursery: '桜のこもれびキッズランド〇〇園',
    message: '見学を希望しております。\n来週の平日午前中にお伺いすることは可能でしょうか。\nよろしくお願いいたします。',
    agreed: true,
  }))
}
