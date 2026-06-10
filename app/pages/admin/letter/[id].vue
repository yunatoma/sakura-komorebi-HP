<template>
  <div class="admin-with-preview">
    <div class="admin-with-preview__form">
      <h1 class="admin-form__title">おたより 編集</h1>
      <div v-if="loading" class="admin-form__loading">読み込み中...</div>
      <AdminLetterForm v-else-if="post" ref="formRef" :initial="post" :gardens="gardens" :loading="saving" @submit="handleSubmit" />
      <p v-else>投稿が見つかりません</p>
    </div>

    <aside v-if="!loading && post" class="admin-with-preview__panel">
      <div class="preview-panel">
        <div class="preview-panel__header">
          <span class="preview-panel__dot" />
          プレビュー
          <NuxtLink :to="`/letter/${id}`" target="_blank" class="preview-panel__open-btn">
            詳細画面 ↗
          </NuxtLink>
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

const route = useRoute()
const { getOne, update, getAll } = useFirestore()
const { uploadImage } = useStorageUpload()
const post = ref<any>(null)
const loading = ref(true)
const saving = ref(false)
const gardens = ref<any[]>([])
const formRef = ref<any>(null)

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

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
