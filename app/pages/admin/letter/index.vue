<template>
  <div class="admin-list">
    <div class="admin-list__header">
      <h1 class="admin-list__title">おたより管理</h1>
      <NuxtLink to="/admin/letter/create" class="admin-list__create-btn">+ 新規作成</NuxtLink>
    </div>

    <div v-if="loading" class="admin-list__loading">読み込み中...</div>

    <table v-else class="admin-list__table">
      <thead>
        <tr>
          <th>日付</th>
          <th>タイトル</th>
          <th>園名</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
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
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { getAll, remove } = useFirestore()
const posts = ref<any[]>([])
const loading = ref(true)

const load = async () => {
  loading.value = true
  posts.value = await getAll('letterPosts')
  loading.value = false
}

const handleDelete = async (id: string) => {
  if (!confirm('本当に削除しますか？')) return
  await remove('letterPosts', id)
  await load()
}

await load()
</script>

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
