<template>
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
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;

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
