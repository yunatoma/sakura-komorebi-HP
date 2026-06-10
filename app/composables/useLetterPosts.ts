export interface LetterBodySection {
  heading: string
  paragraphs: string[]
}

export interface LetterPost {
  id: string
  imageUrl: string
  garden: string
  title: string
  excerpt: string
  date: string
  pref: string
  body: LetterBodySection[]
}

export const useLetterPosts = () => {
  const { getAll, getOne } = useFirestore()

  const fetchAll = (): Promise<LetterPost[]> =>
    getAll('letterPosts') as Promise<LetterPost[]>

  const fetchById = (id: string): Promise<LetterPost | null> =>
    getOne('letterPosts', id) as Promise<LetterPost | null>

  return { fetchAll, fetchById }
}
