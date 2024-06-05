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
import AppSuggestion from '@/components/molecules/AppSuggestion.vue'
import { useAuthStore } from '@/stores/auth'

const showOverlay = ref<boolean>(false)
const showSuggestionOverlay = ref<boolean>(false)

const { isPending, isError, data, error } = useQuery({
  queryKey: ['questions'],
  queryFn: getQuestions<QuestionData>
})

const addQuestion = () => {
  showOverlay.value = !showOverlay.value
}

const addSuggestion = () => {
  showSuggestionOverlay.value = !showSuggestionOverlay.value
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
    <AppButton @click="addSuggestion()">Voeg suggestie toe +</AppButton>
  </div>

  <AppQuestionForm
    v-show="showOverlay"
    @close="showOverlay = false"
    @showNotfi="showNotification"
  ></AppQuestionForm>

  <AppSuggestion
    v-if="data !== undefined && !useAuthStore().isSuperAdmin && showSuggestionOverlay"
    :questions="data?.data.data"
    @close="showSuggestionOverlay = false"
  ></AppSuggestion>
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
