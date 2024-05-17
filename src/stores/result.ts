import type { ApiResponse, ApiResponseResults, EmailPayload, ResultPayload, SavedResults } from '@/types'
import { defineStore } from 'pinia'
import { getResults, postResult, mailResult } from '@/services/authService'
import { ref } from 'vue'

export const useResultStore = defineStore('result', () => {
  const results = ref<SavedResults[]>()

  const saveResult = async (payload: ResultPayload) => {
    await postResult(payload).catch(() => {})
  }

  const sendResult = async (payload: EmailPayload) => {
    await mailResult(payload).catch(() => {})
  }

  const loadResults = async () => {
    results.value = []

    getResults<ApiResponseResults>().then((response) => {
      const res: SavedResults[] = response.data.data.map((x) => {
        return {
          id: x.id,
          name: x.name,
          description: x.description,
          created_at: x.created_at,
          specialisation: x.specialisation
        }
      })
      results.value?.push(...res)
    }).catch((err) => console.log(err))
  }

  return { results, loadResults, saveResult, sendResult }
})
