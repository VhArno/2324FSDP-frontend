<script setup lang="ts">
import router from '@/router'
import AppButton from '../atoms/AppButton.vue'
import { useTitle } from '@vueuse/core'
import { getQuestions } from '@/services/dataService'
import { useQuery } from '@tanstack/vue-query'
import type { Question, QuestionData, Result } from '@/types'
import AppQuestion from '../molecules/AppQuestion.vue'
import { ref } from 'vue'

defineProps<{
  id: string
}>()

const title = useTitle()
title.value = 'Questions | Odisee specialisatie test'

const { isPending, isError, data, error } = useQuery({
  queryKey: ['questions'],
  queryFn: getQuestions<QuestionData>
})

const results = ref<Result[]>([])

/*const data = { data: { data: [] } }
const isPending = true
const isError = false*/
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
      :question="data.data.data[parseInt(id) - 1]"
      v-model:results="results"
    ></AppQuestion>

    <div class="error" v-if="isPending">
      <h1>Loading test...</h1>
      <div class="custom-loader"></div>
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

    .custom-loader {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: 
        radial-gradient(farthest-side, var(--main),#0000) top/8px 8px no-repeat,
        conic-gradient(#0000 30%, var(--main));
      -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
      animation:s3 1s infinite linear;
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

@keyframes s3{ 
  100%{transform: rotate(1turn)}
}
</style>
