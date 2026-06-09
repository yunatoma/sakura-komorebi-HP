<template>
  <section class="letter-list" ref="listRef">
    <div class="letter-list__inner">
      <ul class="letter-list__grid">
        <li
          v-for="(post, i) in posts"
          :key="post.id"
          class="letter-list__item"
          :class="{ 'is-visible': isVisible }"
          :style="{ animationDelay: `${0.1 + i * 0.05}s` }"
        >
          <a href="#" class="letter-list__card">
            <div class="letter-list__card-image">
              <img :src="post.image" :alt="post.title" loading="lazy" />
            </div>
            <div class="letter-list__card-body">
              <p class="letter-list__card-garden">{{ post.garden }}</p>
              <p class="letter-list__card-title">{{ post.title }}</p>
              <p class="letter-list__card-excerpt">{{ post.excerpt }}</p>
              <p class="letter-list__card-date">{{ post.date }}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: listRef, isVisible } = useScrollAnimation(0.1)

const posts = [
  {
    id: 1,
    image: '/images/erik-o990dFLgo1Q-unsplash.webp',
    garden: 'なは園',
    title: 'なは園からのおたより',
    excerpt: '年長さんクラス、美ら海水族館に遠足に行きました！',
    date: '2024ねん4がつ15にち',
  },
  {
    id: 2,
    image: '/images/massimo-adami-GYdtY0fR4CM-unsplash.webp',
    garden: 'ひろしま園',
    title: 'ひろしま園からのおたより',
    excerpt: '年少さん、ピクニックへ♪',
    date: '2024ねん4がつ6にち',
  },
  {
    id: 3,
    image: '/images/erika-fletcher-YfNWGrQI3a4-unsplash.webp',
    garden: 'しんじゅく園',
    title: 'しんじゅく園からのおたより',
    excerpt: '年少さんクラス、お絵描き会',
    date: '2024ねん2がつ10にち',
  },
  {
    id: 4,
    image: '/images/jason-sung-xH04gkmk1sg-unsplash.webp',
    garden: 'しぶや園',
    title: 'しぶや園からのおたより',
    excerpt: 'しぶや園の日常',
    date: '2024ねん1がつ21にち',
  },
  {
    id: 5,
    image: '/images/jerry-wang-KV9F7Ypl2N0-unsplash.webp',
    garden: 'おおさか園',
    title: 'おおさか園からのおたより',
    excerpt: 'ローマ字のお勉強',
    date: '2023ねん12がつ10にち',
  },
  {
    id: 6,
    image: '/images/jerry-wang-Lxn5XUu_mZ8-unsplash.webp',
    garden: 'よこはま園',
    title: 'よこはま園からのおたより',
    excerpt: '年長さんクラス、科学博物館に遠足！',
    date: '2023ねん11がつ9にち',
  },
  {
    id: 7,
    image: '/images/gautam-arora-K8yhW1BWWpk-unsplash.webp',
    garden: 'なは園',
    title: 'なは園からのおたより',
    excerpt: '秋の収穫体験、さつまいも掘りに行きました',
    date: '2023ねん10がつ20にち',
  },
  {
    id: 8,
    image: '/images/jackie-park-3SBfM2-ytb8-unsplash 1.webp',
    garden: 'しんじゅく園',
    title: 'しんじゅく園からのおたより',
    excerpt: '運動会、みんな頑張りました！',
    date: '2023ねん9がつ30にち',
  },
  {
    id: 9,
    image: '/images/mi-pham-FtZL0r4DZYk-unsplash.webp',
    garden: 'ひろしま園',
    title: 'ひろしま園からのおたより',
    excerpt: 'たなばた会、笹に願いを込めて',
    date: '2023ねん7がつ7にち',
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

.letter-list {
  padding: 60px 60px 100px;

  @include sp {
    padding: 40px 20px 80px;
  }

  &__inner {
    max-width: 1160px;
    margin: 0 auto;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px 24px;
    list-style: none;
    padding: 0;
    margin: 0;

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
    font-size: 16px;
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
}
</style>
