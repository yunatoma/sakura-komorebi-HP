<template>
  <div class="admin-layout">
    <header class="admin-header">
      <span class="admin-header__title">管理画面</span>
      <NuxtLink to="/" class="admin-header__site-link" target="_blank">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6 2H2v10h10V8M8 2h4m0 0v4m0-4L6 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        サイトを見る
      </NuxtLink>
    </header>

    <div class="admin-body">
      <aside class="admin-sidebar">
        <nav class="admin-sidebar__nav">
          <NuxtLink to="/admin" class="admin-sidebar__link" exact>ダッシュボード</NuxtLink>
          <NuxtLink to="/admin/info" class="admin-sidebar__link">お知らせ</NuxtLink>
          <NuxtLink to="/admin/letter" class="admin-sidebar__link">おたより</NuxtLink>
          <NuxtLink to="/admin/introduction" class="admin-sidebar__link">園の情報</NuxtLink>
        </nav>
        <button class="admin-sidebar__logout" @click="logout">ログアウト</button>
      </aside>
      <main class="admin-main">
        <slot />
      </main>
    </div>

    <footer class="admin-footer">
      <small>© 桜のこもれびキッズランド 管理画面</small>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuth()
</script>

<style scoped lang="scss">
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  background: #55000C;
  color: #fff;
  flex-shrink: 0;

  &__title {
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.05em;
  }

  &__site-link {
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
}

.admin-body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.admin-sidebar {
  width: 220px;
  background: #3d0008;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  flex-shrink: 0;

  &__nav {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__link {
    display: block;
    padding: 12px 24px;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 14px;
    transition: background 0.2s, color 0.2s;

    &:hover,
    &.router-link-active {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
    }
  }

  &__logout {
    margin: 0 16px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.22);
    }
  }
}

.admin-main {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

.admin-footer {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #55000C;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  flex-shrink: 0;
}
</style>
