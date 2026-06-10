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

export const useFirestore = () => {
  const getAll = async (collectionName: string, orderByField = '') => {
    const { $db } = useNuxtApp()
    const col = collection($db as any, collectionName)
    const q = orderByField ? query(col, orderBy(orderByField, 'desc')) : col
    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  }

  const getOne = async (collectionName: string, id: string) => {
    const { $db } = useNuxtApp()
    const ref = doc($db as any, collectionName, id)
    const snapshot = await getDoc(ref)
    if (!snapshot.exists()) return null
    return { id: snapshot.id, ...snapshot.data() }
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

  return { getAll, getOne, create, update, remove, set }
}
