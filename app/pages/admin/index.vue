<template>
  <div class="dashboard">
    <h1 class="dashboard__title">ダッシュボード</h1>
    <div class="dashboard__cards">
      <NuxtLink to="/admin/info" class="dashboard__card">
        <p class="dashboard__card-label">お知らせ</p>
        <p class="dashboard__card-desc">投稿・編集・削除</p>
      </NuxtLink>
      <NuxtLink to="/admin/letter" class="dashboard__card">
        <p class="dashboard__card-label">おたより</p>
        <p class="dashboard__card-desc">投稿・編集・削除</p>
      </NuxtLink>
      <NuxtLink to="/admin/introduction" class="dashboard__card">
        <p class="dashboard__card-label">園の情報</p>
        <p class="dashboard__card-desc">園の内容を編集</p>
      </NuxtLink>
      <NuxtLink to="/admin/tags" class="dashboard__card">
        <p class="dashboard__card-label">タグ管理</p>
        <p class="dashboard__card-desc">タグの追加・編集・削除</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
</script>

<style scoped lang="scss">
.dashboard {
  &__title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 28px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  &__card {
    background: #fff;
    border-radius: 10px;
    padding: 28px 24px;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.2s, transform 0.2s;
    border-left: 4px solid #EF8F9C;

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  }

  &__card-label {
    font-size: 18px;
    font-weight: bold;
    color: #55000C;
    margin-bottom: 6px;
  }

  &__card-desc {
    font-size: 13px;
    color: #888;
  }
}
</style>
