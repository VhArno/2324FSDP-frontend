import { authAxios } from "@/instances/myAxios"
import type { AxiosResponse } from "axios"

const getQuestions = async <T>(): Promise<AxiosResponse<T>> => {
    return authAxios.get<T>(`/questions`)
}

const getSpecialisations = async <T>(): Promise<AxiosResponse<T>> => {
    return authAxios.get<T>(`/specialisations`)
}

export { getQuestions, getSpecialisations }