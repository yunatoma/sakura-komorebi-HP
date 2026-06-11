<template>
  <div class="admin-layout">
    <header class="admin-header">
      <div class="admin-header__left">
        <button class="admin-header__hamburger" aria-label="メニューを開く" @click="menuOpen = !menuOpen">
          <span :class="{ 'is-open': menuOpen }"></span>
          <span :class="{ 'is-open': menuOpen }"></span>
          <span :class="{ 'is-open': menuOpen }"></span>
        </button>
        <span class="admin-header__title">管理画面</span>
      </div>
      <NuxtLink to="/" class="admin-header__site-link" target="_blank">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6 2H2v10h10V8M8 2h4m0 0v4m0-4L6 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        サイトを見る
      </NuxtLink>
    </header>

    <div class="admin-body">
      <div v-if="menuOpen" class="admin-overlay" @click="menuOpen = false"></div>
      <aside class="admin-sidebar" :class="{ 'is-open': menuOpen }">
        <nav class="admin-sidebar__nav">
          <NuxtLink to="/admin" class="admin-sidebar__link" exact @click="menuOpen = false">ダッシュボード</NuxtLink>
          <NuxtLink to="/admin/info" class="admin-sidebar__link" @click="menuOpen = false">お知らせ</NuxtLink>
          <NuxtLink to="/admin/letter" class="admin-sidebar__link" @click="menuOpen = false">おたより</NuxtLink>
          <NuxtLink to="/admin/introduction" class="admin-sidebar__link" @click="menuOpen = false">園の情報</NuxtLink>
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
const menuOpen = ref(false)
</script>

<style scoped lang="scss">
$admin-bp: 768px;

.admin-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
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
  z-index: 100;

  &__left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__title {
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.05em;
  }

  &__hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    span {
      display: block;
      width: 22px;
      height: 2px;
      background: #fff;
      border-radius: 2px;
      transition: transform 0.25s, opacity 0.25s;

      &.is-open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      &.is-open:nth-child(2) { opacity: 0; }
      &.is-open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }

    @media (max-width: $admin-bp) {
      display: flex;
    }
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
    white-space: nowrap;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }

    @media (max-width: $admin-bp) {
      font-size: 12px;
      padding: 5px 10px;
    }
  }
}

.admin-body {
  display: flex;
  flex: 1;
  min-height: 0;
  position: relative;
}

.admin-overlay {
  display: none;

  @media (max-width: $admin-bp) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 90;
  }
}

.admin-sidebar {
  width: 220px;
  background: #3d0008;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  flex-shrink: 0;

  @media (max-width: $admin-bp) {
    position: fixed;
    top: 56px;
    left: 0;
    bottom: 0;
    z-index: 95;
    transform: translateX(-100%);
    transition: transform 0.25s ease;

    &.is-open {
      transform: translateX(0);
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__link {
    display: block;
    padding: 14px 24px;
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

  @media (max-width: $admin-bp) {
    padding: 20px 16px;
  }
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
