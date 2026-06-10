<template>
  <section class="single-location" ref="sectionRef">
    <div class="single-location__inner">
      <div class="single-location__image-wrap" :class="{ 'is-visible': isVisible }">
        <img
          :src="img"
          :alt="heading"
          class="single-location__image"
          loading="lazy"
        />
      </div>
      <div class="single-location__content" :class="{ 'is-visible': isVisible }">
        <h2 class="single-location__heading">{{ heading }}</h2>
        <p class="single-location__text">{{ text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<{ img: string; heading: string; text: string }>()

const { elementRef: sectionRef, isVisible } = useScrollAnimation(0.1)
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

.single-location {
  padding: 80px 60px;

  @include sp {
    padding: 60px 20px;
  }

  &__inner {
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  &__image-wrap {
    width: 100%;
    max-width: 740px;
    border-radius: 20px;
    overflow: hidden;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.1s both;
    }
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
  }

  &__content {
    width: 100%;
    max-width: 1200px;
    text-align: center;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.3s both;
    }
  }

  &__heading {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 20px;
    line-height: 1;
    letter-spacing: 0.2em;
    color: $color-text;
    text-align: center;
    margin-bottom: 24px;

    @include sp {
      font-size: 17px;
    }
  }

  &__text {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 18px;
    line-height: 2;
    letter-spacing: 0.2em;
    color: $color-text;
    text-align: center;

    @include sp {
      font-size: 14px;
      letter-spacing: 0.1em;
    }
  }
}
</style>
