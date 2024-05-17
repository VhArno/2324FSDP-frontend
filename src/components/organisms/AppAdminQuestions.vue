<script setup lang="ts">
import type { Question } from '@/types'
import AppButton from '@/components/atoms/AppButton.vue'

defineProps<{
    questions: Question[]
}>()
</script>

<template>
    <h1>Edit vragen</h1>

<div class="questions">
  <div class="question-div" v-for="question in questions" :key="question.id">
    <div class="question">
      <span>{{ question.id }}</span>
      <span>{{ question.question }}</span>
      <div class="icons">
        <span><i class="fa-solid fa-pen"></i></span>
        <span><i class="fa-solid fa-trash"></i></span>
        <span><i class="fa-solid fa-chevron-down"></i></span>
      </div>
    </div>

    <div class="answers">
      <div class="answer" v-for="answer in question.answers" :key="answer.id">
        <span>{{ answer.answer }}</span>
        <div class="icons">
          <span>1</span>
          <span><i class="fa-solid fa-pen"></i></span>
        </div>
      </div>

      <AppButton>+</AppButton>
    </div>
  </div>

  <AppButton>Voeg toe +</AppButton>
</div>
</template>

<style scoped lang="scss">
.questions {
      display: flex;
      flex-flow: column;
      gap: 2rem;

      .question-div {
        .question {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          padding: 0.5rem;
          background-color: var(--main-light);
          border-radius: 10px;
        }

        .answers {
          display: flex;
          flex-flow: column;
          gap: 0.5rem;
          margin-top: 0.5rem;
          padding-left: 1rem;

          .answer {
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            padding: 0.5rem;
            background-color: var(--bg-accent);
            border-radius: 10px;
          }

          button {
            width: fit-content;
          }
        }

        .icons {
          display: flex;
          flex-flow: row;
          gap: 0.5rem;
        }
      }
    }
</style>