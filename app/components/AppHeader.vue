<template>
  <header class="header">
    <div class="header__inner">
      <!-- PC nav -->
      <nav class="header__nav">
        <div class="header__nav-left">
          <span class="header__sep" aria-hidden="true"></span>
          <template v-for="item in leftNavItems" :key="item.path">
            <NuxtLink :to="item.path" class="header__nav-item">
              <img :src="item.icon" :alt="item.label" class="header__nav-icon" width="50" height="50" />
              <span class="header__nav-label">{{ item.label }}</span>
              <span class="header__nav-en">{{ item.en }}</span>
            </NuxtLink>
            <span class="header__sep" aria-hidden="true"></span>
          </template>
        </div>

        <NuxtLink to="/" class="header__logo">
          <img src="/images/logo.svg" alt="桜のこもれびキッズランド" class="header__logo-img" width="280" height="280" />
        </NuxtLink>

        <div class="header__nav-right">
          <span class="header__sep header__sep--logo-adj" aria-hidden="true"></span>
          <template v-for="item in rightNavItems" :key="item.path">
            <NuxtLink :to="item.path" class="header__nav-item">
              <img :src="item.icon" :alt="item.label" class="header__nav-icon" width="50" height="50" />
              <span class="header__nav-label">{{ item.label }}</span>
              <span class="header__nav-en">{{ item.en }}</span>
            </NuxtLink>
            <span class="header__sep" aria-hidden="true"></span>
          </template>
        </div>
      </nav>

      <!-- SP nav -->
      <div class="header__sp">
        <NuxtLink to="/" class="header__sp-logo">
          <img src="/images/logo.svg" alt="桜のこもれびキッズランド" width="70" height="70" />
        </NuxtLink>
        <button
          class="header__sp-toggle"
          :aria-expanded="menuOpen"
          aria-label="メニューを開く"
          @click="menuOpen = true"
        >
          <span class="header__sp-toggle-lines">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span class="header__sp-toggle-label">menu</span>
        </button>
      </div>

      <Teleport to="body">
      <div v-if="menuOpen" class="header__sp-menu">
        <button class="header__sp-menu-close" aria-label="メニューを閉じる" @click="menuOpen = false">
          <svg class="header__sp-menu-close-icon" aria-hidden="true" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="28" x2="42" y2="4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="42" y1="28" x2="2" y2="4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          <span class="header__sp-menu-close-label">closed</span>
        </button>
        <div class="header__sp-menu-grid">
          <NuxtLink
            v-for="item in [...leftNavItems, ...rightNavItems]"
            :key="item.path"
            :to="item.path"
            class="header__sp-menu-item"
            @click="menuOpen = false"
          >
            <img :src="item.icon" :alt="item.label" class="header__sp-menu-icon" width="60" height="60" />
            <span class="header__sp-menu-label">{{ item.label }}</span>
            <span class="header__sp-menu-en">{{ item.en }}</span>
          </NuxtLink>
        </div>
      </div>
      </Teleport>
    </div>
  </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
let scrollY = 0

watch(menuOpen, (val) => {
  if (!import.meta.client) return
  if (val) {
    scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
  } else {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, scrollY)
  }
})

onUnmounted(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
})

const leftNavItems = [
  {
    label: 'わたしたちのこと',
    en: 'About',
    path: '/about',
    icon: '/images/nav-icon-about.svg',
  },
  {
    label: '各園のご紹介',
    en: 'Introduction',
    path: '/introduction',
    icon: '/images/nav-icon-introduction.svg',
  },
  {
    label: 'こもれびだより',
    en: 'Letter',
    path: '/letter-list',
    icon: '/images/nav-icon-letter.svg',
  },
]

const rightNavItems = [
  {
    label: 'お知らせ',
    en: 'Info',
    path: '/info',
    icon: '/images/nav-icon-info.svg',
  },
  {
    label: '採用情報',
    en: 'Recruit',
    path: '/recruit',
    icon: '/images/nav-icon-recruit.svg',
  },
  {
    label: 'お問い合わせ',
    en: 'Contact',
    path: '/contact',
    icon: '/images/nav-icon-contact.svg',
  },
]
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

@keyframes headerFadeIn {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  position: relative;
  z-index: 200;
  animation: headerFadeIn 0.7s ease both;
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
    height: calc(100vw * 158 / 375);
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
    align-items: stretch;
    justify-content: center;

    @media screen and (max-width: 1100px) {
      width: calc(100% - 40px);
      height: 100px;
    }

    @media screen and (max-width: 900px) {
      height: 80px;
    }

    @include sp {
      display: none;
    }
  }

  &__nav-left,
  &__nav-right {
    flex: 1;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
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

    @media screen and (max-width: 1100px) {
      padding: 0 16px;
      gap: 4px;
    }

    @media screen and (max-width: 900px) {
      padding: 0 10px;
      gap: 3px;
    }

    &:hover {
      opacity: 0.75;
    }
  }

  &__nav-icon {
    width: 50px;
    height: 50px;
    object-fit: contain;

    @media screen and (max-width: 1100px) {
      width: 38px;
      height: 38px;
    }

    @media screen and (max-width: 900px) {
      width: 28px;
      height: 28px;
    }
  }

  &__nav-label {
    font-family: $font-yusei;
    font-size: 13px;
    color: $color-dark-red;
    white-space: nowrap;

    @media screen and (max-width: 1100px) {
      font-size: 11px;
    }

    @media screen and (max-width: 900px) {
      font-size: 9px;
    }
  }

  &__nav-en {
    font-family: $font-jost;
    font-size: 11px;
    font-weight: 600;
    color: $color-dark-red;
    letter-spacing: 0.08em;

    @media screen and (max-width: 1100px) {
      font-size: 9px;
    }

    @media screen and (max-width: 900px) {
      font-size: 8px;
      letter-spacing: 0.04em;
    }
  }

  &__sep--logo-adj {
    @media screen and (max-width: 1100px) {
      visibility: hidden;
    }
  }

  &__logo {
    flex-shrink: 0;
    padding: 0 8px;
    transition: opacity 0.2s;

    @media screen and (max-width: 1100px) {
      display: none;
    }

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
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;

    @include sp {
      display: flex;
    }
  }

  &__sp-logo {
    display: block;

    img {
      display: block;
      width: min(calc(100vw - 160px), 280px);
      height: auto;
    }
  }

  &__sp-toggle {
    position: absolute;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid $color-dark-red;
    background: transparent;
    padding: 0;
    cursor: pointer;
    flex-shrink: 0;

    @media screen and (max-width: 380px) {
      width: 48px;
      height: 48px;
      right: 12px;
    }
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

      @media screen and (max-width: 380px) {
        width: 22px;
      }
    }

    @media screen and (max-width: 380px) {
      gap: 4px;
    }
  }

  &__sp-menu-close {
    position: absolute;
    top: 16px;
    right: 20px;
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
    cursor: pointer;
    color: $color-dark-red;
  }

  &__sp-menu-close-icon {
    display: block;
    width: 36px;
    height: 26px;
  }

  &__sp-menu-close-label {
    font-family: $font-jost;
    font-size: 13px;
    font-weight: 700;
    color: $color-dark-red;
    line-height: 1;
    letter-spacing: 0.05em;
  }

  &__sp-toggle-label {
    font-family: $font-jost;
    font-size: 13px;
    font-weight: 700;
    color: $color-dark-red;
    line-height: 1;
    letter-spacing: 0.05em;

    @media screen and (max-width: 380px) {
      font-size: 10px;
    }
  }

  &__sp-menu {
    position: fixed;
    inset: 0;
    z-index: 300;
    background-color: rgba(255, 248, 242, 0.92);
    backdrop-filter: blur(6px);
    overflow-y: auto;
    padding: 108px 24px 40px;

    @include sp {
      padding-top: 100px;
    }
  }

  &__sp-menu-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    max-width: 400px;
    margin: 0 auto;
  }

  &__sp-menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 24px 12px 20px;
    border: 1.5px solid $color-dark-red;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.6);
    transition: opacity 0.2s;
    text-decoration: none;

    &:hover {
      opacity: 0.75;
    }
  }

  &__sp-menu-icon {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  &__sp-menu-label {
    font-family: $font-yusei;
    font-size: 14px;
    color: $color-dark-red;
    text-align: center;
    white-space: nowrap;
  }

  &__sp-menu-en {
    font-family: $font-jost;
    font-size: 11px;
    font-weight: 700;
    color: $color-dark-red;
    letter-spacing: 0.08em;
  }
}
</style>
