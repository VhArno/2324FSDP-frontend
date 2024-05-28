import { getSpecialisations } from '@/services/dataService'
import type { ApiResponseResults, Specialisation } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSpecialisationStore = defineStore('specialisation', () => {
  const specialisations = ref<Specialisation[]>([])

  const loadSpecialisations = async () => {
    specialisations.value = []

    getSpecialisations<ApiResponseResults>()
      .then((response) => {
        const res: Specialisation[] = response.data.data.map((x) => {
          return {
            id: x.id,
            name: x.name,
            description: x.description
          }
        })
        specialisations.value?.push(...res)
      })
      .catch((err) => console.log(err))
  }

  return {
    specialisations,
    loadSpecialisations
  }
})