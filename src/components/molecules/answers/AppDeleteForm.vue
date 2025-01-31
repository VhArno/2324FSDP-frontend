<script setup lang="ts">
import AppButton from '@/components/atoms/AppButton.vue'
import { deleteAnswer } from '@/services/adminService'
import type { Answer, Question } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'

const queryClient = useQueryClient()

const props = defineProps<{
  question: Question
  answer: Answer
}>()

const emit = defineEmits<{
  close: []
  showNotfi: [text: string, color: string]
}>()

const errors = ref<string[]>([])

const { error, isSuccess, mutate } = useMutation({
  mutationFn: (answerId: number) => deleteAnswer(answerId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] })
  }
})

function removeQuestion() {
  mutate(props.answer.id)
}

const handleClick = () => {
  removeQuestion()

  if (isSuccess) {
    emit('showNotfi', 'Answer deleted succesfully', 'red')
    emit('close')
  } else {
    error.value?.message ? errors.value.push(error.value?.message) : ''
  }
}

const closeForm = () => {
  emit('close')
}
</script>

<template>
  <div class="overlay">
    <div class="content">
      <h2>Are you sure u want to delete the answer?</h2>
      <p class="info">
        <i>Question: '{{ question.question }}'</i>
        <i>- '{{ answer.answer }}'</i>
      </p>
      <div class="errors">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
      <AppButton class="delete" @click.prevent="handleClick()">DELETE</AppButton>
      <AppButton @click="closeForm()">Cancel</AppButton>
    </div>
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

  .content {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    width: 80%;
    background: white;
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;

    .info {
      display: flex;
      flex-flow: column;
    }

    .delete {
      background-color: var(--accent-links);

      &:hover {
        background-color: rgb(194, 0, 0);
      }
    }
  }
}

@media (min-width: 45em) {
  .overlay {
    .content {
      width: 50%;
    }
  }
}
</style>
