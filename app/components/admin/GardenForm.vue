<template>
  <form class="admin-form__body" @submit.prevent="handleSubmit">
    <!-- 基本情報 -->
    <section class="admin-form__group">
      <h2 class="admin-form__group-title">基本情報</h2>
      <div class="admin-form__field">
        <label class="admin-form__label">園名</label>
        <input v-model="form.name" type="text" class="admin-form__input" required placeholder="例：しぶや園" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">種別カテゴリ</label>
        <select v-model="form.typeCategory" class="admin-form__input">
          <option>認定保育所</option>
          <option>小規模保育所</option>
          <option>小規模保育事業A型</option>
        </select>
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">施設種別</label>
        <input v-model="form.type" type="text" class="admin-form__input" placeholder="例：認可保育所" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">都道府県</label>
        <input v-model="form.prefecture" type="text" class="admin-form__input" placeholder="例：東京都" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">サムネイル画像</label>
        <img v-if="previews.img" :src="previews.img" class="admin-form__preview" alt="プレビュー" />
        <input type="file" accept="image/*" @change="(e) => onFileChange(e, 'img')" />
      </div>
    </section>

    <!-- 立地情報 -->
    <section class="admin-form__group">
      <h2 class="admin-form__group-title">立地情報</h2>
      <div class="admin-form__field">
        <label class="admin-form__label">立地の見出し</label>
        <input v-model="form.location.heading" type="text" class="admin-form__input" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">立地の説明</label>
        <textarea v-model="form.location.text" class="admin-form__textarea" rows="4" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">立地画像</label>
        <img v-if="previews.locationImg" :src="previews.locationImg" class="admin-form__preview" alt="プレビュー" />
        <input type="file" accept="image/*" @change="(e) => onFileChange(e, 'locationImg')" />
      </div>
    </section>

    <!-- ギャラリー -->
    <section class="admin-form__group">
      <h2 class="admin-form__group-title">ギャラリー</h2>
      <div v-if="form.gallery.length > 0" class="admin-form__gallery">
        <div v-for="(img, i) in form.gallery" :key="i" class="admin-form__gallery-item">
          <img :src="img.src" :alt="img.alt" class="admin-form__gallery-img" />
          <button type="button" class="admin-form__remove-btn" @click="removeGallery(i as number)">削除</button>
        </div>
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">画像を追加（複数選択可）</label>
        <input type="file" accept="image/*" multiple @change="onGalleryChange" />
      </div>
    </section>

    <!-- 園長メッセージ -->
    <section class="admin-form__group">
      <h2 class="admin-form__group-title">園長メッセージ</h2>
      <div class="admin-form__field">
        <label class="admin-form__label">メッセージ</label>
        <textarea v-model="form.message.text" class="admin-form__textarea" rows="6" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">メッセージ画像</label>
        <img v-if="previews.messageImg" :src="previews.messageImg" class="admin-form__preview" alt="プレビュー" />
        <input type="file" accept="image/*" @change="(e) => onFileChange(e, 'messageImg')" />
      </div>
    </section>

    <!-- 施設情報 -->
    <section class="admin-form__group">
      <h2 class="admin-form__group-title">施設情報</h2>
      <div class="admin-form__field">
        <label class="admin-form__label">住所</label>
        <input v-model="form.info.address" type="text" class="admin-form__input" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">電話番号</label>
        <input v-model="form.info.tel" type="text" class="admin-form__input" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">FAX</label>
        <input v-model="form.info.fax" type="text" class="admin-form__input" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">対象児童</label>
        <input v-model="form.info.target" type="text" class="admin-form__input" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">入園日</label>
        <input v-model="form.info.enrollmentDate" type="text" class="admin-form__input" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">開所日備考</label>
        <input v-model="form.info.openDaysNote" type="text" class="admin-form__input" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">開所曜日（月〜日）</label>
        <div class="admin-form__checkboxes">
          <label v-for="(day, i) in dayLabels" :key="i">
            <input v-model="form.info.openDays[i]" type="checkbox" />
            {{ day }}
          </label>
        </div>
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">標準保育時間</label>
        <input v-model="form.info.hoursStandard" type="text" class="admin-form__input" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">標準保育（延長）</label>
        <input v-model="form.info.hoursStandardExtended" type="text" class="admin-form__input" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">短時間保育</label>
        <input v-model="form.info.hoursShort" type="text" class="admin-form__input" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">短時間保育（延長）</label>
        <input v-model="form.info.hoursShortExtended" type="text" class="admin-form__input" />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">定員合計</label>
        <input v-model.number="form.info.capacityTotal" type="number" class="admin-form__input" />
      </div>

      <!-- 年齢別定員 -->
      <div class="admin-form__field">
        <label class="admin-form__label">年齢別定員</label>
        <div v-for="(age, i) in form.info.capacityAges" :key="i" class="admin-form__inline">
          <input v-model="age.age" type="text" class="admin-form__input admin-form__input--sm" placeholder="例：0歳児" />
          <input v-model.number="age.count" type="number" class="admin-form__input admin-form__input--sm" placeholder="人数" />
          <button type="button" class="admin-form__remove-btn" @click="form.info.capacityAges.splice(i as number, 1)">削除</button>
        </div>
        <button type="button" class="admin-form__add-btn" @click="form.info.capacityAges.push({ age: '', count: 0 })">+ 追加</button>
      </div>

      <div class="admin-form__field">
        <label class="admin-form__label">職員総数</label>
        <input v-model="form.info.staffTotal" type="text" class="admin-form__input" />
      </div>

      <!-- 職員構成 -->
      <div class="admin-form__field">
        <label class="admin-form__label">職員構成</label>
        <div v-for="(role, i) in form.info.staffRoles" :key="i" class="admin-form__inline">
          <input v-model="role.role" type="text" class="admin-form__input admin-form__input--sm" placeholder="役職" />
          <input v-model="role.count" type="text" class="admin-form__input admin-form__input--sm" placeholder="人数" />
          <button type="button" class="admin-form__remove-btn" @click="form.info.staffRoles.splice(i as number, 1)">削除</button>
        </div>
        <button type="button" class="admin-form__add-btn" @click="form.info.staffRoles.push({ role: '', count: '' })">+ 追加</button>
      </div>

      <!-- 職員備考 -->
      <div class="admin-form__field">
        <label class="admin-form__label">職員備考</label>
        <div v-for="(note, i) in form.info.staffNotes" :key="i" class="admin-form__inline">
          <input v-model="form.info.staffNotes[i]" type="text" class="admin-form__input" />
          <button type="button" class="admin-form__remove-btn" @click="form.info.staffNotes.splice(i as number, 1)">削除</button>
        </div>
        <button type="button" class="admin-form__add-btn" @click="form.info.staffNotes.push('')">+ 追加</button>
      </div>
    </section>

    <div class="admin-form__footer">
      <NuxtLink to="/admin/introduction" class="admin-form__cancel-btn">キャンセル</NuxtLink>
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
  submit: [formData: any, files: Record<string, File | null>, galleryFiles: File[]]
}>()

const dayLabels = ['月', '火', '水', '木', '金', '土', '日']

const files = reactive<Record<string, File | null>>({
  img: null,
  locationImg: null,
  messageImg: null,
})

const previews = reactive<Record<string, string>>({
  img: props.initial?.img ?? '',
  locationImg: props.initial?.location?.img ?? '',
  messageImg: props.initial?.message?.img ?? '',
})

const galleryFiles = ref<File[]>([])

const defaultInfo = () => ({
  address: '',
  tel: '',
  fax: '',
  target: '',
  enrollmentDate: '原則として毎月1日',
  openDays: [true, true, true, true, true, true, false],
  openDaysNote: '月曜日〜土曜日（日曜日、祝日・休日、年末年始（12/29〜1/3）はお休み）',
  hoursStandard: '7：30〜18：30',
  hoursStandardExtended: '18：31〜19：30',
  hoursShort: '9：00〜17：00',
  hoursShortExtended: '7：30〜8：59 / 17：01〜19：30',
  capacityTotal: 0,
  capacityAges: [],
  staffTotal: '',
  staffRoles: [],
  staffNotes: [],
})

const form = reactive({
  name: props.initial?.name ?? '',
  typeCategory: props.initial?.typeCategory ?? '認定保育所',
  type: props.initial?.type ?? '',
  prefecture: props.initial?.prefecture ?? '',
  img: props.initial?.img ?? '',
  location: {
    img: props.initial?.location?.img ?? '',
    heading: props.initial?.location?.heading ?? '',
    text: props.initial?.location?.text ?? '',
  },
  gallery: props.initial?.gallery ? JSON.parse(JSON.stringify(props.initial.gallery)) : [] as { src: string; alt: string }[],
  message: {
    img: props.initial?.message?.img ?? '',
    text: props.initial?.message?.text ?? '',
  },
  info: props.initial?.info ? JSON.parse(JSON.stringify(props.initial.info)) : defaultInfo(),
})

const onFileChange = (e: Event, key: string) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  files[key] = file
  previews[key] = URL.createObjectURL(file)
}

const onGalleryChange = (e: Event) => {
  const selected = Array.from((e.target as HTMLInputElement).files ?? [])
  galleryFiles.value.push(...selected)
}

const removeGallery = (i: number) => form.gallery.splice(i, 1)

const handleSubmit = () => {
  emit('submit', JSON.parse(JSON.stringify(form)), { ...files }, [...galleryFiles.value])
}
</script>

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;

.admin-form__group {
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.admin-form__group-title {
  font-size: 16px;
  font-weight: bold;
  color: #55000C;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.admin-form__checkboxes {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
  }
}

.admin-form__gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.admin-form__gallery-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.admin-form__gallery-img {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
}

.admin-form__inline {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
}

.admin-form__input--sm {
  width: 160px;
}
</style>
