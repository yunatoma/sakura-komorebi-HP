<template>
  <div class="admin-with-preview">
    <div class="admin-with-preview__form">
      <h1 class="admin-form__title">園の情報 編集</h1>
      <div v-if="loading" class="admin-form__loading">読み込み中...</div>
      <AdminGardenForm v-else-if="garden" ref="formRef" :initial="garden" :loading="saving" :all-names="allNames" :all-types="allTypes" @submit="handleSubmit" />
      <p v-else>園の情報が見つかりません</p>
    </div>

    <aside v-if="!loading && garden" class="admin-with-preview__panel">
      <div class="preview-panel">
        <div class="preview-panel__header">
          <span class="preview-panel__dot" />
          プレビュー
          <NuxtLink :to="`/introduction/${id}`" target="_blank" class="preview-panel__open-btn">
            詳細画面 ↗
          </NuxtLink>
        </div>
        <div class="preview-panel__content">
          <!-- サムネイル -->
          <img v-if="formRef?.previews?.img" :src="formRef.previews.img" class="preview-panel__image" alt="サムネイル" />
          <div v-else class="preview-panel__image-placeholder">サムネイルなし</div>

          <!-- 基本情報 -->
          <p class="preview-panel__garden-name">{{ formRef?.form?.name || '（園名未入力）' }}</p>
          <div class="preview-panel__tags">
            <span v-if="formRef?.form?.type" class="preview-panel__tag">{{ formRef.form.type }}</span>
            <span v-if="formRef?.form?.prefecture" class="preview-panel__tag">{{ formRef.form.prefecture }}</span>
          </div>

          <!-- 立地 -->
          <template v-if="formRef?.form?.location?.heading || formRef?.form?.location?.text">
            <p class="preview-panel__section-label">立地</p>
            <p v-if="formRef?.form?.location?.heading" class="preview-panel__section-heading">{{ formRef.form.location.heading }}</p>
            <p v-if="formRef?.form?.location?.text" class="preview-panel__text">{{ formRef.form.location.text }}</p>
            <img v-if="formRef?.previews?.locationImg" :src="formRef.previews.locationImg" class="preview-panel__image" alt="立地" />
          </template>

          <!-- ギャラリー -->
          <template v-if="formRef?.form?.gallery?.length">
            <p class="preview-panel__section-label">ギャラリー</p>
            <div class="preview-panel__gallery">
              <img
                v-for="(img, i) in formRef.form.gallery.slice(0, 6)"
                :key="i"
                :src="img.src"
                :alt="img.alt"
                class="preview-panel__gallery-img"
              />
            </div>
          </template>

          <!-- 園長メッセージ -->
          <template v-if="formRef?.form?.message?.text">
            <p class="preview-panel__section-label">園長メッセージ</p>
            <img v-if="formRef?.previews?.messageImg" :src="formRef.previews.messageImg" class="preview-panel__image" alt="メッセージ" />
            <p class="preview-panel__text">{{ formRef.form.message.text }}</p>
          </template>

          <!-- 施設情報 -->
          <template v-if="formRef?.form?.info">
            <p class="preview-panel__section-label">施設情報</p>
            <table class="preview-panel__info-table">
              <tr v-if="formRef.form.info.address"><th>住所</th><td>{{ formRef.form.info.address }}</td></tr>
              <tr v-if="formRef.form.info.tel"><th>電話番号</th><td>{{ formRef.form.info.tel }}</td></tr>
              <tr v-if="formRef.form.info.fax"><th>FAX</th><td>{{ formRef.form.info.fax }}</td></tr>
              <tr v-if="formRef.form.info.target"><th>対象児童</th><td>{{ formRef.form.info.target }}</td></tr>
              <tr v-if="formRef.form.info.enrollmentDate"><th>入園日</th><td>{{ formRef.form.info.enrollmentDate }}</td></tr>
              <tr v-if="formRef.form.info.openDays">
                <th>開所曜日</th>
                <td>{{ ['月','火','水','木','金','土','日'].filter((_, i) => formRef.form.info.openDays[i]).join('・') }}</td>
              </tr>
              <tr v-if="formRef.form.info.hoursStandard"><th>標準保育</th><td>{{ formRef.form.info.hoursStandard }}</td></tr>
              <tr v-if="formRef.form.info.hoursStandardExtended"><th>標準（延長）</th><td>{{ formRef.form.info.hoursStandardExtended }}</td></tr>
              <tr v-if="formRef.form.info.hoursShort"><th>短時間</th><td>{{ formRef.form.info.hoursShort }}</td></tr>
              <tr v-if="formRef.form.info.hoursShortExtended"><th>短時間（延長）</th><td>{{ formRef.form.info.hoursShortExtended }}</td></tr>
              <tr v-if="formRef.form.info.capacityTotal"><th>定員合計</th><td>{{ formRef.form.info.capacityTotal }}名</td></tr>
              <tr v-if="formRef.form.info.staffTotal"><th>職員総数</th><td>{{ formRef.form.info.staffTotal }}</td></tr>
            </table>
            <template v-if="formRef.form.info.capacityAges?.length">
              <p class="preview-panel__section-label" style="margin-top:10px">年齢別定員</p>
              <table class="preview-panel__info-table">
                <tr v-for="(a, i) in formRef.form.info.capacityAges" :key="i">
                  <th>{{ a.age }}</th><td>{{ a.count }}名</td>
                </tr>
              </table>
            </template>
            <template v-if="formRef.form.info.staffRoles?.length">
              <p class="preview-panel__section-label" style="margin-top:10px">職員構成</p>
              <table class="preview-panel__info-table">
                <tr v-for="(r, i) in formRef.form.info.staffRoles" :key="i">
                  <th>{{ r.role }}</th><td>{{ r.count }}</td>
                </tr>
              </table>
            </template>
          </template>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const { getOne, getAll, update } = useFirestore()
const { uploadImage } = useStorageUpload()
const garden = ref<any>(null)
const allNames = ref<string[]>([])
const allTypes = ref<{ id: string; name: string }[]>([])
const loading = ref(true)
const saving = ref(false)
const formRef = ref<any>(null)

const id = route.params.id as string
const [gardenData, allGardens, customTypes] = await Promise.all([
  getOne('gardens', id),
  getAll('gardens'),
  getAll('gardenTypes'),
])
garden.value = gardenData
allNames.value = (allGardens as any[]).map(g => g.name).filter(Boolean)
allTypes.value = (customTypes as any[]).map(t => ({ id: t.id, name: t.name }))
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

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
