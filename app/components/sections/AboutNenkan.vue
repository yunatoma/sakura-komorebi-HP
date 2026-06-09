<template>
  <section class="nenkan" ref="nenkanRef">
    <div class="nenkan__inner">
      <!-- Section title -->
      <div class="nenkan__title-area" :class="{ 'is-visible': isVisible }">
        <div class="nenkan__title-icon">
          <div class="nenkan__title-icon-circle">
            <img src="/images/sakura.svg" alt="" class="nenkan__title-icon-svg" />
          </div>
        </div>
        <h2 class="nenkan__title">年間行事予定</h2>
        <p class="nenkan__title-en">Yearly Program</p>
      </div>

      <!-- Photo grid card -->
      <div class="nenkan__card">
        <ul class="nenkan__grid">
          <li
            v-for="(item, i) in months"
            :key="item.month"
            class="nenkan__item"
            :class="{ 'is-visible': isVisible }"
            :style="{ animationDelay: `${0.15 + i * 0.06}s` }"
          >
            <div class="nenkan__item-photo">
              <img :src="item.img" :alt="item.label" class="nenkan__item-img" loading="lazy" />
            </div>
            <p class="nenkan__item-month">{{ item.month }}</p>
            <p class="nenkan__item-label">{{ item.label }}</p>
          </li>
        </ul>
      </div>

      <!-- Note -->
      <p class="nenkan__note" :class="{ 'is-visible': isVisible }">
        ※上記予定は一例です。園や状況により内容は異なりますので、詳しくは園にお問い合わせください。
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: nenkanRef, isVisible } = useScrollAnimation(0.1)

const months = [
  { month: '4がつ', label: '進級・入園おめでとうの会',  img: "/images/zhenzhong-liu-kFmaqeOF-PQ-unsplash 1.webp" },
  { month: '5がつ', label: '親子遠足',                  img: "/images/zoo-monkey-uD7ZRjhgwLo-unsplash.webp" },
  { month: '6がつ', label: '運動会',                    img: "/images/sports-day-2802266_1920 1.webp" },
  { month: '7がつ', label: 'たなばた会',                img: "/images/zoo-monkey-uD7ZRjhgwLo-unsplash-1.webp" },
  { month: '8がつ', label: '夏のお楽しみ会',            img: "/images/zoo-monkey-uD7ZRjhgwLo-unsplash-3.webp" },
  { month: '9がつ', label: '親子レクリエーション',      img: "/images/zoo-monkey-uD7ZRjhgwLo-unsplash-2.webp" },
  { month: '10がつ', label: 'ハロウィン',               img: "/images/silvana-carlos-PiZdDvRG3M8-unsplash.webp" },
  { month: '11がつ', label: '秋の収穫体験遠足',         img: "/images/zoo-monkey-uD7ZRjhgwLo-unsplash.webp" },
  { month: '12がつ', label: 'クリスマス会',             img: "/images/zhenzhong-liu-kFmaqeOF-PQ-unsplash 1.webp" },
  { month: '1がつ', label: '新年お楽しみ会',            img: "/images/zoo-monkey-uD7ZRjhgwLo-unsplash-3.webp" },
  { month: '2がつ', label: 'おゆうぎ会',                img: "/images/zoo-monkey-uD7ZRjhgwLo-unsplash-2.webp" },
  { month: '3がつ', label: 'ひな祭り会・巣立ちの会',   img: "/images/sports-day-2802266_1920 1.webp" },
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

.nenkan {
  padding: 80px 60px 100px;

  @include sp {
    padding: 60px 20px 80px;
  }

  &__inner {
    max-width: 1160px;
    margin: 0 auto;
  }

  // ---- Section title ----
  &__title-area {
    text-align: center;
    margin-bottom: 40px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.1s both;
    }

    @include sp {
      margin-bottom: 28px;
    }
  }

  &__title-icon {
    margin-bottom: 16px;
  }

  &__title-icon-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 88px;
    height: 88px;
    background-color: $color-yellow-light;
    border-radius: 50%;

    @include sp {
      width: 72px;
      height: 72px;
    }
  }

  &__title-icon-svg {
    width: 56px;
    height: 56px;

    @include sp {
      width: 44px;
      height: 44px;
    }
  }

  &__title {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 24px;
    color: $color-dark-red;
    letter-spacing: 0.1em;
    line-height: 1.5;
    margin-bottom: 6px;

    @include sp {
      font-size: 20px;
    }
  }

  &__title-en {
    font-family: $font-jost;
    font-weight: 900;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: $color-dark-red;
    line-height: 1;
  }

  // ---- Card wrapper ----
  &__card {
    background-color: $color-white;
    border-radius: 32px;
    padding: 40px;

    @include sp {
      padding: 24px 16px;
      border-radius: 20px;
    }
  }

  // ---- Grid ----
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px 24px;
    list-style: none;

    @include sp {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px 12px;
    }
  }

  // ---- Item ----
  &__item {
    background-color: $color-pink-light;
    border-radius: 16px;
    padding: 16px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease both;
    }

    @include sp {
      border-radius: 12px;
      padding: 12px;
    }
  }

  &__item-photo {
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 4/3;
    margin-bottom: 10px;

    @include sp {
      border-radius: 8px;
      margin-bottom: 6px;
    }
  }

  &__item-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;

    .nenkan__item:hover & {
      transform: scale(1.04);
    }
  }

  &__item-month {
    font-family: $font-yusei;
    font-size: 18px;
    color: $color-dark-red;
    letter-spacing: 0.06em;
    line-height: 1.4;
    margin-bottom: 4px;

    @include sp {
      font-size: 15px;
    }
  }

  &__item-label {
    font-family: $font-kosugi;
    font-size: 14px;
    color: $color-text;
    line-height: 1.5;
    letter-spacing: 0.04em;

    @include sp {
      font-size: 12px;
    }
  }

  // ---- Note ----
  &__note {
    margin-top: 24px;
    font-family: $font-kosugi;
    font-size: 13px;
    color: $color-text;
    line-height: 1.8;
    letter-spacing: 0.04em;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.3s both;
    }

    @include sp {
      font-size: 12px;
      margin-top: 16px;
    }
  }
}
</style>
