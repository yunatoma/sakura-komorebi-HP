<template>
  <div class="admin-with-preview">
    <div class="admin-with-preview__form">
      <h1 class="admin-form__title">お知らせ 新規作成</h1>
      <AdminInfoForm ref="formRef" :loading="loading" :all-categories="allCategories" @submit="handleSubmit" />
    </div>

    <aside class="admin-with-preview__panel">
      <div class="preview-panel">
        <div class="preview-panel__header">
          <span class="preview-panel__dot" />
          プレビュー
        </div>
        <div class="preview-panel__content">
          <p class="preview-panel__date">{{ formRef?.form?.date ?? '' }}</p>
          <p class="preview-panel__title">{{ formRef?.form?.title || '（タイトル未入力）' }}</p>
          <hr class="preview-panel__divider" />
          <img v-if="formRef?.previewUrl" :src="formRef.previewUrl" class="preview-panel__image" alt="アイキャッチ" />
          <div v-else class="preview-panel__image-placeholder">画像なし</div>
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

const { create, getAll, invalidateCache } = useFirestore()
const { uploadImage } = useStorageUpload()
const loading = ref(false)
const formRef = ref<any>(null)
const allCategories = ref<{ id: string; value: string; label: string }[]>([])

const customCats = await getAll('infoCategories')
allCategories.value = (customCats as any[]).map(c => ({ id: c.id, value: c.value, label: c.label }))

const handleSubmit = async (formData: any, imageFile: File | null) => {
  loading.value = true
  try {
    let imageUrl = ''
    if (imageFile) {
      const id = Date.now().toString()
      imageUrl = await uploadImage(imageFile, `info/${id}/image`)
    }
    await create('infoPosts', { ...formData, imageUrl })
    invalidateCache('infoPosts')
    await navigateTo('/admin/info')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
