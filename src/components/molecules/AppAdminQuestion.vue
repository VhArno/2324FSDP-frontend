<script setup lang="ts">
import type { Answer, Question } from '@/types'
import AppButton from '@/components/atoms/AppButton.vue'
import { ref } from 'vue'
import AppEditQuestion from '@/components/molecules/questions/AppEditForm.vue'
import AppDeleteForm from '@/components/molecules/questions/AppDeleteForm.vue'
import AppAddAnswer from '@/components/molecules/answers/AppAddForm.vue'
import AppEditAnswer from '@/components/molecules/answers/AppEditForm.vue'
import AppDeleteAnswer from '@/components/molecules/answers/AppDeleteForm.vue'
import AppNotification from '@/components/atoms/AppNotification.vue'
import { storeToRefs } from 'pinia'
import { useSpecialisationStore } from '@/stores/specialisation'
import { useAuthStore } from '@/stores/auth'

const specialisationStore = useSpecialisationStore()
const { specialisations } = storeToRefs(specialisationStore)

defineProps<{
  question: Question
}>()

const showAnswers = ref<boolean>(false)

const selectedQuestion = ref<Question | null>(null)
const selectedAnswer = ref<Answer | null>(null)

// overlays
const showDeleteOverlay = ref<boolean>(false)
const showQuestionOverlay = ref<boolean>(false)

const showAnswerAddOverlay = ref<boolean>(false)
const showAnswerEditOverlay = ref<boolean>(false)
const showAnswerDeleteOverlay = ref<boolean>(false)

// Questions
const handleShowAnswers = () => {
  showAnswers.value = !showAnswers.value
}

const deleteQuestion = (question: Question) => {
  selectedQuestion.value = question
  showDeleteOverlay.value = !showDeleteOverlay.value
}

const editQuestion = (question: Question) => {
  selectedQuestion.value = question
  showQuestionOverlay.value = !showQuestionOverlay.value
}

// Answers
const addAnswer = (question: Question) => {
  selectedQuestion.value = question
  showAnswerAddOverlay.value = !showAnswerAddOverlay.value
}

const editAnswer = (answer: Answer) => {
  selectedAnswer.value = answer
  showAnswerEditOverlay.value = true
}

const deleteAnswer = (answer: Answer) => {
  selectedAnswer.value = answer
  showAnswerDeleteOverlay.value = !showAnswerDeleteOverlay.value
}

// close overlays
const closeOverlay = () => {
  showDeleteOverlay.value = false
  showQuestionOverlay.value = false
  showAnswerAddOverlay.value = false
  showAnswerEditOverlay.value = false
  showAnswerDeleteOverlay.value = false
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

  <div class="question-div">
    <div class="question">
      <span>{{ question.id }}</span>
      <span class="question-text">{{ question.question }}</span>
      <div class="icons">
        <span v-if="useAuthStore().isSuperAdmin" @click="editQuestion(question)"
          ><i class="fa-solid fa-pen"></i
        ></span>
        <span v-if="useAuthStore().isSuperAdmin" @click="deleteQuestion(question)"
          ><i class="fa-solid fa-trash"></i
        ></span>
        <span @click="handleShowAnswers()"
          ><i class="fa-solid fa-chevron-down" :class="{ show: showAnswers }"></i
        ></span>
      </div>
    </div>

    <div class="answers" v-show="showAnswers">
      <div class="answer" v-for="answer in question.answers" :key="answer.id">
        <span class="answer-text">{{ answer.answer }}</span>
        <span class="answer-spec">{{ answer.specialisation.name }}</span>
        <div class="icons">
          <span>{{ answer.weight }}</span>
          <span v-if="useAuthStore().isSuperAdmin" @click="editAnswer(answer)"
            ><i class="fa-solid fa-pen"></i
          ></span>
          <span v-if="useAuthStore().isSuperAdmin" @click="deleteAnswer(answer)"
            ><i class="fa-solid fa-trash"></i
          ></span>
        </div>
      </div>

      <AppButton v-if="useAuthStore().isSuperAdmin" @click="addAnswer(question)">+</AppButton>
    </div>
  </div>

  <AppDeleteForm
    v-if="showDeleteOverlay && selectedQuestion !== null"
    :question="selectedQuestion"
    @showNotfi="showNotification"
    @close="closeOverlay()"
  ></AppDeleteForm>
  <AppEditQuestion
    v-if="showQuestionOverlay && selectedQuestion !== null"
    v-model:questionValue="selectedQuestion"
    @showNotfi="showNotification"
    @close="closeOverlay()"
  ></AppEditQuestion>

  <AppAddAnswer
    v-if="showAnswerAddOverlay && selectedQuestion !== null"
    :specialisations="specialisations"
    :question="selectedQuestion"
    @showNotfi="showNotification"
    @close="closeOverlay()"
  ></AppAddAnswer>
  <AppEditAnswer
    v-if="showAnswerEditOverlay && selectedAnswer !== null"
    v-model:answerValue="selectedAnswer"
    :specialisations="specialisations"
    @showNotfi="showNotification"
    @close="closeOverlay()"
  ></AppEditAnswer>
  <AppDeleteAnswer
    v-if="showAnswerDeleteOverlay && selectedAnswer !== null && selectedQuestion !== null"
    :answer="selectedAnswer"
    :question="selectedQuestion"
    @showNotfi="showNotification"
    @close="closeOverlay()"
  ></AppDeleteAnswer>
</template>

<style scoped lang="scss">
.question-div {
  .question {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: var(--main-light);
    border-radius: 10px;

    .question-text {
      font-size: 1.1em;
      font-weight: 600;
    }
  }

  .answers {
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding-left: 1rem;

    .answer {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      padding: 1rem;
      background-color: var(--bg-accent);
      border-radius: 10px;
      flex: 1;

      .answer-text {
        font-size: 1em;
        font-weight: 600;
      }
    }

    button {
      width: fit-content;
    }
  }

  .icons {
    display: flex;
    flex-flow: row;
    gap: 1rem;
    align-items: center;

    span {
      i {
        font-size: 1.1em;
      }

      .show {
        transform: rotate(180deg);
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}

@media (min-width: 45em) {
  .question-div {
    .question {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      padding: 0.5rem;
      background-color: var(--main-light);
      border-radius: 10px;

      .question-text {
        font-size: 1.1em;
        font-weight: 600;
      }
    }

    .answers {
      display: flex;
      flex-flow: column;
      gap: 0.5rem;
      margin-top: 0.5rem;
      padding-left: 1rem;

      .answer {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 1rem;
        background-color: var(--bg-accent);
        border-radius: 10px;
        flex: 1;

        .answer-text {
          font-size: 1em;
          font-weight: 600;
          width: 50%;
        }

        .answer-spec {
          width: 30%;
        }
      }

      button {
        width: fit-content;
      }
    }

    .icons {
      display: flex;
      flex-flow: row;
      gap: 1rem;

      span {
        i {
          font-size: 1.1em;
        }

        .show {
          transform: rotate(180deg);
        }

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
