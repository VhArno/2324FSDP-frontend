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
}
