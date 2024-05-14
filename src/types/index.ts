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
  results: {
    id: number
    name: string
    description: string
    specialisation_id: number
    created_at: Date
  }[]
}

export interface QuestionData {
  data: Question[]
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
