import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from '@/App.vue'
import { createTestingPinia } from '@pinia/testing'

describe('App.vue', () => {
  it('renders without crashing', () => {
    const mockRoute = {
      params: {
        id: 1
      }
    }

    const wrapper = mount(App, { global: { plugins: [createTestingPinia()], mocks: {
      $route: mockRoute,
    } }})
    expect(wrapper.exists()).toBe(true)
  })
})
