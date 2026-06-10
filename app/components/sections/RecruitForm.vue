<template>
  <section id="entry" class="recruit-form" ref="sectionRef">
    <div class="recruit-form__inner">
      <form class="recruit-form__card" :class="{ 'is-visible': isVisible }" @submit.prevent="handleSubmit" novalidate>

        <!-- お問い合わせ内容 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">お問い合わせ内容</span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </div>
          <div class="recruit-form__control">
            <div class="recruit-form__radios">
              <label class="recruit-form__radio-label">
                <input type="radio" v-model="form.inquiryType" value="見学" class="recruit-form__radio" />
                <span class="recruit-form__radio-custom" />
                園の見学をしたい
              </label>
              <label class="recruit-form__radio-label">
                <input type="radio" v-model="form.inquiryType" value="採用" class="recruit-form__radio" />
                <span class="recruit-form__radio-custom" />
                採用試験に応募したい
              </label>
              <label class="recruit-form__radio-label">
                <input type="radio" v-model="form.inquiryType" value="その他" class="recruit-form__radio" />
                <span class="recruit-form__radio-custom" />
                その他
              </label>
            </div>
            <textarea v-model="form.inquiryContent" class="recruit-form__textarea" rows="4" />
          </div>
        </div>

        <!-- 卒業予定年月 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">卒業予定年月</span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </div>
          <div class="recruit-form__control">
            <div class="recruit-form__radios">
              <label class="recruit-form__radio-label">
                <input type="radio" v-model="form.graduation" value="2024年3月" class="recruit-form__radio" />
                <span class="recruit-form__radio-custom" />
                2024年3月
              </label>
              <label class="recruit-form__radio-label">
                <input type="radio" v-model="form.graduation" value="既卒" class="recruit-form__radio" />
                <span class="recruit-form__radio-custom" />
                既卒
              </label>
              <label class="recruit-form__radio-label">
                <input type="radio" v-model="form.graduation" value="その他" class="recruit-form__radio" />
                <span class="recruit-form__radio-custom" />
                その他
              </label>
            </div>
          </div>
        </div>

        <!-- お名前 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">お名前</span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </div>
          <div class="recruit-form__control">
            <input type="text" v-model="form.name" class="recruit-form__input" autocomplete="name" />
          </div>
        </div>

        <!-- ふりがな -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">ふりがな</span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </div>
          <div class="recruit-form__control">
            <input type="text" v-model="form.kana" class="recruit-form__input" />
          </div>
        </div>

        <!-- 生年月日 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">生年月日</span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </div>
          <div class="recruit-form__control">
            <input type="text" v-model="form.birthdate" class="recruit-form__input" placeholder="例：1990年1月1日" />
          </div>
        </div>

        <!-- 性別 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">性別</span>
            <span class="recruit-form__badge recruit-form__badge--optional">任意</span>
          </div>
          <div class="recruit-form__control">
            <div class="recruit-form__radios">
              <label class="recruit-form__radio-label">
                <input type="radio" v-model="form.gender" value="男性" class="recruit-form__radio" />
                <span class="recruit-form__radio-custom" />
                男性
              </label>
              <label class="recruit-form__radio-label">
                <input type="radio" v-model="form.gender" value="女性" class="recruit-form__radio" />
                <span class="recruit-form__radio-custom" />
                女性
              </label>
              <label class="recruit-form__radio-label">
                <input type="radio" v-model="form.gender" value="その他" class="recruit-form__radio" />
                <span class="recruit-form__radio-custom" />
                その他
              </label>
            </div>
          </div>
        </div>

        <!-- ご住所 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">ご住所</span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </div>
          <div class="recruit-form__control recruit-form__control--address">
            <div class="recruit-form__address-row">
              <span class="recruit-form__address-label">郵便番号</span>
              <input type="text" v-model="form.zip" class="recruit-form__input" placeholder="例：123-4567" autocomplete="postal-code" />
            </div>
            <div class="recruit-form__address-row">
              <span class="recruit-form__address-label">都道府県</span>
              <input type="text" v-model="form.prefecture" class="recruit-form__input" autocomplete="address-level1" />
            </div>
            <div class="recruit-form__address-row">
              <span class="recruit-form__address-label">市区町村</span>
              <input type="text" v-model="form.city" class="recruit-form__input" autocomplete="address-level2" />
            </div>
            <div class="recruit-form__address-row">
              <span class="recruit-form__address-label">番地、建物名</span>
              <input type="text" v-model="form.street" class="recruit-form__input" autocomplete="address-line1" />
            </div>
          </div>
        </div>

        <!-- 電話番号 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">電話番号</span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </div>
          <div class="recruit-form__control">
            <input type="tel" v-model="form.phone" class="recruit-form__input" placeholder="例：090-1234-5678" autocomplete="tel" />
          </div>
        </div>

        <!-- メールアドレス -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">メールアドレス</span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </div>
          <div class="recruit-form__control">
            <input type="email" v-model="form.email" class="recruit-form__input" placeholder="例：example@email.com" autocomplete="email" />
          </div>
        </div>

        <!-- 学校名 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">学校名</span>
            <span class="recruit-form__badge recruit-form__badge--optional">任意</span>
          </div>
          <div class="recruit-form__control">
            <input type="text" v-model="form.school" class="recruit-form__input" />
          </div>
        </div>

        <!-- 学科名 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">学科名</span>
            <span class="recruit-form__badge recruit-form__badge--optional">任意</span>
          </div>
          <div class="recruit-form__control">
            <input type="text" v-model="form.department" class="recruit-form__input" />
          </div>
        </div>

        <!-- 希望職種 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">希望職種</span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </div>
          <div class="recruit-form__control">
            <div class="recruit-form__radios recruit-form__radios--column">
              <label v-for="job in jobTypes" :key="job" class="recruit-form__radio-label">
                <input type="radio" v-model="form.jobType" :value="job" class="recruit-form__radio" />
                <span class="recruit-form__radio-custom" />
                {{ job }}
              </label>
            </div>
          </div>
        </div>

        <!-- 希望雇用形態 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">希望雇用形態</span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </div>
          <div class="recruit-form__control">
            <div class="recruit-form__radios recruit-form__radios--column">
              <label v-for="emp in employmentTypes" :key="emp" class="recruit-form__radio-label">
                <input type="radio" v-model="form.employmentType" :value="emp" class="recruit-form__radio" />
                <span class="recruit-form__radio-custom" />
                {{ emp }}
              </label>
            </div>
          </div>
        </div>

        <!-- 希望就業エリア -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">希望就業エリア</span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </div>
          <div class="recruit-form__control">
            <input type="text" v-model="form.area" class="recruit-form__input" />
          </div>
        </div>

        <!-- ご要望・ご質問 -->
        <div class="recruit-form__row">
          <div class="recruit-form__label-wrap">
            <span class="recruit-form__label">ご要望・ご質問</span>
            <span class="recruit-form__badge recruit-form__badge--optional">任意</span>
          </div>
          <div class="recruit-form__control">
            <textarea v-model="form.message" class="recruit-form__textarea" rows="6" />
          </div>
        </div>

        <!-- 同意チェック -->
        <div class="recruit-form__agree">
          <label class="recruit-form__checkbox-label">
            <input type="checkbox" v-model="form.agreed" class="recruit-form__checkbox" />
            <span class="recruit-form__checkbox-custom" />
            <span class="recruit-form__checkbox-text">
              利用規約と個人情報の取り扱いについて同意する
            </span>
            <span class="recruit-form__badge recruit-form__badge--required">必須</span>
          </label>
        </div>

        <!-- Submit -->
        <div class="recruit-form__submit-wrap">
          <button type="submit" class="recruit-form__submit" :disabled="!form.agreed">
            内容確認
            <span class="recruit-form__submit-arrow">›</span>
          </button>
        </div>

      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { useRecruitForm } from '~/composables/useRecruitForm'

const { elementRef: sectionRef, isVisible } = useScrollAnimation(0.05)
const router = useRouter()
const form = useRecruitForm()

const jobTypes = [
  '保育士（保育士免許あり）',
  '保育士（保育士免許なし）',
  '栄養士もしくは調理師',
  '看護師',
  '事務',
]

const employmentTypes = ['正社員', '常勤パート', '非常勤パート']

function handleSubmit() {
  router.push('/recruit/confirm')
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

.recruit-form {
  padding: 80px 20px 120px;

  @include sp {
    padding: 60px 20px 100px;
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
    min-height: 120px;
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

  // ---- Radios ----
  &__radios {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 24px;

    &--column {
      flex-direction: column;
      gap: 8px;
    }
  }

  &__radio-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-family: $font-kosugi;
    font-size: 15px;
    color: $color-text;
    letter-spacing: 0.04em;

    @include sp {
      font-size: 14px;
    }
  }

  &__radio {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .recruit-form__radio-custom {
      border-color: $color-pink;

      &::after {
        opacity: 1;
      }
    }

    &:focus + .recruit-form__radio-custom {
      box-shadow: 0 0 0 3px rgba($color-pink, 0.3);
    }
  }

  &__radio-custom {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 50%;
    background-color: $color-white;
    position: relative;
    transition: border-color 0.2s;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $color-pink;
      opacity: 0;
      transition: opacity 0.2s;
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

    &:checked + .recruit-form__checkbox-custom {
      background-color: $color-pink;
      border-color: $color-pink;

      &::after {
        opacity: 1;
      }
    }

    &:focus + .recruit-form__checkbox-custom {
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
