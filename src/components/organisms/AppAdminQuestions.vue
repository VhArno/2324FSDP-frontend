<script setup lang="ts">
import type { Question } from '@/types'
import AppButton from '@/components/atoms/AppButton.vue'
import AppAdminQuestion from '@/components/molecules/AppAdminQuestion.vue'

defineProps<{
  questions: Question[]
}>()

const addQuestion = () => {}
</script>

<template>
  <h1>Edit vragen</h1>

  <div class="questions">
    <AppAdminQuestion
      v-for="question in questions"
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
</style>
