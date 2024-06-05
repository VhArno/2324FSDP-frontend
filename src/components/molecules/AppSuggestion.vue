<script setup lang="ts">
import AppInput from '@/components/atoms/AppInput.vue'
import AppSelect from '@/components/atoms/AppSelect.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import { computed, ref } from 'vue'
import type { Opperation, Question } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { postSuggestion, getOperations } from '@/services/adminService'

const queryClient = useQueryClient()

const { isPending, isError, data } = useQuery({
  queryKey: ['opperations'],
  queryFn: getOperations<Opperation[]>
})

const props = defineProps<{
  questions: Question[]
}>()

const emit = defineEmits<{
  close: []
}>()

const submitted = ref<boolean>(false)
const errors = ref<string[]>([])

const operation = ref<number>(1)
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
  if (!selQuestion.value) return 'Selected question is a required field and was not provided'
  if (selQuestion.value === 0) return 'Selected question is a required field and was not provided'

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
const { error, isSuccess, mutate } = useMutation({
  mutationFn: (suggestion: { operation: number; new_value?: string; question_id?: number }) =>
    postSuggestion({
      operation: suggestion.operation,
      new_value: suggestion.new_value,
      question_id: suggestion.question_id
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['suggestions'] })
  }
})

const saveSuggestion = () => {
  submitted.value = true

  if (operationError.value === null) {
    if (questionError.value === null && operation.value === 1) {
      // add
      console.log('Adding add suggestion')
      mutate({ operation: operation.value, new_value: question.value })
    } else if (questionError.value === null && selQuestion.value === null && operation.value === 2) {
      // edit
      console.log('Adding edit suggestion')
      mutate({ operation: operation.value, new_value: question.value, question_id: selQuestion.value })
    } else if (selQuestion.value === null && operation.value === 3) {
      // delete
      console.log('Adding delete suggestion')
      mutate({ operation: operation.value, question_id: selQuestion.value })
    } else {
      console.log('eslse')
    }
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
          <option v-for="opperation in data?.data" :key="opperation.id" :value="opperation.id">{{ opperation.operation }}</option>
        </AppSelect>
      </div>

      <div class="form-div" v-show="operation !== 1">
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

      <div class="form-div" v-show="operation !== 3">
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
