<template>
  <section class="recruit-faq" ref="sectionRef">
    <div class="recruit-faq__inner">
      <!-- Section Title -->
      <div class="recruit-faq__title-area" :class="{ 'is-visible': isVisible }">
        <div class="recruit-faq__icon-circle">
          <svg class="recruit-faq__icon-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="26" font-weight="bold" fill="#55000C" font-family="sans-serif">?</text>
          </svg>
        </div>
        <h2 class="recruit-faq__title">よくある質問</h2>
        <p class="recruit-faq__en">FAQ</p>
      </div>

      <!-- FAQ List -->
      <ul class="recruit-faq__list">
        <li
          v-for="(item, i) in faqs"
          :key="i"
          class="recruit-faq__item"
          :class="{ 'is-visible': isVisible }"
          :style="{ animationDelay: `${0.2 + i * 0.08}s` }"
        >
          <button
            class="recruit-faq__question"
            :aria-expanded="item.open"
            @click="toggle(i)"
          >
            <span class="recruit-faq__q-label">Q</span>
            <span class="recruit-faq__q-text">{{ item.question }}</span>
            <span class="recruit-faq__q-icon" :class="{ 'is-open': item.open }">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 9L12 15L18 9" stroke="#55000C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
          <div class="recruit-faq__answer" :class="{ 'is-open': item.open }">
            <div class="recruit-faq__answer-inner">
              <span class="recruit-faq__a-label">A</span>
              <p class="recruit-faq__a-text">{{ item.answer }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: sectionRef, isVisible } = useScrollAnimation(0.05)

const faqs = reactive([
  {
    question: '保育士資格がなくても応募できますか？',
    answer: 'はい、保育補助スタッフとして資格なしでも応募いただけます。働きながら資格取得を目指す方へのサポートも行っていますので、お気軽にご相談ください。',
    open: false,
  },
  {
    question: 'ブランクがあっても大丈夫ですか？',
    answer: 'ブランクのある方も大歓迎です。入社時には丁寧な研修を実施しており、先輩スタッフがしっかりサポートします。不安なことがあればいつでも相談できる環境を整えています。',
    open: false,
  },
  {
    question: '希望する園への配属は可能ですか？',
    answer: '採用時に希望をお伺いしており、できる限り希望に沿った配属を心がけています。ただし、園の状況によりご希望に沿えない場合もございますので、面接時にご相談ください。',
    open: false,
  },
  {
    question: 'どのような研修制度がありますか？',
    answer: '入社時の基礎研修のほか、定期的なスキルアップ研修、外部セミナーへの参加支援などを実施しています。また、先輩スタッフによるOJTで日々の保育を丁寧にサポートします。',
    open: false,
  },
  {
    question: '育児休暇や時短勤務は取得できますか？',
    answer: 'はい、産前産後休暇・育児休暇の取得実績があります。また、育児中の方向けの時短勤務制度も整えており、ライフステージに合わせた柔軟な働き方が可能です。',
    open: false,
  },
])

function toggle(index: number) {
  const item = faqs[index]
  if (item) item.open = !item.open
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

.recruit-faq {
  padding: 80px 60px 100px;

  @include sp {
    padding: 60px 24px 80px;
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
    height: 40px;

    @include sp {
      width: 32px;
      height: 32px;
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

  // ---- FAQ list ----
  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item {
    background-color: $color-white;
    border-radius: 12px;
    overflow: hidden;
    opacity: 0;
    box-shadow: 0 2px 8px rgba(85, 0, 12, 0.06);

    &.is-visible {
      animation: fadeInUp 0.6s ease both;
    }
  }

  &__question {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s;

    &:hover {
      background-color: $color-pink-light;
    }

    @include sp {
      padding: 16px 20px;
      gap: 12px;
    }
  }

  &__q-label {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: $color-pink;
    font-family: $font-jost;
    font-weight: 900;
    font-size: 16px;
    color: $color-white;
    line-height: 1;

    @include sp {
      width: 28px;
      height: 28px;
      font-size: 14px;
    }
  }

  &__q-text {
    flex: 1;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 16px;
    color: $color-text;
    letter-spacing: 0.06em;
    line-height: 1.6;

    @include sp {
      font-size: 14px;
    }
  }

  &__q-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;

    &.is-open {
      transform: rotate(180deg);
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  // ---- Answer ----
  &__answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease;

    &.is-open {
      max-height: 300px;
    }
  }

  &__answer-inner {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 0 24px 20px;
    border-top: 1px solid $color-pink-light;

    @include sp {
      padding: 0 20px 16px;
      gap: 12px;
    }
  }

  &__a-label {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: $color-yellow-light;
    font-family: $font-jost;
    font-weight: 900;
    font-size: 16px;
    color: $color-dark-red;
    line-height: 1;
    margin-top: 16px;

    @include sp {
      width: 28px;
      height: 28px;
      font-size: 14px;
      margin-top: 14px;
    }
  }

  &__a-text {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 15px;
    color: $color-text;
    letter-spacing: 0.06em;
    line-height: 1.9;
    padding-top: 16px;

    @include sp {
      font-size: 13px;
    }
  }
}
</style>
