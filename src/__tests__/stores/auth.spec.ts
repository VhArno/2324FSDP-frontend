import { beforeEach, describe, test, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/instances/myAxios.ts')

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  test('tryAutoLogin should return true when userdata is received successfully')
  test('tryAutoLogin should return false when userdata is received unsuccessfully')

  test('login should retrieve the user on success')

  test('logout should call the logout endpoint')

  test('logout should reset the user state')

  test('isAdmin should return true if the user is admin')
})
