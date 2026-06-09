<template>
  <section class="welcome" ref="welcomeRef">
    <div class="welcome__inner">
      <!-- Logo -->
      <div class="welcome__logo" :class="{ 'is-visible': isVisible }">
        <div class="welcome__logo-circle">
          <img src="/images/sakura.svg" class="welcome__logo-svg" alt="桜のロゴ" />
        </div>
      </div>

      <!-- Heading -->
      <h2 class="welcome__heading" :class="{ 'is-visible': isVisible }">
        <span class="welcome__heading-line">桜のこもれびキッズランドへ</span>
        <span class="welcome__heading-line">ようこそ</span>
      </h2>
      <p class="welcome__en" :class="{ 'is-visible': isVisible }">Welcome</p>

      <!-- Body text -->
      <div class="welcome__body" :class="{ 'is-visible': isVisible }">
        <p class="welcome__paragraph">
          「こもれび」とは<br />
          風に揺れる木の葉によって生み出される光と影の揺らめきを表すことばです。<br />
          それはその瞬間に一度だけ存在します。
        </p>
        <p class="welcome__paragraph">
          桜のこもれびキッズランドは、<br />
          子どもたち一人ひとりが独自の輝きを放つように、<br />
          大切な個性を伸ばす場所です。<br />
          温かく包み込むような雰囲気の中で、安心して成長できる環境を提供し、<br />
          笑顔あふれる毎日をお約束します。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: welcomeRef, isVisible } = useScrollAnimation(0.1)
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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.welcome {
  position: relative;
  overflow: hidden;
  padding: 80px 60px 100px;

  @include sp {
    padding: 60px 24px 80px;
  }

  // ---- Inner ----
  &__inner {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    z-index: 1;
  }

  // ---- Logo ----
  &__logo {
    margin-bottom: 24px;
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
    color: $color-dark-red;
    line-height: 1.5;
    letter-spacing: 0.1em;
    text-align: center;
    margin-bottom: 8px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.3s both;
    }

    @include sp {
      font-size: 20px;
    }
  }

  &__heading-line {
    display: block;
  }

  // ---- Welcome label ----
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

  // ---- Body ----
  &__body {
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.6s both;
    }
  }

  &__paragraph {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 18px;
    color: $color-text;
    line-height: 2;
    letter-spacing: 0.2em;
    text-align: center;

    & + & {
      margin-top: 32px;
    }

    @include sp {
      font-size: 14px;
      line-height: 2;
    }
  }
}
</style>
