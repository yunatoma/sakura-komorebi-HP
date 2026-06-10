<template>
  <div class="admin-form">
    <h1 class="admin-form__title">お知らせ 編集</h1>
    <div v-if="loading" class="admin-form__loading">読み込み中...</div>
    <AdminInfoForm v-else-if="post" :initial="post" :loading="saving" @submit="handleSubmit" />
    <p v-else>投稿が見つかりません</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const { getOne, update } = useFirestore()
const { uploadImage } = useStorageUpload()
const post = ref<any>(null)
const loading = ref(true)
const saving = ref(false)

const id = route.params.id as string

post.value = await getOne('infoPosts', id)
loading.value = false

const handleSubmit = async (formData: any, imageFile: File | null) => {
  saving.value = true
  try {
    let imageUrl = post.value.imageUrl ?? ''
    if (imageFile) {
      imageUrl = await uploadImage(imageFile, `info/${id}/image`)
    }
    await update('infoPosts', id, { ...formData, imageUrl })
    await navigateTo('/admin/info')
  } finally {
    saving.value = false
  }
}
</script>
