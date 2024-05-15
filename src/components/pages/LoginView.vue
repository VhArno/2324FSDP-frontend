<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppButton from '../atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue'
import { useTitle } from '@vueuse/core'
import { ref } from 'vue'

const authStore = useAuthStore()

const email = ref<string>('')
const password = ref<string>('')
const errors = ref<string[]>([])

const title = useTitle()
title.value = 'Login | Odisee specialisatie test'

async function login() {
  errors.value = []
  if (email.value && password.value) {
    const message = await authStore.login({ email: email.value, password: password.value })
    errors.value.push(message)
  } else {
    email.value ? '' : errors.value.push('Email address is a required field')
    password.value ? '' : errors.value.push('Password field is a required field')
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

      <div class="errors" v-if="errors.length > 0" data-test="email-error">
        <h2>Looks like something went wrong:</h2>
        <div v-for="(err, index) in errors" :key="index">{{ err }}</div>
      </div>

      <div>
        <label for="email">Email</label>
        <AppInput type="email" id="email" name="email" v-model:value="email"></AppInput>
      </div>

      <div>
        <label for="password">Password</label>
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
