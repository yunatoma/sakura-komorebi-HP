<template>
  <div class="admin-tags">
    <h1 class="admin-list__title">タグ管理</h1>

    <div class="admin-tags__sections">
      <div class="admin-tags__section">
        <h2 class="admin-tags__section-title">お知らせタグ</h2>
        <div v-for="tag in infoTags" :key="tag.id" class="admin-tags__item">
          <input v-model="tag.name" type="text" class="admin-form__input" @blur="updateTag(tag)" />
          <button class="admin-list__delete-btn" @click="deleteTag(tag.id)">削除</button>
        </div>
        <form class="admin-tags__add" @submit.prevent="addTag('info')">
          <input v-model="newInfoTag" type="text" class="admin-form__input" placeholder="新しいタグ名" />
          <button type="submit" class="admin-form__submit-btn">追加</button>
        </form>
      </div>

      <div class="admin-tags__section">
        <h2 class="admin-tags__section-title">おたよりタグ</h2>
        <div v-for="tag in letterTags" :key="tag.id" class="admin-tags__item">
          <input v-model="tag.name" type="text" class="admin-form__input" @blur="updateTag(tag)" />
          <button class="admin-list__delete-btn" @click="deleteTag(tag.id)">削除</button>
        </div>
        <form class="admin-tags__add" @submit.prevent="addTag('letter')">
          <input v-model="newLetterTag" type="text" class="admin-form__input" placeholder="新しいタグ名" />
          <button type="submit" class="admin-form__submit-btn">追加</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { getAll, create, update, remove } = useFirestore()
const allTags = ref<any[]>([])
const newInfoTag = ref('')
const newLetterTag = ref('')

const load = async () => {
  allTags.value = await getAll('tags', 'name')
}

const infoTags = computed(() => allTags.value.filter(t => t.type === 'info'))
const letterTags = computed(() => allTags.value.filter(t => t.type === 'letter'))

const addTag = async (type: 'info' | 'letter') => {
  const name = type === 'info' ? newInfoTag.value : newLetterTag.value
  if (!name.trim()) return
  await create('tags', { name: name.trim(), type })
  if (type === 'info') newInfoTag.value = ''
  else newLetterTag.value = ''
  await load()
}

const updateTag = async (tag: any) => {
  await update('tags', tag.id, { name: tag.name, type: tag.type })
}

const deleteTag = async (id: string) => {
  if (!confirm('本当に削除しますか？')) return
  await remove('tags', id)
  await load()
}

await load()
</script>

<style scoped lang="scss">
@use '~/assets/styles/admin' as *;

.admin-tags {
  &__sections {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__section {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  }

  &__section-title {
    font-size: 16px;
    font-weight: bold;
    color: #55000C;
    margin-bottom: 16px;
  }

  &__item {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 10px;
  }

  &__add {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #eee;
  }
}
</style>
