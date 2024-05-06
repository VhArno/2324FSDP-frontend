import { useAuthStore } from '@/stores/auth'
import type { RouteLocation } from 'vue-router'

export function adminGuard(to: RouteLocation, from: RouteLocation) {
  if (!useAuthStore().isAuthenticated && to.name !== 'login' && !useAuthStore().isAdmin) {
    return { name: 'login' }
  }
}
