import { useAuthStore } from '@/stores/auth'
import type { RouteLocation } from 'vue-router'

export async function authGuard(to: RouteLocation, from: RouteLocation) {
  console.log('Checking status auth')
  console.log(useAuthStore().isAuthenticated)
  if ((await !useAuthStore().isAuthenticated) && to.name !== 'login') {
    return { name: 'login' }
  }
}
