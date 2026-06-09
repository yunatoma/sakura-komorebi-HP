<template>
  <section class="single-message" ref="sectionRef">
    <div class="single-message__inner">
      <!-- Icon -->
      <div class="single-message__icon-wrap" :class="{ 'is-visible': isVisible }">
        <div class="single-message__icon-circle">
          <img src="/images/Mask group-10.svg" alt="" class="single-message__icon-img" />
        </div>
      </div>

      <!-- Heading -->
      <h2 class="single-message__heading" :class="{ 'is-visible': isVisible }">園長からのメッセージ</h2>
      <p class="single-message__en" :class="{ 'is-visible': isVisible }">Message</p>

      <!-- Content -->
      <div class="single-message__content" :class="{ 'is-visible': isVisible }">
        <div class="single-message__image-wrap">
          <img
            src="/images/Rectangle 38.webp"
            alt="園長からのメッセージ"
            class="single-message__image"
            loading="lazy"
          />
        </div>
        <div class="single-message__text-wrap">
          <p class="single-message__text">
            桜のこもれびしぶや園の今年度のテーマは<br />
            「運動と音楽のコラボレーション・自然と食の融合」<br />
            です。<br />
            体操資格、リトミック資格を持った職員を中心に音楽に合わせて体を動かし個々に持っている潜在的な基礎能力の発達を促し、心身の健康の基礎となる食に関する活動を取り入れ、生活と遊びの中で自然に触れさせ意欲的に活動できるように支援していきます。<br />
            普段の園の様子は定期的にこもれびだよりに掲載しています。<br />
            月1回保育園の開放も行っています。<br />
            職員一同お待ちしていますのでぜひ見学にいらしてください。
          </p>
        </div>
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

.single-message {
  padding: 80px 60px 100px;

  @include sp {
    padding: 60px 20px 80px;
  }

  &__inner {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  // ---- Icon ----
  &__icon-wrap {
    margin-bottom: 24px;
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

  &__icon-img {
    width: 56px;
    height: 56px;
    object-fit: contain;

    @include sp {
      width: 46px;
      height: 46px;
    }
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
      animation: fadeInUp 0.7s ease 0.25s both;
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
    margin-bottom: 48px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.4s both;
    }

    @include sp {
      margin-bottom: 32px;
    }
  }

  // ---- Content ----
  &__content {
    display: flex;
    align-items: center;
    gap: 48px;
    text-align: left;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.55s both;
    }

    @include sp {
      flex-direction: column;
      gap: 28px;
    }
  }

  &__image-wrap {
    flex: 0 0 auto;
    width: 42%;
    border-radius: 16px;
    overflow: hidden;

    @include sp {
      width: 100%;
    }
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
  }

  // ---- Text ----
  &__text-wrap {
    flex: 1;
  }

  &__text {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 16px;
    line-height: 2;
    letter-spacing: 0.1em;
    color: $color-text;
  }
}
</style>
