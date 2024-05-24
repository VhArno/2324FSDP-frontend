<script setup lang="ts">
import type { Answer, Question } from '@/types'
import AppButton from '@/components/atoms/AppButton.vue'
import { ref } from 'vue'

defineProps<{
  question: Question
}>()

const showAnswers = ref<boolean>(false)

// Questions
const handleShowAnswers = () => {
  showAnswers.value = !showAnswers.value
}

const deleteQuestion = (question: Question) => {}

const editQuestion = (question: Question) => {}

// Answers
const addAnswer = () => {}

const editAnswer = (answer: Answer) => {}

const deleteAnswer = (answer: Answer) => {}
</script>

<template>
  <div class="question-div">
    <div class="question">
      <span>{{ question.id }}</span>
      <span class="question-text">{{ question.question }}</span>
      <div class="icons">
        <span @click="editQuestion(question)"><i class="fa-solid fa-pen"></i></span>
        <span @click="deleteQuestion(question)"><i class="fa-solid fa-trash"></i></span>
        <span @click="handleShowAnswers()"
          ><i class="fa-solid fa-chevron-down" :class="{ show: showAnswers }"></i
        ></span>
      </div>
    </div>

    <div class="answers" v-show="showAnswers">
      <div class="answer" v-for="answer in question.answers" :key="answer.id">
        <span class="answer-text">{{ answer.answer }}</span>
        <span>{{ answer.specialisation.name }}</span>
        <div class="icons">
          <span>1</span>
          <span @click="editAnswer(answer)"><i class="fa-solid fa-pen"></i></span>
          <span @click="deleteAnswer(answer)"><i class="fa-solid fa-trash"></i></span>
        </div>
      </div>

      <AppButton @click="addAnswer()">+</AppButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.question-div {
  .question {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: var(--main-light);
    border-radius: 10px;

    .question-text {
      font-size: 1.1em;
      font-weight: 600;
    }
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

      .answer-text {
        font-size: 1em;
        font-weight: 600;
      }
    }

    button {
      width: fit-content;
    }
  }

  .icons {
    display: flex;
    flex-flow: row;
    gap: 1rem;

    span {
      i {
        font-size: 1.1em;
      }

      .show {
        transform: rotate(180deg);
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
