<script setup lang="ts">
import router from '@/router'
import AppButton from '../atoms/AppButton.vue'

function startTest() {
  router.push({ name: 'questions', params: { id: 1 } })
}
</script>

<template>
  <section class="content">
    <div>
      <h1 tabindex="-1">Doe de specialisatie test</h1>
      <p>
        Nog niet zeker van je afstudeerrichting in electronica-ict? Vul dan onze
        specialisatiekeuzetest in. Aan de hand van 10 kenmerken zoeken we een match tussen jou en
        een van onze specialisaties. Het resultaat? Je krijgt een eerste idee van een specialisatie
        die aansluit bij jouw profiel.<br />
        De test is snel en efficiënt. Het duurt maar 5 minuten! Waar wacht je nog op!
      </p>
      <p><b>Opgelet!</b> Om uw resultaat op te slaan moet u een account hebben.</p>
      <AppButton @click="startTest">Start de test!</AppButton>
    </div>

    <img class="frame1" src="/src/assets/imgs/frame2.svg" alt="odisee icon" />
    <div class="frame-bottom">
      <img src="/src/assets/imgs/frame1.svg" alt="odisee icon" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.content {
  text-align: center;
  margin-top: 2rem;
  padding-top: 4rem;

  p {
    margin: 2rem 0;
  }

  button {
    margin-bottom: 2rem;
  }

  .frame1 {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: -1;
  }

  .frame-bottom {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 80%;

    img {
      width: 100%;
      max-width: 20em;
    }
  }
}
</style>
