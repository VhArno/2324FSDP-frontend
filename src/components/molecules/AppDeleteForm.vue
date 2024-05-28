<script setup lang="ts">
import AppButton from '@/components/atoms/AppButton.vue'
import { deleteQuestion } from '@/services/adminService'
import type { Question } from '@/types';
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue';

const props = defineProps<{
    question: Question
}>()
const emit = defineEmits(['close'])
const errors = ref<string[]>([])

const { isPending, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: (questionId: number) => deleteQuestion(questionId),
})

function removeQuestion() {
  mutate(props.question.id)
}

const handleClick = () => {
    removeQuestion()

    if (isSuccess) {
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
            <h2>Are you sure u want to delete the question?</h2>
            <p><i>{{ question.question }}</i></p>
            <div class="errors">
                <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
            <AppButton @click.prevent=handleClick()>DELETE</AppButton>
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
        width: 50%;
        background: white;
        padding: 20px;
        box-sizing: border-box;
        overflow: auto;
    }
}
</style>