import type { ApiResponse, ApiResponseResults, EmailPayload, Result, ResultPayload, SavedResults, User } from '@/types'
import { defineStore } from 'pinia'
import { getResults, postResult, mailResult } from '@/services/authService'
import { ref } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const accounts = ref<User[]>()
  const results = ref<SavedResults[]>()

  const loadAccounts = async () => {

  }

  const loadResults = async () => {

  }

  return { accounts, results, loadAccounts, loadResults }
})
