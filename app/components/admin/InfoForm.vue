<template>
  <form class="admin-form__body" @submit.prevent="handleSubmit">
    <div class="admin-form__field">
      <label class="admin-form__label">カテゴリ</label>
      <select v-model="form.category" class="admin-form__input" required>
        <option value="" disabled>選択してください</option>
        <option v-for="cat in localCategories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
      </select>
      <div v-if="newlyAdded.length" class="admin-form__name-list">
        <div v-for="cat in newlyAdded" :key="cat.value" class="admin-form__inline">
          <span class="admin-form__name-item">{{ cat.label }}</span>
          <button type="button" class="admin-form__remove-btn" @click="handleRemoveCategory(cat)">削除</button>
        </div>
      </div>
      <div class="admin-form__inline admin-form__name-add">
        <input v-model="newCategoryName" type="text" class="admin-form__input" placeholder="例：イベント" @keydown.enter.prevent="handleAddCategory" />
        <button type="button" class="admin-form__add-btn" :disabled="addingLoading" @click="handleAddCategory">
          {{ addingLoading ? '...' : '+ 追加' }}
        </button>
      </div>
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
  allCategories?: { id?: string; value: string; label: string }[]
}>()

const emit = defineEmits<{
  submit: [formData: any, imageFile: File | null]
}>()

const { create, remove } = useFirestore()

const defaultCategories = [
  { value: 'news', label: 'お知らせ' },
  { value: 'activity', label: '活動紹介' },
  { value: 'media', label: 'メディア情報' },
]

const localCategories = ref([
  ...defaultCategories,
  ...(props.allCategories ?? []),
])

const newlyAdded = ref<{ id: string; value: string; label: string }[]>([])
const newCategoryName = ref('')
const addingLoading = ref(false)

const handleAddCategory = async () => {
  const name = newCategoryName.value.trim()
  if (!name || localCategories.value.some(c => c.label === name)) return
  addingLoading.value = true
  try {
    const id = await create('infoCategories', { value: name, label: name })
    localCategories.value.push({ value: name, label: name })
    newlyAdded.value.push({ id, value: name, label: name })
    form.category = name
    newCategoryName.value = ''
  } finally {
    addingLoading.value = false
  }
}

const handleRemoveCategory = async (cat: { id: string; value: string; label: string }) => {
  if (!confirm(`「${cat.label}」を削除しますか？`)) return
  await remove('infoCategories', cat.id)
  localCategories.value = localCategories.value.filter(c => c.value !== cat.value)
  newlyAdded.value = newlyAdded.value.filter(c => c.value !== cat.value)
  if (form.category === cat.value) form.category = ''
}

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

.admin-form__name-list {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.admin-form__name-item {
  font-size: 14px;
  flex: 1;
}

.admin-form__name-add {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: nowrap;
  align-items: stretch;

  .admin-form__input {
    flex: 1;
    min-width: 0;
  }

  .admin-form__add-btn {
    flex-shrink: 0;
    white-space: nowrap;
    padding-left: 20px;
    padding-right: 20px;
    height: auto;
  }
}
</style>
