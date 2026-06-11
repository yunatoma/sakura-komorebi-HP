<template>
  <section ref="sectionRef" class="info-list">
    <!-- 装飾 -->
    <div class="info-list__deco info-list__deco--blob-right" aria-hidden="true"></div>
    <div class="info-list__deco info-list__deco--blob-bottom" aria-hidden="true"></div>

    <div class="info-list__inner">
      <!-- ローディング -->
      <div v-if="loading" class="info-list__loading">
        <span class="info-list__spinner" aria-label="読み込み中"></span>
      </div>

      <template v-else>
      <!-- フィルタータブ -->
      <div class="info-list__tabs" role="tablist" aria-label="カテゴリフィルター">
        <button
          v-for="(tab, i) in tabs"
          :key="tab.key"
          class="info-list__tab"
          :class="{ 'info-list__tab--active': activeTab === tab.key, 'is-visible': isVisible }"
          :style="{ animationDelay: `${0.1 + i * 0.07}s` }"
          role="tab"
          :aria-selected="activeTab === tab.key"
          @click="setTab(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- ニュース一覧 -->
      <ul class="info-list__list">
        <li
          v-for="(item, i) in paginatedItems"
          :key="item.id"
          class="info-list__item"
          :class="{ 'is-visible': isVisible }"
          :style="{ animationDelay: `${0.3 + i * 0.07}s` }"
        >
          <NuxtLink :to="`/info/${item.id}`" class="info-list__item-link">
            <div class="info-list__badge" :class="`info-list__badge--${item.category}`">
              <span class="info-list__badge-icon" aria-hidden="true">
                <!-- お知らせ icon -->
                <svg v-if="item.category === 'news'" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6C20 6 10 12 10 22C10 27.52 14.48 32 20 32C25.52 32 30 27.52 30 22C30 12 20 6 20 6Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M16 34H24" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="20" cy="22" r="3" fill="white"/>
                </svg>
                <!-- 活動紹介 icon -->
                <svg v-else-if="item.category === 'activity'" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10C8 8.9 8.9 8 10 8H30C31.1 8 32 8.9 32 10V26C32 27.1 31.1 28 30 28H22L16 34V28H10C8.9 28 8 27.1 8 26V10Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                  <circle cx="15" cy="19" r="2" fill="white"/>
                  <circle cx="20" cy="19" r="2" fill="white"/>
                  <circle cx="25" cy="19" r="2" fill="white"/>
                </svg>
                <!-- メディア情報 icon -->
                <svg v-else-if="item.category === 'media'" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="8" width="28" height="20" rx="2" stroke="white" stroke-width="2"/>
                  <path d="M14 32H26" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <path d="M20 28V32" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <path d="M15 18L22 14V22L15 18Z" fill="white"/>
                </svg>
              </span>
              <span class="info-list__badge-label">{{ categoryLabel(item.category) }}</span>
            </div>
            <div class="info-list__content">
              <time class="info-list__date" :datetime="item.date">{{ formatDate(item.date) }}</time>
              <p class="info-list__title">{{ item.title }}</p>
              <p class="info-list__excerpt">{{ item.excerpt }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>

      <!-- ページネーション -->
      <nav class="info-list__pagination" aria-label="ページナビゲーション">
        <button
          class="info-list__page-btn info-list__page-btn--prev"
          :disabled="currentPage === 1"
          aria-label="前のページ"
          @click="currentPage--"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          class="info-list__page-btn"
          :class="{ 'info-list__page-btn--active': currentPage === page }"
          :aria-current="currentPage === page ? 'page' : undefined"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
        <button
          class="info-list__page-btn info-list__page-btn--next"
          :disabled="currentPage === totalPages"
          aria-label="次のページ"
          @click="currentPage++"
        >
          <span aria-hidden="true">›</span>
        </button>
      </nav>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { InfoPost } from '~/composables/useInfoPosts'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
const { elementRef: sectionRef, isVisible } = useScrollAnimation(0.05)

const activeTab = ref<string>('all')
const currentPage = ref(1)
const itemsPerPage = 9

function setTab(key: string) {
  activeTab.value = key
  currentPage.value = 1
}

const { fetchAll } = useInfoPosts()
const allItems = ref<InfoPost[]>([])
const loading = ref(true)

onMounted(async () => {
  allItems.value = await fetchAll()
  loading.value = false
})

function getCategoryLabel(value: string) {
  const map: Record<string, string> = {
    news: 'お知らせ',
    activity: '活動紹介',
    media: 'メディア情報',
  }
  return map[value] ?? value
}

const tabs = computed(() => {
  const seen = new Set<string>()
  const dynamic: { key: string; label: string }[] = []
  for (const item of allItems.value) {
    if (!seen.has(item.category)) {
      seen.add(item.category)
      dynamic.push({ key: item.category, label: getCategoryLabel(item.category) })
    }
  }
  return [{ key: 'all', label: 'すべて' }, ...dynamic]
})

const filteredItems = computed(() =>
  activeTab.value === 'all'
    ? allItems.value
    : allItems.value.filter(item => item.category === activeTab.value)
)

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})

function formatDate(date: string) {
  const [y, m, d] = date.split('-')
  return `${y}. ${m}. ${d}`
}

function categoryLabel(category: string) {
  return getCategoryLabel(category)
}
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// カテゴリーカラー
$color-news: #EF8F9C;
$color-activity: #7FC8E8;
$color-media: #F5C842;

.info-list {
  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80px 0;
  }

  &__spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 3px solid rgba($color-pink, 0.3);
    border-top-color: $color-pink;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  position: relative;
  padding: 48px 0 80px;
  overflow: hidden;

  @include sp {
    padding: 32px 0 60px;
  }

  // ---- 装飾 ----
  &__deco {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;

    &--blob-right {
      width: 280px;
      height: 260px;
      background-color: rgba($color-pink, 0.25);
      border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
      right: -60px;
      top: 280px;

      @include sp {
        width: 160px;
        height: 150px;
        right: -40px;
        top: 200px;
      }
    }

    &--blob-bottom {
      width: 120px;
      height: 120px;
      background-color: rgba($color-pink, 0.18);
      border-radius: 50%;
      right: 80px;
      bottom: 160px;
      background-image: radial-gradient(circle at 30% 40%, rgba($color-pink, 0.3) 0%, transparent 70%);

      @include sp {
        display: none;
      }
    }
  }

  &__inner {
    position: relative;
    z-index: 1;
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 60px;

    @include sp {
      padding: 0 20px;
    }
  }

  // ---- タブ ----
  &__tabs {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 40px;
    flex-wrap: wrap;

    @include sp {
      gap: 8px;
      margin-bottom: 28px;
    }
  }

  &__tab {
    font-family: $font-yusei;
    font-size: 14px;
    letter-spacing: 0.1em;
    color: $color-pink;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.5s ease both;
    }
    background: transparent;
    border: 2px solid $color-pink;
    border-radius: 12px;
    padding: 8px 32px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    white-space: nowrap;

    &--active {
      background-color: $color-pink;
      color: $color-white;
    }

    &:hover:not(&--active) {
      background-color: rgba($color-pink, 0.1);
    }

    @include sp {
      font-size: 12px;
      padding: 6px 20px;
      border-radius: 10px;
    }
  }

  // ---- リスト ----
  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
  }

  &__item {
    border-bottom: 1px solid rgba($color-pink, 0.5);
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.5s ease both;
    }

    &:first-child {
      border-top: 1px solid rgba($color-pink, 0.5);
    }
  }

  &__item-link {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 20px 0;
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.75;
    }

    @include sp {
      gap: 16px;
      padding: 16px 0;
    }
  }

  // ---- バッジ ----
  &__badge {
    flex-shrink: 0;
    width: 90px;
    height: 90px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background-color: $color-pink;

    @include sp {
      width: 70px;
      height: 70px;
      border-radius: 12px;
      gap: 4px;
    }

    &--news {
      background-color: $color-news;
    }

    &--activity {
      background-color: $color-activity;
    }

    &--media {
      background-color: $color-media;
    }
  }

  &__badge-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 36px;
      height: 36px;

      @include sp {
        width: 28px;
        height: 28px;
      }
    }
  }

  &__badge-label {
    font-family: $font-kosugi;
    font-size: 11px;
    color: $color-white;
    text-align: center;
    line-height: 1.2;
    letter-spacing: 0.04em;

    @include sp {
      font-size: 9px;
    }
  }

  // ---- コンテンツ ----
  &__content {
    flex: 1;
    min-width: 0;
  }

  &__date {
    display: block;
    font-family: $font-jost;
    font-size: 13px;
    font-weight: 400;
    color: $color-text;
    letter-spacing: 0.06em;
    margin-bottom: 6px;

    @include sp {
      font-size: 12px;
    }
  }

  &__title {
    font-family: $font-kosugi;
    font-size: 16px;
    font-weight: 400;
    color: $color-dark-red;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
    line-height: 1.5;

    @include sp {
      font-size: 14px;
    }
  }

  &__excerpt {
    font-family: $font-kosugi;
    font-size: 13px;
    color: $color-text;
    line-height: 1.6;
    letter-spacing: 0.04em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    @include sp {
      font-size: 12px;
      -webkit-line-clamp: 2;
    }
  }

  // ---- ページネーション ----
  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 48px;

    @include sp {
      margin-top: 32px;
      gap: 4px;
    }
  }

  &__page-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1.5px solid $color-pink;
    background: transparent;
    color: $color-dark-red;
    font-family: $font-jost;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled):not(&--active) {
      background-color: rgba($color-pink, 0.15);
    }

    &--active {
      background-color: $color-pink;
      color: $color-white;
      border-color: $color-pink;
    }

    &--prev,
    &--next {
      font-size: 18px;
      color: $color-dark-red;
    }

    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
  }
}
</style>
