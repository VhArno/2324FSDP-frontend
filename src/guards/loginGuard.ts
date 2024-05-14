import { useAuthStore } from '@/stores/auth'
import type { RouteLocation } from 'vue-router'

export async function loginGuard(to: RouteLocation, from: RouteLocation) {
  console.log('test')
  if (await useAuthStore().isAuthenticated) {
    return { name: 'home' }
  }
}
