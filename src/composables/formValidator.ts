import type { RegisterPayload } from '@/types'
import { watch } from 'vue'
import { ref } from 'vue'

export function useFormValidator(payload: RegisterPayload) {
  const valid = ref<boolean>(false)
  const errs = ref<string[]>([])

  !payload.firstname ? errs.value.push('Vul uw voornaam in') : ''
  !payload.lastname ? errs.value.push('Vul uw achternaam in') : ''
  !payload.email ? errs.value.push('Vul een email in') : ''
  !payload.password ? errs.value.push('Vul een wachtwoord in') : ''
  !payload.passwordRepeat ? errs.value.push('Herhaal uw wachtwoord') : ''

  if (errs.value.length == 0 && payload.password === payload.passwordRepeat) {
    valid.value = true
  } else {
    errs.value.push('Wachtwoord en herhaal wachtwoord zijn niet hetzelfde')
  }

  return { valid, errs }
}
