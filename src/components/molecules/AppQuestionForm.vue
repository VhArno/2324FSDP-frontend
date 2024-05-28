<script setup lang="ts">
import type { Specialisation, Question, Answer } from '@/types'
import AppButton from '@/components/atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue';
import AppOverlay from '../atoms/AppInput.vue';
import { computed, ref } from 'vue';
import { useMutation } from '@tanstack/vue-query'
import { postQuestion } from '@/services/adminService';

const submitted = ref<boolean>(false)
const question = ref<string>('')
const showOverlay = defineModel<boolean>('showOverlay')
const errors = ref<string[]>([])

defineProps<{
    specialisations: Specialisation[]
}>()

const questionError = computed(() => {
  if (!submitted.value) return null
  if (!question.value) return 'Question is a required field and was not provided'

  return null
})

const { isPending, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: (newQuestion: string) => postQuestion({ question: newQuestion}),
})

function addTodo() {
  mutate(question.value)
}

const saveQuestion = () => {
    submitted.value = true

    if (questionError.value === null) {
        addTodo()

        if (isSuccess) {
            closeOverlay()  
        } else {
            error.value?.message ? errors.value.push(error.value?.message) : ''
        }
    }
}

const closeOverlay = () => {
    showOverlay.value = !showOverlay.value
}
</script>

<template>
    <div class="overlay">
        <form class="questions-form">
            <div class="form-head">
                <h2>Add question</h2>
                <AppButton @click.prevent="closeOverlay()">Close</AppButton>
            </div>

            <div class="form-div">
                <label for="question">
                    <span>Question</span>
                    <span v-if="questionError" class="errors" data-test="question-error">{{
                        questionError
                    }}</span>
                </label>
                <AppInput type="text" id="question" name="question" v-model:value="question"></AppInput>
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