<template>
  <main class="letter-detail">
    <!-- Page heading -->
    <section class="page-heading">
      <div class="page-heading__bg">
        <div class="page-heading__inner">
          <h1 class="page-heading__title">こもれびだより</h1>
          <p class="page-heading__en">Letter</p>
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
              <NuxtLink to="/letter-list" class="page-heading__breadcrumb-link">こもれびだより</NuxtLink>
            </li>
            <li v-if="post" class="page-heading__breadcrumb-item">
              <span class="page-heading__breadcrumb-sep" aria-hidden="true">›</span>
              <span class="page-heading__breadcrumb-current">{{ post.title }}『{{ post.excerpt }}』</span>
            </li>
          </ol>
        </div>
      </nav>
    </section>

    <SectionsLetterSingle v-if="post" :post="post" />

    <div v-else class="letter-detail__not-found">
      <p>記事が見つかりませんでした。</p>
      <NuxtLink to="/letter-list">一覧に戻る</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const { getPostById } = useLetterPosts()

const id = Number(route.params.id)
const post = getPostById(id)
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

.letter-detail {
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
