<template>
  <section class="recruitment" ref="recruitmentRef">
    <div class="recruitment__inner">
      <div class="recruitment__card" :class="{ 'is-visible': isVisible }">
        <!-- Logo -->
        <div class="recruitment__logo">
          <div class="recruitment__logo-circle">
            <img src="/images/Mask group-8.svg" alt="" class="recruitment__logo-img" />
          </div>
        </div>

        <!-- Heading -->
        <h2 class="recruitment__heading">採用情報</h2>
        <p class="recruitment__en">Introduction</p>

        <!-- Body -->
        <p class="recruitment__body">桜のこもれびキッズランドで働いてみませんか？</p>

        <!-- Buttons -->
        <div class="recruitment__buttons">
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
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.2s both;
    }

    @include sp {
      padding: 40px 32px 48px;
      border-radius: 16px;
    }
  }

  // ---- Logo ----
  &__logo {
    margin-bottom: 16px;
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
    font-family: $font-yusei;
    font-size: clamp(24px, 3vw, 36px);
    color: $color-dark-red;
    margin-bottom: 8px;
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
  }

  // ---- Body ----
  &__body {
    font-family: $font-kosugi;
    font-size: clamp(14px, 1.6vw, 18px);
    color: $color-text;
    margin-bottom: 40px;

    @include sp {
      font-size: 14px;
      margin-bottom: 32px;
    }
  }

  // ---- Buttons ----
  &__buttons {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;

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
    font-family: $font-yusei;
    font-size: 16px;
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease;

    @include sp {
      font-size: 15px;
      padding: 12px 32px;
    }

    &--outline {
      border: 2px solid $color-dark-red;
      color: $color-dark-red;
      background-color: transparent;

      &:hover {
        background-color: $color-dark-red;
        color: $color-white;
      }
    }

    &--yellow {
      border: 2px solid $color-yellow-light;
      background-color: $color-yellow-light;
      color: $color-dark-red;

      &:hover {
        background-color: darken(#FFF7B8, 8%);
        border-color: darken(#FFF7B8, 8%);
      }
    }
  }

  &__btn-arrow {
    font-size: 20px;
    line-height: 1;
  }
}
</style>
