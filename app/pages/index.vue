<template>
  <main class="top-page">
    <section class="hero">
      <p class="hero__label">
        Nuxt Website
      </p>

      <h1 class="hero__title">
        Figmaデザインをもとにした<br />
        Nuxtサイト制作
      </h1>

      <p class="hero__text">
        Nuxt、TypeScript、SCSSを使って、
        デザインから実装・デプロイまで行います。
      </p>
    </section>
  </main>
</template>

<style scoped lang="scss">
.hero {
  min-height: 100vh;
  padding: 80px 24px;

  &__label {
    font-size: 14px;
    letter-spacing: 0.12em;
    color: #6b7280;
  }

  &__title {
    margin-top: 16px;
    font-size: 40px;
    line-height: 1.3;
    color: #111827;
  }

  &__text {
    max-width: 640px;
    margin-top: 24px;
    font-size: 16px;
    line-height: 1.8;
    color: #4b5563;
  }
}
</style>