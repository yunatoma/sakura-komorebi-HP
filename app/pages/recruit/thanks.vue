<template>
  <main class="thanks-page">
    <!-- ページヘッディング -->
    <section class="page-heading">
      <div class="page-heading__bg">
        <div class="page-heading__inner">
          <h1 class="page-heading__title">お問い合わせありがとうございます。</h1>
          <p class="page-heading__en">Thank You for Contacting Us</p>
        </div>
      </div>
    </section>

    <!-- 本文 -->
    <div class="thanks-body">
      <p class="thanks-body__text">
        数日以内に担当の者からご入力いただいたメールアドレスに返信いたします。
      </p>
      <div class="thanks-body__btn-wrap">
        <NuxtLink to="/" class="thanks-body__btn">
          TOPにもどる
          <span class="thanks-body__btn-arrow">›</span>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRecruitForm } from '~/composables/useRecruitForm'

// フォームデータをリセット
const form = useRecruitForm()
form.value = {
  inquiryType: '',
  inquiryContent: '',
  graduation: '',
  name: '',
  kana: '',
  birthdate: '',
  gender: '',
  zip: '',
  prefecture: '',
  city: '',
  street: '',
  phone: '',
  email: '',
  school: '',
  department: '',
  jobType: '',
  employmentType: '',
  area: '',
  message: '',
  agreed: false,
}
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
    padding: 0 20px;
  }

  &__title {
    font-family: $font-yusei;
    font-weight: 400;
    font-size: 32px;
    color: $color-dark-red;
    letter-spacing: 0.08em;

    @include sp {
      font-size: 18px;
    }
  }

  &__en {
    font-family: $font-jost;
    font-weight: 700;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: $color-dark-red;
    margin-top: 8px;
  }
}

.thanks-body {
  padding: 80px 20px 120px;
  text-align: center;

  @include sp {
    padding: 60px 20px 100px;
  }

  &__text {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 18px;
    color: $color-text;
    line-height: 2;
    letter-spacing: 0.08em;
    margin-bottom: 64px;

    @include sp {
      font-size: 15px;
      margin-bottom: 48px;
    }
  }

  &__btn-wrap {
    display: flex;
    justify-content: center;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    padding: 14px 56px;
    border-radius: 999px;
    border: 2px solid $color-dark-red;
    background-color: transparent;
    font-family: $font-kosugi;
    font-size: 18px;
    line-height: 1;
    letter-spacing: 0.1em;
    color: $color-dark-red;
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: $color-dark-red;
      color: $color-white;
    }

    @include sp {
      font-size: 16px;
      padding: 12px 44px;
    }
  }

  &__btn-arrow {
    font-size: 20px;
    line-height: 1;
  }
}
</style>
