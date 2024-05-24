import type { AllResults, ApiResponseResults, SavedResults, User, UsersData } from '@/types'
import { defineStore } from 'pinia'
import { getAllAccounts, getAllResults } from '@/services/adminService'
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'

export const useAdminStore = defineStore('admin', () => {
  const accounts = ref<User[]>()
  const results = ref<AllResults[]>()

  const loadAccounts = async () => {
    accounts.value = []

    getAllAccounts<{ data: User[] }>()
      .then((response) => {
        const res: User[] = response.data.data.map((x) => {
          return {
            id: x.id,
            firstname: x.firstname,
            lastname: x.lastname,
            email: x.email,
            created_at: x.created_at,
            role: x.role,
            results: []
          }
        })
        accounts.value?.push(...res)
      })
      .catch((err) => console.log(err))
  }

  const loadResults = async () => {
    results.value = []

    getAllResults<{ data: AllResults[] }>()
      .then((response) => {
        const res: AllResults[] = response.data.data.map((x) => {
          return {
            id: x.id,
            name: x.name,
            description: x.description,
            created_at: x.created_at,
            specialisation: x.specialisation,
            user: x.user
          }
        })
        results.value?.push(...res)
      })
      .catch((err) => console.log(err))
  }

  return { accounts, results, loadAccounts, loadResults }
})
