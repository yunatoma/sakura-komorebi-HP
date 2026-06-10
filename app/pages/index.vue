<script setup lang="ts">
useSeoMeta({
  title: '桜のこもれびキッズランド｜日本全国の認証・認可保育園',
  description: '桜のこもれびキッズランドは関東、関西など日本全国各地で保育園を運営しています。子供たちが楽しく学び、成長するための保育環境を提供しています。さまざまな情報やイベント情報をお届けします。',
  ogTitle: '桜のこもれびキッズランド｜日本全国の認証・認可保育園',
  ogDescription: '桜のこもれびキッズランドは関東、関西など日本全国各地で保育園を運営しています。子供たちが楽しく学び、成長するための保育環境を提供しています。さまざまな情報やイベント情報をお届けします。',
})
</script>

<template>
  <main class="top">
    <SectionsTopFv />
    <SectionsTopWelcome />
    <SectionsTopIntroduction />
    <SectionsTopLetters />
    <SectionsTopRecruitment />
  </main>
</template>

<style scoped>
.top {
  background: url('/images/bg.svg') top center / cover no-repeat;
}
</style>
