<script setup lang="ts">
import router from '@/router'
import AppButton from '../atoms/AppButton.vue'

function startTest() {
  router.push('/start')
}
</script>

<template>
  <section class="content">
    <div>
      <h1>Doe de specialisatie test</h1>
      <p>
        Nog niet zeker van je afstudeerrichting in electronica-ict? Vul dan onze
        specialisatiekeuzetest in. Aan de hand van 10 kenmerken zoeken we een match tussen jou en
        een van onze specialisaties. Het resultaat? Je krijgt een eerste idee van een specialisatie
        die aansluit bij jouw profiel.<br />
        De test is snel en efficiënt. Het duurt maar 5 minuten! Waar wacht je nog op!
      </p>
      <AppButton @click="startTest">Start de test!</AppButton>
    </div>

    <img class="frame1" src="/src/assets/imgs/frame2.svg" alt="odisee icon" />
    <img src="/src/assets/imgs/frame1.svg" alt="odisee icon" />
  </section>
</template>

<style scoped lang="scss">
.content {
  text-align: center;
  margin-top: 2rem;

  p {
    margin: 2rem 0;
  }

  button {
    margin-bottom: 2rem;
  }

  .frame1 {
    position: absolute;
    top: 63px;
    right: 0px;
  }
}
</style>
