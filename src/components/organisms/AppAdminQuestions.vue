<script setup lang="ts">
import type { QuestionData } from '@/types'
import AppButton from '@/components/atoms/AppButton.vue'
import AppAdminQuestion from '@/components/molecules/AppAdminQuestion.vue'
import { getQuestions } from '@/services/dataService';
import { useQuery } from '@tanstack/vue-query';
import AppLoading from '../atoms/AppLoading.vue';

const { isPending, isError, data, error } = useQuery({
  queryKey: ['questions'],
  queryFn: getQuestions<QuestionData>
})

const addQuestion = () => {}
</script>

<template>
  <h1>Edit vragen</h1>

  <div class="error" v-if="isPending">
    <h1>Loading questions...</h1>
    <AppLoading></AppLoading>
  </div>

  <div class="error" v-if="isError">
    <h1>Something went wrong! Try again later...</h1>
    <p>{{ error }}</p>
  </div>

  <div class="questions">
    <AppAdminQuestion
      v-for="question in data?.data.data"
      :key="question.id"
      :question="question"
    ></AppAdminQuestion>

    <AppButton @click="addQuestion()">Voeg toe +</AppButton>
  </div>
</template>

<style scoped lang="scss">
.questions {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.error {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}
</style>
