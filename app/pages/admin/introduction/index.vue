<template>
  <div class="admin-list">
    <div class="admin-list__header">
      <h1 class="admin-list__title">園の情報管理</h1>
      <NuxtLink to="/admin/introduction/create" class="admin-list__create-btn">+ 新規追加</NuxtLink>
    </div>

    <div v-if="loading" class="admin-list__loading">読み込み中...</div>

    <table v-else class="admin-list__table">
      <thead>
        <tr>
          <th>園名</th>
          <th>種別</th>
          <th>都道府県</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="garden in gardens" :key="garden.id">
          <td>{{ garden.name }}</td>
          <td>{{ garden.typeCategory }}</td>
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
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { getAll, remove } = useFirestore()
const gardens = ref<any[]>([])
const loading = ref(true)

const load = async () => {
  loading.value = true
  gardens.value = await getAll('gardens', 'name')
  loading.value = false
}

const handleDelete = async (id: string) => {
  if (!confirm('本当に削除しますか？')) return
  await remove('gardens', id)
  await load()
}

await load()
</script>
