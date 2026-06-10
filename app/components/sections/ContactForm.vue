<template>
  <section class="contact-form" ref="sectionRef">
    <div class="contact-form__inner">
      <form class="contact-form__card" :class="{ 'is-visible': isVisible }" @submit.prevent="handleSubmit" novalidate>

        <!-- お名前 -->
        <div class="contact-form__row">
          <div class="contact-form__label-wrap">
            <span class="contact-form__label">お名前</span>
            <span class="contact-form__badge contact-form__badge--required">必須</span>
          </div>
          <div class="contact-form__control">
            <input type="text" v-model="form.name" class="contact-form__input" autocomplete="name" />
          </div>
        </div>

        <!-- お子様のご年齢 -->
        <div class="contact-form__row">
          <div class="contact-form__label-wrap">
            <span class="contact-form__label">お子様のご年齢</span>
            <span class="contact-form__badge contact-form__badge--optional">任意</span>
          </div>
          <div class="contact-form__control">
            <input type="text" v-model="form.childAge" class="contact-form__input" />
          </div>
        </div>

        <!-- ご住所 -->
        <div class="contact-form__row">
          <div class="contact-form__label-wrap">
            <span class="contact-form__label">ご住所</span>
            <span class="contact-form__badge contact-form__badge--optional">任意</span>
          </div>
          <div class="contact-form__control contact-form__control--address">
            <div class="contact-form__address-row">
              <span class="contact-form__address-label">郵便番号</span>
              <input type="text" v-model="form.zip" class="contact-form__input" placeholder="例：123-4567" autocomplete="postal-code" />
            </div>
            <div class="contact-form__address-row">
              <span class="contact-form__address-label">都道府県</span>
              <input type="text" v-model="form.prefecture" class="contact-form__input" autocomplete="address-level1" />
            </div>
            <div class="contact-form__address-row">
              <span class="contact-form__address-label">市区町村</span>
              <input type="text" v-model="form.city" class="contact-form__input" autocomplete="address-level2" />
            </div>
            <div class="contact-form__address-row">
              <span class="contact-form__address-label">番地、建物名</span>
              <input type="text" v-model="form.street" class="contact-form__input" autocomplete="address-line1" />
            </div>
          </div>
        </div>

        <!-- 電話番号 -->
        <div class="contact-form__row">
          <div class="contact-form__label-wrap">
            <span class="contact-form__label">電話番号</span>
            <span class="contact-form__badge contact-form__badge--optional">任意</span>
          </div>
          <div class="contact-form__control">
            <input type="tel" v-model="form.phone" class="contact-form__input" placeholder="例：090-1234-5678" autocomplete="tel" />
          </div>
        </div>

        <!-- メールアドレス -->
        <div class="contact-form__row">
          <div class="contact-form__label-wrap">
            <span class="contact-form__label">メールアドレス</span>
            <span class="contact-form__badge contact-form__badge--required">必須</span>
          </div>
          <div class="contact-form__control">
            <input type="email" v-model="form.email" class="contact-form__input" placeholder="例：example@email.com" autocomplete="email" />
          </div>
        </div>

        <!-- お問い合わせの保育園 -->
        <div class="contact-form__row">
          <div class="contact-form__label-wrap">
            <span class="contact-form__label">お問い合わせの保育園</span>
            <span class="contact-form__badge contact-form__badge--required">必須</span>
          </div>
          <div class="contact-form__control">
            <input type="text" v-model="form.nursery" class="contact-form__input" />
          </div>
        </div>

        <!-- お問い合わせ内容 -->
        <div class="contact-form__row">
          <div class="contact-form__label-wrap">
            <span class="contact-form__label">お問い合わせ内容</span>
            <span class="contact-form__badge contact-form__badge--required">必須</span>
          </div>
          <div class="contact-form__control">
            <textarea v-model="form.message" class="contact-form__textarea" rows="7" />
          </div>
        </div>

        <!-- 同意チェック -->
        <div class="contact-form__agree">
          <label class="contact-form__checkbox-label">
            <input type="checkbox" v-model="form.agreed" class="contact-form__checkbox" />
            <span class="contact-form__checkbox-custom" />
            <span class="contact-form__checkbox-text">
              利用規約と個人情報の取り扱いについて同意する
            </span>
            <span class="contact-form__badge contact-form__badge--required">必須</span>
          </label>
        </div>

        <!-- Submit -->
        <div class="contact-form__submit-wrap">
          <button type="submit" class="contact-form__submit" :disabled="!form.agreed">
            内容確認
            <span class="contact-form__submit-arrow">›</span>
          </button>
        </div>

      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { useContactForm } from '~/composables/useContactForm'

const { elementRef: sectionRef, isVisible } = useScrollAnimation(0.05)
const router = useRouter()
const form = useContactForm()

function handleSubmit() {
  router.push('/contact/confirm')
}
</script>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixin' as *;

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-form {
  padding: 0 20px 120px;

  @include sp {
    padding: 0 20px 100px;
  }

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  // ---- Card ----
  &__card {
    background-color: $color-white;
    border-radius: 24px;
    padding: 8px 60px 56px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.1s both;
    }

    @include sp {
      padding: 8px 20px 40px;
      border-radius: 16px;
    }
  }

  // ---- Row ----
  &__row {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 24px;
    align-items: start;
    padding: 24px 0;
    border-bottom: 1px solid $color-pink-light;

    &:last-of-type {
      border-bottom: none;
    }

    @include sp {
      grid-template-columns: 1fr;
      gap: 10px;
      padding: 20px 0;
    }
  }

  &__label-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 10px;

    @include sp {
      padding-top: 0;
    }
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

  // ---- Controls ----
  &__control {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &--address {
      gap: 8px;
    }
  }

  &__input {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-family: $font-kosugi;
    font-size: 15px;
    color: $color-text;
    background-color: $color-white;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;

    &:focus {
      border-color: $color-pink;
      box-shadow: 0 0 0 3px rgba($color-pink, 0.15);
    }

    @include sp {
      font-size: 14px;
      padding: 9px 12px;
    }
  }

  &__textarea {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-family: $font-kosugi;
    font-size: 15px;
    color: $color-text;
    background-color: $color-white;
    outline: none;
    resize: vertical;
    min-height: 160px;
    transition: border-color 0.2s;
    box-sizing: border-box;

    &:focus {
      border-color: $color-pink;
      box-shadow: 0 0 0 3px rgba($color-pink, 0.15);
    }

    @include sp {
      font-size: 14px;
    }
  }

  // ---- Address sub-rows ----
  &__address-row {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    gap: 12px;

    @include sp {
      grid-template-columns: 80px 1fr;
    }
  }

  &__address-label {
    font-family: $font-kosugi;
    font-size: 14px;
    color: $color-text;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  // ---- Agree ----
  &__agree {
    padding: 32px 0;
    display: flex;
    justify-content: center;
  }

  &__checkbox-label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  &__checkbox {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .contact-form__checkbox-custom {
      background-color: $color-pink;
      border-color: $color-pink;

      &::after {
        opacity: 1;
      }
    }

    &:focus + .contact-form__checkbox-custom {
      box-shadow: 0 0 0 3px rgba($color-pink, 0.3);
    }
  }

  &__checkbox-custom {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: $color-white;
    position: relative;
    transition: background-color 0.2s, border-color 0.2s;

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 6px;
      width: 5px;
      height: 9px;
      border-right: 2px solid $color-white;
      border-bottom: 2px solid $color-white;
      transform: rotate(45deg);
      opacity: 0;
      transition: opacity 0.2s;
    }
  }

  &__checkbox-text {
    font-family: $font-kosugi;
    font-size: 15px;
    color: $color-text;
    letter-spacing: 0.06em;

    @include sp {
      font-size: 14px;
    }
  }

  // ---- Submit ----
  &__submit-wrap {
    text-align: center;
    padding-bottom: 8px;
  }

  &__submit {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 56px;
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

    &:hover:not(:disabled) {
      background-color: $color-dark-red;
      color: $color-white;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    @include sp {
      font-size: 16px;
      padding: 12px 44px;
    }
  }

  &__submit-arrow {
    font-size: 20px;
    line-height: 1;
  }
}
</style>
