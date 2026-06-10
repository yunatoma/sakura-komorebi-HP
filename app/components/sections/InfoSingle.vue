<template>
  <section class="info-single" ref="singleRef">
    <div class="info-single__inner">
      <article class="info-single__article" :class="{ 'is-visible': isVisible }">
        <header class="info-single__header">
          <time class="info-single__date" :datetime="post.date">{{ formatDate(post.date) }}</time>
          <h1 class="info-single__title">{{ post.title }}</h1>
          <hr class="info-single__divider" />
        </header>

        <div class="info-single__image-wrap">
          <img
            class="info-single__image"
            :src="post.imageUrl"
            :alt="post.title"
            loading="lazy"
          />
        </div>

        <div class="info-single__body">
          <div
            v-for="section in post.body"
            :key="section.heading"
            class="info-single__section"
          >
            <h2 class="info-single__section-heading">{{ section.heading }}</h2>
            <p
              v-for="para in section.paragraphs"
              :key="para"
              class="info-single__paragraph"
            >{{ para }}</p>
          </div>
        </div>

        <div class="info-single__back">
          <NuxtLink to="/info" class="info-single__back-btn">
            お知らせ一覧へ
            <span class="info-single__back-arrow" aria-hidden="true">›</span>
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { InfoPost } from '~/composables/useInfoPosts'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<{
  post: InfoPost
}>()

const { elementRef: singleRef, isVisible } = useScrollAnimation(0.05)

function formatDate(date: string) {
  const [y, m, d] = date.split('-')
  return `${y}. ${m}. ${d}`
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

.info-single {
  padding: 40px 60px 100px;

  @include sp {
    padding: 32px 20px 80px;
  }

  &__inner {
    max-width: 1160px;
    margin: 0 auto;
  }

  &__article {
    background-color: $color-white;
    border-radius: 16px;
    padding: 48px 56px 56px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.1s both;
    }

    @include sp {
      padding: 28px 20px 40px;
    }
  }

  // ---- Header ----
  &__header {
    margin-bottom: 32px;
  }

  &__date {
    display: block;
    font-family: $font-jost;
    font-size: 14px;
    font-weight: 400;
    color: $color-text;
    letter-spacing: 0.06em;
    margin-bottom: 12px;

    @include sp {
      font-size: 13px;
    }
  }

  &__title {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 28px;
    line-height: 1.6;
    letter-spacing: 0.06em;
    color: $color-text;
    margin-bottom: 20px;

    @include sp {
      font-size: 20px;
    }
  }

  &__divider {
    border: none;
    border-top: 1.5px solid #e8d8db;
    margin: 0;
  }

  // ---- Image ----
  &__image-wrap {
    margin: 32px auto 36px;
    border-radius: 8px;
    overflow: hidden;
    max-width: 540px;
    background-color: $color-pink-light;

    @include sp {
      margin: 24px auto 28px;
      max-width: 100%;
    }
  }

  &__image {
    width: 100%;
    display: block;
    border-radius: 8px;
    object-fit: cover;
  }

  // ---- Body ----
  &__body {
    margin-bottom: 56px;

    @include sp {
      margin-bottom: 40px;
    }
  }

  &__section {
    margin-bottom: 32px;

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
}
</style>
