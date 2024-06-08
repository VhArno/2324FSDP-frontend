import type {
  ApiResponseResults,
  EmailPayload,
  ResultPostPayload,
  ResultPatchPayload,
  SavedResults,
  UserAnswerDict,
  ResultPostResponse
} from '@/types'
import { defineStore, storeToRefs } from 'pinia'
import {
  getResults,
  postResult,
  mailResult,
  postUserAnswers,
  patchResult
} from '@/services/authService'
import { ref } from 'vue'
import { useTestStore } from './test'

export const useResultStore = defineStore('result', () => {
  const testStore = useTestStore()
  const { userAnswers } = storeToRefs(testStore)
  const savedResults = ref<SavedResults[]>()
  const testDone = ref<boolean>(false)

  const saveResult = async (payload: ResultPostPayload) => {
    try {
      const res = await postResult<ResultPostResponse>(payload)
      return res.data.data.id
    } catch (err) {
      console.log(err)
    }
  }

  const editResult = async (payload: ResultPatchPayload) => {
    try {
      await patchResult(payload)
    } catch (err) {
      console.log(err)
    }
  }

  const sendResult = async (payload: EmailPayload) => {
    try {
      await mailResult(payload)
    } catch (err) {
      console.log(err)
    }
  }

  const loadResults = async () => {
    savedResults.value = []

    getResults<ApiResponseResults>()
      .then((response) => {
        const res: SavedResults[] = response.data.data.map((x) => {
          return {
            id: x.id,
            name: x.name,
            description: x.description,
            created_at: x.created_at,
            specialisation: x.specialisation
          }
        })
        savedResults.value?.push(...res)
      })
      .catch((err) => console.log(err))
  }

  const saveUserAnswers = async () => {
    for (const key in userAnswers.value) {
      await postUserAnswers({
        question_id: userAnswers.value[key].questionId,
        answer_id: userAnswers.value[key].answer.id
      }).catch(() => {})
    }
  }

  return {
    testDone,
    userAnswers,
    savedResults,
    loadResults,
    saveResult,
    editResult,
    sendResult,
    saveUserAnswers
  }
})
