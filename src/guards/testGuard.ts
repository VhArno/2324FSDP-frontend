import { useTestStore } from '@/stores/test'
import type { RouteLocation } from 'vue-router'

export async function testGuard(to: RouteLocation, from: RouteLocation) {
  if ((await !useTestStore().testDone) && to.name == 'result') {
    return { name: 'test' }
  }
}
