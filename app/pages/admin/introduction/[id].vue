<template>
  <div class="admin-form">
    <h1 class="admin-form__title">園の情報 編集</h1>
    <div v-if="loading" class="admin-form__loading">読み込み中...</div>
    <AdminGardenForm v-else-if="garden" :initial="garden" :loading="saving" @submit="handleSubmit" />
    <p v-else>園の情報が見つかりません</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const { getOne, update } = useFirestore()
const { uploadImage } = useStorageUpload()
const garden = ref<any>(null)
const loading = ref(true)
const saving = ref(false)

const id = route.params.id as string
garden.value = await getOne('gardens', id)
loading.value = false

const handleSubmit = async (formData: any, files: Record<string, File | null>, galleryFiles: File[]) => {
  saving.value = true
  try {
    if (files.img) formData.img = await uploadImage(files.img, `gardens/${id}/thumbnail`)
    if (files.locationImg) formData.location.img = await uploadImage(files.locationImg, `gardens/${id}/location`)
    if (files.messageImg) formData.message.img = await uploadImage(files.messageImg, `gardens/${id}/message`)

    for (let i = 0; i < galleryFiles.length; i++) {
      const file = galleryFiles[i]
      if (!file) continue
      const idx = formData.gallery.length
      const url = await uploadImage(file, `gardens/${id}/gallery/${Date.now()}_${i}`)
      formData.gallery.push({ src: url, alt: `園の様子${idx + 1}` })
    }

    await update('gardens', id, formData)
    await navigateTo('/admin/introduction')
  } finally {
    saving.value = false
  }
}
</script>
