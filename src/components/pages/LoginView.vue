<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppButton from '../atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue'
import { useTitle } from '@vueuse/core'
import { computed, ref } from 'vue'

const title = useTitle()
title.value = 'Login | Odisee specialisatie test'

const authStore = useAuthStore()

const submitted = ref(false)
const email = ref<string>('')
const password = ref<string>('')

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

  return null
})

async function login() {
  submitted.value = true

  if (emailError.value === null && passwordError.value === null) {
    const message = await authStore.login({ email: email.value, password: password.value })
  }
}
</script>

<template>
  <section class="login">
    <form class="login-form">
      <h1 tabindex="-1">
        Elektronica-ICT Test
        <br />
        Login
      </h1>

      <div>
        <label for="email">
          <span>Email</span>
          <span v-if="emailError" class="errors" data-test="email-error">{{ emailError }}</span>
        </label>
        <AppInput type="email" id="email" name="email" v-model:value="email"></AppInput>
      </div>

      <div>
        <label for="password">
          <span>Password</span>
          <span v-if="passwordError" class="errors" data-test="password-error">{{
            passwordError
          }}</span>
        </label>
        <AppInput type="password" id="password" name="password" v-model:value="password"></AppInput>
      </div>

      <div class="btns">
        <AppButton type="submit" @click.prevent="login">Login</AppButton>
        <RouterLink to="/register">Heb je nog geen account?</RouterLink>
      </div>
    </form>
  </section>
</template>

<style scoped lang="scss">
.login {
  text-align: center;
  padding: 2rem 0;

  .login-form {
    display: flex;
    flex-flow: column;
    gap: 1rem;

    .errors {
      color: var(--accent-links);
    }

    div {
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
