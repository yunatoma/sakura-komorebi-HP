import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth'

export const useAuth = () => {
  const { $auth } = useNuxtApp()
  const user = useState<User | null>('auth-user', () => null)

  const login = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword($auth, email, password)
    user.value = credential.user
  }

  const logout = async () => {
    await signOut($auth)
    user.value = null
    await navigateTo('/admin/login')
  }

  const initAuth = () => {
    return new Promise<void>((resolve) => {
      onAuthStateChanged($auth, (u) => {
        user.value = u
        resolve()
      })
    })
  }

  return { user, login, logout, initAuth }
}
