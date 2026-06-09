<template>
  <header class="header">
    <div class="header__inner">
      <!-- PC nav -->
      <nav class="header__nav">
        <span class="header__sep" aria-hidden="true"></span>

        <template v-for="item in leftNavItems" :key="item.path">
          <NuxtLink :to="item.path" class="header__nav-item">
            <img :src="item.icon" :alt="item.label" class="header__nav-icon" width="50" height="50" />
            <span class="header__nav-label">{{ item.label }}</span>
            <span class="header__nav-en">{{ item.en }}</span>
          </NuxtLink>
          <span class="header__sep" aria-hidden="true"></span>
        </template>

        <NuxtLink to="/" class="header__logo">
          <img src="/images/logo.svg" alt="桜のこもれびキッズランド" class="header__logo-img" width="280" height="280" />
        </NuxtLink>

        <template v-for="item in rightNavItems" :key="item.path">
          <span class="header__sep" aria-hidden="true"></span>
          <NuxtLink :to="item.path" class="header__nav-item">
            <img :src="item.icon" :alt="item.label" class="header__nav-icon" width="50" height="50" />
            <span class="header__nav-label">{{ item.label }}</span>
            <span class="header__nav-en">{{ item.en }}</span>
          </NuxtLink>
        </template>

        <span class="header__sep" aria-hidden="true"></span>
      </nav>

      <!-- SP nav -->
      <div class="header__sp">
        <NuxtLink to="/" class="header__sp-logo">
          <img src="/images/logo.svg" alt="桜のこもれびキッズランド" width="70" height="70" />
        </NuxtLink>
        <button class="header__sp-toggle" :aria-expanded="menuOpen" aria-label="メニューを開く" @click="menuOpen = !menuOpen">
          <span class="header__sp-toggle-lines">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span class="header__sp-toggle-label">menu</span>
        </button>
      </div>

      <div v-if="menuOpen" class="header__sp-menu">
        <ul>
          <li v-for="item in [...leftNavItems, ...rightNavItems]" :key="item.path">
            <NuxtLink :to="item.path" class="header__sp-menu-link" @click="menuOpen = false">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false)

const leftNavItems = [
  {
    label: 'わたしたちのこと',
    en: 'About',
    path: '/about',
    icon: '/images/Mask group-3.svg',
  },
  {
    label: '各園のご紹介',
    en: 'Introduction',
    path: '/introduction',
    icon: '/images/Mask group-5.svg',
  },
  {
    label: 'こもれびだより',
    en: 'Letter',
    path: '/letter',
    icon: '/images/Mask group-6.svg',
  },
]

const rightNavItems = [
  {
    label: 'お知らせ',
    en: 'Info',
    path: '/info',
    icon: '/images/Mask group-7.svg',
  },
  {
    label: '採用情報',
    en: 'Recruit',
    path: '/recruit',
    icon: '/images/Mask group-8.svg',
  },
  {
    label: 'お問い合わせ',
    en: 'Contact',
    path: '/contact',
    icon: '/images/Mask group-9.svg',
  },
]
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

.header {
  position: relative;
  z-index: 10;
  background-image: url('/images/header.svg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  height: calc(100vw * 254 / 1440);

  @include sp {
    background-image: url('/images/sp-header.svg');
    background-size: 100% auto;
    background-position: top center;
  }

  &__inner {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  // ---- PC nav ----
  &__nav {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 160px);
    max-width: 1280px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include sp {
      display: none;
    }
  }

  &__sep {
    display: block;
    width: 2px;
    align-self: stretch;
    position: relative;
    background-image: repeating-linear-gradient(
      to bottom,
      $color-dark-red 0,
      $color-dark-red 4px,
      transparent 4px,
      transparent 8px
    );
    flex-shrink: 0;
    margin: 8px 0;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: $color-dark-red;
    }

    &::before {
      top: -4px;
    }

    &::after {
      bottom: -4px;
    }
  }

  &__nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 0 28px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.75;
    }
  }

  &__nav-icon {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  &__nav-label {
    font-family: $font-yusei;
    font-size: 13px;
    color: $color-dark-red;
    white-space: nowrap;
  }

  &__nav-en {
    font-family: $font-jost;
    font-size: 11px;
    font-weight: 600;
    color: $color-dark-red;
    letter-spacing: 0.08em;
  }

  &__logo {
    flex-shrink: 0;
    padding: 0 8px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.85;
    }
  }

  &__logo-img {
    width: 280px;
    height: auto;
    object-fit: contain;
    display: block;
  }

  // ---- SP nav ----
  &__sp {
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;

    @include sp {
      display: flex;
    }
  }

  &__sp-logo img {
    display: block;
  }

  &__sp-toggle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 2px solid $color-dark-red;
    background: transparent;
    padding: 0;
  }

  &__sp-toggle-lines {
    display: flex;
    flex-direction: column;
    gap: 5px;

    span {
      display: block;
      width: 32px;
      height: 2px;
      background-color: $color-dark-red;
      border-radius: 2px;
    }
  }

  &__sp-toggle-label {
    font-family: $font-jost;
    font-size: 13px;
    font-weight: 700;
    color: $color-dark-red;
    line-height: 1;
    letter-spacing: 0.05em;
  }

  &__sp-menu {
    background-color: $color-pink-light;
    padding: 16px 24px 24px;

    ul {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
  }

  &__sp-menu-link {
    display: block;
    font-family: $font-yusei;
    font-size: 15px;
    color: $color-dark-red;
    padding: 14px 0;
    border-bottom: 1px solid rgba($color-pink, 0.5);

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
