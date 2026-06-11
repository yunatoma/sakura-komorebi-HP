<template>
  <div class="admin-list">
    <div class="admin-list__header">
      <h1 class="admin-list__title">おたより管理</h1>
      <NuxtLink to="/admin/letter/create" class="admin-list__create-btn">+ 新規作成</NuxtLink>
    </div>

    <div v-if="loading" class="admin-list__loading">読み込み中...</div>

    <div v-else class="admin-list__table-wrap">
    <table class="admin-list__table">
      <thead>
        <tr>
          <th class="sortable" @click="toggleSort('date')">日付<span class="sort-icon" :class="sortIconClass('date')">{{ sortIconChar('date') }}</span></th>
          <th class="sortable" @click="toggleSort('title')">タイトル<span class="sort-icon" :class="sortIconClass('title')">{{ sortIconChar('title') }}</span></th>
          <th class="sortable" @click="toggleSort('garden')">園名<span class="sort-icon" :class="sortIconClass('garden')">{{ sortIconChar('garden') }}</span></th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in pagedPosts" :key="post.id">
          <td>{{ post.date }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.garden }}</td>
          <td class="admin-list__actions">
            <NuxtLink :to="`/admin/letter/${post.id}`" class="admin-list__edit-btn">編集</NuxtLink>
            <button class="admin-list__delete-btn" @click="handleDelete(post.id)">削除</button>
          </td>
        </tr>
        <tr v-if="posts.length === 0">
          <td colspan="4" class="admin-list__empty">投稿がありません</td>
        </tr>
      </tbody>
    </table>
    </div>

    <div v-if="totalPages > 1" class="admin-list__pagination">
      <span class="admin-list__pagination-info">全{{ posts.length }}件中 {{ (currentPage - 1) * perPage + 1 }}〜{{ Math.min(currentPage * perPage, posts.length) }}件</span>
      <div class="admin-list__pagination-btns">
        <button class="admin-list__page-btn" :disabled="currentPage === 1" @click="currentPage--">‹</button>
        <button
          v-for="p in totalPages" :key="p"
          class="admin-list__page-btn"
          :class="{ 'is-active': currentPage === p }"
          @click="currentPage = p"
        >{{ p }}</button>
        <button class="admin-list__page-btn" :disabled="currentPage === totalPages" @click="currentPage++">›</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { getAll, remove, invalidateCache } = useFirestore()
const posts = ref<any[]>([])
const loading = ref(true)
const sortKey = ref('date')
const sortDir = ref<'asc' | 'desc'>('desc')

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

const perPage = 20
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(sortedPosts.value.length / perPage))
const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return sortedPosts.value.slice(start, start + perPage)
})

watch(sortedPosts, () => { currentPage.value = 1 })

const load = async () => {
  loading.value = true
  posts.value = await getAll('letterPosts')
  loading.value = false
}

const handleDelete = async (id: string) => {
  if (!confirm('本当に削除しますか？')) return
  await remove('letterPosts', id)
  invalidateCache('letterPosts')
  await load()
}

await load()
</script>

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
