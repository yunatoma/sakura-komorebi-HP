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
  id: string
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

export const useGardens = () => {
  const { getAll, getOne } = useFirestore()

  const fetchAll = (): Promise<Garden[]> =>
    getAll('gardens') as Promise<Garden[]>

  const fetchById = (id: string): Promise<Garden | null> =>
    getOne('gardens', id) as Promise<Garden | null>

  return { fetchAll, fetchById }
}
