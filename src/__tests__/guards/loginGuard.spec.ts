import { describe, it, expect, vi } from 'vitest'
import { loginGuard } from '@/guards/loginGuard'
import type { RouteLocation } from 'vue-router'

const mocks = vi.hoisted(() => ({
  useAuthStore: vi.fn(() => ({
    isAuthenticated: false,
    isAdmin: false,
    tryAutoLogin: () => Promise.resolve()
  }))
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore: mocks.useAuthStore
}))

describe('loginGuard', () => {
  it('should redirect authenticated users to profile', async () => {
    mocks.useAuthStore.mockReturnValue({
      isAuthenticated: true,
      isAdmin: true,
      tryAutoLogin: () => Promise.resolve()
    })

    const to = { name: 'login' } as RouteLocation
    const from = { name: 'home' } as RouteLocation
    const result = await loginGuard(to, from)

    expect(result).toEqual({ name: 'profile' })
  })

  it('should allow access for unauthenticated users', async () => {
    mocks.useAuthStore.mockReturnValue({
      isAuthenticated: false,
      isAdmin: false,
      tryAutoLogin: () => Promise.resolve()
    })

    const to = { name: 'login' } as RouteLocation
    const from = { name: 'home' } as RouteLocation
    const result = await loginGuard(to, from)

    expect(result).toBeUndefined()
  })
})
