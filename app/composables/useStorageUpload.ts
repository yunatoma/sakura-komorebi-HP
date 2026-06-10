import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

export const useStorageUpload = () => {
  const { $storage } = useNuxtApp()

  const uploadImage = async (file: File, path: string): Promise<string> => {
    const ref = storageRef($storage, path)
    await uploadBytes(ref, file)
    return getDownloadURL(ref)
  }

  const deleteImage = async (url: string) => {
    try {
      const ref = storageRef($storage, url)
      await deleteObject(ref)
    } catch {
      // 存在しない場合は無視
    }
  }

  return { uploadImage, deleteImage }
}
