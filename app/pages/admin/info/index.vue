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
          <th class="sortable" @click="toggleSort('date')">日付<span class="sort-icon" :class="sortIconClass('date')">{{ sortIconChar('date') }}</span></th>
          <th class="sortable" @click="toggleSort('title')">タイトル<span class="sort-icon" :class="sortIconClass('title')">{{ sortIconChar('title') }}</span></th>
          <th class="sortable" @click="toggleSort('category')">カテゴリ<span class="sort-icon" :class="sortIconClass('category')">{{ sortIconChar('category') }}</span></th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in sortedPosts" :key="post.id">
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

const { getAll, remove, invalidateCache } = useFirestore()
const posts = ref<any[]>([])
const loading = ref(true)
const sortKey = ref('date')
const sortDir = ref<'asc' | 'desc'>('desc')

const categoryLabel = (cat: string) => {
  const map: Record<string, string> = { news: 'お知らせ', activity: '活動報告', media: 'メディア' }
  return map[cat] ?? cat
}

const toggleSort = (key: string) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

const sortIconChar = (key: string) => {
  if (sortKey.value !== key) return '↕'
  return sortDir.value === 'asc' ? '↑' : '↓'
}

const sortIconClass = (key: string) => {
  if (sortKey.value !== key) return ''
  return sortDir.value === 'asc' ? 'sort-icon--asc' : 'sort-icon--desc'
}

const sortedPosts = computed(() => {
  return [...posts.value].sort((a, b) => {
    const av = a[sortKey.value] ?? ''
    const bv = b[sortKey.value] ?? ''
    const cmp = String(av).localeCompare(String(bv), 'ja')
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

const load = async () => {
  loading.value = true
  posts.value = await getAll('infoPosts')
  loading.value = false
}

const handleDelete = async (id: string) => {
  if (!confirm('本当に削除しますか？')) return
  await remove('infoPosts', id)
  invalidateCache('infoPosts')
  await load()
}

await load()
</script>

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
