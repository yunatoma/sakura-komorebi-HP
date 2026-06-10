<template>
  <div class="admin-list">
    <div class="admin-list__header">
      <h1 class="admin-list__title">お知らせ管理</h1>
      <NuxtLink to="/admin/info/create" class="admin-list__create-btn">+ 新規作成</NuxtLink>
    </div>

    <div v-if="loading" class="admin-list__loading">読み込み中...</div>

    <table v-else class="admin-list__table">
      <thead>
        <tr>
          <th>日付</th>
          <th>タイトル</th>
          <th>カテゴリ</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.date }}</td>
          <td>{{ post.title }}</td>
          <td>{{ categoryLabel(post.category) }}</td>
          <td class="admin-list__actions">
            <NuxtLink :to="`/admin/info/${post.id}`" class="admin-list__edit-btn">編集</NuxtLink>
            <button class="admin-list__delete-btn" @click="handleDelete(post.id)">削除</button>
          </td>
        </tr>
        <tr v-if="posts.length === 0">
          <td colspan="4" class="admin-list__empty">投稿がありません</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { getAll, remove } = useFirestore()
const posts = ref<any[]>([])
const loading = ref(true)

const categoryLabel = (cat: string) => {
  const map: Record<string, string> = { news: 'お知らせ', activity: '活動報告', media: 'メディア' }
  return map[cat] ?? cat
}

const load = async () => {
  loading.value = true
  posts.value = await getAll('infoPosts')
  loading.value = false
}

const handleDelete = async (id: string) => {
  if (!confirm('本当に削除しますか？')) return
  await remove('infoPosts', id)
  await load()
}

await load()
</script>

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
