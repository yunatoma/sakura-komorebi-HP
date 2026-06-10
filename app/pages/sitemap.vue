<template>
  <main class="sitemap-page">
    <!-- ページヘッディング -->
    <section class="page-heading">
      <div class="page-heading__bg">
        <div class="page-heading__inner">
          <h1 class="page-heading__title">サイトマップ</h1>
          <p class="page-heading__en">Sitemap</p>
        </div>
      </div>
      <nav class="page-heading__breadcrumb" aria-label="パンくずリスト">
        <div class="page-heading__breadcrumb-inner">
          <ol class="page-heading__breadcrumb-list">
            <li class="page-heading__breadcrumb-item">
              <NuxtLink to="/" class="page-heading__breadcrumb-link">TOP</NuxtLink>
            </li>
            <li class="page-heading__breadcrumb-item">
              <span class="page-heading__breadcrumb-sep" aria-hidden="true">›</span>
              <span class="page-heading__breadcrumb-current">サイトマップ</span>
            </li>
          </ol>
        </div>
      </nav>
    </section>

    <!-- サイトマップ本体 -->
    <section class="sitemap-page__body">
      <div class="sitemap-page__border sitemap-page__border--top"></div>

      <!-- アイコン（上ボーダーにまたがる） -->
      <div class="sitemap-page__logo-wrap">
        <div class="sitemap-page__logo-circle">
          <img src="/images/Mask group.svg" alt="" class="sitemap-page__logo-img" />
        </div>
      </div>

      <div class="sitemap-page__body-inner">
        <!-- リンク一覧 -->
        <div class="sitemap-page__card">
          <div class="sitemap-page__columns">
            <!-- 左カラム -->
            <ul class="sitemap-page__list">
              <li v-for="item in leftItems" :key="item.path" class="sitemap-page__item">
                <NuxtLink :to="item.path" class="sitemap-page__link">
                  <span class="sitemap-page__link-dot" aria-hidden="true">●</span>
                  <span class="sitemap-page__link-label">{{ item.label }}</span>
                  <span class="sitemap-page__link-arrow" aria-hidden="true">›</span>
                </NuxtLink>
              </li>
            </ul>
            <!-- 右カラム -->
            <ul class="sitemap-page__list">
              <li v-for="item in rightItems" :key="item.path" class="sitemap-page__item">
                <NuxtLink :to="item.path" class="sitemap-page__link">
                  <span class="sitemap-page__link-dot" aria-hidden="true">●</span>
                  <span class="sitemap-page__link-label">{{ item.label }}</span>
                  <span class="sitemap-page__link-arrow" aria-hidden="true">›</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="sitemap-page__border sitemap-page__border--bottom"></div>
    </section>
  </main>
</template>

<script setup lang="ts">
const leftItems = [
  { label: 'TOP', path: '/' },
  { label: 'わたしたちのこと', path: '/about' },
  { label: '各園のご紹介', path: '/introduction' },
  { label: 'こもれびだより', path: '/letter' },
  { label: 'お知らせ', path: '/info' },
]

const rightItems = [
  { label: '採用情報', path: '/recruit' },
  { label: 'お問い合わせ', path: '/contact' },
  { label: 'サイトマップ', path: '/sitemap' },
  { label: 'プライバシーポリシー', path: '/privacy' },
]
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

.page-heading {
  &__bg {
    background-image: url('/images/page-heading.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: calc(100vw * 200 / 1440);
    display: flex;
    align-items: center;
    justify-content: center;

    @include sp {
      background-image: url('/images/page-heading-sp.svg');
      height: calc(100vw * 160 / 375);
    }
  }

  &__inner {
    text-align: center;
  }

  &__title {
    font-family: $font-yusei;
    font-weight: 400;
    font-size: 32px;
    color: $color-dark-red;
    letter-spacing: 0.12em;

    @include sp {
      font-size: 22px;
    }
  }

  &__en {
    font-family: $font-jost;
    font-weight: 900;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: $color-dark-red;
    margin-top: 6px;
  }

  &__breadcrumb {
    padding: 12px 0;

    @include sp {
      padding: 10px 0;
    }
  }

  &__breadcrumb-inner {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 60px;

    @include sp {
      padding: 0 20px;
    }
  }

  &__breadcrumb-list {
    display: flex;
    align-items: center;
    gap: 6px;
    list-style: none;
  }

  &__breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0.1em;
    color: $color-text;

    @include sp {
      font-size: 14px;
    }
  }

  &__breadcrumb-link {
    color: $color-dark-red;
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  &__breadcrumb-sep {
    color: $color-dark-red;
    font-size: 16px;
    line-height: 1;
  }

  &__breadcrumb-current {
    color: $color-text;
  }
}

.sitemap-page {
  &__body {
    position: relative;
    margin-top: 48px;
    padding: 64px 60px 80px;
    background: url('/images/top-letters__bg.svg') top center / cover no-repeat;

    @include sp {
      padding: 56px 24px 64px;
    }
  }

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

  &__logo-wrap {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  &__logo-circle {
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

  &__logo-img {
    width: 60px;
    height: 60px;

    @include sp {
      width: 50px;
      height: 50px;
    }
  }

  &__body-inner {
    max-width: 960px;
    margin: 0 auto;
  }

  &__card {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    padding: 48px 60px;

    @include sp {
      padding: 32px 20px;
    }
  }

  &__columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 48px;

    @include sp {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  &__list {
    list-style: none;
  }

  &__item {
    border-bottom: 1px dotted $color-pink;

    &:first-child {
      border-top: 1px dotted $color-pink;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 4px;
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }

    @include sp {
      padding: 14px 4px;
    }
  }

  &__link-dot {
    font-size: 10px;
    color: $color-yellow-light;
    filter: drop-shadow(0 0 1px $color-pink);
    flex-shrink: 0;
    line-height: 1;
  }

  &__link-label {
    flex: 1;
    font-family: $font-kosugi;
    font-size: 16px;
    color: $color-text;
    letter-spacing: 0.08em;

    @include sp {
      font-size: 14px;
    }
  }

  &__link-arrow {
    font-size: 18px;
    color: $color-dark-red;
    line-height: 1;
    flex-shrink: 0;
  }
}
</style>
