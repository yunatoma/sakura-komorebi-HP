<template>
  <form class="admin-form__body" @submit.prevent="handleSubmit">
    <div class="admin-form__field">
      <label class="admin-form__label">園名</label>
      <select v-model="form.gardenId" class="admin-form__input" required @change="onGardenChange">
        <option value="" disabled>選択してください</option>
        <option v-for="g in gardens" :key="g.id" :value="g.id">{{ g.name }}</option>
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
      <label class="admin-form__label">都道府県</label>
      <input v-model="form.pref" type="text" class="admin-form__input" placeholder="例：東京都" />
    </div>

    <div class="admin-form__field">
      <label class="admin-form__label">画像</label>
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
      <NuxtLink to="/admin/letter" class="admin-form__cancel-btn">キャンセル</NuxtLink>
      <button type="submit" class="admin-form__submit-btn" :disabled="loading">
        {{ loading ? '保存中...' : '保存する' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  initial?: any
  gardens: any[]
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [formData: any, imageFile: File | null]
}>()

const imageFile = ref<File | null>(null)
const previewUrl = ref<string>(props.initial?.imageUrl ?? '')

const form = reactive({
  gardenId: props.initial?.gardenId ?? '',
  garden: props.initial?.garden ?? '',
  date: props.initial?.date ?? '',
  title: props.initial?.title ?? '',
  excerpt: props.initial?.excerpt ?? '',
  pref: props.initial?.pref ?? '',
  body: props.initial?.body ? JSON.parse(JSON.stringify(props.initial.body)) : [{ heading: '', paragraphs: [''] }],
})

const onGardenChange = () => {
  const selected = props.gardens.find(g => g.id === form.gardenId)
  if (selected) {
    form.garden = selected.name
    form.pref = selected.prefecture ?? form.pref
  }
}

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
</script>

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;
</style>
