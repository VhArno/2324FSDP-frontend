<script setup lang="ts">
import type { OperationsData, QuestionData } from '@/types'
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
import { getOperations } from '@/services/adminService'

const showOverlay = ref<boolean>(false)
const showSuggestionOverlay = ref<boolean>(false)

const { isPending, isError, data, error } = useQuery({
  queryKey: ['questions'],
  queryFn: getQuestions<QuestionData>
})

const operationsData = useQuery({
  queryKey: ['operations'],
  queryFn: getOperations<OperationsData>
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

  <div class="edit">
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

      <AppButton v-if="useAuthStore().isSuperAdmin" @click="addQuestion()">Voeg toe +</AppButton>
    </div>

    <div class="btns">
      <AppButton @click="addSuggestion()">Voeg suggestie toe +</AppButton>
    </div>
  </div>

  <AppQuestionForm
    v-show="showOverlay"
    @close="showOverlay = false"
    @showNotfi="showNotification"
  ></AppQuestionForm>

  <AppSuggestion
    v-if="data !== undefined && showSuggestionOverlay && operationsData.data.value"
    :questions="data?.data.data"
    :operations="operationsData.data.value?.data.data"
    @close="showSuggestionOverlay = false"
  ></AppSuggestion>
</template>

<style scoped lang="scss">
.edit {
  overflow: hidden;
}

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

.btns {
  margin-top: 1rem;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  width: 100%;
}

@media (min-width: 45em) {
  .btns {
    width: 30%;
  }
}
</style>
