import { afterEach, describe, expect, it, test, vi } from 'vitest'
import router from '@/router'

const mocks = vi.hoisted(() => ({
    useAuthStore: vi.fn(() => ({
        authenticated: false,
        tryAutoLogin: new Promise((resolve) => resolve(false))
    }))
}))

vi.mock('@/stores/auth', () => ({
    useAuthStore: mocks.useAuthStore
}))

describe('page title', () => {
    test('every route has a title value', () => {
        expect(router.getRoutes().every(route => !!route.meta?.title))
            .toBe(true)
    })

    test('after every navigation, the page title should be updated', async () => {
        await router.push('/')
        expect(document.title).toContain(router.currentRoute.value.meta.title)
    })
})

describe('authorizatoin', () => {
    afterEach(async () => {
        await router.push('/')
        vi.restoreAllMocks()
    })

    it('should not redirect authenticated users', async () => {
        mocks.useAuthStore.mockReturnValue({
            authenticated: true,
            tryAutoLogin: new Promise((resolve) => resolve(true))
        })

        await router.push({name: 'user'})

        expect(router.currentRoute.value.name).toBe('user')
    })

    it('should redirect unauthenticated users', async () => {
        await router.push({name: 'user'})
        expect(router.currentRoute.value.name).not.toBe('user')
    })
})