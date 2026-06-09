<template>
  <section class="welcome" ref="welcomeRef">
    <div class="welcome__inner">
      <!-- Logo -->
      <div class="welcome__logo" :class="{ 'is-visible': isVisible }">
        <div class="welcome__logo-circle">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="welcome__logo-svg">
            <!-- Trunk -->
            <rect x="37" y="52" width="6" height="16" rx="3" fill="#8B5E3C" />
            <!-- Crown -->
            <ellipse cx="40" cy="38" rx="18" ry="16" fill="#F4A7B5" />
            <ellipse cx="28" cy="44" rx="12" ry="10" fill="#F4A7B5" />
            <ellipse cx="52" cy="44" rx="12" ry="10" fill="#F4A7B5" />
            <!-- Sakura petals on tree -->
            <circle cx="33" cy="34" r="3" fill="#E8607A" opacity="0.7" />
            <circle cx="42" cy="30" r="3" fill="#E8607A" opacity="0.7" />
            <circle cx="50" cy="36" r="3" fill="#E8607A" opacity="0.7" />
            <circle cx="38" cy="42" r="2.5" fill="#E8607A" opacity="0.7" />
            <circle cx="46" cy="44" r="2.5" fill="#E8607A" opacity="0.7" />
            <circle cx="27" cy="44" r="2.5" fill="#E8607A" opacity="0.7" />
          </svg>
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
    background-color: #F5E650;
    border-radius: 50%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

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
    font-family: $font-yusei;
    font-size: clamp(20px, 3vw, 32px);
    color: $color-dark-red;
    line-height: 1.8;
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
    font-size: 13px;
    letter-spacing: 0.2em;
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
    font-size: clamp(13px, 1.4vw, 16px);
    color: $color-text;
    line-height: 2.2;
    text-align: center;

    & + & {
      margin-top: 32px;
    }

    @include sp {
      font-size: 13px;
      line-height: 2;
      text-align: left;
    }
  }
}
</style>
