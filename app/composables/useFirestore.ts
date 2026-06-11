import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  orderBy,
  query,
  serverTimestamp,
  type DocumentData,
} from 'firebase/firestore'

const collectionCache = new Map<string, any[]>()
const docCache = new Map<string, any>()

export const useFirestore = () => {
  const getAll = async (collectionName: string, orderByField = '') => {
    const cacheKey = `${collectionName}:${orderByField}`
    if (collectionCache.has(cacheKey)) return collectionCache.get(cacheKey)!

    const { $db } = useNuxtApp()
    const col = collection($db as any, collectionName)
    const q = orderByField ? query(col, orderBy(orderByField, 'desc')) : col
    const snapshot = await getDocs(q)
    const result = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    collectionCache.set(cacheKey, result)
    return result
  }

  const getOne = async (collectionName: string, id: string) => {
    const cacheKey = `${collectionName}:${id}`
    if (docCache.has(cacheKey)) return docCache.get(cacheKey)!

    const { $db } = useNuxtApp()
    const ref = doc($db as any, collectionName, id)
    const snapshot = await getDoc(ref)
    if (!snapshot.exists()) return null
    const result = { id: snapshot.id, ...snapshot.data() }
    docCache.set(cacheKey, result)
    return result
  }

  const invalidateCache = (collectionName?: string) => {
    if (collectionName) {
      for (const key of collectionCache.keys()) {
        if (key.startsWith(`${collectionName}:`)) collectionCache.delete(key)
      }
      for (const key of docCache.keys()) {
        if (key.startsWith(`${collectionName}:`)) docCache.delete(key)
      }
    } else {
      collectionCache.clear()
      docCache.clear()
    }
  }

  const create = async (collectionName: string, data: DocumentData) => {
    const { $db } = useNuxtApp()
    const ref = await addDoc(collection($db as any, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return ref.id
  }

  const update = async (collectionName: string, id: string, data: DocumentData) => {
    const { $db } = useNuxtApp()
    const ref = doc($db as any, collectionName, id)
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() })
  }

  const remove = async (collectionName: string, id: string) => {
    const { $db } = useNuxtApp()
    await deleteDoc(doc($db as any, collectionName, id))
  }

  const set = async (collectionName: string, id: string, data: DocumentData) => {
    const { $db } = useNuxtApp()
    const ref = doc($db as any, collectionName, id)
    await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true })
  }

  return { getAll, getOne, create, update, remove, set, invalidateCache }
}
