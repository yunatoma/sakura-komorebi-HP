<template>
  <section class="intro-list" ref="listRef">
    <div class="intro-list__border intro-list__border--top"></div>
    <div class="intro-list__border intro-list__border--bottom"></div>

    <!-- Icon straddling the top border -->
    <div class="intro-list__icon-wrap">
      <div class="intro-list__icon" :class="{ 'is-visible': isVisible }">
        <div class="intro-list__icon-circle">
          <img src="/images/nav-icon-introduction-list.svg" alt="" class="intro-list__icon-svg" />
        </div>
      </div>
    </div>

    <div class="intro-list__inner">
      <!-- Tabs -->
      <div class="intro-list__tabs" :class="{ 'is-visible': isVisible }">
        <button
          class="intro-list__tab"
          :class="{ 'is-active': activeTab === 'type' }"
          @click="setTab('type')"
        >
          園の種類<br />から探す
        </button>
        <button
          class="intro-list__tab"
          :class="{ 'is-active': activeTab === 'pref' }"
          @click="setTab('pref')"
        >
          都道府県<br />から探す
        </button>
      </div>

      <!-- Card -->
      <div class="intro-list__card" :class="{ 'is-visible': isVisible }">
        <!-- Type filter buttons -->
        <div v-if="activeTab === 'type'" class="intro-list__filters">
          <button
            v-for="t in gardenTypes"
            :key="t"
            class="intro-list__filter-btn"
            :class="{ 'is-active': activeType === t }"
            @click="activeType = t; currentPage = 1"
          >{{ t }}</button>
        </div>

        <!-- Prefecture filter buttons -->
        <div v-if="activeTab === 'pref'" class="intro-list__filters">
          <button
            v-for="p in prefectures"
            :key="p"
            class="intro-list__filter-btn"
            :class="{ 'is-active': activePref === p }"
            @click="activePref = p; currentPage = 1"
          >{{ p }}</button>
        </div>

        <!-- Grid -->
        <ul class="intro-list__grid">
          <li
            v-for="(garden, i) in paginatedGardens"
            :key="garden.id"
            class="intro-list__item"
            :class="{ 'is-visible': isVisible }"
            :style="{ animationDelay: `${0.1 + i * 0.05}s` }"
          >
            <NuxtLink :to="`/introduction/${garden.id}`" class="intro-list__item-link">
              <div class="intro-list__item-photo">
                <img :src="garden.img" :alt="garden.name" class="intro-list__item-img" loading="lazy" />
              </div>
              <div class="intro-list__item-tags">
                <span class="intro-list__item-tag">{{ garden.type }}</span>
                <span class="intro-list__item-tag">{{ garden.prefecture }}</span>
              </div>
              <p class="intro-list__item-name">{{ garden.name }}</p>
            </NuxtLink>
          </li>
        </ul>

        <!-- Pagination -->
        <nav v-if="totalPages > 1" class="intro-list__pagination" aria-label="ページネーション">
          <button
            v-for="page in totalPages"
            :key="page"
            class="intro-list__page-btn"
            :class="{ 'is-active': currentPage === page }"
            :aria-current="currentPage === page ? 'page' : undefined"
            @click="currentPage = page"
          >{{ page }}</button>
          <button
            v-if="currentPage < totalPages"
            class="intro-list__page-btn intro-list__page-btn--next"
            aria-label="次のページ"
            @click="currentPage++"
          >›</button>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import type { Garden } from '~/composables/useGardens'

const emit = defineEmits<{ 'tab-change': [label: string] }>()

const { elementRef: listRef, isVisible } = useScrollAnimation(0.05)

const route = useRoute()

const activeTab = ref<'type' | 'pref'>('type')

const { fetchAll } = useGardens()
const allGardens = ref<Garden[]>([])
const activeType = ref('')
const activePref = ref('')

onMounted(async () => {
  allGardens.value = await fetchAll()
  if (gardenTypes.value.length > 0) activeType.value = gardenTypes.value[0]
  const prefQuery = route.query.pref as string | undefined
  if (prefQuery && prefectures.value.includes(prefQuery)) {
    activeTab.value = 'pref'
    activePref.value = prefQuery
    emit('tab-change', '都道府県から探す')
  }
})

const gardenTypes = computed(() => [...new Set(allGardens.value.map(g => g.type).filter(Boolean))])
const prefectures = computed(() => [...new Set(allGardens.value.map(g => g.prefecture))])

const perPage = 9
const currentPage = ref(1)

const filteredGardens = computed(() => {
  if (activeTab.value === 'type') {
    return allGardens.value.filter(g => g.type === activeType.value)
  }
  return allGardens.value.filter(g => g.prefecture === activePref.value)
})

const totalPages = computed(() => Math.ceil(filteredGardens.value.length / perPage))

const paginatedGardens = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredGardens.value.slice(start, start + perPage)
})

function setTab(tab: 'type' | 'pref') {
  activeTab.value = tab
  currentPage.value = 1
  emit('tab-change', tab === 'type' ? '園の種類から探す' : '都道府県から探す')
}
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.intro-list {
  position: relative;
  padding: 80px 60px 100px;
  margin-top: 130px;
  background: url('/images/top-letters__bg.svg') top center / cover no-repeat;

  @include sp {
    padding: 64px 20px 80px;
  }

  // ---- Dotted borders ----
  &__border {
    width: 100%;
    height: 2px;
    background-image: repeating-linear-gradient(
      to right,
      $color-pink 0,
      $color-pink 6px,
      transparent 6px,
      transparent 14px
    );

    &--top {
      position: absolute;
      top: 0;
      left: 0;
    }

    &--bottom {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  &__inner {
    max-width: 960px;
    margin: 0 auto;
  }

  // ---- Icon (straddling the top border) ----
  &__icon-wrap {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  &__icon {
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.1s both;
    }
  }

  &__icon-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 96px;
    background-color: #FFF7B8;
    border-radius: 50%;

    @include sp {
      width: 80px;
      height: 80px;
    }
  }

  &__icon-svg {
    width: 60px;
    height: 60px;

    @include sp {
      width: 50px;
      height: 50px;
    }
  }

  // ---- Tabs ----
  &__tabs {
    display: flex;
    justify-content: center;
    gap: 0;
    margin-bottom: 0;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.2s both;
    }
  }

  &__tab {
    font-family: $font-kosugi;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.06em;
    text-align: center;
    padding: 12px 40px;
    border: 2px solid $color-pink;
    border-bottom: none;
    border-radius: 12px 12px 0 0;
    background-color: $color-white;
    color: $color-pink;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    & + & {
      margin-left: -2px;
    }

    &.is-active {
      background-color: $color-pink;
      color: $color-white;
      z-index: 1;
      position: relative;
    }

    @include sp {
      font-size: 12px;
      padding: 10px 20px;
    }
  }

  // ---- Card ----
  &__card {
    background-color: $color-white;
    border-radius: 40px;
    padding: 32px 32px 40px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.3s both;
    }

    @include sp {
      padding: 20px 16px 32px;
      border-radius: 40px;
    }
  }

  // ---- Filters ----
  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 28px;

    @include sp {
      gap: 6px;
      margin-bottom: 20px;
    }
  }

  &__filter-btn {
    font-family: $font-kosugi;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.04em;
    padding: 6px 20px;
    border-radius: 999px;
    border: 1.5px solid $color-pink;
    background-color: $color-white;
    color: $color-pink;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    &.is-active {
      background-color: $color-pink;
      color: $color-white;
    }

    &:not(.is-active):hover {
      background-color: $color-pink-light;
    }

    @include sp {
      font-size: 12px;
      padding: 5px 14px;
    }
  }

  // ---- Grid ----
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px 20px;
    list-style: none;
    margin-bottom: 32px;

    @include sp {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px 12px;
      margin-bottom: 24px;
    }
  }

  // ---- Item ----
  &__item {
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.5s ease both;
    }
  }

  &__item-link {
    display: block;
    text-decoration: none;
    border: 1.5px solid #f0d4d8;
    border-radius: 12px;
    overflow: hidden;
    background-color: $color-white;
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 4px 16px rgba(239, 143, 156, 0.25);
    }

    @include sp {
      border-radius: 8px;
    }
  }

  &__item-photo {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background-color: $color-pink-light;
  }

  &__item-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;

    .intro-list__item-link:hover & {
      transform: scale(1.04);
    }
  }

  &__item-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    padding: 10px 12px 4px;

    @include sp {
      padding: 8px 8px 2px;
    }
  }

  &__item-tag {
    font-family: $font-kosugi;
    font-size: 11px;
    color: $color-dark-red;
    background-color: $color-pink-light;
    border-radius: 4px;
    padding: 2px 8px;
    line-height: 1.6;

    @include sp {
      font-size: 10px;
      padding: 2px 6px;
    }
  }

  &__item-name {
    font-family: $font-yusei;
    font-size: 16px;
    color: $color-text;
    letter-spacing: 0.06em;
    padding: 6px 12px 14px;
    line-height: 1.4;

    @include sp {
      font-size: 13px;
      padding: 4px 8px 10px;
    }
  }

  // ---- Pagination ----
  &__pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 8px;
  }

  &__page-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1.5px solid $color-pink;
    background-color: $color-white;
    font-family: $font-kosugi;
    font-size: 14px;
    color: $color-pink;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    &.is-active {
      background-color: $color-pink;
      color: $color-white;
    }

    &--next {
      font-size: 18px;
    }

    &:not(.is-active):hover {
      background-color: $color-pink-light;
    }
  }
}
</style>
