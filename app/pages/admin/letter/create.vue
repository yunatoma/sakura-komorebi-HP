<template>
  <div class="admin-form">
    <h1 class="admin-form__title">おたより 新規作成</h1>
    <AdminLetterForm :gardens="gardens" :loading="loading" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { create, getAll } = useFirestore()
const { uploadImage } = useStorageUpload()
const loading = ref(false)
const gardens = ref<any[]>([])

gardens.value = await getAll('gardens', 'name')

const handleSubmit = async (formData: any, imageFile: File | null) => {
  loading.value = true
  try {
    let imageUrl = ''
    if (imageFile) {
      const id = Date.now().toString()
      imageUrl = await uploadImage(imageFile, `letter/${id}/image`)
    }
    await create('letterPosts', { ...formData, imageUrl })
    await navigateTo('/admin/letter')
  } finally {
    loading.value = false
  }
}
</script>
