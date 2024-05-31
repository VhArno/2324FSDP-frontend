<script setup lang="ts">
import type { Answer, Question, Specialisation } from '@/types'
import AppButton from '@/components/atoms/AppButton.vue'
import AppInput from '@/components/atoms/AppInput.vue'
import { computed, ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { patchAnswer } from '@/services/adminService'
import AppSelect from '@/components/atoms/AppSelect.vue'

const queryClient = useQueryClient()

const submitted = ref<boolean>(false)
const errors = ref<string[]>([])

const answerValue = defineModel<Answer>('answerValue')
const answer = ref<string>(answerValue.value ? answerValue.value.answer : '')
const specialisation = ref<number>(answerValue.value ? answerValue.value.specialisation.id : 0)
const weight = ref<number>(answerValue.value ? answerValue.value.weight : 0)

defineProps<{
  specialisations: Specialisation[]
}>()

const emit = defineEmits<{
  close: []
  showNotfi: [text: string, color: string]
}>()

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

const { error, isSuccess, mutate } = useMutation({
  mutationFn: (answer: {
    id: number
    newAnswer: string
    weight: number
    specialisation_id: number
  }) =>
    patchAnswer({
      answer_id: answer.id,
      answer: answer.newAnswer,
      weight: answer.weight,
      specialisation_id: answer.specialisation_id
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] })
  }
})

function editAnswer() {
  if (answerValue.value) {
    mutate({
      id: answerValue.value.id,
      newAnswer: answer.value,
      weight: weight.value,
      specialisation_id: specialisation.value
    })
  }
}

const saveChange = () => {
  submitted.value = true

  if (
    answerError.value === null &&
    specialisationError.value === null &&
    weightError.value === null
  ) {
    editAnswer()

    if (isSuccess) {
      emit('showNotfi', 'Answer updated succesfully', 'blue')
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
        <h2>Edit answer</h2>
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
        <AppButton type="submit" @click.prevent="saveChange()">Save</AppButton>
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
