<script setup lang="ts">
import AppInput from '@/components/atoms/AppInput.vue'
import AppSelect from '@/components/atoms/AppSelect.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import { computed, ref } from 'vue'
import type { Question } from '@/types'

const props = defineProps<{
  questions: Question[]
}>()

const emit = defineEmits<{
  close: []
}>()

const submitted = ref<boolean>(false)
const errors = ref<string[]>([])

const operation = ref<number>(0)
const selQuestion = ref<number>(0)
const question = ref<string>('')

const operationError = computed(() => {
  if (!submitted.value) return null
  if (!operation.value) return 'Operation is a required field and was not provided'
  if (operation.value === 0) return 'Operation is a required field and was not provided'

  return null
})

const selQuestionError = computed(() => {
  if (!submitted.value) return null
  if (!selQuestion.value) return 'Operation is a required field and was not provided'
  if (selQuestion.value === 0) return 'Operation is a required field and was not provided'

  return null
})

const questionError = computed(() => {
  if (!submitted.value) return null
  if (!question.value) return 'Question is a required field and was not provided'

  return null
})

// close
const closeOverlay = () => {
  emit('close')
}

// save
const saveSuggestion = () => {
  if (operation.value === 0) {
    // add
    question.value
  } else if (operation.value === 1) {
    // edit
    selQuestion.value
    question.value
  } else if (operation.value === 2) {
    // delete
    selQuestion.value
  }
}
</script>

<template>
  <div class="overlay">
    <form class="suggestions-form" @submit.prevent="saveSuggestion()">
      <div class="form-head">
        <h2>Add suggestion</h2>
        <AppButton @click.prevent="closeOverlay()">Close</AppButton>
      </div>

      <div class="form-div">
        <label for="operation">
          <span class="label">Operation</span>
          <span v-if="operationError" class="errors" data-test="operation-error">{{
            operationError
          }}</span>
        </label>
        <AppSelect id="operation" name="operation" v-model:value="operation">
          <option :value="0">Add</option>
          <option :value="1">Edit</option>
          <option :value="2">Delete</option>
        </AppSelect>
      </div>

      <div class="form-div" v-show="operation !== 0">
        <label for="selQuestion">
          <span class="label">Select a question</span>
          <span v-if="selQuestionError" class="errors" data-test="selected-question-error">{{
            selQuestionError
          }}</span>
        </label>
        <AppSelect id="selQuestion" name="selQuestion" v-model:value="selQuestion">
          <option v-for="question in questions" :key="question.id">{{ question.question }}</option>
        </AppSelect>
      </div>

      <div class="form-div" v-show="operation !== 2">
        <label for="question">
          <span class="label">Question</span>
          <span v-if="questionError" class="errors" data-test="question-error">{{
            questionError
          }}</span>
        </label>
        <AppInput type="text" id="question" name="question" v-model:value="question"></AppInput>
      </div>

      <div class="btns">
        <AppButton type="submit">Save</AppButton>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed; /* Stay in place */
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  display: flex; /* Use flexbox to center content */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  z-index: 1000; /* Sit on top */

  .suggestions-form {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    width: 50%;
    background: white;
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;

    .form-head {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
    }

    .form-div {
      display: flex;
      flex-flow: column;

      label {
        display: flex;
        flex-flow: column;

        .label {
          font-weight: 600;
        }

        .errors {
          color: var(--accent-links);
        }
      }
    }
  }
}
</style>
