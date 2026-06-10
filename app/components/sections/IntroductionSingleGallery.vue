<template>
  <section ref="sectionRef" class="single-gallery">
    <div class="single-gallery__border single-gallery__border--top"></div>

    <!-- Camera icon straddling top border -->
    <div class="single-gallery__icon-wrap" :class="{ 'is-visible': isVisible }">
      <div class="single-gallery__icon-circle">
        <svg class="single-gallery__icon-svg" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14 4L11 8H4C2.9 8 2 8.9 2 10V28C2 29.1 2.9 30 4 30H36C37.1 30 38 29.1 38 28V10C38 8.9 37.1 8 36 8H29L26 4H14Z" fill="#6B1A2A"/>
          <circle cx="20" cy="19" r="7" fill="#6B1A2A"/>
          <circle cx="20" cy="19" r="4" fill="#FFF7B8"/>
        </svg>
      </div>
    </div>

    <div class="single-gallery__inner">
      <h2 class="single-gallery__heading" :class="{ 'is-visible': isVisible }">園の様子</h2>
      <p class="single-gallery__en" :class="{ 'is-visible': isVisible }">Inside</p>

      <!-- Infinite scroll track -->
      <div class="single-gallery__viewport" :class="{ 'is-visible': isVisible }">
        <div class="single-gallery__track">
          <ul class="single-gallery__list" aria-label="園の様子">
            <li v-for="img in images" :key="img.src" class="single-gallery__item">
              <img :src="img.src" :alt="img.alt" class="single-gallery__img" loading="lazy" />
            </li>
          </ul>
          <ul class="single-gallery__list" aria-hidden="true">
            <li v-for="img in images" :key="'dup-' + img.src" class="single-gallery__item">
              <img :src="img.src" :alt="img.alt" class="single-gallery__img" loading="lazy" />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="single-gallery__border single-gallery__border--bottom"></div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const props = defineProps<{ images: { src: string; alt: string }[] }>()
const { elementRef: sectionRef, isVisible } = useScrollAnimation(0.1)
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.single-gallery {
  position: relative;
  padding: 64px 0 80px;
  background: url('/images/top-letters__bg.svg') top center / cover no-repeat;

  @include sp {
    padding: 56px 0 64px;
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

  // ---- Camera icon ----
  &__icon-wrap {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.1s both;
    }
  }

  &__icon-circle {
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

  &__icon-svg {
    width: 52px;
    height: 42px;

    @include sp {
      width: 42px;
      height: 34px;
    }
  }

  // ---- Inner ----
  &__inner {
    text-align: center;
  }

  // ---- Heading ----
  &__heading {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 24px;
    line-height: 1.5;
    letter-spacing: 0.1em;
    color: $color-dark-red;
    margin-bottom: 8px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.25s both;
    }
  }

  &__en {
    font-family: $font-jost;
    font-weight: 900;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: $color-dark-red;
    margin-bottom: 40px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.35s both;
    }

    @include sp {
      margin-bottom: 28px;
    }
  }

  // ---- Infinite scroll ----
  &__viewport {
    overflow: hidden;
    width: 100%;
    padding: 32px 0;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.5s both;
    }

    @include sp {
      padding: 24px 0;
    }
  }

  &__track {
    display: flex;
    width: max-content;
    animation: marquee 28s linear infinite;

    &:hover {
      animation-play-state: paused;
    }
  }

  &__list {
    display: flex;
    gap: 16px;
    list-style: none;
    padding: 0 8px;
    margin: 0;
  }

  &__item {
    flex-shrink: 0;
  }

  &__img {
    width: 280px;
    height: 210px;
    object-fit: cover;
    border-radius: 16px;
    display: block;

    @include sp {
      width: 200px;
      height: 150px;
    }
  }
}
</style>
