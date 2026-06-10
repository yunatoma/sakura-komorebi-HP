<template>
  <form class="admin-form__body" @submit.prevent="handleSubmit">
    <div class="admin-form__field">
      <label class="admin-form__label">園名</label>
      <div class="admin-form__garden-row">
        <select v-model="form.garden" class="admin-form__input" required @change="onGardenChange">
          <option value="" disabled>選択してください</option>
          <option v-for="g in localGardens" :key="g.id" :value="g.name">{{ g.name }}</option>
          <option v-if="form.garden && !localGardens.some(g => g.name === form.garden)" :value="form.garden">{{ form.garden }}</option>
        </select>
        <button type="button" class="admin-form__garden-add-btn" @click="addingGarden = !addingGarden">+</button>
      </div>
      <div v-if="addingGarden" class="admin-form__garden-inline">
        <input v-model="newGardenName" type="text" class="admin-form__input" placeholder="新しい園名を入力" @keydown.enter.prevent="handleAddGarden" />
        <button type="button" class="admin-form__add-btn" :disabled="addingGardenLoading" @click="handleAddGarden">
          {{ addingGardenLoading ? '...' : '追加' }}
        </button>
      </div>
      <div v-if="newlyAdded.length" class="admin-form__garden-new-list">
        <span class="admin-form__garden-new-label">今回追加：</span>
        <span v-for="g in newlyAdded" :key="g.id" class="admin-form__garden-chip">
          {{ g.name }}
          <button type="button" class="admin-form__garden-chip-remove" @click="handleRemoveGarden(g)">×</button>
        </span>
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
      <label class="admin-form__label">都道府県</label>
      <select v-model="form.pref" class="admin-form__input">
        <option value="">選択してください</option>
        <option>北海道</option>
        <option>青森県</option>
        <option>岩手県</option>
        <option>宮城県</option>
        <option>秋田県</option>
        <option>山形県</option>
        <option>福島県</option>
        <option>茨城県</option>
        <option>栃木県</option>
        <option>群馬県</option>
        <option>埼玉県</option>
        <option>千葉県</option>
        <option>東京都</option>
        <option>神奈川県</option>
        <option>新潟県</option>
        <option>富山県</option>
        <option>石川県</option>
        <option>福井県</option>
        <option>山梨県</option>
        <option>長野県</option>
        <option>岐阜県</option>
        <option>静岡県</option>
        <option>愛知県</option>
        <option>三重県</option>
        <option>滋賀県</option>
        <option>京都府</option>
        <option>大阪府</option>
        <option>兵庫県</option>
        <option>奈良県</option>
        <option>和歌山県</option>
        <option>鳥取県</option>
        <option>島根県</option>
        <option>岡山県</option>
        <option>広島県</option>
        <option>山口県</option>
        <option>徳島県</option>
        <option>香川県</option>
        <option>愛媛県</option>
        <option>高知県</option>
        <option>福岡県</option>
        <option>佐賀県</option>
        <option>長崎県</option>
        <option>熊本県</option>
        <option>大分県</option>
        <option>宮崎県</option>
        <option>鹿児島県</option>
        <option>沖縄県</option>
      </select>
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

const { create, remove } = useFirestore()

const localGardens = ref([...props.gardens])
const newlyAdded = ref<{ id: string; name: string }[]>([])
const addingGarden = ref(false)
const newGardenName = ref('')
const addingGardenLoading = ref(false)

const handleAddGarden = async () => {
  const name = newGardenName.value.trim()
  if (!name) return
  addingGardenLoading.value = true
  try {
    const id = await create('gardens', { name })
    const newGarden = { id, name }
    localGardens.value.push(newGarden)
    newlyAdded.value.push(newGarden)
    form.garden = name
    form.gardenId = id
    newGardenName.value = ''
    addingGarden.value = false
  } finally {
    addingGardenLoading.value = false
  }
}

const handleRemoveGarden = async (g: { id: string; name: string }) => {
  if (!confirm(`「${g.name}」を削除しますか？`)) return
  await remove('gardens', g.id)
  localGardens.value = localGardens.value.filter(x => x.id !== g.id)
  newlyAdded.value = newlyAdded.value.filter(x => x.id !== g.id)
  if (form.gardenId === g.id) {
    form.garden = ''
    form.gardenId = ''
  }
}

const imageFile = ref<File | null>(null)
const previewUrl = ref<string>(props.initial?.imageUrl ?? '')

const normalizeDate = (date: any) => {
  if (!date) return ''
  const s = String(date)
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s
  // "2024ねん4がつ6にち" 形式
  const m1 = s.match(/^(\d{4})ねん(\d{1,2})がつ(\d{1,2})にち/)
  if (m1) return `${m1[1]}-${m1[2].padStart(2, '0')}-${m1[3].padStart(2, '0')}`
  // YYYY/M/D or YYYY-M-D or YYYY年M月D日
  const m2 = s.match(/^(\d{4})[\/\-年](\d{1,2})[\/\-月](\d{1,2})/)
  if (m2) return `${m2[1]}-${m2[2].padStart(2, '0')}-${m2[3].padStart(2, '0')}`
  return s
}

const form = reactive({
  gardenId: props.initial?.gardenId ?? '',
  garden: props.initial?.garden ?? '',
  date: normalizeDate(props.initial?.date),
  title: props.initial?.title ?? '',
  excerpt: props.initial?.excerpt ?? '',
  pref: props.initial?.pref ?? '',
  body: props.initial?.body ? JSON.parse(JSON.stringify(props.initial.body)) : [{ heading: '', paragraphs: [''] }],
})


const onGardenChange = () => {
  const selected = localGardens.value.find(g => g.name === form.garden)
  if (selected) {
    form.gardenId = selected.id
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

defineExpose({ form, previewUrl })
</script>

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;

.admin-form__garden-row {
  display: flex;
  gap: 8px;
  align-items: center;

  select {
    flex: 1;
  }
}

.admin-form__garden-add-btn {
  width: 32px;
  height: 38px;
  border-radius: 6px;
  background: #55000C;
  color: #fff;
  border: none;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    opacity: 0.85;
  }
}

.admin-form__garden-inline {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.admin-form__garden-new-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.admin-form__garden-new-label {
  font-size: 11px;
  color: #999;
}

.admin-form__garden-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px 2px 10px;
  background: #faf0f0;
  border: 1px solid #EF8F9C;
  border-radius: 20px;
  font-size: 12px;
  color: #55000C;
}

.admin-form__garden-chip-remove {
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: #EF8F9C;
  cursor: pointer;
  line-height: 1;
}
</style>
