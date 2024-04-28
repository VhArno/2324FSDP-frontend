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

      <AppButton>Register</AppButton>
      <RouterLink to="/login">Heb je al een account?</RouterLink>
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
