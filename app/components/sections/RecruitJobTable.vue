<template>
  <section class="recruit-job" ref="sectionRef">
    <div class="recruit-job__inner">
      <!-- Section Title -->
      <div class="recruit-job__title-area" :class="{ 'is-visible': isVisible }">
        <div class="recruit-job__icon-circle">
          <svg class="recruit-job__icon-svg" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M24 4C15.163 4 8 11.163 8 20C8 26.274 11.468 31.74 16.6 34.6V40C16.6 41.105 17.495 42 18.6 42H29.4C30.505 42 31.4 41.105 31.4 40V34.6C36.532 31.74 40 26.274 40 20C40 11.163 32.837 4 24 4Z" fill="#55000C"/>
            <rect x="18" y="44" width="12" height="3" rx="1.5" fill="#55000C"/>
            <rect x="19" y="49" width="10" height="3" rx="1.5" fill="#55000C"/>
            <line x1="24" y1="1" x2="24" y2="4" stroke="#55000C" stroke-width="2" stroke-linecap="round"/>
            <line x1="44" y1="10" x2="41.6" y2="11.4" stroke="#55000C" stroke-width="2" stroke-linecap="round"/>
            <line x1="4" y1="10" x2="6.4" y2="11.4" stroke="#55000C" stroke-width="2" stroke-linecap="round"/>
            <line x1="47" y1="22" x2="44" y2="22" stroke="#55000C" stroke-width="2" stroke-linecap="round"/>
            <line x1="4" y1="22" x2="1" y2="22" stroke="#55000C" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h2 class="recruit-job__title">募集要項</h2>
        <p class="recruit-job__en">Requirements</p>
      </div>

      <!-- Table Card -->
      <div class="recruit-job__card" :class="{ 'is-visible': isVisible }">
        <dl
          v-for="(item, i) in items"
          :key="item.label"
          class="recruit-job__row"
          :class="{ 'is-visible': isVisible }"
          :style="{ animationDelay: `${0.25 + i * 0.06}s` }"
        >
          <dt class="recruit-job__label">{{ item.label }}</dt>
          <dd class="recruit-job__content" v-html="item.content" />
        </dl>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: sectionRef, isVisible } = useScrollAnimation(0.05)

const items = [
  {
    label: '勤務地',
    content: '桜のこもれびキッズランドの各園のいずれか<br><small>※ご希望の勤務地やお住まいの住所から近い園を優先的にご案内します。</small>',
  },
  {
    label: '勤務時間',
    content: '7：00〜18：30のシフト制（延長時間あり）<br>9h拘束、実働8時間<br>出勤する時間と曜日で基本給が変わります',
  },
  {
    label: '応募資格',
    content: '資格をお持ちの方。<br><small>※資格取得見込みの方はご相談ください。</small>',
  },
  {
    label: '処遇',
    content: '月給　20万〜25万（各種手当含む）<br>時給制　1120円〜1450円　（勤務時間・勤務曜日は相談可）<br>勤務シフトは常勤・非常勤併せて100パターン以上あります。あなたの希望に合う勤務時間を選んで働けます。',
  },
  {
    label: '賞与',
    content: '年2回※月給制の方に限ります。<br>期末賞与：対象年度の業績に応じて支給',
  },
  {
    label: '休日',
    content: '土日祝日<br>または<br>月間10日を選べます。',
  },
  {
    label: '保険',
    content: '厚生年金・健康保険・雇用保険・労災保険　完備',
  },
  {
    label: '手当',
    content: '延長保育手当・皆勤手当・担当手当など',
  },
  {
    label: '昇給',
    content: '年一回（業績評価による）',
  },
  {
    label: '休暇',
    content: '年末年始・産前産後休暇・育児休暇・看護休暇制度あり',
  },
  {
    label: 'その他',
    content: '交通費全額支給。予防接種補助など福利厚生充実。',
  },
]
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

.recruit-job {
  padding: 80px 20px 100px;

  @include sp {
    padding: 60px 20px 80px;
  }

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  // ---- Section title ----
  &__title-area {
    text-align: center;
    margin-bottom: 48px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.1s both;
    }

    @include sp {
      margin-bottom: 36px;
    }
  }

  &__icon-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 88px;
    height: 88px;
    background-color: $color-yellow-light;
    border-radius: 50%;
    margin-bottom: 16px;

    @include sp {
      width: 72px;
      height: 72px;
    }
  }

  &__icon-svg {
    width: 40px;
    height: 46px;

    @include sp {
      width: 32px;
      height: 37px;
    }
  }

  &__title {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 24px;
    color: $color-dark-red;
    letter-spacing: 0.1em;
    line-height: 1.5;
    margin-bottom: 6px;

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
    line-height: 1;
  }

  // ---- Card ----
  &__card {
    background-color: $color-white;
    border-radius: 24px;
    padding: 8px 40px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.2s both;
    }

    @include sp {
      padding: 8px 20px;
      border-radius: 16px;
    }
  }

  // ---- Row ----
  &__row {
    display: flex;
    align-items: flex-start;
    gap: 28px;
    padding: 24px 0;
    border-bottom: 1px dashed rgba($color-pink, 0.6);
    opacity: 0;

    &:last-child {
      border-bottom: none;
    }

    &.is-visible {
      animation: fadeInUp 0.5s ease both;
    }

    @include sp {
      flex-direction: column;
      gap: 10px;
      padding: 20px 0;
    }
  }

  &__label {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    padding: 6px 16px;
    background-color: $color-pink;
    border-radius: 999px;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 14px;
    color: $color-white;
    letter-spacing: 0.2em;
    line-height: 1.4;
    text-align: center;
    margin-top: 2px;

    @include sp {
      min-width: 100px;
      font-size: 13px;
    }
  }

  &__content {
    flex: 1;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 15px;
    color: $color-text;
    letter-spacing: 0.06em;
    line-height: 1.9;

    :deep(small) {
      font-size: 13px;
      color: lighten($color-text, 20%);
    }

    @include sp {
      font-size: 14px;
    }
  }
}
</style>
