<template>
  <div class="admin-form">
    <h1 class="admin-form__title">お知らせ 新規作成</h1>
    <AdminInfoForm :loading="loading" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { create } = useFirestore()
const { uploadImage } = useStorageUpload()
const loading = ref(false)

const handleSubmit = async (formData: any, imageFile: File | null) => {
  loading.value = true
  try {
    let imageUrl = ''
    if (imageFile) {
      const id = Date.now().toString()
      imageUrl = await uploadImage(imageFile, `info/${id}/image`)
    }
    await create('infoPosts', { ...formData, imageUrl })
    await navigateTo('/admin/info')
  } finally {
    loading.value = false
  }
}
</script>
