<script setup lang="ts">
import { getSuggestions } from '@/services/adminService'
import type { Suggestion } from '@/types'
import { useQuery } from '@tanstack/vue-query'

const { isPending, isError, data, error } = useQuery({
  queryKey: ['results'],
  queryFn: getSuggestions<{ data: Suggestion[] }>
})
</script>

<template>
  <div>
    <h1>Admin suggestions</h1>
    <div class="suggestions">
      <div v-for="suggestion in data?.data.data" :key="suggestion.id">
        {{ suggestion }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
