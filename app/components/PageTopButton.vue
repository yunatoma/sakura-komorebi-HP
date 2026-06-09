<template>
  <Transition name="fade">
    <button
      v-show="isVisible"
      class="page-top"
      aria-label="ページトップへ戻る"
      @click="scrollToTop"
    >
      <img src="/images/chevron-right-solid 3.svg" class="page-top__icon" alt="" aria-hidden="true" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const fv = document.querySelector('.fv')

  if (fv) {
    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.value = !entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(fv)
  } else {
    const onScroll = () => { isVisible.value = window.scrollY > 300 }
    window.addEventListener('scroll', onScroll, { passive: true })
  }
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
  }
}
</style>
