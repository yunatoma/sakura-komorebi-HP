<template>
  <footer class="footer">
    <div class="footer__inner">
      <!-- ロゴ -->
      <NuxtLink to="/" class="footer__logo">
        <img src="/images/logo.svg" alt="桜のこもれびキッズランド" width="240" height="71" />
      </NuxtLink>

      <!-- メインナビ -->
      <nav class="footer__nav">
        <ul class="footer__nav-list">
          <li v-for="item in mainNavItems" :key="item.path">
            <NuxtLink :to="item.path" class="footer__nav-link">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- サブナビ -->
      <nav class="footer__sub-nav">
        <ul class="footer__sub-nav-list">
          <li v-for="item in subNavItems" :key="item.path">
            <NuxtLink :to="item.path" class="footer__sub-nav-link">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- コピーライト -->
      <p class="footer__copy">
        <small>©桜のこもれびキッズランド All Rights Reserved.</small>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const mainNavItems = [
  { label: '私たちのこと', path: '/about' },
  { label: '各園のご紹介', path: '/introduction' },
  { label: 'こもれびだより', path: '/letter' },
  { label: '採用情報', path: '/recruit' },
  { label: 'お知らせ', path: '/info' },
  { label: 'お問い合わせ', path: '/contact' },
]

const subNavItems = [
  { label: 'サイトマップ', path: '/sitemap' },
  { label: 'プライバシーポリシー', path: '/privacy' },
]

</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

.footer {
  position: relative;
  background: linear-gradient(to bottom, #FFFEF3 0%, #FFF7B8 100%);
  padding: 48px 40px 32px;

  @include sp {
    padding: 36px 20px 28px;
  }

  &__inner {
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
  }

  &__logo {
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }

    img {
      max-width: 240px;
      width: 100%;
      height: 70.86px;
      object-fit: contain;
      display: block;
    }
  }

  &__nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 40px;

    @include sp {
      gap: 12px 24px;
    }
  }

  &__nav-link {
    font-family: $font-kosugi;
    font-size: 14px;
    color: $color-dark-red;
    letter-spacing: 0.04em;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }

    @include sp {
      font-size: 13px;
    }
  }

  &__sub-nav-list {
    display: flex;
    justify-content: center;
    gap: 40px;

    @include sp {
      gap: 24px;
    }
  }

  &__sub-nav-link {
    font-family: $font-kosugi;
    font-size: 13px;
    color: $color-dark-red;
    letter-spacing: 0.04em;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  &__copy {
    font-family: $font-jost;
    font-size: 12px;
    color: $color-dark-red;
    letter-spacing: 0.06em;

    @include sp {
      font-size: 11px;
    }
  }

}
</style>
