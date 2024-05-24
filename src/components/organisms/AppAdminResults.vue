<script setup lang="ts">
import { getAllResults } from '@/services/adminService';
import type { AllResults } from '@/types'
import { useQuery } from '@tanstack/vue-query';
import AppLoading from '../atoms/AppLoading.vue';

const { isPending, isError, data, error } = useQuery({
  queryKey: ['results'],
  queryFn: getAllResults<{ data: AllResults[] }>
})

</script>

<template>
  <h1>Resultaten</h1>

  <div class="error" v-if="isPending">
    <h1>Loading results...</h1>
    <AppLoading></AppLoading>
  </div>

  <div class="error" v-if="isError">
    <h1>Something went wrong! Try again later...</h1>
    <p>{{ error }}</p>
  </div>

  <div class="results" v-if="!isPending && !isError">
    <div class="result" v-for="result in data?.data.data" :key="result.id">
      {{ result.id }}
      {{ result.name }}
      {{ result.created_at }}
      {{ result.specialisation.name }} {{ result.specialisation.description }}
      {{ result.user.email }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.results {
  display: flex;
  flex-flow: column;
  gap: 1rem;

  .result {
    background-color: var(--main-light);
  }
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
