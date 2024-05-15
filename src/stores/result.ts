import type { EmailPayload, Result, ResultPayload } from '@/types'
import { defineStore } from 'pinia'
import { postResult, mailResult } from '@/services/authService'
import { ref } from 'vue'

export const useResultStore = defineStore('result', () => {
  const results = ref<Result[]>()

  const saveResult = async (payload: ResultPayload) => {
    await postResult(payload).catch(() => {})
  }

  const sendResult = async (payload: EmailPayload) => {
    await mailResult(payload).catch(() => {})
  }

  return { results, saveResult, sendResult }
})
