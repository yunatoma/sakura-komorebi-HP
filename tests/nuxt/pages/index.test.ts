import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '../../../app/pages/index.vue'

describe('index.vue', () => {
  it('ヒーローセクションが表示される', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.find('.hero').exists()).toBe(true)
  })

  it('タイトルが表示される', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.find('.hero__title').text()).toContain('Nuxtサイト制作')
  })

  it('ラベルが表示される', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.find('.hero__label').text()).toBe('Nuxt Website')
  })

  it('説明文が表示される', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.find('.hero__text').exists()).toBe(true)
  })
})
