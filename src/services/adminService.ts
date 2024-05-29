import { authAxios } from '@/instances/myAxios'
import type {
  GetAccountsPayload,
  PatchAnswerPayload,
  PatchQuestionPayload,
  PostAnswerPayload,
  PostQuestionPayload
} from '@/types'
import type { AxiosResponse } from 'axios'

// Accounts
const getAllAccounts = async <T>(payload?: GetAccountsPayload): Promise<AxiosResponse<T>> => {
  let requestString = `/admin/users?`

  if (payload) {
    for (const [key, value] of Object.entries(payload)) {
      if (key && value != 0) {
        requestString += `${key}=${value}&`
      }
    }
  }

  return authAxios.get<T>(requestString)
}

const deleteAccount = async <T>(id: number): Promise<AxiosResponse<T>> => {
  return authAxios.delete<T>(`/admin/users/${id}`)
}

// Results
const getAllResults = async <T>(): Promise<AxiosResponse<T>> => {
  return authAxios.get<T>(`/admin/results`)
}

const getUserAnswers = async <T>(): Promise<AxiosResponse<T>> => {
  return authAxios.get<T>(`/admin/users/answers`)
}

// Questions & Answers
/* Questions */
const getQuestion = async <T>(id: number): Promise<AxiosResponse<T>> => {
  return authAxios.get<T>(`/questions/${id}`)
}

const postQuestion = async <T>(payload: PostQuestionPayload): Promise<AxiosResponse<T>> => {
  return authAxios.post<T>(`/admin/questions`, payload)
}

const patchQuestion = async <T>(payload: PatchQuestionPayload): Promise<AxiosResponse<T>> => {
  return authAxios.patch<T>(`/admin/questions`, payload)
}

const deleteQuestion = async <T>(id: number): Promise<AxiosResponse<T>> => {
  return authAxios.delete<T>(`/admin/questions/${id}`)
}

/* Answers */
const postAnswer = async <T>(payload: PostAnswerPayload): Promise<AxiosResponse<T>> => {
  return authAxios.post<T>(`/admin/answers`, payload)
}

const patchAnswer = async <T>(payload: PatchAnswerPayload): Promise<AxiosResponse<T>> => {
  return authAxios.patch<T>(`/admin/answers`, payload)
}

const deleteAnswer = async <T>(id: number): Promise<AxiosResponse<T>> => {
  return authAxios.delete<T>(`/admin/answers/${id}`)
}

export {
  getAllAccounts,
  deleteAccount,
  getAllResults,
  getUserAnswers,
  getQuestion,
  postQuestion,
  patchQuestion,
  deleteQuestion,
  postAnswer,
  patchAnswer,
  deleteAnswer
}
