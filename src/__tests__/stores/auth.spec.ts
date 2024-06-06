import { beforeEach, describe, test, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import * as authService from '@/services/authService'
import router from '@/router'

vi.mock('@/services/authService')
vi.mock('@/router')

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  test('tryAutoLogin should return false when userdata is received unsuccessfully', async () => {
    const authStore = useAuthStore()
    vi.spyOn(authService, 'getUser').mockRejectedValue(new Error('User not found'))

    await authStore.tryAutoLogin()
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.user).toBe(null)
  })
})
