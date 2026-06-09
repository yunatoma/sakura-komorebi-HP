<template>
  <section class="single-location" ref="sectionRef">
    <div class="single-location__inner">
      <div class="single-location__image-wrap" :class="{ 'is-visible': isVisible }">
        <img
          src="/images/Rectangle 31.webp"
          alt="渋谷駅から徒歩2分の立地"
          class="single-location__image"
          loading="lazy"
        />
      </div>
      <div class="single-location__content" :class="{ 'is-visible': isVisible }">
        <p class="single-location__label">Access</p>
        <h2 class="single-location__heading">
          渋谷駅から徒歩2分<br />
          利便性の高い立地
        </h2>
        <p class="single-location__text">
          当園は渋谷駅から徒歩わずか2分の好立地にあります。
          送り迎えもスムーズで、忙しい保護者の方にも安心してご利用いただける環境です。
          周辺には公園や自然環境も整っており、子どもたちの日々の活動を豊かにしています。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: sectionRef, isVisible } = useScrollAnimation(0.1)
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.single-location {
  padding: 80px 60px;

  @include sp {
    padding: 60px 20px;
  }

  &__inner {
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 60px;

    @include sp {
      flex-direction: column;
      gap: 32px;
    }
  }

  &__image-wrap {
    flex: 1 1 50%;
    border-radius: 20px;
    overflow: hidden;
    opacity: 0;

    &.is-visible {
      animation: fadeInLeft 0.7s ease 0.1s both;
    }

    @include sp {
      width: 100%;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__content {
    flex: 1 1 50%;
    opacity: 0;

    &.is-visible {
      animation: fadeInRight 0.7s ease 0.25s both;
    }
  }

  &__label {
    font-family: $font-jost;
    font-weight: 900;
    font-size: 11px;
    letter-spacing: 0.2em;
    color: $color-dark-red;
    margin-bottom: 12px;
  }

  &__heading {
    font-family: $font-yusei;
    font-weight: 400;
    font-size: 28px;
    line-height: 1.7;
    letter-spacing: 0.1em;
    color: $color-text;
    margin-bottom: 24px;

    @include sp {
      font-size: 22px;
    }
  }

  &__text {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 16px;
    line-height: 2;
    letter-spacing: 0.08em;
    color: $color-text;

    @include sp {
      font-size: 14px;
    }
  }
}
</style>
