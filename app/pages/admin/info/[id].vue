<template>
  <div class="admin-with-preview">
    <div class="admin-with-preview__form">
      <h1 class="admin-form__title">お知らせ 編集</h1>
      <div v-if="loading" class="admin-form__loading">読み込み中...</div>
      <AdminInfoForm v-else-if="post" ref="formRef" :initial="post" :loading="saving" @submit="handleSubmit" />
      <p v-else>投稿が見つかりません</p>
    </div>

    <aside v-if="!loading && post" class="admin-with-preview__panel">
      <div class="preview-panel">
        <div class="preview-panel__header">
          <span class="preview-panel__dot" />
          プレビュー
          <NuxtLink :to="`/info/${id}`" target="_blank" class="preview-panel__open-btn">
            詳細画面 ↗
          </NuxtLink>
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

const route = useRoute()
const { getOne, update } = useFirestore()
const { uploadImage } = useStorageUpload()
const post = ref<any>(null)
const loading = ref(true)
const saving = ref(false)
const formRef = ref<any>(null)

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

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
