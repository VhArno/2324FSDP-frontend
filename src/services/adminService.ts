import { authAxios } from '@/instances/myAxios'
import type {
  PatchAnswerPayload,
  PatchQuestionPayload,
  PostAnswerPayload,
  PostQuestionPayload
} from '@/types'
import type { AxiosResponse } from 'axios'

// Accounts
const getAllAccounts = async <T>(): Promise<AxiosResponse<T>> => {
  return authAxios.get<T>(`/admin/users`)
}

// Results
const getAllResults = async <T>(): Promise<AxiosResponse<T>> => {
  return authAxios.get<T>(`/admin/results`)
}

// Questions & Answers
/* Questions */
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
  return authAxios.patch<T>(`/admin/questions`, payload)
}

const deleteAnswer = async <T>(id: number): Promise<AxiosResponse<T>> => {
  return authAxios.delete<T>(`/admin/questions/${id}`)
}

export {
  getAllAccounts,
  getAllResults,
  postQuestion,
  patchQuestion,
  deleteQuestion,
  postAnswer,
  patchAnswer,
  deleteAnswer
}
