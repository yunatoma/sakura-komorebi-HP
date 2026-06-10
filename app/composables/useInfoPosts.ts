export type InfoCategory = 'news' | 'activity' | 'media'

export interface InfoBodySection {
  heading: string
  paragraphs: string[]
}

export interface InfoPost {
  id: string
  category: InfoCategory
  date: string
  title: string
  excerpt: string
  imageUrl: string
  body: InfoBodySection[]
}

export const useInfoPosts = () => {
  const { getAll, getOne } = useFirestore()

  const fetchAll = (): Promise<InfoPost[]> =>
    getAll('infoPosts') as Promise<InfoPost[]>

  const fetchById = (id: string): Promise<InfoPost | null> =>
    getOne('infoPosts', id) as Promise<InfoPost | null>

  return { fetchAll, fetchById }
}
