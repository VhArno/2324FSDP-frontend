import { authAxios } from '@/instances/myAxios'
import type { RegisterPayload } from '@/types'
import type { AxiosResponse } from 'axios'

// Users
const getCsrfCookie = async <T>(): Promise<AxiosResponse<T>> => {
  return authAxios.get<T>('/sanctum/csrf-cookie', { baseURL: import.meta.env.VITE_BASE_URL })
}

const postLogin = async <T>(payload: {
  email: string
  password: string
}): Promise<AxiosResponse<T>> => {
  return authAxios.post<T>(`/login`, {
    email: payload.email,
    password: payload.password
  })
}

const postLogout = async <T>(): Promise<AxiosResponse<T>> => {
  return authAxios.post<T>(`/logout`)
}

const postRegister = async <T>(payload: RegisterPayload): Promise<AxiosResponse<T>> => {
  return authAxios.post<T>(`/register`, payload)
}

const getUser = async <T>(): Promise<AxiosResponse<T>> => {
  return authAxios.get<T>(`/user`)
}

export { getCsrfCookie, postLogin, postLogout, postRegister, getUser }
