import router from '@/router'
import type { UserAnswerDict } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestStore = defineStore(
  'test',
  () => {
    const testDone = ref<boolean>(false)
    const userAnswers = ref<UserAnswerDict>({})

    const resetTest = () => {
      testDone.value = false
      userAnswers.value = {}
      router.push({ name: 'test' })
    }

    return {
      testDone,
      userAnswers,
      resetTest
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['userAnswers', 'testDone']
    }
  }
)
