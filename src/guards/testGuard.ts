import { useResultStore } from '@/stores/result'
import type { RouteLocation } from 'vue-router'

export async function testGuard(to: RouteLocation, from: RouteLocation) {
  if ((await !useResultStore().testDone) && to.name == 'result') {
    return { name: 'test' }
  }
}
