import router from '@/router'
import type { Specialisation, UserAnswerDict } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestStore = defineStore(
  'test',
  () => {
    const testDone = ref<boolean>(false)
    const userAnswers = ref<UserAnswerDict>({})
    const savedResult = ref<Array<[Specialisation, number]>>([])
    const testSaved = ref<boolean>(false)

    const resetTest = () => {
      testDone.value = false
      testSaved.value = false
      savedResult.value = []
      userAnswers.value = {}
      router.push({ name: 'test' })
    }

    const setResult = (res: Array<[Specialisation, number]>) => {
      savedResult.value = res
    }

    return {
      testDone,
      userAnswers,
      savedResult,
      testSaved,
      resetTest,
      setResult
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['userAnswers', 'testDone', 'savedResult', 'testSaved']
    }
  }
)
