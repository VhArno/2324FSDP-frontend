// Interfaces
export interface ApiResponse {
  data: User
}

export interface RegisterPayload {
  firstname: string
  lastname: string
  email: string
  password: string
  passwordRepeat?: string
}

export interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  created_at: Date
  role: string
  results: SavedResults[]
}

export interface QuestionData {
  data: Question[]
}

export interface UsersData {
  data: User[]
}

export interface ResultsData {
  data: SavedResults[]
}

export interface Question {
  id: number
  question: string
  answers: Answer[]
}

export interface Answer {
  id: number
  answer: string
  weight: number
  specialisation: Specialisation
}

export interface Specialisation {
  id: number
  name: string
  description: string
}

export interface Result {
  questionId: number
  question: string
  answer: Answer
}

export interface ResultPayload {
  name: string
  description?: string
  specialisation_id: number
}

export interface EmailPayload {
  email: string
  specialisation_id: number
}

export interface UserAnswerPayload {
  question_id: number
  answer_id: number
}

export interface ApiResponseResults {
  data: SavedResults[]
}

export interface SavedResults {
  id: number
  name: string
  description: string
  created_at: Date
  specialisation: Specialisation
}

export interface AllResults {
  id: number
  name: string
  description: string
  created_at: Date
  specialisation: Specialisation
  user: User
}

/* Admin interfaces */
export interface PostQuestionPayload {
  question: Question
}

export interface PatchQuestionPayload {
  question_id: number
  question: Question
}

export interface PostAnswerPayload {
  answer: Answer
  weight: number
  question_id: number
  specialisation_id: number
}

export interface PatchAnswerPayload {
  answer_id: number
  answer: Answer
  weight: number
}

// types
export type UserAnswerDict = {
  [key: number]: Result
}
