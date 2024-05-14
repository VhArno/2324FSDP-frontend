import type { ApiResponse, RegisterPayload, User } from '@/types'
import { ref } from 'vue'
import router from '@/router'
import { getCsrfCookie, getUser, postLogin, postLogout, postRegister } from '@/services/authService'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const isAuthenticated = ref<boolean>(false)
    const isAdmin = ref<boolean>(false)

    const readUserDetails = () => {
      try {
        if (user.value !== null) {
          initUser().catch(() => {})
        } else {
          user.value = null
          isAuthenticated.value = false
          isAdmin.value = false
        }
      } catch (err) {
        console.log(err)
      }
    }

    const getUserDetails = async () => {
      if (user.value) return user.value

      try {
        const { data: user } = await getUser<ApiResponse>()
        return user.data
      } catch (e) {
        console.error(e)
        logout()
        return null
      }
    }

    const initUser = async () => {
      user.value = await getUserDetails()
      isAuthenticated.value = true
      if (user.value?.role == 'admin') isAdmin.value = true
    }

    const login = async (payload: { email: string; password: string }) => {
      try {
        user.value = null
        await postLogin(payload)
        await initUser()
        router.push('/profile')
      } catch (err: any) {
        return err.response.data.message
      }
    }

    const logout = async () => {
      await postLogout().catch(() => {})
      await getCsrfCookie().catch((err) => {
        console.log(err)
      })
      user.value = null
      isAuthenticated.value = false
      isAdmin.value = false
      router.push({ name: 'login' })
    }

    const register = async (payload: RegisterPayload) => {
      try {
        await postRegister(payload)
        await login({ email: payload.email, password: payload.password })
        router.push('/profile')
      } catch (err: any) {
        return err.response.data.message
      }
    }

    return { user, isAuthenticated, isAdmin, readUserDetails, login, logout, register }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['user']
    }
  }
)
