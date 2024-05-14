import type { Result, ResultPayload } from '@/types'
import { defineStore } from 'pinia'
import { postResult } from '@/services/authService'
import { ref } from 'vue'

export const useResultStore = defineStore('result', () => {
  const results = ref<Result[]>()

  const saveResult = async (payload: ResultPayload) => {
    await postResult(payload).catch(() => {})
  }

  return { results, saveResult }
})
