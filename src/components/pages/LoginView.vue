<script setup lang="ts">
import AppButton from '../atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue'
</script>

<template>
  <section class="login">
    <form class="login-form">
      <h1>
        Elektronica-ICT Test
        <br />
        Login
      </h1>

      <div>
        <label for="email">Email</label>
        <AppInput type="email" id="email" name="email"></AppInput>
      </div>

      <div>
        <label for="password">Password</label>
        <AppInput type="password" id="password" name="password"></AppInput>
      </div>

      <div class="btns">
        <AppButton>Login</AppButton>
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
