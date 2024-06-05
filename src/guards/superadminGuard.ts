import { useAuthStore } from '@/stores/auth'
import type { RouteLocation } from 'vue-router'

export function superadminGuard(to: RouteLocation, from: RouteLocation) {
  if (useAuthStore().isAuthenticated && useAuthStore().isSuperAdmin) {
    return
  } else {
    return { name: 'adminQuestions' }
  }
}
