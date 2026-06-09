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
    </div>
  </section>

  <!-- Fixed お知らせ (FV表示中のみ表示) -->
  <ClientOnly>
    <Transition name="slide-fade">
      <div v-if="isFvVisible" class="fv-news">
        <p class="fv-news__heading">お知らせ</p>
        <p class="fv-news__body">タイトルが入ります。タイトルが入ります。</p>
        <p class="fv-news__date">2024ねん4がつ1にち</p>
      </div>
    </Transition>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: fvRef, isVisible } = useScrollAnimation(0.1)

const isFvVisible = ref(true)
let fvObserver: IntersectionObserver | null = null

onMounted(() => {
  const el = fvRef.value
  if (!el) return

  fvObserver = new IntersectionObserver(
    ([entry]) => {
      isFvVisible.value = entry.isIntersecting
    },
    { threshold: 0 }
  )
  fvObserver.observe(el)
})

onUnmounted(() => {
  fvObserver?.disconnect()
  fvObserver = null
})
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

  // ---- White blob (左側テキスト) ----
  &__blob {
    position: absolute;
    z-index: 4;
    top: 50%;
    left: 3%;
    transform: translateY(-50%);
    width: 30%;
    aspect-ratio: 1 / 1.05;
    background-color: $color-white;
    border-radius: 50% 55% 60% 50% / 55% 50% 60% 55%;
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
      border-radius: 50%;
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
}

// ---- Fixed お知らせ ----
.fv-news {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 200;
  width: 220px;
  background-color: $color-yellow-light;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

  @include sp {
    width: 160px;
    bottom: 16px;
    right: 16px;
    padding: 10px 12px;
  }

  &__heading {
    font-family: $font-yusei;
    font-size: 15px;
    font-weight: bold;
    color: $color-dark-red;
    margin-bottom: 6px;
  }

  &__body {
    font-family: $font-kosugi;
    font-size: 12px;
    color: $color-text;
    line-height: 1.6;
    margin-bottom: 6px;
  }

  &__date {
    font-family: $font-jost;
    font-size: 11px;
    color: $color-text;
    text-align: right;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
