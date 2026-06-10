<template>
  <section class="about-contact" ref="contactRef">
    <div class="about-contact__inner">
      <div class="about-contact__card" :class="{ 'is-visible': isVisible }">
        <!-- Icon -->
        <div class="about-contact__icon" :class="{ 'is-visible': isVisible }">
          <div class="about-contact__icon-circle">
            <svg class="about-contact__icon-svg" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="1" y="1" width="46" height="34" rx="5" stroke="#55000C" stroke-width="2"/>
              <path d="M2 4L24 22L46 4" stroke="#55000C" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Heading -->
        <h2 class="about-contact__heading" :class="{ 'is-visible': isVisible }">お問い合わせ</h2>
        <p class="about-contact__en" :class="{ 'is-visible': isVisible }">Contact</p>

        <!-- Body -->
        <p class="about-contact__body" :class="{ 'is-visible': isVisible }">
          ご不明な点やご相談がございましたら、<br class="pc-only" />
          お気軽にお問い合わせください。
        </p>

        <!-- Button -->
        <div class="about-contact__button-wrap" :class="{ 'is-visible': isVisible }">
          <NuxtLink to="/contact" class="about-contact__btn">
            お問い合わせはこちら
            <span class="about-contact__btn-arrow">›</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: contactRef, isVisible } = useScrollAnimation(0.1)
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

.about-contact {
  position: relative;
  min-height: 480px;
  display: flex;
  align-items: center;
  background: url('/images/garden-yokohama.webp') center center / cover no-repeat;

  @include sp {
    min-height: 400px;
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

  &__card {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(4px);
    border-radius: 24px;
    padding: 48px 80px 56px;
    text-align: center;
    width: 100%;
    max-width: 680px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.1s both;
    }

    @include sp {
      padding: 40px 32px 48px;
      border-radius: 16px;
    }
  }

  &__icon {
    margin-bottom: 20px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.2s both;
    }
  }

  &__icon-circle {
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

  &__icon-svg {
    width: 44px;
    height: 33px;

    @include sp {
      width: 36px;
      height: 27px;
    }
  }

  &__heading {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 24px;
    color: $color-dark-red;
    letter-spacing: 0.1em;
    line-height: 1.5;
    margin-bottom: 8px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.3s both;
    }

    @include sp {
      font-size: 20px;
    }
  }

  &__en {
    font-family: $font-jost;
    font-weight: 900;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: $color-dark-red;
    line-height: 1;
    margin-bottom: 32px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.45s both;
    }
  }

  &__body {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 18px;
    color: $color-text;
    line-height: 2;
    letter-spacing: 0.1em;
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

  &__button-wrap {
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.75s both;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 48px;
    border-radius: 999px;
    border: 2px solid $color-dark-red;
    background-color: transparent;
    font-family: $font-kosugi;
    font-size: 18px;
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
      font-size: 16px;
      padding: 12px 36px;
    }
  }

  &__btn-arrow {
    font-size: 20px;
    line-height: 1;
  }
}

.pc-only {
  @include sp {
    display: none;
  }
}
</style>
