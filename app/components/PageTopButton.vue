<template>
  <button
    v-show="isVisible"
    class="page-top"
    aria-label="ページトップへ戻る"
    @click="scrollToTop"
  >
    <img src="/images/chevron-right-solid 3.svg" class="page-top__icon" alt="" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
const isVisible = ref(false)

function onScroll() {
  isVisible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

.page-top {
  position: fixed;
  bottom: 32px;
  right: 40px;
  z-index: 100;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: $color-white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  @include sp {
    right: 20px;
    bottom: 20px;
    width: 44px;
    height: 44px;
  }

  &__icon {
    width: 24px;
    height: 24px;
    display: block;
    transform: rotate(0deg);
  }
}
</style>
