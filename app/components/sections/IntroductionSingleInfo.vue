<template>
  <section class="nursery-info" ref="sectionRef">
    <div class="nursery-info__inner">
      <!-- Icon -->
      <div class="nursery-info__icon-wrap" :class="{ 'is-visible': isVisible }">
        <div class="nursery-info__icon-circle">
          <svg class="nursery-info__icon-svg" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M18 3C18 3 7 8 7 18V30H29V18C29 8 18 3 18 3Z" stroke="#6B1A2A" stroke-width="2.2" stroke-linejoin="round" fill="none"/>
            <rect x="4" y="29" width="28" height="3.5" rx="1.75" fill="#6B1A2A"/>
            <path d="M15 33C15 34.7 16.3 36 18 36C19.7 36 21 34.7 21 33" stroke="#6B1A2A" stroke-width="2" stroke-linecap="round"/>
            <circle cx="18" cy="3" r="2.5" fill="#6B1A2A"/>
          </svg>
        </div>
      </div>

      <!-- Heading -->
      <h2 class="nursery-info__heading" :class="{ 'is-visible': isVisible }">園の概要</h2>
      <p class="nursery-info__en" :class="{ 'is-visible': isVisible }">About Nursery</p>

      <!-- Table -->
      <div class="nursery-info__table" :class="{ 'is-visible': isVisible }">

        <!-- 所在地 -->
        <div class="nursery-info__row">
          <div class="nursery-info__label">所在地</div>
          <div class="nursery-info__value">東京都渋谷区渋谷〇-〇-〇</div>
        </div>

        <!-- TEL / FAX -->
        <div class="nursery-info__row">
          <div class="nursery-info__label">TEL / FAX</div>
          <div class="nursery-info__value">0120-107-929 / 0120-107-929</div>
        </div>

        <!-- 対象 -->
        <div class="nursery-info__row">
          <div class="nursery-info__label">対象</div>
          <div class="nursery-info__value">１歳児から小学校就学前までの乳幼児（１歳児〜5歳児）</div>
        </div>

        <!-- 入園日 -->
        <div class="nursery-info__row">
          <div class="nursery-info__label">入園日</div>
          <div class="nursery-info__value">
            原則として毎月1日<br />
            初回は見学になります。<br />
            他の保護者や園児及び職員との三密対応及び保育園の日程により、見学日時に制限がある場合がございます。ご理解のうえ、ご連絡願います。
          </div>
        </div>

        <!-- 開園日 -->
        <div class="nursery-info__row">
          <div class="nursery-info__label">開園日</div>
          <div class="nursery-info__value">
            <div class="nursery-info__week-grid">
              <span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span>土</span><span>日</span>
              <span>○</span><span>○</span><span>○</span><span>○</span><span>○</span><span>○</span><span>ー</span>
            </div>
            月曜日〜土曜日（日曜日、祝日・休日、年末年始（12/29〜1/3）はお休み）
          </div>
        </div>

        <!-- 保育時間 -->
        <div class="nursery-info__row">
          <div class="nursery-info__label">保育時間</div>
          <div class="nursery-info__value">
            <p class="nursery-info__sublabel">保育標準時間認定の方</p>
            <table class="nursery-info__subtable">
              <tbody>
                <tr>
                  <th>保育標準時間</th>
                  <td>7：30〜18：30</td>
                </tr>
                <tr>
                  <th>延長保育</th>
                  <td>18：31〜19：30</td>
                </tr>
              </tbody>
            </table>
            <p class="nursery-info__sublabel nursery-info__sublabel--mt">保育短時間認定の方</p>
            <table class="nursery-info__subtable">
              <tbody>
                <tr>
                  <th>保育標準時間</th>
                  <td>9：00〜17：00</td>
                </tr>
                <tr>
                  <th>延長保育</th>
                  <td>7：30〜8：59<br />17：01〜19：30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 定員 -->
        <div class="nursery-info__row">
          <div class="nursery-info__label">定員</div>
          <div class="nursery-info__value">
            <div class="nursery-info__staff-layout">
              <div class="nursery-info__badge">
                <span class="nursery-info__badge-label">定員</span>
                <span class="nursery-info__badge-num">51名</span>
              </div>
              <div>
                <div class="nursery-info__age-grid">
                  <span>1歳児</span><span>2歳児</span><span>3歳児</span><span>4歳児</span><span>5歳児</span>
                  <span>18名</span><span>18名</span><span>5名</span><span>5名</span><span>5名</span>
                </div>
              </div>
            </div>
            <p class="nursery-info__note">※定員は、開園初年度から数年をかけて102名の定員に変更していきます。</p>
          </div>
        </div>

        <!-- 職員 -->
        <div class="nursery-info__row nursery-info__row--last">
          <div class="nursery-info__label">職員</div>
          <div class="nursery-info__value">
            <div class="nursery-info__staff-layout">
              <div class="nursery-info__badge">
                <span class="nursery-info__badge-label">定員</span>
                <span class="nursery-info__badge-num">13名以上</span>
              </div>
              <div>
                <div class="nursery-info__staff-grid">
                  <span>園長</span><span>保育士</span><span>調理師</span><span>看護師</span><span>事務員</span>
                  <span>1名</span><span>8名</span><span>2名</span><span>1名</span><span>1名</span>
                </div>
              </div>
            </div>
            <p class="nursery-info__note">※嘱託医　1名</p>
            <p class="nursery-info__note">※保育士は認可保育所の基準に準じます</p>
            <p class="nursery-info__note">※保育児童数・年齢に応じたシフトにより、職員を増減します</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: sectionRef, isVisible } = useScrollAnimation(0.1)
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

.nursery-info {
  padding: 80px 60px 100px;

  @include sp {
    padding: 60px 20px 80px;
  }

  &__inner {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
  }

  // ---- Icon ----
  &__icon-wrap {
    margin-bottom: 24px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.6s ease 0.1s both;
    }
  }

  &__icon-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 96px;
    background-color: #FFF7B8;
    border-radius: 50%;

    @include sp {
      width: 80px;
      height: 80px;
    }
  }

  &__icon-svg {
    width: 44px;
    height: 52px;

    @include sp {
      width: 36px;
      height: 42px;
    }
  }

  // ---- Heading ----
  &__heading {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 24px;
    line-height: 1.5;
    letter-spacing: 0.1em;
    color: $color-dark-red;
    margin-bottom: 8px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.25s both;
    }

    @include sp {
      font-size: 20px;
    }
  }

  &__en {
    font-family: $font-jost;
    font-weight: 900;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: $color-dark-red;
    margin-bottom: 48px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.4s both;
    }

    @include sp {
      margin-bottom: 32px;
    }
  }

  // ---- Table ----
  &__table {
    text-align: left;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.55s both;
    }
  }

  &__row {
    display: flex;
    align-items: stretch;
    border-bottom: 1px dashed rgba($color-dark-red, 0.25);

    &--last {
      border-bottom: none;
    }

    @include sp {
      flex-direction: column;
    }
  }

  &__label {
    flex: 0 0 140px;
    background-color: #FFFFFF;
    padding: 24px 16px;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 15px;
    letter-spacing: 0.08em;
    color: $color-text;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    @include sp {
      flex: none;
      padding: 12px 16px;
      justify-content: flex-start;
      font-weight: 600;
    }
  }

  &__value {
    flex: 1;
    padding: 24px 32px;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.9;
    letter-spacing: 0.08em;
    color: $color-text;

    @include sp {
      padding: 16px 16px 20px;
      font-size: 13px;
    }
  }

  // ---- Week grid ----
  &__week-grid {
    display: grid;
    grid-template-columns: repeat(7, auto);
    gap: 4px 16px;
    margin-bottom: 8px;
    width: fit-content;

    span {
      font-family: $font-kosugi;
      font-size: 15px;
      letter-spacing: 0.08em;
      color: $color-text;
    }
  }

  // ---- Sub tables for 保育時間 ----
  &__sublabel {
    font-family: $font-kosugi;
    font-size: 13px;
    color: $color-text;
    margin-bottom: 6px;
    letter-spacing: 0.06em;

    &--mt {
      margin-top: 16px;
    }
  }

  &__subtable {
    border-collapse: collapse;
    margin-bottom: 4px;
    width: 100%;
    max-width: 460px;

    th, td {
      border: 1px solid rgba($color-dark-red, 0.2);
      padding: 8px 16px;
      font-family: $font-kosugi;
      font-size: 14px;
      letter-spacing: 0.06em;
      color: $color-text;
      text-align: left;
      line-height: 1.7;
      background-color: #FFFFFF;
    }

    th {
      background-color: #FFFFFF;
      width: 38%;
      white-space: nowrap;
    }
  }

  // ---- Staff / capacity layout ----
  &__staff-layout {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 8px;

    @include sp {
      flex-direction: column;
      gap: 12px;
    }
  }

  &__badge {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FFEDF0;
    border-radius: 6px;
    padding: 8px 14px;
    min-width: 72px;
  }

  &__badge-label {
    font-family: $font-kosugi;
    font-size: 12px;
    color: $color-dark-red;
    letter-spacing: 0.06em;
  }

  &__badge-num {
    font-family: $font-kosugi;
    font-size: 14px;
    font-weight: 600;
    color: $color-dark-red;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  // ---- Age / staff grids ----
  &__age-grid,
  &__staff-grid {
    display: grid;
    grid-template-columns: repeat(5, auto);
    gap: 2px 20px;
    width: fit-content;

    span {
      font-family: $font-kosugi;
      font-size: 15px;
      letter-spacing: 0.06em;
      color: $color-text;
      text-align: center;

      @include sp {
        font-size: 13px;
      }
    }
  }

  // ---- Note ----
  &__note {
    font-family: $font-kosugi;
    font-size: 13px;
    color: lighten($color-text, 15%);
    letter-spacing: 0.06em;
    line-height: 1.8;
  }
}
</style>
