import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import LoginView from '@/components/pages/LoginView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/auth'

describe('Views / LoginView', () => {
  beforeEach<{ wrapper: VueWrapper }>((context) => {
    context.wrapper = mount(LoginView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
  })

  it<{ wrapper: VueWrapper }>('renders correctly', ({ wrapper }) => {
    expect(wrapper.findAll('input').length).toBe(2)
  })

  it<{ wrapper: VueWrapper }>('should not show errors before submit', async ({ wrapper }) => {
    const email = wrapper.find('input[name="email"]')
    await email.setValue('')
    const error = wrapper.find('[data-test=email-error]').exists()
    expect(error).toBe(false)
  })

  /*it<{ wrapper: VueWrapper }>('should show required errors', async ({ wrapper }) => {
    const email = wrapper.find('input[name="email"]')
    const form = wrapper.find('form')
    await email.setValue('')
    await form.trigger('submit')
    const error = wrapper.find('[data-test=email-error]')
    expect(error.text()).toContain('required')
  })

  it<{ wrapper: VueWrapper }>('should show invalid error', async ({ wrapper }) => {
    const email = wrapper.find('input[name="email"]')
    const form = wrapper.find('form')
    await email.setValue('test')
    await form.trigger('submit')
    const error = wrapper.find('[data-test=email-error]')
    expect(error.text()).toContain('Invalid')
  })

  it<{ wrapper: VueWrapper }>('should submit on correct payload', async ({ wrapper }) => {
    const payload = { email: 'arnovanhee@gmail.com', password: 'Azerty123' }
    const email = wrapper.find('input[name="email"]')
    const password = wrapper.find('input[name="password"]')
    const form = wrapper.find('form')

    await email.setValue(payload.email)
    await password.setValue(payload.password)
    await form.trigger('submit.prevent')

    expect(useAuthStore().login).toHaveBeenCalledWith(payload)
  })*/
})
