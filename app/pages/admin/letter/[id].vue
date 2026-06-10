<template>
  <div class="admin-form">
    <h1 class="admin-form__title">おたより 編集</h1>
    <div v-if="loading" class="admin-form__loading">読み込み中...</div>
    <AdminLetterForm v-else-if="post" :initial="post" :gardens="gardens" :loading="saving" @submit="handleSubmit" />
    <p v-else>投稿が見つかりません</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const { getOne, update, getAll } = useFirestore()
const { uploadImage } = useStorageUpload()
const post = ref<any>(null)
const loading = ref(true)
const saving = ref(false)
const gardens = ref<any[]>([])

const id = route.params.id as string

;[post.value, gardens.value] = await Promise.all([
  getOne('letterPosts', id),
  getAll('gardens', 'name'),
])
loading.value = false

const handleSubmit = async (formData: any, imageFile: File | null) => {
  saving.value = true
  try {
    let imageUrl = post.value.imageUrl ?? ''
    if (imageFile) {
      imageUrl = await uploadImage(imageFile, `letter/${id}/image`)
    }
    await update('letterPosts', id, { ...formData, imageUrl })
    await navigateTo('/admin/letter')
  } finally {
    saving.value = false
  }
}
</script>
