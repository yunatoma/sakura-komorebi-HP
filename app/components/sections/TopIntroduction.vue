<template>
  <section class="introduction" ref="introRef">
    <div class="introduction__border introduction__border--top"></div>

    <!-- Icon straddling the top border -->
    <div class="introduction__logo-wrap">
      <div class="introduction__logo" :class="{ 'is-visible': isVisible }">
        <div class="introduction__logo-circle">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="introduction__logo-svg">
            <ellipse cx="40" cy="62" rx="16" ry="5" fill="#55000C" />
            <rect x="37" y="48" width="6" height="16" rx="3" fill="#55000C" />
            <ellipse cx="40" cy="34" rx="20" ry="18" fill="#55000C" />
            <ellipse cx="26" cy="44" rx="13" ry="11" fill="#55000C" />
            <ellipse cx="54" cy="44" rx="13" ry="11" fill="#55000C" />
          </svg>
        </div>
      </div>
    </div>

    <div class="introduction__inner">
      <!-- Heading -->
      <h2 class="introduction__heading" :class="{ 'is-visible': isVisible }">各園のご紹介</h2>
      <p class="introduction__en" :class="{ 'is-visible': isVisible }">Introduction</p>

      <!-- Prefecture grid -->
      <ul class="introduction__grid" :class="{ 'is-visible': isVisible }">
        <li v-for="pref in prefectures" :key="pref" class="introduction__item">
          <NuxtLink :to="`/introduction?pref=${encodeURIComponent(pref)}`" class="introduction__link">{{ pref }}</NuxtLink>
        </li>
      </ul>

      <!-- CTA button -->
      <div class="introduction__cta" :class="{ 'is-visible': isVisible }">
        <NuxtLink to="/introduction" class="introduction__btn">
          一覧ページへ
          <span class="introduction__btn-arrow">›</span>
        </NuxtLink>
      </div>
    </div>

    <div class="introduction__border introduction__border--bottom"></div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: introRef, isVisible } = useScrollAnimation(0.1)

const prefectures = ['東京都', '神奈川県', '埼玉県', '千葉県', '大阪府', '京都府']
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

.introduction {
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

  &__logo-svg {
    width: 64px;
    height: 64px;

    @include sp {
      width: 52px;
      height: 52px;
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

  // ---- Introduction label ----
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
    gap: 16px;
    list-style: none;
    padding: 0;
    margin: 0 0 48px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.6s both;
    }

    @include sp {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 36px;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 16px;
    background-color: #FFFFFF;
    border-radius: 12px;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 24px;
    line-height: 1;
    letter-spacing: 0.1em;
    text-align: center;
    color: $color-text;
    text-decoration: none;
    border: 2px solid transparent;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: $color-text;
    }

    @include sp {
      padding: 16px 12px;
      font-size: 18px;
    }
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
