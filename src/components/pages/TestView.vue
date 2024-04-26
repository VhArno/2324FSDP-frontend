<script setup lang="ts">
import AppButton from '../atoms/AppButton.vue'
</script>

<template>
  <section>
    <h1>Doe de specialisatie test</h1>
    <p>
      Nog niet zeker van je afstudeerrichting in electronica-ict? Vul dan onze
      specialisatiekeuzetest in. Aan de hand van 10 kenmerken zoeken we een match tussen jou en een
      van onze specialisaties. Het resultaat? Je krijgt een eerste idee van een specialisatie die
      aansluit bij jouw profiel.<br />
      De test is snel en efficiënt. Het duurt maar 5 minuten! Waar wacht je nog op!
    </p>
    <AppButton>Start de test!</AppButton>

    <img src="/src/assets/imgs/frame2.svg" alt="odisee icon" />
    <img src="/src/assets/imgs/frame1.svg" alt="odisee icon" />
  </section>
</template>

<style scoped lang="scss">
section {
  text-align: center;
}
</style>
