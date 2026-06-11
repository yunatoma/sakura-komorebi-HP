<template>
  <div class="admin-list">
    <div class="admin-list__header">
      <h1 class="admin-list__title">園の情報管理</h1>
      <NuxtLink to="/admin/introduction/create" class="admin-list__create-btn">+ 新規追加</NuxtLink>
    </div>

    <div v-if="loading" class="admin-list__loading">読み込み中...</div>

    <div v-else class="admin-list__table-wrap">
    <table class="admin-list__table">
      <thead>
        <tr>
          <th class="sortable" @click="toggleSort('name')">園名<span class="sort-icon" :class="sortIconClass('name')">{{ sortIconChar('name') }}</span></th>
          <th class="sortable" @click="toggleSort('type')">種別<span class="sort-icon" :class="sortIconClass('type')">{{ sortIconChar('type') }}</span></th>
          <th class="sortable" @click="toggleSort('prefecture')">都道府県<span class="sort-icon" :class="sortIconClass('prefecture')">{{ sortIconChar('prefecture') }}</span></th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="garden in pagedGardens" :key="garden.id">
          <td>{{ garden.name }}</td>
          <td>{{ garden.type }}</td>
          <td>{{ garden.prefecture }}</td>
          <td class="admin-list__actions">
            <NuxtLink :to="`/admin/introduction/${garden.id}`" class="admin-list__edit-btn">編集</NuxtLink>
            <button class="admin-list__delete-btn" @click="handleDelete(garden.id)">削除</button>
          </td>
        </tr>
        <tr v-if="gardens.length === 0">
          <td colspan="4" class="admin-list__empty">園の情報がありません</td>
        </tr>
      </tbody>
    </table>
    </div>

    <div v-if="totalPages > 1" class="admin-list__pagination">
      <span class="admin-list__pagination-info">全{{ gardens.length }}件中 {{ (currentPage - 1) * perPage + 1 }}〜{{ Math.min(currentPage * perPage, gardens.length) }}件</span>
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
const gardens = ref<any[]>([])
const loading = ref(true)
const sortKey = ref('name')
const sortDir = ref<'asc' | 'desc'>('asc')

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

const sortedGardens = computed(() => {
  return [...gardens.value].sort((a, b) => {
    const av = a[sortKey.value] ?? ''
    const bv = b[sortKey.value] ?? ''
    const cmp = String(av).localeCompare(String(bv), 'ja')
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

const perPage = 20
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(sortedGardens.value.length / perPage))
const pagedGardens = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return sortedGardens.value.slice(start, start + perPage)
})

watch(sortedGardens, () => { currentPage.value = 1 })

const load = async () => {
  loading.value = true
  gardens.value = await getAll('gardens', 'name')
  loading.value = false
}

const handleDelete = async (id: string) => {
  if (!confirm('本当に削除しますか？')) return
  await remove('gardens', id)
  invalidateCache('gardens')
  await load()
}

await load()
</script>

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
