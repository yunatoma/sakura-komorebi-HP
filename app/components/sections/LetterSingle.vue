<template>
  <section class="letter-single" ref="singleRef">
    <div class="letter-single__inner">
      <div class="letter-single__layout">
        <!-- Main article -->
        <div class="letter-single__main" :class="{ 'is-visible': isVisible }">
          <article class="letter-single__article">
            <header class="letter-single__header">
              <div class="letter-single__meta">
                <span class="letter-single__garden-label">
                  <svg class="letter-single__pencil-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M9.5 1.5L12.5 4.5L4.5 12.5H1.5V9.5L9.5 1.5Z" stroke="#55000C" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 3.5L10.5 6.5" stroke="#55000C" stroke-width="1.4" stroke-linecap="round"/>
                  </svg>
                  {{ post.title }}
                </span>
                <span class="letter-single__date">{{ post.date }}</span>
              </div>
              <h1 class="letter-single__title">{{ post.excerpt }}</h1>
              <hr class="letter-single__divider" />
            </header>

            <div class="letter-single__image-wrap">
              <img
                class="letter-single__image"
                :src="post.imageUrl"
                :alt="post.excerpt"
                loading="lazy"
              />
            </div>

            <div class="letter-single__body">
              <div
                v-for="section in post.body"
                :key="section.heading"
                class="letter-single__section"
              >
                <h2 class="letter-single__section-heading">{{ section.heading }}</h2>
                <p
                  v-for="para in section.paragraphs"
                  :key="para"
                  class="letter-single__paragraph"
                >{{ para }}</p>
              </div>
            </div>

            <div class="letter-single__back">
              <NuxtLink to="/letter-list" class="letter-single__back-btn">
                こもれびだより一覧へ
                <span class="letter-single__back-arrow" aria-hidden="true">›</span>
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- Sidebar -->
        <aside class="letter-single__sidebar" :class="{ 'is-visible': isVisible }">
          <div class="letter-single__archive">
            <h2 class="letter-single__archive-title">アーカイブ</h2>
            <div
              v-for="year in archive"
              :key="year.year"
              class="letter-single__archive-year-group"
            >
              <p class="letter-single__archive-year">{{ year.year }}ねん</p>
              <ul class="letter-single__archive-months">
                <li
                  v-for="month in year.months"
                  :key="month"
                  class="letter-single__archive-month"
                >
                  <NuxtLink
                    :to="`/letter-list?year=${year.year}&month=${month}`"
                    class="letter-single__archive-link"
                  >{{ month }}がつ</NuxtLink>
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
import type { LetterPost } from '~/composables/useLetterPosts'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<{
  post: LetterPost
}>()

const { elementRef: singleRef, isVisible } = useScrollAnimation(0.05)

const { archive } = useLetterPosts()
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

.letter-single {
  padding: 40px 60px 100px;

  @include sp {
    padding: 32px 20px 80px;
  }

  &__inner {
    max-width: 1160px;
    margin: 0 auto;
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

  // ---- Main ----
  &__main {
    flex: 1;
    min-width: 0;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.1s both;
    }
  }

  &__article {
    background-color: $color-white;
    border-radius: 16px;
    padding: 40px 48px 48px;

    @include sp {
      padding: 24px 20px 32px;
    }
  }

  // ---- Header ----
  &__header {
    margin-bottom: 28px;
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;

    @include sp {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }
  }

  &__garden-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: $font-kosugi;
    font-size: 14px;
    color: $color-text;
    letter-spacing: 0.04em;
  }

  &__pencil-icon {
    flex-shrink: 0;
  }

  &__date {
    font-family: $font-kosugi;
    font-size: 13px;
    color: lighten($color-text, 30%);
    white-space: nowrap;
    letter-spacing: 0.04em;
  }

  &__title {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 24px;
    line-height: 1.6;
    letter-spacing: 0.06em;
    color: $color-text;
    margin-bottom: 20px;

    @include sp {
      font-size: 18px;
    }
  }

  &__divider {
    border: none;
    border-top: 1.5px solid #e8d8db;
    margin: 0;
  }

  // ---- Image ----
  &__image-wrap {
    margin: 28px 0 32px;
    border-radius: 8px;
    overflow: hidden;

    @include sp {
      margin: 20px 0 24px;
    }
  }

  &__image {
    width: 100%;
    max-width: 540px;
    display: block;
    border-radius: 8px;
    object-fit: cover;

    @include sp {
      max-width: 100%;
    }
  }

  // ---- Body ----
  &__body {
    margin-bottom: 48px;

    @include sp {
      margin-bottom: 36px;
    }
  }

  &__section {
    margin-bottom: 28px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__section-heading {
    display: flex;
    align-items: center;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.6;
    letter-spacing: 0.06em;
    color: $color-text;
    margin-bottom: 12px;

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

  &__paragraph {
    font-family: $font-kosugi;
    font-size: 14px;
    line-height: 1.9;
    letter-spacing: 0.04em;
    color: $color-text;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  // ---- Back button ----
  &__back {
    text-align: center;
  }

  &__back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 40px;
    border: 1.5px solid $color-dark-red;
    border-radius: 999px;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 16px;
    line-height: 1;
    letter-spacing: 0.1em;
    color: $color-dark-red;
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: $color-dark-red;
      color: $color-white;
    }

    @include sp {
      font-size: 14px;
      padding: 12px 28px;
    }
  }

  &__back-arrow {
    font-size: 18px;
    line-height: 1;
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
    background-color: $color-pink-light;
    border-radius: 16px;
    padding: 24px 20px 28px;
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

    &:hover {
      background-color: $color-pink;
      color: $color-white;
    }
  }
}
</style>
