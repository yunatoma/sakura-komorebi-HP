export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const { user, initAuth } = useAuth()

  if (user.value === null) {
    await initAuth()
  }

  if (!user.value) {
    return navigateTo('/admin/login')
  }
})
