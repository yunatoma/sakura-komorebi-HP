<template>
  <section class="recruitment" ref="recruitmentRef">
    <div class="recruitment__inner">
      <div class="recruitment__card" :class="{ 'is-visible': isVisible }">
        <!-- Logo -->
        <div class="recruitment__logo" :class="{ 'is-visible': isVisible }">
          <div class="recruitment__logo-circle">
            <img src="/images/Mask group-8.svg" alt="" class="recruitment__logo-img" />
          </div>
        </div>

        <!-- Heading -->
        <h2 class="recruitment__heading" :class="{ 'is-visible': isVisible }">採用情報</h2>
        <p class="recruitment__en" :class="{ 'is-visible': isVisible }">Introduction</p>

        <!-- Body -->
        <p class="recruitment__body" :class="{ 'is-visible': isVisible }">桜のこもれびキッズランドで働いてみませんか？</p>

        <!-- Buttons -->
        <div class="recruitment__buttons" :class="{ 'is-visible': isVisible }">
          <a href="#" class="recruitment__btn recruitment__btn--outline">
            採用情報
            <span class="recruitment__btn-arrow">›</span>
          </a>
          <a href="#" class="recruitment__btn recruitment__btn--yellow">
            エントリー
            <span class="recruitment__btn-arrow">›</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: recruitmentRef, isVisible } = useScrollAnimation(0.1)
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

.recruitment {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  background: url('/images/Rectangle 19.webp') center center / cover no-repeat;

  @include sp {
    min-height: 480px;
    padding: 60px 24px;
  }

  &__inner {
    width: 100%;
    max-width: 1160px;
    margin: 0 auto;
    padding: 60px;
    display: flex;
    justify-content: center;

    @include sp {
      padding: 0;
    }
  }

  // ---- Card overlay ----
  &__card {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    padding: 48px 80px 56px;
    text-align: center;
    width: 100%;
    max-width: 680px;

    @include sp {
      padding: 40px 32px 48px;
      border-radius: 16px;
    }
  }

  // ---- Logo ----
  &__logo {
    margin-bottom: 16px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.1s both;
    }
  }

  &__logo-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 88px;
    height: 88px;
    background-color: #FFF7B8;
    border-radius: 50%;

    @include sp {
      width: 76px;
      height: 76px;
    }
  }

  &__logo-img {
    width: 56px;
    height: 56px;

    @include sp {
      width: 48px;
      height: 48px;
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

  // ---- English label ----
  &__en {
    font-family: $font-jost;
    font-weight: 900;
    font-size: 10px;
    line-height: 1;
    letter-spacing: 0.2em;
    text-align: center;
    color: $color-dark-red;
    margin-bottom: 32px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.45s both;
    }
  }

  // ---- Body ----
  &__body {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 18px;
    line-height: 2;
    letter-spacing: 0.1em;
    text-align: center;
    color: #55000C;
    margin-bottom: 40px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.6s both;
    }

    @include sp {
      font-size: 15px;
      margin-bottom: 32px;
    }
  }

  // ---- Buttons ----
  &__buttons {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.75s both;
    }

    @include sp {
      gap: 16px;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 40px;
    border-radius: 999px;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 18px;
    line-height: 1;
    letter-spacing: 0.1em;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease;

    @include sp {
      font-size: 16px;
      padding: 12px 32px;
    }

    &--outline {
      border: 2px solid $color-dark-red;
      color: $color-dark-red;
      background-color: $color-pink-light;

      &:hover {
        background-color: $color-dark-red;
        color: $color-white;
      }
    }

    &--yellow {
      border: 2px solid $color-dark-red;
      background-color: $color-yellow-light;
      color: $color-dark-red;

      &:hover {
        background-color: darken(#FFF7B8, 8%);
      }
    }
  }

  &__btn-arrow {
    font-size: 20px;
    line-height: 1;
  }
}
</style>
