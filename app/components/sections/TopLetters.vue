<template>
  <section class="letters" ref="lettersRef">
    <div class="letters__border letters__border--top"></div>

    <!-- Logo straddling the top border -->
    <div class="letters__logo-wrap">
      <div class="letters__logo" :class="{ 'is-visible': isVisible }">
        <div class="letters__logo-circle">
          <img src="/images/Mask group-6.svg" alt="" class="letters__logo-img" />
        </div>
      </div>
    </div>

    <div class="letters__inner">
      <!-- Heading -->
      <h2 class="letters__heading" :class="{ 'is-visible': isVisible }">こもれびだより</h2>
      <p class="letters__en" :class="{ 'is-visible': isVisible }">Letter</p>

      <!-- Cards grid -->
      <ul class="letters__grid" :class="{ 'is-visible': isVisible }">
        <li v-for="post in posts" :key="post.id" class="letters__item">
          <a href="#" class="letters__card">
            <div class="letters__card-image">
              <img :src="post.image" :alt="post.title" />
            </div>
            <div class="letters__card-body">
              <p class="letters__card-title">{{ post.title }}</p>
              <p class="letters__card-excerpt">{{ post.excerpt }}</p>
              <p class="letters__card-date">{{ post.date }}</p>
            </div>
          </a>
        </li>
      </ul>

      <!-- CTA -->
      <div class="letters__cta" :class="{ 'is-visible': isVisible }">
        <a href="#" class="letters__btn">
          もっと見る
          <span class="letters__btn-arrow">›</span>
        </a>
      </div>
    </div>

    <div class="letters__border letters__border--bottom"></div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: lettersRef, isVisible } = useScrollAnimation(0.1)

const posts = [
  {
    id: 1,
    image: '/images/erik-o990dFLgo1Q-unsplash.webp',
    title: 'なは園からのおたより',
    excerpt: '年長さんクラス、美ら海水族館に遠足に行きました！',
    date: '2024ねん4がつ15にち',
  },
  {
    id: 2,
    image: '/images/massimo-adami-GYdtY0fR4CM-unsplash.webp',
    title: 'ひろしま園からのおたより',
    excerpt: '年少さん、ピクニックへ♪',
    date: '2024ねん4がつ6にち',
  },
  {
    id: 3,
    image: '/images/erika-fletcher-YfNWGrQI3a4-unsplash.webp',
    title: 'しんじゅく園からのおたより',
    excerpt: '年少さんクラス、お絵描き会',
    date: '2024ねん2がつ10にち',
  },
  {
    id: 4,
    image: '/images/jason-sung-xH04gkmk1sg-unsplash.webp',
    title: 'しぶや園からのおたより',
    excerpt: 'しぶや園の日常',
    date: '2024ねん1がつ21にち',
  },
  {
    id: 5,
    image: '/images/jerry-wang-KV9F7Ypl2N0-unsplash.webp',
    title: 'おおさか園からのおたより',
    excerpt: 'ローマ字のお勉強',
    date: '2023ねん12がつ10にち',
  },
  {
    id: 6,
    image: '/images/jerry-wang-Lxn5XUu_mZ8-unsplash.webp',
    title: 'よこはま園からのおたより',
    excerpt: '年長さんクラス、科学博物館に遠足！',
    date: '2023ねん11がつ9にち',
  },
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

.letters {
  position: relative;
  padding: 64px 60px 80px;
  background: url('/images/top-letters__bg.svg') top center / cover no-repeat;

  @include sp {
    padding: 56px 24px 64px;
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

  // ---- Logo ----

  // ---- Inner ----
  &__inner {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
  }

  // ---- Logo (straddling the top border) ----
  &__logo-wrap {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  &__logo {
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.1s both;
    }
  }

  &__logo-circle {
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

  &__logo-img {
    width: 60px;
    height: 60px;

    @include sp {
      width: 50px;
      height: 50px;
    }
  }

  // ---- Heading ----
  &__heading {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 24px;
    line-height: 1.5;
    letter-spacing: 0.1em;
    text-align: center;
    color: $color-dark-red;
    margin-bottom: 8px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.3s both;
    }
  }

  // ---- Letter label ----
  &__en {
    font-family: $font-jost;
    font-weight: 900;
    font-size: 10px;
    line-height: 1;
    letter-spacing: 0.2em;
    text-align: center;
    color: $color-dark-red;
    margin-bottom: 48px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.45s both;
    }

    @include sp {
      margin-bottom: 36px;
    }
  }

  // ---- Grid ----
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    list-style: none;
    padding: 0;
    margin: 0 0 48px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.6s both;
    }

    @include sp {
      grid-template-columns: 1fr;
      gap: 16px;
      margin-bottom: 36px;
    }
  }

  // ---- Card ----
  &__card {
    display: block;
    background-color: $color-white;
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
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
    }
  }

  &__card-body {
    padding: 16px;
    text-align: left;
  }

  &__card-title {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.5;
    letter-spacing: 0.04em;
    color: $color-text;
    margin-bottom: 8px;
  }

  &__card-excerpt {
    font-family: $font-kosugi;
    font-size: 13px;
    color: $color-text;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  &__card-date {
    font-family: $font-jost;
    font-size: 11px;
    color: lighten($color-text, 30%);
    text-align: right;
  }

  // ---- CTA ----
  &__cta {
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.75s both;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 40px;
    border: 2px solid $color-dark-red;
    border-radius: 999px;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 18px;
    line-height: 1;
    letter-spacing: 0.1em;
    text-align: center;
    color: $color-dark-red;
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: $color-dark-red;
      color: $color-white;
    }

    @include sp {
      font-size: 16px;
      padding: 12px 32px;
    }
  }

  &__btn-arrow {
    font-size: 20px;
    line-height: 1;
  }
}
</style>
