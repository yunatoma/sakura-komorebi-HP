<template>
  <form class="admin-form__body" @submit.prevent="handleSubmit">
    <div class="admin-form__field">
      <label class="admin-form__label">カテゴリ</label>
      <select v-model="form.category" class="admin-form__input" required>
        <option value="news">お知らせ</option>
        <option value="activity">活動報告</option>
        <option value="media">メディア</option>
      </select>
    </div>

    <div class="admin-form__field">
      <label class="admin-form__label">日付</label>
      <input v-model="form.date" type="date" class="admin-form__input" required />
    </div>

    <div class="admin-form__field">
      <label class="admin-form__label">タイトル</label>
      <input v-model="form.title" type="text" class="admin-form__input" required />
    </div>

    <div class="admin-form__field">
      <label class="admin-form__label">抜粋</label>
      <textarea v-model="form.excerpt" class="admin-form__textarea" rows="3" />
    </div>

    <div class="admin-form__field">
      <label class="admin-form__label">アイキャッチ画像</label>
      <img v-if="previewUrl" :src="previewUrl" class="admin-form__preview" alt="プレビュー" />
      <input type="file" accept="image/*" @change="onFileChange" />
    </div>

    <div class="admin-form__section">
      <div class="admin-form__section-header">
        <span class="admin-form__label">本文</span>
        <button type="button" class="admin-form__add-btn" @click="addSection">+ セクション追加</button>
      </div>
      <div v-for="(section, i) in form.body" :key="i" class="admin-form__section-item">
        <div class="admin-form__field">
          <label class="admin-form__label">小見出し {{ (i as number) + 1 }}</label>
          <input v-model="section.heading" type="text" class="admin-form__input" />
        </div>
        <div class="admin-form__field">
          <label class="admin-form__label">本文（1行1段落）</label>
          <textarea
            :value="section.paragraphs.join('\n')"
            class="admin-form__textarea"
            rows="5"
            @input="(e) => section.paragraphs = (e.target as HTMLTextAreaElement).value.split('\n')"
          />
        </div>
        <button type="button" class="admin-form__remove-btn" @click="removeSection(i as number)">このセクションを削除</button>
      </div>
    </div>

    <div class="admin-form__footer">
      <NuxtLink to="/admin/info" class="admin-form__cancel-btn">キャンセル</NuxtLink>
      <button type="submit" class="admin-form__submit-btn" :disabled="loading">
        {{ loading ? '保存中...' : '保存する' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  initial?: any
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [formData: any, imageFile: File | null]
}>()

const imageFile = ref<File | null>(null)
const previewUrl = ref<string>(props.initial?.imageUrl ?? '')

const form = reactive({
  category: props.initial?.category ?? 'news',
  date: props.initial?.date ?? '',
  title: props.initial?.title ?? '',
  excerpt: props.initial?.excerpt ?? '',
  body: props.initial?.body ? JSON.parse(JSON.stringify(props.initial.body)) : [{ heading: '', paragraphs: [''] }],
})

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  imageFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const addSection = () => form.body.push({ heading: '', paragraphs: [''] })
const removeSection = (i: number) => form.body.splice(i, 1)

const handleSubmit = () => {
  emit('submit', { ...form }, imageFile.value)
}

defineExpose({ form, previewUrl })
</script>

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
