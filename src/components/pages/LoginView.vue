<script setup lang="ts">
import AppButton from '../atoms/AppButton.vue';
import AppInput from '../atoms/AppInput.vue';
</script>

<template>
  <section class="login">
    <form class="login-form">
      <h1>
        Elektronica-ICT Test
        <br>
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

      <AppButton>Login</AppButton>
      <RouterLink to="/register">Heb je nog geen account?</RouterLink>
    </form>
  </section>
</template>

<style scoped lang="scss">
.login {
  text-align: center;

  .login-form {
    display: flex;
    flex-flow: column;
    gap: 1rem;

    div {
      display: flex;
      flex-flow: column;
      width: 50%;
      margin: 0 auto;

      label {
        text-align: left;
      }
    }

    button {
      width: 30%;
      margin: 0 auto;
    }
  }
}
</style>
