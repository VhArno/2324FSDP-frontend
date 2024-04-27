<script setup lang="ts">
import AppButton from '../atoms/AppButton.vue'
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams('history')
params.question = '1'
</script>

<template>
  <section class="content">
    <div class="title">
      <p>1/10</p>
      <h1>Wat is jouw favoriete aspect van informatica?</h1>
    </div>

    <div class="answers">
      <AppButton>Web ontwikkeling</AppButton>
      <AppButton>Infrastructuurbeheer</AppButton>
      <AppButton>Softwareontwikkeling</AppButton>
      <AppButton>Kunstmatige intelligentie en machine learning</AppButton>
    </div>

    <img src="/src/assets/imgs/frame1.svg" alt="odisee icon" />
  </section>
</template>

<style scoped lang="scss">
.content {
  margin-top: 2rem;
  text-align: center;

  .title {
    margin: 2rem;
  }

  .answers {
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    width: 40%;
    margin: 0 auto;

    button {
      color: var(--main);
      font-weight: 700;
      background-color: var(--main-light);
      height: 3.5rem;
    }
  }
}
</style>
