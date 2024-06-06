<script setup lang="ts">
import type { Suggestion } from '@/types'
import { getUserSuggestions, deleteSuggestion } from '@/services/adminService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useDateFormater } from '@/composables/dateFormater'
import AppLoading from '@/components/atoms/AppLoading.vue'

const queryClient = useQueryClient()

const { isPending, isError, data, error } = useQuery({
  queryKey: ['userSuggestions'],
  queryFn: getUserSuggestions<{ data: Suggestion[] }>
})

const deleteMutation = useMutation({
  mutationFn: (id: number) => deleteSuggestion(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['userSuggestions'] })
  }
})

const removeSuggestion = (suggestion: Suggestion) => {
  deleteMutation.mutate(suggestion.id)
}
</script>

<template>
  <div class="suggestions">
    <div class="table-container">
      <h2>My suggestions</h2>

      <div class="error" v-if="isPending">
        <h2>Loading results...</h2>
        <AppLoading></AppLoading>
      </div>

      <div class="error" v-if="isError">
        <h2>Something went wrong! Try again later...</h2>
        <p>{{ error }}</p>
      </div>

      <div v-if="!isPending && !isError">
        <div v-if="!data?.data.data || data?.data.data?.length <= 0">
          <p>You don't have suggestions</p>
        </div>

        <table class="suggestions-table" v-if="data?.data.data && data?.data.data?.length > 0">
          <thead>
            <tr>
              <td>id</td>
              <td>Operation</td>
              <td>New</td>
              <td>Question</td>
              <td>Created</td>
              <td class="action">Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="suggestion in data?.data.data" :key="suggestion.id">
              <td>{{ suggestion.id }}</td>
              <td>{{ suggestion.operation.operation }}</td>
              <td>{{ suggestion.new_value }}</td>
              <td>{{ suggestion.question?.question }}</td>
              <td>{{ useDateFormater(suggestion.created_at).newDate }}</td>
              <td class="action">
                <div class="btns">
                  <button class="decline" @click="removeSuggestion(suggestion)">
                    <i class="fa-solid fa-circle-xmark"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
