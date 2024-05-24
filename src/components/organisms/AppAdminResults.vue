<script setup lang="ts">
import type { AllResults } from '@/types'

defineProps<{
  results: AllResults[]
}>()
</script>

<template>
  <h1>Resultaten</h1>

  <div class="results">
    <div class="result" v-for="result in results" :key="result.id">
      <h2>{{ result.name }}</h2>
      <p>{{ result.created_at }}</p>
      <p>{{ result.specialisation.name }}</p>
      <p>{{ result.user.email }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.results {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}
</style>
