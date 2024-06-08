import { useTestStore } from '@/stores/test'
import type { RouteLocation } from 'vue-router'

export async function resultGuard(to: RouteLocation, from: RouteLocation) {
  if ((await useTestStore().testDone) && to.name == 'test') {
    return { name: 'result' }
  }
}
