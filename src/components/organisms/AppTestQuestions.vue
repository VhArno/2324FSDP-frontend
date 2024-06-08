<script setup lang="ts">
import AppLoading from '../atoms/AppLoading.vue'
import { useTitle } from '@vueuse/core'
import { getQuestions } from '@/services/dataService'
import { useQuery } from '@tanstack/vue-query'
import type { QuestionData } from '@/types'
import AppQuestion from '../molecules/AppQuestion.vue'
import { useSpecialisationStore } from '@/stores/specialisation'
import { useTestStore } from '@/stores/test'
import { storeToRefs } from 'pinia'

defineProps<{
  id: string
}>()

const title = useTitle()
title.value = 'Questions | Odisee specialisatie test'

const { isPending, isError, data } = useQuery({
  queryKey: ['questions'],
  queryFn: getQuestions<QuestionData>
})

const specialisationStore = useSpecialisationStore()
specialisationStore.loadSpecialisations()
</script>

<template>
  <section class="test">
    <AppQuestion
      v-if="
        data &&
        data.data &&
        data.data.data[parseInt(id) - 1] !== undefined &&
        !isPending &&
        !isError
      "
      :index="parseInt(id)"
      :question="data.data.data[parseInt(id) - 1]"
      :testLength="data.data.data.length"
    ></AppQuestion>

    <div class="error" v-if="isPending">
      <h1>Loading test...</h1>
      <AppLoading></AppLoading>
    </div>

    <div class="error" v-if="isError">
      <h1>Something went wrong! Try again later</h1>
      <p>The test couldn't be loaded</p>
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

  .error {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 2rem;
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
