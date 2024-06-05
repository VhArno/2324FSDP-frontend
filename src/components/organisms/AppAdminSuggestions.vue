<script setup lang="ts">
import {
  deleteQuestion,
  deleteSuggestion,
  getSuggestions,
  patchQuestion,
  postQuestion
} from '@/services/adminService'
import AppLoading from '@/components/atoms/AppLoading.vue'
import type { Suggestion } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref, watchEffect } from 'vue'
import { useDateFormater } from '@/composables/dateFormater'

const queryClient = useQueryClient()

const { isPending, isError, data, error } = useQuery({
  queryKey: ['suggestions'],
  queryFn: getSuggestions<{ data: Suggestion[] }>
})

const addSuggestions = ref<Suggestion[]>([])
const editSuggestions = ref<Suggestion[]>([])
const deleteSuggestions = ref<Suggestion[]>([])

watchEffect(() => {
  addSuggestions.value = []
  editSuggestions.value = []
  deleteSuggestions.value = []

  data.value?.data.data.forEach((s) => {
    if (s.operation.id === 1) {
      addSuggestions.value?.push(s)
    } else if (s.operation.id === 2) {
      editSuggestions.value?.push(s)
    } else if (s.operation.id === 3) {
      deleteSuggestions.value?.push(s)
    }
  })
})

// question mutations
/* add question */
const addQuestion = useMutation({
  mutationFn: (newQuestion: string) => postQuestion({ question: newQuestion }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] })
  }
})

/* edit question */
const editQuestion = useMutation({
  mutationFn: (question: { id: number; newQuestion: string }) =>
    patchQuestion({
      question_id: question.id,
      question: question.newQuestion
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] })
  }
})

/* delete question */
const removeQuestion = useMutation({
  mutationFn: (questionId: number) => deleteQuestion(questionId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] })
  }
})

// Suggestions
const deleteMutation = useMutation({
  mutationFn: (id: number) => deleteSuggestion(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['suggestions'] })
  }
})

/* accept */
const acceptSuggestion = (suggestion: Suggestion) => {
  if (suggestion.operation.id === 1) {
    addQuestion.mutate(suggestion.new_value)

    if (addQuestion.isSuccess) deleteMutation.mutate(suggestion.id)
  } else if (suggestion.operation.id === 2) {
    editQuestion.mutate({ id: suggestion.question.id, newQuestion: suggestion.new_value })

    if (editQuestion.isSuccess) deleteMutation.mutate(suggestion.id)
  } else if (suggestion.operation.id === 3) {
    removeQuestion.mutate(suggestion.question.id)

    if (removeQuestion.isSuccess) deleteMutation.mutate(suggestion.id)
  }
}

/* decline */
const declineSuggestion = (suggestion: Suggestion) => {
  deleteMutation.mutate(suggestion.id)
}
</script>

<template>
  <div>
    <h1>Admin suggestions</h1>

    <div class="error" v-if="isPending">
      <h2>Loading results...</h2>
      <AppLoading></AppLoading>
    </div>

    <div class="error" v-if="isError">
      <h2>Something went wrong! Try again later...</h2>
      <p>{{ error }}</p>
    </div>

    <!--<div class="suggestions" v-if="!isPending">
      <div class="suggestions-div" v-if="addSuggestions && addSuggestions?.length > 0">
        <div>
          <h2>Add suggestions</h2>
          <div class="add-suggestions" v-for="suggestion in addSuggestions" :key="suggestion.id">
            <span>{{ suggestion.id }}</span>
          </div>
        </div>
      </div>
    </div>-->

    <div class="suggestions" v-if="!isPending">
      <div class="table-container">
        <h2>Add suggestions</h2>

        <table class="suggestions-table" v-if="addSuggestions && addSuggestions?.length > 0">
          <thead>
            <tr>
              <td>id</td>
              <td>Operation</td>
              <td>Question</td>
              <td>Created</td>
              <td class="action">Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="suggestion in addSuggestions" :key="suggestion.id">
              <td>{{ suggestion.id }}</td>
              <td>{{ suggestion.operation.operation }}</td>
              <td>{{ suggestion.new_value }}</td>
              <td>{{ useDateFormater(suggestion.created_at).newDate }}</td>
              <td class="action">
                <div class="btns">
                  <button class="accept" @click="acceptSuggestion(suggestion)">
                    <i class="fa-solid fa-circle-check"></i>
                  </button>
                  <button class="decline" @click="declineSuggestion(suggestion)">
                    <i class="fa-solid fa-circle-xmark"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="!addSuggestions || addSuggestions?.length <= 0">
          <p>No add suggestions available</p>
        </div>
      </div>

      <div class="table-container">
        <h2>Edit suggestions</h2>

        <table class="suggestions-table" v-if="editSuggestions && editSuggestions?.length > 0">
          <thead>
            <tr>
              <td>id</td>
              <td>new question</td>
              <td>old question</td>
              <td>operation</td>
              <td>Created</td>
              <td class="action">Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="suggestion in editSuggestions" :key="suggestion.id">
              <td>{{ suggestion.id }}</td>
              <td>{{ suggestion.new_value }}</td>
              <td>{{ suggestion.question?.question }}</td>
              <td>{{ suggestion.operation.operation }}</td>
              <td>{{ useDateFormater(suggestion.created_at).newDate }}</td>
              <td class="action">
                <div class="btns">
                  <button class="accept" @click="acceptSuggestion(suggestion)">
                    <i class="fa-solid fa-circle-check"></i>
                  </button>
                  <button class="decline" @click="declineSuggestion(suggestion)">
                    <i class="fa-solid fa-circle-xmark"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="!editSuggestions || editSuggestions?.length <= 0">
          <p>No edit suggestions available</p>
        </div>
      </div>

      <div class="table-container">
        <h2>Delete suggestions</h2>

        <table class="suggestions-table" v-if="deleteSuggestions && deleteSuggestions?.length > 0">
          <thead>
            <tr>
              <td>ID</td>
              <td>Question</td>
              <td>Operation</td>
              <td>Created</td>
              <td class="action">Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="suggestion in deleteSuggestions" :key="suggestion.id">
              <td>{{ suggestion.id }}</td>
              <td>{{ suggestion.question?.question }}</td>
              <td>{{ suggestion.operation.operation }}</td>
              <td>{{ useDateFormater(suggestion.created_at).newDate }}</td>
              <td class="action">
                <div class="btns">
                  <button class="accept" @click="acceptSuggestion(suggestion)">
                    <i class="fa-solid fa-circle-check"></i>
                  </button>
                  <button class="decline" @click="declineSuggestion(suggestion)">
                    <i class="fa-solid fa-circle-xmark"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="!deleteSuggestions || deleteSuggestions?.length <= 0">
          <p>No delete suggestions available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.suggestions {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.error {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.table-container {
  width: 100%;
  overflow: auto;

  .suggestions-table {
    width: 100%;
    min-width: max-content;
    border-collapse: separate;
    border-spacing: 0 10px;

    .action {
      text-align: right;
      width: fit-content;
    }

    tbody {
      tr {
        background-color: var(--main-light);
        height: 2em;
        border-radius: 10px;

        td {
          width: fit-content;
          padding: 0.5rem;
        }

        td:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        td:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }

      .btns {
        display: flex;
        flex-flow: row;
        gap: 1rem;
        justify-content: end;

        button {
          background-color: transparent;
          border: none;
          padding: 0;

          i {
            font-size: 2.3em;
          }

          &:hover {
            cursor: pointer;
          }
        }

        .accept {
          color: var(--accent-btns);
        }

        .decline {
          color: var(--accent-links);
        }
      }
    }
  }
}
</style>
