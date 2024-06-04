import { afterEach, describe, expect, it, test, vi } from 'vitest'
import router from '@/router'
import { useTitle } from '@vueuse/core'

const mocks = vi.hoisted(() => ({
  useAuthStore: vi.fn(() => ({
    isAuthenticated: false,
    tryAutoLogin: () => Promise.resolve()
  }))
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore: mocks.useAuthStore
}))

describe('page title', () => {
  test('after every navigation, the page title should be updated', async () => {
    await router.push('/')
    const title = useTitle()
    expect(document.title).toContain(title.value)
  })
})

describe('authorisation', () => {
  afterEach(async () => {
    await router.push('/')
    vi.restoreAllMocks()
  })

  it('should not redirect authenticated users', async () => {
    mocks.useAuthStore.mockReturnValue({
      isAuthenticated: true,
      tryAutoLogin: () => Promise.resolve()
    })

    await router.push({ name: 'profile' })

    expect(router.currentRoute.value.name).toBe('profile')
  })

  it('should redirect unauthenticated users', async () => {
    await router.push({ name: 'profile' })
    expect(router.currentRoute.value.name).not.toBe('profile')
  })
})
