<template>
  <section class="omoi" ref="omoiRef">
    <div class="omoi__inner">
      <!-- Icon -->
      <div class="omoi__icon" :class="{ 'is-visible': isVisible }">
        <div class="omoi__icon-circle">
          <img src="/images/sakura.svg" alt="" class="omoi__icon-svg" />
        </div>
      </div>

      <!-- Heading -->
      <h2 class="omoi__heading" :class="{ 'is-visible': isVisible }">
        <span class="omoi__heading-line">わたしたちの想い</span>
      </h2>
      <p class="omoi__en" :class="{ 'is-visible': isVisible }">Our Philosophy</p>

      <!-- Body -->
      <div class="omoi__body" :class="{ 'is-visible': isVisible }">
        <p class="omoi__paragraph">
          「こもれび」とは<br />
          風に揺れる木の葉によって生み出される光と影の揺らめきを表すことばです。<br />
          それはその瞬間に一度だけ存在します。
        </p>
        <p class="omoi__paragraph">
          桜のこもれびキッズランドは、<br />
          子どもたち一人ひとりが独自の輝きを放つように、<br />
          大切な個性を伸ばす場所です。<br />
          温かく包み込むような雰囲気の中で、安心して成長できる環境を提供し、<br />
          笑顔あふれる毎日をお約束します。
        </p>
        <p class="omoi__paragraph">
          私たちは、保育士一人ひとりが専門性を持ち、<br />
          子どもの心と体の発達を丁寧にサポートします。<br />
          地域の皆様とともに、子どもたちの豊かな未来を<br />
          つくっていきたいと願っています。
        </p>
        <p class="omoi__paragraph">
          家庭と保育園が手を取り合い、<br />
          子どもたちを真ん中に据えた温かいコミュニティを<br />
          育んでいくことが、私たちの使命です。
        </p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: omoiRef, isVisible } = useScrollAnimation(0.1)
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

.omoi {
  padding: 80px 60px 100px;

  @include sp {
    padding: 60px 24px 80px;
  }

  &__inner {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  &__icon {
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
    background-color: $color-yellow-light;
    border-radius: 50%;

    @include sp {
      width: 80px;
      height: 80px;
    }
  }

  &__icon-svg {
    width: 64px;
    height: 64px;

    @include sp {
      width: 52px;
      height: 52px;
    }
  }

  &__heading {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 24px;
    color: $color-dark-red;
    line-height: 1.5;
    letter-spacing: 0.1em;
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

  &__en {
    font-family: $font-jost;
    font-weight: 900;
    font-size: 10px;
    line-height: 1;
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
