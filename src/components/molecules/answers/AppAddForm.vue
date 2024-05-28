<script setup lang="ts">
import AppButton from '@/components/atoms/AppButton.vue'
import AppInput from '@/components/atoms/AppInput.vue'
import { computed, ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { postAnswer, postQuestion } from '@/services/adminService'
import type { Answer, PostAnswerPayload, Question, Specialisation } from '@/types'
import AppSelect from '@/components/atoms/AppSelect.vue'

const queryClient = useQueryClient()

const submitted = ref<boolean>(false)
const answer = ref<string>('')
const specialisation = ref<number>(0)
const weight = ref<number>(0)
const errors = ref<string[]>([])

const answerError = computed(() => {
  if (!submitted.value) return null
  if (!answer.value) return 'Answer is a required field and was not provided'

  return null
})

const specialisationError = computed(() => {
  if (!submitted.value) return null
  if (!specialisation.value) return 'Specialisation is a required field and was not provided'
  if (specialisation.value === 0) return 'Question is a required field and was not provided'

  return null
})

const weightError = computed(() => {
  if (!submitted.value) return null
  if (!weight.value) return 'Weight is a required field and was not provided'
  if (weight.value === 0) return 'Weight must be higher than 0'

  return null
})

const props = defineProps<{
  specialisations: Specialisation[]
  question: Question
}>()
const emit = defineEmits(['close'])

const { error, isSuccess, mutate } = useMutation({
  mutationFn: (answer: PostAnswerPayload) =>
    postAnswer({
      answer: answer.answer,
      weight: answer.weight,
      question_id: answer.question_id,
      specialisation_id: answer.specialisation_id
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] })
  }
})

function addAnswer() {
  mutate({
    answer: answer.value,
    weight: weight.value,
    question_id: props.question.id,
    specialisation_id: specialisation.value
  })
}

const saveQuestion = () => {
  submitted.value = true

  if (
    answerError.value === null &&
    specialisationError.value === null &&
    weightError.value === null
  ) {
    addAnswer()

    if (isSuccess) {
      closeOverlay()
    } else {
      error.value?.message ? errors.value.push(error.value?.message) : ''
    }
  }
}

const closeOverlay = () => {
  emit('close')
}
</script>

<template>
  <div class="overlay">
    <form class="questions-form">
      <div class="form-head">
        <div>
          <h2>Add answer</h2>
          <p>Question: {{ question.question }}</p>
        </div>
        <AppButton @click.prevent="closeOverlay()">Close</AppButton>
      </div>

      <div class="form-div">
        <label for="answer">
          <span>Answer</span>
          <span v-if="answerError" class="errors" data-test="answer-error">{{ answerError }}</span>
        </label>
        <AppInput type="text" id="answer" name="answer" v-model:value="answer"></AppInput>
      </div>

      <div class="form-div">
        <label for="weight">
          <span>Weight</span>
          <span v-if="weightError" class="errors" data-test="weight-error">{{ weightError }}</span>
        </label>
        <AppInput
          type="number"
          inputmode="numeric"
          id="weight"
          name="weight"
          v-model:value.number="weight"
          min="0"
          max="5"
        ></AppInput>
      </div>

      <div class="form-div">
        <label for="weight">
          <span>specialisation</span>
          <span v-if="specialisationError" class="errors" data-test="specialisation-error">{{
            specialisationError
          }}</span>
        </label>
        <AppSelect id="specialisation" v-model:value="specialisation">
          <option
            v-for="specialisation in specialisations"
            :key="specialisation.id"
            :value="specialisation.id"
          >
            {{ specialisation.name }}
          </option>
        </AppSelect>
      </div>

      <div class="btns">
        <AppButton type="submit" @click.prevent="saveQuestion()">Save</AppButton>
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

  .questions-form {
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

        .errors {
          color: var(--accent-links);
        }
      }
    }
  }
}
</style>
