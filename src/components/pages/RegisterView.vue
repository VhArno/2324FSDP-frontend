<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppButton from '../atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue'
import { useTitle } from '@vueuse/core'
import { ref } from 'vue'
import { useFormValidator } from '@/composables/formValidator'

const title = useTitle()
title.value = 'Register | Odisee specialisatie test'

const authStore = useAuthStore()

const firstname = ref<string>('')
const lastname = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const passwordRepeat = ref<string>('')
const errors = ref<string[]>([])

async function register() {
  errors.value = []

  const payload = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password: password.value,
    passwordRepeat: passwordRepeat.value
  }

  const { valid, errs } = useFormValidator(payload)

  console.log(payload)

  if (valid.value) {
    console.log('Form validator valid')
    const message = await authStore.register(payload)
    errors.value.push(message)
  } else {
    //console.log("Form validator invalid")
    errors.value.push(...errs.value)
  }
}
</script>

<template>
  <section class="register">
    <form class="register-form">
      <h1 tabindex="-1">
        Elektronica-ICT Test
        <br />
        Register
      </h1>

      <div class="errors" v-if="errors.length > 0">
        <h2>Looks like something went wrong:</h2>
        <div v-for="(err, index) in errors" :key="index">{{ err }}</div>
      </div>

      <div>
        <label for="firstname">Voornaam</label>
        <AppInput type="text" id="firstname" name="firstname" v-model:value="firstname"></AppInput>
      </div>

      <div>
        <label for="lastname">Familienaam</label>
        <AppInput type="text" id="lastname" name="lastname" v-model:value="lastname"></AppInput>
      </div>

      <div>
        <label for="email">Email</label>
        <AppInput type="email" id="email" name="email" v-model:value="email"></AppInput>
      </div>

      <div>
        <label for="password">Wachtwoord</label>
        <AppInput type="password" id="password" name="password" v-model:value="password"></AppInput>
      </div>

      <div>
        <label for="passwordRepeat">Herhaal wachtwoord</label>
        <AppInput
          type="password"
          id="passwordRepeat"
          name="passwordRepeat"
          v-model:value="passwordRepeat"
        ></AppInput>
      </div>

      <div class="btns">
        <AppButton @click.prevent="register">Register</AppButton>
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
