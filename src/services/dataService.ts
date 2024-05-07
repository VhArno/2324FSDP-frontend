import { authAxios } from "@/instances/myAxios"
import type { AxiosResponse } from "axios"

const getQuestions = async <T>(): Promise<AxiosResponse<T>> => {
    return authAxios.get<T>(`/questions`)
}

export { getQuestions }