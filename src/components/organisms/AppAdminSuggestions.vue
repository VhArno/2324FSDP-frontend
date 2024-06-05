<script setup lang="ts">
import { getSuggestions } from '@/services/adminService'
import type { Suggestion } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref, watchEffect } from 'vue'
import { useDateFormater } from '@/composables/dateFormater'

const queryClient = useQueryClient()

const { isPending, isError, data, error } = useQuery({
  queryKey: ['results'],
  queryFn: getSuggestions<{ data: Suggestion[] }>
})
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
              <td>New question</td>
              <td>Old question</td>
              <td>Operation</td>
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

<style scoped lang="scss"></style>
