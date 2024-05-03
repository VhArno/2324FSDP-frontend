export interface RegisterPayload {
  username: string
  email: string
  password: string
}

export interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  created_at: Date
}
