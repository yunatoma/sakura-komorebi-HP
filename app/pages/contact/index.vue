<template>
  <main class="contact-page">
    <!-- ページヘッディング -->
    <section class="page-heading">
      <div class="page-heading__bg">
        <div class="page-heading__inner">
          <h1 class="page-heading__title">お問い合わせ</h1>
          <p class="page-heading__en">Contact</p>
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
              <span class="page-heading__breadcrumb-current">お問い合わせ</span>
            </li>
          </ol>
        </div>
      </nav>
    </section>

    <!-- 説明文 -->
    <div class="contact-page__desc">
      <div class="contact-page__desc-inner">
        <p class="contact-page__desc-text">
          下記フォームにご記入の上、送信してください。折り返し、弊社担当よりご連絡させて頂きます。<br />
          また、ご入力頂きました個人に関する情報につきましては、弊社で責任をもって管理し、お問い合わせへのご回答及び弊社のサービス向上のために利用させて頂き、第三者への開示や他の目的で利用は致しません。詳しくは個人情報保護方針をご覧ください。
        </p>
        <NuxtLink to="/privacy" class="contact-page__desc-link-text">
          弊社への登録に際して、お預かりする個人情報の扱いについて
        </NuxtLink>
      </div>
    </div>

    <SectionsContactForm />
  </main>
</template>

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
    gap: 6px;
    list-style: none;
  }

  &__breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0.1em;
    color: $color-text;

    @include sp {
      font-size: 14px;
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

.contact-page {
  &__desc {
    padding: 40px 20px 48px;

    @include sp {
      padding: 32px 20px 40px;
    }
  }

  &__desc-inner {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 40px;

    @include sp {
      padding: 0;
    }
  }

  &__desc-text {
    font-family: $font-kosugi;
    font-size: 15px;
    color: $color-text;
    line-height: 1.9;
    letter-spacing: 0.06em;
    margin-bottom: 16px;

    @include sp {
      font-size: 13px;
    }
  }

  &__desc-link-text {
    font-family: $font-kosugi;
    font-size: 14px;
    color: $color-dark-red;
    letter-spacing: 0.06em;
    text-decoration: underline;
    cursor: pointer;

    @include sp {
      font-size: 13px;
    }
  }
}
</style>
