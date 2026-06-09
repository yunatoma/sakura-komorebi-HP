<template>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__copy">
        <small>&copy; さくらこもれび All Rights Reserved.</small>
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;

.footer {
  background-color: $color-dark-red;
  color: $color-white;

  &__inner {
    padding: 20px 40px;
    text-align: center;
  }

  &__copy {
    font-family: $font-yusei;
    font-size: 12px;
    letter-spacing: 0.05em;
  }
}
</style>
