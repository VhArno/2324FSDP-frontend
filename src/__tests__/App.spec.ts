import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })
})
