<template>
  <main class="confirm-page">
    <!-- ページヘッディング -->
    <section class="page-heading">
      <div class="page-heading__bg">
        <div class="page-heading__inner">
          <h1 class="page-heading__title">採用情報</h1>
          <p class="page-heading__en">Recruit</p>
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
              <NuxtLink to="/recruit" class="page-heading__breadcrumb-link">採用情報</NuxtLink>
            </li>
            <li class="page-heading__breadcrumb-item">
              <span class="page-heading__breadcrumb-sep" aria-hidden="true">›</span>
              <span class="page-heading__breadcrumb-current">内容確認</span>
            </li>
          </ol>
        </div>
      </nav>
    </section>

    <!-- 確認カード -->
    <div class="recruit-confirm">
      <div class="recruit-confirm__inner">
        <div class="recruit-confirm__card">

          <div v-for="row in confirmRows" :key="row.label" class="recruit-confirm__row">
            <div class="recruit-confirm__label-wrap">
              <span class="recruit-confirm__label">{{ row.label }}</span>
              <span
                class="recruit-confirm__badge"
                :class="row.required ? 'recruit-confirm__badge--required' : 'recruit-confirm__badge--optional'"
              >{{ row.required ? '必須' : '任意' }}</span>
            </div>
            <div class="recruit-confirm__value">
              <!-- 住所は複数行表示 -->
              <template v-if="row.label === 'ご住所'">
                <div class="recruit-confirm__address">
                  <div class="recruit-confirm__address-row">
                    <span class="recruit-confirm__address-label">郵便番号</span>
                    <span>{{ form.zip || '―' }}</span>
                  </div>
                  <div class="recruit-confirm__address-row">
                    <span class="recruit-confirm__address-label">都道府県</span>
                    <span>{{ form.prefecture || '―' }}</span>
                  </div>
                  <div class="recruit-confirm__address-row">
                    <span class="recruit-confirm__address-label">市区町村</span>
                    <span>{{ form.city || '―' }}</span>
                  </div>
                  <div class="recruit-confirm__address-row">
                    <span class="recruit-confirm__address-label">番地、建物名</span>
                    <span>{{ form.street || '―' }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <span class="recruit-confirm__text" :class="{ 'recruit-confirm__text--empty': !row.value }">
                  {{ row.value || '―' }}
                </span>
              </template>
            </div>
          </div>

          <!-- 送信ボタン -->
          <div class="recruit-confirm__submit-wrap">
            <button type="button" class="recruit-confirm__submit" @click="handleSubmit">
              送信
              <span class="recruit-confirm__submit-arrow">›</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRecruitForm } from '~/composables/useRecruitForm'

const form = useRecruitForm()
const router = useRouter()

const confirmRows = computed(() => [
  { label: 'お問い合わせ内容', value: [form.value.inquiryType, form.value.inquiryContent].filter(Boolean).join('　'), required: true },
  { label: '卒業予定年月',     value: form.value.graduation,     required: true  },
  { label: 'お名前',           value: form.value.name,           required: true  },
  { label: 'ふりがな',         value: form.value.kana,           required: true  },
  { label: '生年月日',         value: form.value.birthdate,      required: true  },
  { label: '性別',             value: form.value.gender,         required: false },
  { label: 'ご住所',           value: null,                      required: false },
  { label: '電話番号',         value: form.value.phone,          required: false },
  { label: 'メールアドレス',   value: form.value.email,          required: true  },
  { label: '学校名',           value: form.value.school,         required: false },
  { label: '学科名',           value: form.value.department,     required: false },
  { label: '希望職種',         value: form.value.jobType,        required: true  },
  { label: '希望雇用形態',     value: form.value.employmentType, required: true  },
  { label: '希望就業エリア',   value: form.value.area,           required: true  },
  { label: 'ご要望・ご質問',   value: form.value.message,        required: true  },
])

function handleSubmit() {
  // 送信処理後にリセットしてサンクスページへ
  router.push('/recruit/thanks')
}
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

// ---- Page heading (recruit.vue と共通) ----
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
    padding: 0 40px;

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

// ---- Confirm section ----
.recruit-confirm {
  padding: 60px 20px 120px;

  @include sp {
    padding: 40px 20px 80px;
  }

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__card {
    background-color: $color-white;
    border-radius: 24px;
    padding: 8px 60px 56px;

    @include sp {
      padding: 8px 20px 40px;
      border-radius: 16px;
    }
  }

  // ---- Row ----
  &__row {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 24px;
    align-items: start;
    padding: 24px 0;
    border-bottom: 1px solid $color-pink-light;

    &:last-of-type {
      border-bottom: none;
    }

    @include sp {
      grid-template-columns: 1fr;
      gap: 8px;
      padding: 18px 0;
    }
  }

  &__label-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 2px;
  }

  &__label {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 15px;
    color: $color-text;
    letter-spacing: 0.06em;
    line-height: 1.5;

    @include sp {
      font-size: 14px;
    }
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 8px;
    border-radius: 4px;
    font-family: $font-kosugi;
    font-size: 11px;
    line-height: 1.4;
    letter-spacing: 0.04em;
    white-space: nowrap;

    &--required {
      background-color: $color-pink;
      color: $color-white;
    }

    &--optional {
      background-color: #e0e0e0;
      color: #666;
    }
  }

  &__value {
    font-family: $font-kosugi;
    font-size: 15px;
    color: $color-text;
    letter-spacing: 0.06em;
    line-height: 1.8;

    @include sp {
      font-size: 14px;
    }
  }

  &__text {
    white-space: pre-wrap;

    &--empty {
      color: #aaa;
    }
  }

  // ---- Address sub-rows ----
  &__address {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__address-row {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 16px;

    @include sp {
      grid-template-columns: 90px 1fr;
    }
  }

  &__address-label {
    font-size: 14px;
    color: lighten($color-text, 20%);
  }

  // ---- Submit ----
  &__submit-wrap {
    text-align: center;
    padding-top: 40px;
  }

  &__submit {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 64px;
    border-radius: 999px;
    border: 2px solid $color-dark-red;
    background-color: transparent;
    font-family: $font-kosugi;
    font-size: 18px;
    line-height: 1;
    letter-spacing: 0.1em;
    color: $color-dark-red;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: $color-dark-red;
      color: $color-white;
    }

    @include sp {
      font-size: 16px;
      padding: 12px 48px;
    }
  }

  &__submit-arrow {
    font-size: 20px;
    line-height: 1;
  }
}
</style>
