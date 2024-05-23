import type {
  Answer,
  ApiResponseResults,
  EmailPayload,
  Question,
  ResultPayload,
  SavedResults,
  UserAnswerDict
} from '@/types'
import { defineStore } from 'pinia'
import { getResults, postResult, mailResult, postUserAnswers } from '@/services/authService'
import { ref } from 'vue'

export const useResultStore = defineStore('result', () => {
  const userAnswers = ref<UserAnswerDict>({})
  const savedResults = ref<SavedResults[]>()
  const testDone = ref<boolean>(false)

  const saveResult = async (payload: ResultPayload) => {
    await postResult(payload).catch(() => {})
  }

  const sendResult = async (payload: EmailPayload) => {
    await mailResult(payload).catch(() => {})
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
    const questions = <Question[]>[]
    const answers = <Answer[]>[]

    for (const key in userAnswers.value) {
      questions.push({
        id: userAnswers.value[key].questionId,
        question: userAnswers.value[key].question,
        answers: []
      })
      answers.push(userAnswers.value[key].answer)
    }

    await postUserAnswers({
      questions: questions,
      answers: answers
    }).catch(() => {})
  }

  return {
    testDone,
    userAnswers,
    savedResults,
    loadResults,
    saveResult,
    sendResult,
    saveUserAnswers
  }
})
