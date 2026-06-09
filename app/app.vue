<template>
  <div class="layout" :class="{ 'layout--top': isTopPage }">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isTopPage = computed(() => route.path === '/')
</script>

<style>
.layout--top {
  background-image: url('/images/bg.svg');
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

@media screen and (max-width: 767px) {
  .layout--top {
    background-image: url('/images/sp-bg.svg');
  }
}
</style>
