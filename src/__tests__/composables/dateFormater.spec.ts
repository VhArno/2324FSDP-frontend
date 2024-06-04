// dateFormater.spec.ts
import { describe, it, expect } from 'vitest'
import { useDateFormater } from '@/composables/dateFormater'

describe('useDateFormater', () => {
  it('should format the date in the correct format', () => {
    const date = new Date('2023-05-31T12:00:00Z')
    const { newDate } = useDateFormater(date)

    expect(newDate).toBe('31/05/2023, 13:00:00')
  })
})
