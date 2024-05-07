<script setup lang="ts">
import router from '@/router';
import AppButton from '../atoms/AppButton.vue'
import { useUrlSearchParams } from '@vueuse/core'
import { useTitle } from '@vueuse/core'

defineProps<{
  id: number
}>()

const title = useTitle()
title.value = 'Questions | Odisee specialisatie test'

function goToResults() {
  router.push({name: 'result'})
}
</script>

<template>
  <section class="test">
    <div class="title">
      <h1 tabindex="-1">Wat is jouw favoriete aspect van informatica?</h1>
      <p>1/10</p>
    </div>

    <div class="answers">
      <AppButton @click="goToResults">Web ontwikkeling</AppButton>
      <AppButton>Infrastructuurbeheer</AppButton>
      <AppButton>Softwareontwikkeling</AppButton>
      <AppButton>Kunstmatige intelligentie en machine learning</AppButton>
    </div>

    <div class="frame-bottom">
      <img src="/src/assets/imgs/frame1.svg" alt="odisee icon" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.test {
  margin-top: 2rem;
  text-align: center;

  .title {
    margin: 2rem 0;
    display: flex;
    flex-flow: column-reverse;
  }

  .answers {
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    margin: 2rem auto;
    justify-content: space-between;

    button {
      color: var(--main);
      font-weight: 700;
      background-color: var(--main-light);
      word-wrap: break-word;
      padding: 1rem;
      flex: 1;
    }
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

@media (min-width: 45em) {
  .test {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
