import { useAuthStore } from '@/stores/auth'
import type { RouteLocation } from 'vue-router'

export function superadminGuard(to: RouteLocation, from: RouteLocation) {
  if (!useAuthStore().isAuthenticated && to.name !== 'login' && !useAuthStore().isSuperAdmin) {
    return { name: 'adminQuestions' }
  }
}
