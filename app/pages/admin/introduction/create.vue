<template>
  <div class="admin-form">
    <h1 class="admin-form__title">園の情報 新規追加</h1>
    <AdminGardenForm :loading="loading" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { create } = useFirestore()
const { uploadImage } = useStorageUpload()
const loading = ref(false)

const handleSubmit = async (formData: any, files: Record<string, File | null>, galleryFiles: File[]) => {
  loading.value = true
  try {
    const id = Date.now().toString()
    if (files.img) formData.img = await uploadImage(files.img, `gardens/${id}/thumbnail`)
    if (files.locationImg) formData.location.img = await uploadImage(files.locationImg, `gardens/${id}/location`)
    if (files.messageImg) formData.message.img = await uploadImage(files.messageImg, `gardens/${id}/message`)

    for (let i = 0; i < galleryFiles.length; i++) {
      const file = galleryFiles[i]
      if (!file) continue
      const url = await uploadImage(file, `gardens/${id}/gallery/${i}`)
      formData.gallery.push({ src: url, alt: `園の様子${i + 1}` })
    }

    await create('gardens', formData)
    await navigateTo('/admin/introduction')
  } finally {
    loading.value = false
  }
}
</script>
