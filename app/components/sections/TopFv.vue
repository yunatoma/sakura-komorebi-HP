<template>
  <section class="fv" ref="fvRef">
    <div class="fv__inner">
      <!-- Main photo (角丸、中央配置) -->
      <div class="fv__photo-wrap">
        <img
          src="/images/ANJU16040317IMG_1087_TP_V 1.webp"
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

  @include sp {
    padding: 16px 20px 32px;
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
    height: 420px;
    width: 100%;

    @include sp {
      height: 260px;
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
    width: 30%;
    aspect-ratio: 1 / 1.05;
    background-image: url('/images/Vector.webp');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px 20px;

    @include sp {
      width: 65%;
      left: 50%;
      top: auto;
      bottom: 30px;
      transform: translateX(-50%);
      padding: 16px;
    }
  }

  &__title {
    font-family: $font-yusei;
    font-size: clamp(18px, 2vw, 32px);
    color: $color-dark-red;
    line-height: 1.9;
    text-align: left;

    @include sp {
      font-size: 16px;
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

  // ---- お知らせ (FVエリア内・右下) ----
  &__news {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 4;
    width: 200px;
    background-color: $color-yellow-light;
    border-radius: 12px;
    padding: 14px 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.8s both;
    }

    @include sp {
      width: 150px;
      bottom: 12px;
      right: 12px;
      padding: 10px 12px;
    }
  }

  &__news-heading {
    font-family: $font-yusei;
    font-size: 14px;
    font-weight: bold;
    color: $color-dark-red;
    margin-bottom: 6px;
  }

  &__news-body {
    font-family: $font-kosugi;
    font-size: 11px;
    color: $color-text;
    line-height: 1.6;
    margin-bottom: 6px;
  }

  &__news-date {
    font-family: $font-jost;
    font-size: 10px;
    color: $color-text;
    text-align: right;
  }
}

</style>
