<script setup lang="ts">
import type { Answer, Question, Result } from '@/types'
import AppButton from '../atoms/AppButton.vue'
import router from '@/router'
import { computedWithControl } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useResultStore } from '@/stores/result'

const props = defineProps<{
  question: Question
}>()

const selectedAnswer = ref<Answer | undefined>()
const results = defineModel<Result[]>('results')

onMounted(() => {
  setSelectedAnswer()
})

function setSelectedAnswer() {
  const result = results.value?.find((result) => result.questionId === props.question.id)
  selectedAnswer.value = result?.answer ? result.answer : undefined
}

function handleClick(question: Question, answer: Answer) {
  const index = results.value?.findIndex((result) => result.questionId === question.id)

  if (index !== -1 && index !== undefined) {
    results.value?.splice(index, 1, {
      questionId: question.id,
      question: question.question,
      answer: answer
    })
  } else {
    results.value?.push({
      questionId: question.id,
      question: question.question,
      answer: answer
    })
  }

  setSelectedAnswer()
}

// navigation
function previousQuestion() {
  router.push({ name: 'questions', params: { id: props.question.id - 1 } })
}

function nextQuestion() {
  router.push({ name: 'questions', params: { id: props.question.id + 1 } })
}

function finishTest() {
  if (results.value?.length === 10) {
    useResultStore().results = results.value
    useResultStore().testDone = true
    router.push({ name: 'result' })
  }
}
</script>

<template>
  <div>
    <div class="title">
      <h1 tabindex="-1">{{ question.question }}</h1>
      <p>{{ question?.id }}/10</p>
    </div>

    <div class="answers">
      <AppButton
        @click="handleClick(question, answer)"
        v-for="answer in question.answers"
        :key="answer.id"
        :class="{ selected: selectedAnswer === answer }"
      >
        {{ answer.answer }}
      </AppButton>
    </div>

    <div class="buttons">
      <AppButton
        class="btn-result"
        @click="finishTest"
        v-show="question.id === 10"
        :disabled="results?.length !== 10"
        >Finish test</AppButton
      >
      <div>
        <AppButton @click="previousQuestion" :disabled="question.id <= 1">Previous</AppButton>
        <AppButton @click="nextQuestion" :disabled="question.id >= 10">Next</AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

    &:hover {
      color: white;
      background-color: var(--accent-btns);
    }
  }

  .selected {
    color: var(--bg);
    background-color: var(--accent-btns);
  }
}

.buttons {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  width: 70%;
  margin: 0 auto;

  > div {
    display: flex;
    flex-flow: row;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;

    button {
      width: 100%;
      &:disabled {
        cursor: not-allowed;
        background-color: var(--secondary);
      }
    }
  }

  .btn-result {
    width: 100%;
    background-color: var(--main);
    padding: 1rem 2rem;

    &:disabled {
      cursor: not-allowed;
      background-color: var(--secondary);
    }
  }
}

@media (min-width: 65em) {
  .buttons {
    width: 35%;
    margin-bottom: 2rem;

    > div {
      button {
        width: 50%;
      }
    }
  }
}
</style>
