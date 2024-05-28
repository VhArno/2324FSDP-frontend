import type { RegisterPayload } from '@/types'
import { watch } from 'vue'
import { ref } from 'vue'

export function useDateFormater(date: Date) {
  const formattedDate = new Date(date)
  const newDate = formattedDate.toLocaleString('en-GB')

  return { newDate }
}
