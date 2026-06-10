<template>
  <div class="login-page">
    <header class="login-page__header">
      <span class="login-page__header-title">管理画面</span>
      <NuxtLink to="/" class="login-page__header-link" target="_blank">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6 2H2v10h10V8M8 2h4m0 0v4m0-4L6 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        サイトを見る
      </NuxtLink>
    </header>

    <div class="login">
      <div class="login__card">
        <h1 class="login__title">管理者ログイン</h1>
        <form class="login__form" @submit.prevent="handleLogin">
          <div class="login__field">
            <label class="login__label">メールアドレス</label>
            <input
              v-model="email"
              type="email"
              class="login__input"
              required
              autocomplete="email"
            />
          </div>
          <div class="login__field">
            <label class="login__label">パスワード</label>
            <input
              v-model="password"
              type="password"
              class="login__input"
              required
              autocomplete="current-password"
            />
          </div>
          <p v-if="errorMessage" class="login__error">{{ errorMessage }}</p>
          <button type="submit" class="login__submit" :disabled="loading">
            {{ loading ? 'ログイン中...' : 'ログイン' }}
          </button>
        </form>
      </div>
    </div>

    <footer class="login-page__footer">
      <small>© 桜のこもれびキッズランド 管理画面</small>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { login, user } = useAuth()

if (user.value) {
  await navigateTo('/admin')
}

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    await navigateTo('/admin')
  } catch {
    errorMessage.value = 'メールアドレスまたはパスワードが正しくありません。'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 24px;
    background: #55000C;
    color: #fff;
    flex-shrink: 0;
  }

  &__header-title {
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.05em;
  }

  &__header-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    padding: 6px 14px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 6px;
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }
  }

  &__footer {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #55000C;
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    flex-shrink: 0;
  }
}

.login {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &__card {
    background: #fff;
    border-radius: 12px;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  &__title {
    font-size: 22px;
    font-weight: bold;
    color: #55000C;
    margin-bottom: 28px;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__label {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }

  &__input {
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #55000C;
    }
  }

  &__error {
    font-size: 13px;
    color: #e53935;
    margin: -8px 0;
  }

  &__submit {
    padding: 12px;
    background: #55000C;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover:not(:disabled) {
      opacity: 0.85;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}
</style>
