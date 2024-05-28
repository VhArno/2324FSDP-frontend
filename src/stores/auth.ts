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
    const isLoading = ref<boolean>(false)
    const failed = ref<boolean>(false)

    const readUserDetails = async () => {
      try {
        if (user.value !== null) {
          await initUser().catch(() => {
            user.value = null
            isAuthenticated.value = false
            isAdmin.value = false
          })
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
      user.value = await getUserDetails().catch()
      isAuthenticated.value = true
      if (user.value?.role == 'admin' || user.value?.role == 'superadmin') isAdmin.value = true
    }

    const login = async (payload: { email: string; password: string }) => {
      isLoading.value = true
      try {
        user.value = null
        await getCsrfCookie()
        await postLogin(payload)
        await initUser()
        router.push('/profile')
      } catch (err: any) {
        return err.response.data.message
      } finally {
        isLoading.value = false
      }
    }

    const logout = async () => {
      await postLogout().catch(() => {})

      user.value = null
      isAuthenticated.value = false
      isAdmin.value = false
      router.push({ name: 'login' })
    }

    const register = async (payload: RegisterPayload) => {
      isLoading.value = true
      try {
        await getCsrfCookie()
        await postRegister(payload)
        await login({ email: payload.email, password: payload.password })
        failed.value = false
      } catch (err: any) {
        failed.value = true
        return err.response?.data?.message
      } finally {
        isLoading.value = false
      }
    }

    return {
      isLoading,
      failed,
      user,
      isAuthenticated,
      isAdmin,
      readUserDetails,
      login,
      logout,
      register
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['user']
    }
  }
)
