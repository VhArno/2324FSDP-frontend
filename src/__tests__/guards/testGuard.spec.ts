import { describe, it, expect, vi } from 'vitest'
import { testGuard } from '@/guards/testGuard'
import type { RouteLocation } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'

const mocks = vi.hoisted(() => ({
  useResultStore: vi.fn(() => ({
    testDone: false
  }))
}))

vi.mock('@/stores/auth', () => ({
  useResultStore: mocks.useResultStore
}))

describe('loginGuard', () => {
  it('should redirect when test is not filled in', async () => {
    const wrapper = mount(testGuard, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              counter: { n: 20 } // start the counter at 20 instead of 0
            }
          })
        ]
      }
    })

    mocks.useResultStore.mockReturnValue({
      testDone: false
    })

    const to = { name: 'result' } as RouteLocation
    const from = { name: 'home' } as RouteLocation
    const result = await testGuard(to, from)

    expect(result).toEqual({ name: 'test' })
  })

  it('should allow access for when test is filled in', async () => {
    const wrapper = mount(testGuard, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              counter: { n: 20 } // start the counter at 20 instead of 0
            }
          })
        ]
      }
    })

    mocks.useResultStore.mockReturnValue({
      testDone: true
    })

    const to = { name: 'login' } as RouteLocation
    const from = { name: 'home' } as RouteLocation
    const result = await testGuard(to, from)

    expect(result).toBeUndefined()
  })
})
