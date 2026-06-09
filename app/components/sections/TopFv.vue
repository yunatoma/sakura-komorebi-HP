<template>
  <section class="fv" ref="fvRef">
    <div class="fv__inner">
      <!-- Main photo (角丸、中央配置) -->
      <div class="fv__photo-wrap">
        <img
          src="/images/ANJU16040317IMG_1087_TP_V1.webp"
          class="fv__photo"
          alt="子どもたちの笑顔"
        />
      </div>

      <!-- White blob (左側テキスト) -->
      <div class="fv__blob" :class="{ 'is-visible': isVisible }">
        <h1 class="fv__title">
          <span class="fv__title-line">一人ひとりの輝きが、</span>
          <span class="fv__title-line">未来を彩る</span>
        </h1>
      </div>

      <!-- お知らせ (FVエリア内・右下) -->
      <div class="fv__news" :class="{ 'is-visible': isVisible }">
        <p class="fv__news-heading">お知らせ</p>
        <p class="fv__news-body">タイトルが入ります。タイトルが入ります。</p>
        <p class="fv__news-date">2024ねん4がつ1にち</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: fvRef, isVisible } = useScrollAnimation(0.1)

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

.fv {
  padding: 20px 60px 40px;
  margin-top: calc(-100vw * 80 / 1440);
  overflow-x: clip;

  @include sp {
    padding: 16px 20px 60px;
    margin-top: -40px;
  }

  &__inner {
    position: relative;
    max-width: 1160px;
    margin: 0 auto;
  }

  // ---- 写真 (角丸・中央配置) ----
  &__photo-wrap {
    border-radius: 24px;
    overflow: hidden;
    height: 540px;
    max-height: 540px;
    width: 100%;

    @include sp {
      height: 460px;
      border-radius: 16px;
    }
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    display: block;
  }

  // ---- Vector bg (左側テキスト) ----
  &__blob {
    position: absolute;
    z-index: 4;
    top: 50%;
    left: 3%;
    transform: translateY(-50%);
    width: 48%;
    aspect-ratio: 1 / 1.05;
    background-image: url('/images/Vector.webp');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 40px;

    @include sp {
      width: 52%;
      left: 4%;
      top: 50%;
      transform: translateY(-50%);
      padding: 20px 16px;
    }
  }

  &__title {
    font-family: $font-yusei;
    font-weight: 400;
    font-size: 40px;
    color: $color-dark-red;
    line-height: 2;
    letter-spacing: 0.1em;
    text-align: left;
    vertical-align: bottom;

    @media screen and (max-width: 1100px) {
      font-size: 32px;
    }

    @media screen and (max-width: 900px) {
      font-size: 24px;
    }

    @include sp {
      font-size: 22px;
      text-align: center;
    }
  }

  &__title-line {
    display: block;
    opacity: 0;

    .is-visible & {
      animation: fadeInUp 0.7s ease both;
    }

    &:nth-child(1) { animation-delay: 0.2s; }
    &:nth-child(2) { animation-delay: 0.5s; }
  }

  // ---- お知らせ (画像下端からはみ出し) ----
  &__news {
    position: absolute;
    bottom: -30px;
    right: -40px;
    z-index: 4;
    max-width: 280px;
    width: 280px;
    max-height: 150px;
    background-color: $color-yellow-light;
    border-radius: 12px;
    padding: 18px 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.8s both;
    }

    @include sp {
      width: calc(100% - 32px);
      max-width: 320px;
      max-height: none;
      bottom: -40px;
      right: auto;
      left: 0;
      padding: 16px 18px;
    }
  }

  &__news-heading {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 20px;
    line-height: 1;
    letter-spacing: 0.1em;
    vertical-align: bottom;
    color: $color-dark-red;
    margin-bottom: 6px;
  }

  &__news-body {
    font-family: $font-kosugi;
    font-size: 13px;
    color: $color-text;
    line-height: 1.6;
    margin-bottom: 6px;
  }

  &__news-date {
    font-family: $font-jost;
    font-size: 12px;
    color: $color-text;
    text-align: right;
  }
}

</style>
