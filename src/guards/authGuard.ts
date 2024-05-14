import { useAuthStore } from '@/stores/auth'
import type { RouteLocation } from 'vue-router'

export async function authGuard(to: RouteLocation, from: RouteLocation) {
  if ((await !useAuthStore().isAuthenticated) && to.name !== 'login') {
    return { name: 'login' }
  }
}
