<template>
  <div class="admin-with-preview">
    <div class="admin-with-preview__form">
      <h1 class="admin-form__title">おたより 新規作成</h1>
      <AdminLetterForm ref="formRef" :gardens="gardens" :loading="loading" @submit="handleSubmit" />
    </div>

    <aside class="admin-with-preview__panel">
      <div class="preview-panel">
        <div class="preview-panel__header">
          <span class="preview-panel__dot" />
          プレビュー
        </div>
        <div class="preview-panel__content">
          <img v-if="formRef?.previewUrl" :src="formRef.previewUrl" class="preview-panel__image" alt="サムネイル" />
          <div v-else class="preview-panel__image-placeholder">画像なし</div>
          <span v-if="formRef?.form?.garden" class="preview-panel__badge">{{ formRef.form.garden }}</span>
          <p class="preview-panel__title">{{ formRef?.form?.title || '（タイトル未入力）' }}</p>
          <p v-if="formRef?.form?.excerpt" class="preview-panel__excerpt">{{ formRef.form.excerpt }}</p>
          <hr class="preview-panel__divider" />
          <template v-for="(section, i) in (formRef?.form?.body ?? [])" :key="i">
            <div class="preview-panel__section">
              <p v-if="section.heading" class="preview-panel__section-heading">{{ section.heading }}</p>
              <p v-for="(para, j) in section.paragraphs" :key="j" class="preview-panel__paragraph">{{ para }}</p>
            </div>
          </template>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { create, getAll } = useFirestore()
const { uploadImage } = useStorageUpload()
const loading = ref(false)
const gardens = ref<any[]>([])
const formRef = ref<any>(null)

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

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
