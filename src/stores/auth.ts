import type { RegisterPayload, User } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import router from '@/router'
import { getUser, postLogin, postLogout, postRegister } from '@/services/authService'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const isAuthenticated = ref<boolean>(false)
    const isAdmin = ref<boolean>(false)

    const getUserDetails = async () => {
      if (user.value) return user.value

      try {
        const { data: user } = await getUser<User>()
        return user
      } catch (e) {
        console.error(e)

        return {
          id: 1,
          firstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@gmail.com',
          created_at: new Date()
        }
      }
    }

    const initUser = async () => {
      user.value = await getUserDetails()
    }

    const login = async (payload: { email: string; password: string }) => {
      await postLogin(payload)
      await initUser()
      isAuthenticated.value = true
      router.push('/profile')
    }

    const logout = async () => {
      await postLogout()
      user.value = null
      isAuthenticated.value = false
      router.push('/login')
    }

    const register = async (payload: RegisterPayload) => {
      await postRegister(payload)
      await login({ email: payload.email, password: payload.password })
      isAuthenticated.value = true
      router.push('/profile')
    }

    return { user, isAuthenticated, isAdmin, login, logout, register }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['user']
    }
  }
)
