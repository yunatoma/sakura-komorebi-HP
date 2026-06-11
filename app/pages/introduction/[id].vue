<template>
  <main class="introduction-detail">
    <!-- Page heading -->
    <section class="page-heading">
      <div class="page-heading__bg">
        <div class="page-heading__inner">
          <h1 class="page-heading__title">各園のご紹介</h1>
          <p class="page-heading__en">Introduction</p>
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
              <NuxtLink to="/introduction" class="page-heading__breadcrumb-link">各園のご紹介</NuxtLink>
            </li>
            <li v-if="garden" class="page-heading__breadcrumb-item">
              <span class="page-heading__breadcrumb-sep" aria-hidden="true">›</span>
              <span class="page-heading__breadcrumb-current">{{ garden.name }}</span>
            </li>
          </ol>
        </div>
      </nav>
    </section>

    <template v-if="garden">
      <SectionsIntroductionSingleLocation
        :img="garden.location.img"
        :heading="garden.location.heading"
        :text="garden.location.text"
      />
      <SectionsIntroductionSingleGallery :images="garden.gallery" />
      <SectionsIntroductionSingleMessage :img="garden.message.img" :text="garden.message.text" />
      <SectionsIntroductionSingleInfo :info="garden.info" />
      <SectionsTopLetters :limit="3" :garden-name="garden.name" />
    </template>

    <div v-else-if="loading" class="introduction-detail__loading">
      <span class="introduction-detail__spinner" aria-label="読み込み中"></span>
    </div>

    <div v-else class="introduction-detail__not-found">
      <p>園が見つかりませんでした。</p>
      <NuxtLink to="/introduction">一覧に戻る</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Garden } from '~/composables/useGardens'

const route = useRoute()
const { fetchById } = useGardens()

const id = route.params.id as string
const garden = ref<Garden | null>(null)
const loading = ref(true)

onMounted(async () => {
  garden.value = await fetchById(id)
  loading.value = false
})
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

@keyframes spin {
  to { transform: rotate(360deg); }
}

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
    margin-bottom: 4px;

    @include sp {
      font-size: 22px;
    }
  }

  &__en {
    font-family: $font-jost;
    font-weight: 900;
    font-size: 11px;
    letter-spacing: 0.2em;
    color: $color-dark-red;
    line-height: 1;
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
    padding: 0 40px;

    @include sp {
      padding: 0 20px;
    }
  }

  &__breadcrumb-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    list-style: none;
  }

  &__breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: 0.08em;
    color: $color-text;

    @include sp {
      font-size: 12px;
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

.introduction-detail {
  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80px 0;
  }

  &__spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 3px solid rgba(#EF8F9C, 0.3);
    border-top-color: #EF8F9C;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__not-found {
    max-width: 1160px;
    margin: 0 auto;
    padding: 80px 60px;
    text-align: center;
    font-family: $font-kosugi;
    font-size: 16px;
    color: $color-text;

    a {
      color: $color-dark-red;
      margin-top: 16px;
      display: inline-block;
    }
  }
}
</style>
