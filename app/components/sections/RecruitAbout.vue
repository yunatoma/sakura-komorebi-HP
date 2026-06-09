<template>
  <section class="recruit-about" ref="sectionRef">
    <div class="recruit-about__inner">
      <!-- Section Title -->
      <div class="recruit-about__title-area" :class="{ 'is-visible': isVisible }">
        <div class="recruit-about__icon-circle">
          <img src="/images/sakura.svg" alt="" class="recruit-about__icon-img" />
        </div>
        <h2 class="recruit-about__title">たいせつにしていること</h2>
        <p class="recruit-about__en">Motto</p>
      </div>

      <!-- Items -->
      <div class="recruit-about__items">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="recruit-about__item"
          :class="['recruit-about__item--' + (i % 2 === 0 ? 'img-left' : 'img-right'), { 'is-visible': isVisible }]"
          :style="{ animationDelay: `${0.2 + i * 0.15}s` }"
        >
          <div class="recruit-about__item-img-wrap">
            <img :src="item.img" :alt="item.title" class="recruit-about__item-img" loading="lazy" />
          </div>
          <div class="recruit-about__item-body">
            <h3 class="recruit-about__item-heading">
              <img src="/images/sakura.svg" alt="" class="recruit-about__item-icon" />
              {{ item.title }}
            </h3>
            <p
              v-for="(text, j) in item.texts"
              :key="j"
              class="recruit-about__item-text"
            >{{ text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { elementRef: sectionRef, isVisible } = useScrollAnimation(0.05)

const items = [
  {
    title: '子ども主体の保育',
    img: '/images/Rectangle 48 (1).png',
    texts: [
      '変化に富んだ現代において、子どもたち一人ひとりの"個性"と"未来を切り拓く力"を育むため、子ども主体の豊かな保育を実践しています。',
      '子どもは一人ひとりが可能性にあふれた有能な学び手。\n保育者はさまざまなアイデアを出し合い、子どもたちのやりたいこと、興味があることを最大限に引き出します。',
      '単に知識を教えるのではなく、自ら取り組む楽しさから学びへの意欲を呼び起こす、非認知能力に主眼を置いた取り組みを進めています。',
    ],
  },
  {
    title: '自由な風土',
    img: '/images/Rectangle 48 (2).png',
    texts: [
      '保育者が思い思いの先進的な保育を実践できる、自由度の高さが桜のこもれびの特長。古い慣習にとらわれることなく誰もが意見を発信できる、風通しの良い園づくりを行っています。',
      '園を創るのは保育者一人ひとりの個性。\n楽しく仲間と助け合いながらアイデアを実現できる風土を大事にしています。',
      '一方で、本部部門には専門家との共創や優れた保育の実践例を体系化する仕組みがあり、本部と連携することでさらに豊かな保育を実践することができます。',
    ],
  },
  {
    title: 'ワークライフバランス',
    img: '/images/Rectangle 48.png',
    texts: [
      '大事にしているのは「安心して働き続けていける会社」であること。\n桜のこもれびでは、働き方の多様化や学びの支援など、\nワークライフバランスを大切にした環境づくりに努めています。',
      '働く人を大事にすることが、質の高い保育につながると考えています。',
    ],
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

.recruit-about {
  padding: 80px 20px 100px;

  @include sp {
    padding: 60px 20px 80px;
  }

  &__inner {
    max-width: 1320px;
    margin: 0 auto;
  }

  // ---- Section title ----
  &__title-area {
    text-align: center;
    margin-bottom: 64px;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease 0.1s both;
    }

    @include sp {
      margin-bottom: 48px;
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
    margin-bottom: 20px;

    @include sp {
      width: 72px;
      height: 72px;
      margin-bottom: 16px;
    }
  }

  &__icon-img {
    width: 56px;
    height: 56px;

    @include sp {
      width: 44px;
      height: 44px;
    }
  }

  &__title {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 28px;
    color: $color-dark-red;
    letter-spacing: 0.12em;
    line-height: 1.4;
    margin-bottom: 8px;

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
    line-height: 1;
  }

  // ---- Items ----
  &__items {
    display: flex;
    flex-direction: column;
    gap: 80px;

    @include sp {
      gap: 60px;
    }
  }

  &__item {
    display: flex;
    gap: 56px;
    align-items: center;
    opacity: 0;

    &.is-visible {
      animation: fadeInUp 0.7s ease both;
    }

    &--img-left {
      flex-direction: row;
    }

    &--img-right {
      flex-direction: row-reverse;
    }

    @include sp {
      flex-direction: column !important;
      gap: 24px;
    }
  }

  &__item-img-wrap {
    flex-shrink: 0;
    width: 480px;
    height: 320px;
    border-radius: 40px;
    overflow: hidden;

    @include sp {
      width: 100%;
      height: auto;
      aspect-ratio: 480 / 320;
      border-radius: 20px;
    }
  }

  &__item-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;

    .recruit-about__item-img-wrap:hover & {
      transform: scale(1.04);
    }
  }

  &__item-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__item-heading {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 20px;
    color: $color-dark-red;
    letter-spacing: 0.1em;
    line-height: 1.5;
    padding-bottom: 12px;
    border-bottom: 2px solid $color-pink;

    @include sp {
      font-size: 17px;
    }
  }

  &__item-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;

    @include sp {
      width: 20px;
      height: 20px;
    }
  }

  &__item-text {
    font-family: $font-kosugi;
    font-weight: 400;
    font-size: 15px;
    color: $color-text;
    line-height: 2;
    letter-spacing: 0.06em;
    white-space: pre-line;

    @include sp {
      font-size: 14px;
    }
  }
}
</style>
