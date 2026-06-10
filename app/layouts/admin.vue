<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-sidebar__logo">管理画面</div>
      <nav class="admin-sidebar__nav">
        <NuxtLink to="/admin" class="admin-sidebar__link" exact>ダッシュボード</NuxtLink>
        <NuxtLink to="/admin/info" class="admin-sidebar__link">お知らせ</NuxtLink>
        <NuxtLink to="/admin/letter" class="admin-sidebar__link">おたより</NuxtLink>
        <NuxtLink to="/admin/introduction" class="admin-sidebar__link">園の情報</NuxtLink>
        <NuxtLink to="/admin/tags" class="admin-sidebar__link">タグ管理</NuxtLink>
      </nav>
      <button class="admin-sidebar__logout" @click="logout">ログアウト</button>
    </aside>
    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuth()
</script>

<style scoped lang="scss">
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
}

.admin-sidebar {
  width: 220px;
  background: #55000C;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  flex-shrink: 0;

  &__logo {
    font-size: 18px;
    font-weight: bold;
    padding: 0 24px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 16px;
  }

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
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }
  }

  &__logout {
    margin: 0 16px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }
}

.admin-main {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}
</style>
