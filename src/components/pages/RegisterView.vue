<script setup lang="ts">
import AppButton from '../atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue'
import { useTitle } from '@vueuse/core'

const title = useTitle()
title.value = 'Register | Odisee specialisatie test'
</script>

<template>
  <section class="register">
    <form class="register-form">
      <h1>
        Elektronica-ICT Test
        <br />
        Register
      </h1>

      <div>
        <label for="firstname">Voornaam</label>
        <AppInput type="text" id="firstname" name="firstname"></AppInput>
      </div>

      <div>
        <label for="familienaam">Familienaam</label>
        <AppInput type="text" id="familienaam" name="familienaam"></AppInput>
      </div>

      <div>
        <label for="email">Email</label>
        <AppInput type="email" id="email" name="email"></AppInput>
      </div>

      <div>
        <label for="password">Wachtwoord</label>
        <AppInput type="password" id="password" name="password"></AppInput>
      </div>

      <div>
        <label for="repeat-password">Herhaal wachtwoord</label>
        <AppInput type="password" id="repeat-password" name="repeat-password"></AppInput>
      </div>

      <div class="btns">
        <AppButton>Register</AppButton>
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
