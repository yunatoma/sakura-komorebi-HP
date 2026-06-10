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

  const archive = ref<{ year: number; months: number[] }[]>([])

  const loadArchive = async () => {
    const posts = await fetchAll()
    const map = new Map<number, Set<number>>()
    for (const p of posts) {
      const m = p.date.match(/(\d{4})ねん(\d+)がつ/)
      if (!m) continue
      const year = Number(m[1])
      const month = Number(m[2])
      if (!map.has(year)) map.set(year, new Set())
      map.get(year)!.add(month)
    }
    archive.value = [...map.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, months]) => ({ year, months: [...months].sort((a, b) => b - a) }))
  }

  return { fetchAll, fetchById, archive, loadArchive }
}
