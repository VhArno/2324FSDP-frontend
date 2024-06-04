<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppButton from '../atoms/AppButton.vue'
import AppLoading from '../atoms/AppLoading.vue'
import AppInput from '../atoms/AppInput.vue'
import { useTitle } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useFormValidator } from '@/composables/formValidator'

const title = useTitle()
title.value = 'Register | Odisee specialisatie test'

const authStore = useAuthStore()

const submitted = ref(false)
const firstname = ref<string>('')
const lastname = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const passwordRepeat = ref<string>('')
const errors = ref<string[]>([])

const firstnameError = computed(() => {
  if (!submitted.value) return null
  if (!firstname.value) return 'Firstname is a required field and was not provided'

  return null
})

const lastnameError = computed(() => {
  if (!submitted.value) return null
  if (!lastname.value) return 'Lastname is a required field and was not provided'

  return null
})

const emailError = computed(() => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  if (!submitted.value) return
  if (!email.value) return 'Email is a required field and was not provided'
  if (!emailRegex.test(email.value))
    return 'The email provided does not follow the pattern name@domain.extension'

  return null
})

const passwordError = computed(() => {
  if (!submitted.value) return null
  if (!password.value) return 'Password is a required field and was not provided'
  if (password.value.length < 5) return 'Password must at least be 5 characters'

  return null
})

const passwordrepeatError = computed(() => {
  if (!submitted.value) return null
  if (!passwordRepeat.value) return 'Password repeat is a required field and was not provided'
  if (passwordRepeat.value !== password.value) return 'Password and password repeat must be the same'

  return null
})

async function register() {
  submitted.value = true
  errors.value = []

  const payload = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password: password.value,
    passwordRepeat: passwordRepeat.value
  }

  //const { valid, errs } = useFormValidator(payload)

  if (firstnameError.value === null && lastnameError.value === null && emailError.value === null && passwordError.value === null && passwordrepeatError.value === null) {
    const message = await authStore.register(payload)
    console.log(message)
    errors.value.push(message === null || message === undefined ? '500 network error' : message)
  }
}
</script>

<template>
  <section class="register">
    <form class="register-form" @submit.prevent="register">
      <h1 tabindex="-1">
        Elektronica-ICT Test
        <br />
        Register
      </h1>

      <div class="loading" v-show="authStore.isLoading">
        <AppLoading></AppLoading>
      </div>

      <div class="errors form-input" v-if="errors.length > 0">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>

      <div class="form-input">
        <label for="firstname">
          <span>Voornaam</span>
          <span v-if="firstnameError" class="errors" data-test="firstname-error">{{ firstnameError }}</span>
        </label>
        <AppInput type="text" id="firstname" name="firstname" v-model:value="firstname"></AppInput>
      </div>

      <div class="form-input">
        <label for="lastname">
          <span>Lastname</span>
          <span v-if="lastnameError" class="errors" data-test="lastname-error">{{ lastnameError }}</span>
        </label>
        <AppInput type="text" id="lastname" name="lastname" v-model:value="lastname"></AppInput>
      </div>

      <div class="form-input">
        <label for="email">
          <span>Email</span>
          <span v-if="emailError" class="errors" data-test="email-error">{{ emailError }}</span>
        </label>
        <AppInput type="email" id="email" name="email" v-model:value="email"></AppInput>
      </div>

      <div class="form-input">
        <label for="password">
          <span>Wachtwoord</span>
          <span v-if="passwordError" class="errors" data-test="password-error">{{ passwordError }}</span>
        </label>
        <AppInput type="password" id="password" name="password" v-model:value="password"></AppInput>
      </div>

      <div class="form-input">
        <label for="passwordRepeat">
          <span>Herhaal wachtwoord</span>
          <span v-if="passwordrepeatError" class="errors" data-test="passwordRepeat-error">{{ passwordrepeatError }}</span>
        </label>
        <AppInput
          type="password"
          id="passwordRepeat"
          name="passwordRepeat"
          v-model:value="passwordRepeat"
        ></AppInput>
      </div>

      <div class="btns">
        <AppButton type="submit">Register</AppButton>
        <RouterLink to="/login">Heb je al een account?</RouterLink>
      </div>
    </form>
  </section>
</template>

<style scoped lang="scss">
.register {
  text-align: center;
  padding: 2rem 0;

  .register-form {
    display: flex;
    flex-flow: column;
    gap: 1rem;

    .loading {
      display: flex;
      flex-flow: column;
      margin: 0 auto;
    }

    .errors {
      color: var(--accent-links);
    }

    .form-input {
      display: flex;
      flex-flow: column;
      width: 100%;
      max-width: 30em;
      margin: 0 auto;

      label {
        text-align: left;
        display: flex;
        flex-flow: column;
      }
    }

    .btns {
      display: flex;
      flex-flow: column;
      gap: 0.5rem;

      button {
        width: 100%;
        max-width: 15em;
        margin: 0 auto;
      }

      a {
        width: fit-content;
        text-align: center;
        margin: 0 auto;
      }
    }
  }
}
</style>
