<script setup lang="ts">
import type { QuestionData } from '@/types'
import AppButton from '@/components/atoms/AppButton.vue'
import AppAdminQuestion from '@/components/molecules/AppAdminQuestion.vue'
import { getQuestions } from '@/services/dataService'
import { useQuery } from '@tanstack/vue-query'
import AppLoading from '../atoms/AppLoading.vue'
import AppQuestionForm from '@/components/molecules/questions/AppAddForm.vue'
import { ref } from 'vue'
import AppNotification from '@/components/atoms/AppNotification.vue'

const showOverlay = ref<boolean>(false)

const { isPending, isError, data, error } = useQuery({
  queryKey: ['questions'],
  queryFn: getQuestions<QuestionData>
})

const addQuestion = () => {
  showOverlay.value = !showOverlay.value
}

// Notification
const showNoti = ref<boolean>(false)

const notiText = ref<string>('')
const notiColor = ref<string>('')

const showNotification = (text: string, color: string) => {
  notiText.value = text
  notiColor.value = color
  showNoti.value = true
}

const hideNotification = () => {
  showNoti.value = false
}
</script>

<template>
  <AppNotification
    v-if="showNoti"
    :text="notiText"
    :color="notiColor"
    @close="hideNotification"
  ></AppNotification>

  <div>
    <h1>Edit vragen</h1>

    <div class="error" v-if="isPending">
      <h1>Loading questions...</h1>
      <AppLoading></AppLoading>
    </div>

    <div class="error" v-if="isError">
      <h1>Something went wrong! Try again later...</h1>
      <p>{{ error }}</p>
    </div>

    <div class="questions">
      <AppAdminQuestion
        v-for="question in data?.data.data"
        :key="question.id"
        :question="question"
      ></AppAdminQuestion>

      <AppButton @click="addQuestion()">Voeg toe +</AppButton>
    </div>
  </div>

  <AppQuestionForm
    v-show="showOverlay"
    @close="showOverlay = false"
    @showNotfi="showNotification"
  ></AppQuestionForm>
</template>

<style scoped lang="scss">
.questions {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.error {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}
</style>
