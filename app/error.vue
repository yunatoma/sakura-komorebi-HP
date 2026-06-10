<template>
  <div class="layout">
    <AppHeader />
    <main class="not-found">
      <!-- ページヘッディング -->
      <section class="page-heading">
        <div class="page-heading__bg">
          <div class="page-heading__inner">
            <h1 class="page-heading__title">お探しのページが見あたりません。</h1>
            <p class="page-heading__en">Page Not Found</p>
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
                <span class="page-heading__breadcrumb-current">404</span>
              </li>
            </ol>
          </div>
        </nav>
      </section>

      <!-- エラーメッセージ -->
      <section class="not-found__message">
        <div class="not-found__message-inner">
          <p class="not-found__text">
            申し訳ございません。<br>
            お探しのページは見つかりませんでした。<br>
            以下の可能性がございます。
          </p>
          <ul class="not-found__list">
            <li class="not-found__list-item">・URLが変更された</li>
            <li class="not-found__list-item">・ページが存在しない</li>
          </ul>
          <p class="not-found__guide">恐れ入りますが、以下のリンクからお探しのページにお入りください。</p>
        </div>
      </section>

      <!-- サイトマップ -->
      <section class="not-found__sitemap">
        <div class="not-found__sitemap-border not-found__sitemap-border--top"></div>

        <div class="not-found__sitemap-logo-wrap">
          <div class="not-found__sitemap-logo-circle">
            <img src="/images/icon-logo-mark.svg" alt="" class="not-found__sitemap-logo-img" />
          </div>
        </div>

        <div class="not-found__sitemap-inner">
          <div class="not-found__sitemap-card">
            <div class="not-found__sitemap-columns">
              <ul class="not-found__sitemap-list">
                <li v-for="item in leftLinks" :key="item.path" class="not-found__sitemap-item">
                  <NuxtLink :to="item.path" class="not-found__sitemap-link">
                    <span class="not-found__sitemap-dot" aria-hidden="true">●</span>
                    <span class="not-found__sitemap-label">{{ item.label }}</span>
                    <span class="not-found__sitemap-arrow" aria-hidden="true">›</span>
                  </NuxtLink>
                </li>
              </ul>
              <ul class="not-found__sitemap-list">
                <li v-for="item in rightLinks" :key="item.path" class="not-found__sitemap-item">
                  <NuxtLink :to="item.path" class="not-found__sitemap-link">
                    <span class="not-found__sitemap-dot" aria-hidden="true">●</span>
                    <span class="not-found__sitemap-label">{{ item.label }}</span>
                    <span class="not-found__sitemap-arrow" aria-hidden="true">›</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="not-found__sitemap-border not-found__sitemap-border--bottom"></div>
      </section>
    </main>
    <AppFooter />
    <PageTopButton />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

const leftLinks = [
  { label: 'TOP', path: '/' },
  { label: 'わたしたちのこと', path: '/about' },
  { label: '各園のご紹介', path: '/introduction' },
  { label: 'こもれびだより', path: '/letter' },
  { label: 'お知らせ', path: '/info' },
]

const rightLinks = [
  { label: '採用情報', path: '/recruit' },
  { label: 'お問い合わせ', path: '/contact' },
  { label: 'サイトマップ', path: '/sitemap' },
  { label: 'プライバシーポリシー', path: '/privacy' },
]
</script>

<style lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

.layout {
  background-image: url('/images/bg.svg');
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  min-height: 100vh;

  @include sp {
    background-image: url('/images/sp-bg.svg');
  }
}
</style>

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
      font-size: 18px;
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

.not-found {
  &__message {
    padding: 60px 0 80px;

    @include sp {
      padding: 40px 0 60px;
    }
  }

  &__message-inner {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 60px;

    @include sp {
      padding: 0 20px;
    }
  }

  &__text {
    font-family: $font-kosugi;
    font-size: 16px;
    line-height: 2;
    color: $color-text;
    letter-spacing: 0.08em;

    @include sp {
      font-size: 14px;
    }
  }

  &__list {
    list-style: none;
    margin-top: 20px;
  }

  &__list-item {
    font-family: $font-kosugi;
    font-size: 16px;
    line-height: 2;
    color: $color-text;
    letter-spacing: 0.08em;

    @include sp {
      font-size: 14px;
    }
  }

  &__guide {
    font-family: $font-kosugi;
    font-size: 16px;
    line-height: 2;
    color: $color-text;
    letter-spacing: 0.08em;
    margin-top: 28px;

    @include sp {
      font-size: 14px;
    }
  }

  &__sitemap {
    position: relative;
    margin-top: 48px;
    padding: 64px 60px 80px;
    background: url('/images/top-letters__bg.svg') top center / cover no-repeat;

    @include sp {
      padding: 56px 24px 64px;
    }
  }

  &__sitemap-border {
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

  &__sitemap-logo-wrap {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  &__sitemap-logo-circle {
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

  &__sitemap-logo-img {
    width: 60px;
    height: 60px;

    @include sp {
      width: 50px;
      height: 50px;
    }
  }

  &__sitemap-inner {
    max-width: 960px;
    margin: 0 auto;
  }

  &__sitemap-card {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    padding: 48px 60px;

    @include sp {
      padding: 32px 20px;
    }
  }

  &__sitemap-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 48px;

    @include sp {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  &__sitemap-list {
    list-style: none;
  }

  &__sitemap-item {
    border-bottom: 1px dotted $color-pink;

    &:first-child {
      border-top: 1px dotted $color-pink;
    }
  }

  &__sitemap-link {
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

  &__sitemap-dot {
    font-size: 10px;
    color: $color-yellow-light;
    filter: drop-shadow(0 0 1px $color-pink);
    flex-shrink: 0;
    line-height: 1;
  }

  &__sitemap-label {
    flex: 1;
    font-family: $font-kosugi;
    font-size: 16px;
    color: $color-text;
    letter-spacing: 0.08em;

    @include sp {
      font-size: 14px;
    }
  }

  &__sitemap-arrow {
    font-size: 18px;
    color: $color-dark-red;
    line-height: 1;
    flex-shrink: 0;
  }
}
</style>
