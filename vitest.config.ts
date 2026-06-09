import { defineVitestConfig } from '@nuxt/test-utils/config'
import { fileURLToPath } from 'url'

export default defineVitestConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url)),
      '@': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
  test: {
    environment: 'nuxt',
  },
})
