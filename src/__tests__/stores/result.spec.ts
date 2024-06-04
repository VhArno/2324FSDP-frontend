import { beforeEach, describe, test, vi, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useResultStore } from '@/stores/result'
import { postResult, mailResult } from '@/services/authService'

vi.mock('@/instances/myAxios.ts')
vi.mock('@/services/authService', () => ({
  postResult: vi.fn(),
  mailResult: vi.fn()
}))

const mocks = vi.hoisted(() => ({
  useResultStore: vi.fn(() => ({
    saveResult: () => () => Promise.resolve(),
    sendResult: () => () => Promise.resolve()
  }))
}))

describe('resultStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  test('saveResult should call postResult service', async () => {
    const resultStore = useResultStore()
    const payload = { name: 'test', specialisation_id: 1 }

    mocks.useResultStore.mockReturnValue({
      saveResult: () => () => Promise.resolve(),
      sendResult: () => () => Promise.resolve()
    })

    await resultStore.saveResult(payload)
    expect(postResult).toHaveBeenCalledWith(payload)
  })

  test('sendResult should call mailResult service', async () => {
    const resultStore = useResultStore()
    const payload = { email: 'test', specialisation_id: 1 }

    mocks.useResultStore.mockReturnValue({
      saveResult: () => () => Promise.resolve(),
      sendResult: () => () => Promise.resolve()
    })

    await resultStore.sendResult(payload)
    expect(mailResult).toHaveBeenCalledWith(payload)
  })
})
