import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initializeFirestore, getFirestore, persistentLocalCache } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  }

  let db
  if (getApps().length === 0) {
    const app = initializeApp(firebaseConfig)
    db = initializeFirestore(app, { localCache: persistentLocalCache() })
  } else {
    db = getFirestore(getApps()[0]!)
  }

  const app = getApps()[0]!
  const auth = getAuth(app)
  const storage = getStorage(app)

  return {
    provide: {
      auth,
      db,
      storage,
    },
  }
})
