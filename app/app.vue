<template>
  <div class="layout">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <NuxtPage />
    <AppFooter />
    <PageTopButton />
  </div>
</template>

<style>
.layout {
  background-image: url('/images/bg.svg');
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

@media screen and (max-width: 767px) {
  .layout {
    background-image: url('/images/sp-bg.svg');
  }
}
</style>
