<template>
  <section class="letter-list" ref="listRef">
    <div class="letter-list__inner">
      <!-- Search -->
      <div class="letter-list__search" :class="{ 'is-visible': isVisible }">
        <div class="letter-list__search-header">
          <span class="letter-list__search-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8.5" cy="8.5" r="5.5" stroke="#55000C" stroke-width="1.8"/>
              <path d="M13 13L17 17" stroke="#55000C" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="letter-list__search-label">園をさがす</span>
        </div>
        <div class="letter-list__search-controls">
          <select v-model="selectedPref" class="letter-list__select" aria-label="都道府県を選ぶ">
            <option value="">都道府県を選んでください</option>
            <option v-for="p in prefectures" :key="p" :value="p">{{ p }}</option>
          </select>
          <select v-model="selectedGarden" class="letter-list__select" aria-label="園を選ぶ">
            <option value="">選んでください</option>
            <option v-for="g in filteredGardens" :key="g" :value="g">{{ g }}</option>
          </select>
          <button class="letter-list__search-btn" aria-label="検索" @click="doSearch">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8.5" cy="8.5" r="5.5" stroke="#fff" stroke-width="2"/>
              <path d="M13 13L17 17" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Two-column layout -->
      <div class="letter-list__layout">
        <!-- Main: card grid -->
        <div class="letter-list__main">
          <p v-if="filteredPosts.length === 0" class="letter-list__empty">
            該当するおたよりが見つかりませんでした。
          </p>

          <ul v-else class="letter-list__grid">
            <li
              v-for="(post, i) in paginatedPosts"
              :key="post.id"
              class="letter-list__item"
              :class="{ 'is-visible': isVisible }"
              :style="{ animationDelay: `${0.1 + i * 0.05}s` }"
            >
              <NuxtLink :to="`/letter/${post.id}`" class="letter-list__card">
                <div class="letter-list__card-image">
                  <img :src="post.image" :alt="post.title" loading="lazy" />
                </div>
                <div class="letter-list__card-body">
                  <p class="letter-list__card-garden">{{ post.garden }}</p>
                  <p class="letter-list__card-title">{{ post.title }}</p>
                  <p class="letter-list__card-excerpt">{{ post.excerpt }}</p>
                  <p class="letter-list__card-date">{{ post.date }}</p>
                </div>
              </NuxtLink>
            </li>
          </ul>

          <!-- Pagination -->
          <nav v-if="totalPages > 1" class="letter-list__pagination" aria-label="ページネーション">
            <button
              v-for="page in totalPages"
              :key="page"
              class="letter-list__page-btn"
              :class="{ 'is-active': currentPage === page }"
              :aria-current="currentPage === page ? 'page' : undefined"
              @click="currentPage = page"
            >{{ page }}</button>
            <button
              v-if="currentPage < totalPages"
              class="letter-list__page-btn letter-list__page-btn--next"
              aria-label="次のページ"
              @click="currentPage++"
            >›</button>
          </nav>
        </div>

        <!-- Sidebar: archive -->
        <aside class="letter-list__sidebar" :class="{ 'is-visible': isVisible }">
          <div class="letter-list__archive">
            <h2 class="letter-list__archive-title">アーカイブ</h2>
            <div v-for="year in archive" :key="year.year" class="letter-list__archive-year-group">
              <p class="letter-list__archive-year">{{ year.year }}ねん</p>
              <ul class="letter-list__archive-months">
                <li v-for="month in year.months" :key="month" class="letter-list__archive-month">
                  <a
                    href="#"
                    class="letter-list__archive-link"
                    :class="{ 'is-active': activeArchive.year === year.year && activeArchive.month === month }"
                    @click.prevent="selectArchive(year.year, month)"
                  >{{ month }}がつ</a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: listRef, isVisible } = useScrollAnimation(0.1)

const allPosts = [
  { id: 1,  image: '/images/erik-o990dFLgo1Q-unsplash.webp',              garden: 'なは園',       title: 'なは園からのおたより',         excerpt: '年長さんクラス、美ら海水族館に遠足に行きました！', date: '2024ねん4がつ15にち',  pref: '沖縄県',  year: 2024, month: 4 },
  { id: 2,  image: '/images/massimo-adami-GYdtY0fR4CM-unsplash.webp',     garden: 'ひろしま園',   title: 'ひろしま園からのおたより',     excerpt: '年少さん、ピクニックへ♪',                         date: '2024ねん4がつ6にち',   pref: '広島県',  year: 2024, month: 4 },
  { id: 3,  image: '/images/erika-fletcher-YfNWGrQI3a4-unsplash.webp',    garden: 'しんじゅく園', title: 'しんじゅく園からのおたより',   excerpt: '年少さんクラス、お絵描き会',                       date: '2024ねん2がつ10にち',  pref: '東京都',  year: 2024, month: 2 },
  { id: 4,  image: '/images/jason-sung-xH04gkmk1sg-unsplash.webp',        garden: 'しぶや園',     title: 'しぶや園からのおたより',       excerpt: 'しぶや園の日常',                                   date: '2024ねん1がつ21にち',  pref: '東京都',  year: 2024, month: 1 },
  { id: 5,  image: '/images/jerry-wang-KV9F7Ypl2N0-unsplash.webp',        garden: 'おおさか園',   title: 'おおさか園からのおたより',     excerpt: 'ローマ字のお勉強',                                 date: '2023ねん12がつ10にち', pref: '大阪府',  year: 2023, month: 12 },
  { id: 6,  image: '/images/jerry-wang-Lxn5XUu_mZ8-unsplash.webp',        garden: 'よこはま園',   title: 'よこはま園からのおたより',     excerpt: '年長さんクラス、科学博物館に遠足！',               date: '2023ねん11がつ9にち',  pref: '神奈川県', year: 2023, month: 11 },
  { id: 7,  image: '/images/gautam-arora-K8yhW1BWWpk-unsplash.webp',      garden: 'なは園',       title: 'なは園からのおたより',         excerpt: '秋の収穫体験、さつまいも掘りに行きました',         date: '2023ねん10がつ20にち', pref: '沖縄県',  year: 2023, month: 10 },
  { id: 8,  image: '/images/jackie-park-3SBfM2-ytb8-unsplash 1.webp',     garden: 'しんじゅく園', title: 'しんじゅく園からのおたより',   excerpt: '運動会、みんな頑張りました！',                     date: '2023ねん9がつ30にち',  pref: '東京都',  year: 2023, month: 9 },
  { id: 9,  image: '/images/mi-pham-FtZL0r4DZYk-unsplash.webp',           garden: 'ひろしま園',   title: 'ひろしま園からのおたより',     excerpt: 'たなばた会、笹に願いを込めて',                     date: '2023ねん7がつ7にち',   pref: '広島県',  year: 2023, month: 7 },
  { id: 10, image: '/images/hoylee-song-RcTuIWPwwmo-unsplash.webp',       garden: 'きゅうしゅう園', title: 'きゅうしゅう園からのおたより', excerpt: '春の遠足、公園で楽しく遊びました',               date: '2023ねん5がつ18にち',  pref: '福岡県',  year: 2023, month: 5 },
  { id: 11, image: '/images/silvana-carlos-PiZdDvRG3M8-unsplash.webp',    garden: 'しんじゅく園', title: 'しんじゅく園からのおたより',   excerpt: '絵の具あそび、みんな楽しんでいます',               date: '2023ねん4がつ5にち',   pref: '東京都',  year: 2023, month: 4 },
  { id: 12, image: '/images/zhenzhong-liu-kFmaqeOF-PQ-unsplash 1.webp',   garden: 'しぶや園',     title: 'しぶや園からのおたより',       excerpt: '新年度スタート！入園式の様子',                     date: '2023ねん4がつ1にち',   pref: '東京都',  year: 2023, month: 4 },
]

const prefectures = computed(() => [...new Set(allPosts.map(p => p.pref))])
const selectedPref = ref('')
const selectedGarden = ref('')
const activeFilter = ref({ pref: '', garden: '' })
const activeArchive = ref({ year: 0, month: 0 })

const filteredGardens = computed(() => {
  const src = selectedPref.value
    ? allPosts.filter(p => p.pref === selectedPref.value)
    : allPosts
  return [...new Set(src.map(p => p.garden))]
})

watch(selectedPref, () => { selectedGarden.value = '' })

function doSearch() {
  activeFilter.value = { pref: selectedPref.value, garden: selectedGarden.value }
  activeArchive.value = { year: 0, month: 0 }
  currentPage.value = 1
}

function selectArchive(year: number, month: number) {
  if (activeArchive.value.year === year && activeArchive.value.month === month) {
    activeArchive.value = { year: 0, month: 0 }
  } else {
    activeArchive.value = { year, month }
  }
  currentPage.value = 1
}

const filteredPosts = computed(() => {
  return allPosts.filter(p => {
    if (activeArchive.value.year) {
      return p.year === activeArchive.value.year && p.month === activeArchive.value.month
    }
    if (activeFilter.value.garden) return p.garden === activeFilter.value.garden
    if (activeFilter.value.pref) return p.pref === activeFilter.value.pref
    return true
  })
})

const perPage = 9
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / perPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredPosts.value.slice(start, start + perPage)
})

const archive = [
  { year: 2027, months: [1] },
  { year: 2026, months: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1] },
  { year: 2024, months: [4, 2, 1] },
  { year: 2023, months: [12, 11, 10, 9, 7, 5, 4] },
]
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

.letter-list {
  padding: 40px 60px 100px;

  @include sp {
    padding: 32px 20px 80px;
  }

  &__inner {
    max-width: 1160px;
    margin: 0 auto;
  }

  // ---- Search ----
  &__search {
    background-color: $color-white;
    border-radius: 16px;
    padding: 20px 28px;
    margin-bottom: 40px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.1s both;
    }

    @include sp {
      padding: 16px;
      margin-bottom: 28px;
    }
  }

  &__search-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
  }

  &__search-icon {
    display: flex;
    align-items: center;
  }

  &__search-label {
    font-family: $font-kosugi;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: $color-dark-red;
  }

  &__search-controls {
    display: flex;
    align-items: center;
    gap: 12px;

    @include sp {
      flex-wrap: wrap;
    }
  }

  &__select {
    flex: 1;
    min-width: 0;
    height: 44px;
    padding: 0 16px;
    border: 1.5px solid #e0c8cc;
    border-radius: 8px;
    background-color: $color-white;
    font-family: $font-kosugi;
    font-size: 14px;
    color: $color-text;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2355000C' stroke-width='1.5' fill='none' stroke-linecap='round'%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: $color-pink;
    }

    @include sp {
      width: 100%;
      flex: none;
    }
  }

  &__search-btn {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: $color-dark-red;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  // ---- Two-column layout ----
  &__layout {
    display: flex;
    gap: 40px;
    align-items: flex-start;

    @include sp {
      flex-direction: column;
      gap: 40px;
    }
  }

  &__main {
    flex: 1;
    min-width: 0;
  }

  // ---- Empty state ----
  &__empty {
    font-family: $font-kosugi;
    font-size: 15px;
    color: lighten($color-text, 20%);
    text-align: center;
    padding: 60px 0;
    letter-spacing: 0.06em;
  }

  // ---- Grid ----
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px 20px;
    list-style: none;
    padding: 0;
    margin: 0 0 32px;

    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include sp {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  &__item {
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease both;
    }
  }

  &__card {
    display: block;
    background-color: $color-white;
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    height: 100%;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
  }

  &__card-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s ease;
    }

    .letter-list__card:hover & img {
      transform: scale(1.03);
    }
  }

  &__card-body {
    padding: 16px 18px 20px;
    text-align: left;
  }

  &__card-garden {
    display: inline-block;
    font-family: $font-kosugi;
    font-size: 11px;
    color: $color-white;
    background-color: $color-dark-red;
    border-radius: 4px;
    padding: 2px 8px;
    margin-bottom: 8px;
    letter-spacing: 0.04em;
  }

  &__card-title {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.6;
    letter-spacing: 0.04em;
    color: $color-text;
    margin-bottom: 6px;
  }

  &__card-excerpt {
    font-family: $font-kosugi;
    font-size: 13px;
    color: lighten($color-text, 20%);
    line-height: 1.6;
    margin-bottom: 12px;
  }

  &__card-date {
    font-family: $font-jost;
    font-size: 11px;
    color: lighten($color-text, 35%);
    text-align: right;
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

  // ---- Sidebar ----
  &__sidebar {
    width: 260px;
    flex-shrink: 0;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.2s both;
    }

    @include sp {
      width: 100%;
    }
  }

  &__archive {
    padding: 24px 0 28px;
  }

  &__archive-title {
    font-family: $font-yusei;
    font-size: 28px;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: $color-dark-red;
    margin-bottom: 20px;
  }

  &__archive-year-group {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__archive-year {
    display: flex;
    align-items: center;
    font-family: $font-kosugi;
    font-size: 18px;
    font-weight: 400;
    color: $color-dark-red;
    margin-bottom: 12px;
    letter-spacing: 0.04em;

    &::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 1.4em;
      background-color: $color-pink;
      border-radius: 2px;
      margin-right: 10px;
      flex-shrink: 0;
    }
  }

  &__archive-months {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__archive-link {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color-white;
    border-radius: 12px;
    padding: 8px 4px;
    font-family: $font-kosugi;
    font-size: 14px;
    color: $color-dark-red;
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: background-color 0.2s, color 0.2s;

    &:hover,
    &.is-active {
      background-color: $color-pink;
      color: $color-white;
    }
  }
}
</style>
