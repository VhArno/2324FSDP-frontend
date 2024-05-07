<script setup lang="ts">
import AppHeader from './components/molecules/AppHeader.vue'
import AppFooter from './components/molecules/AppFooter.vue'
import { useAuthStore } from './stores/auth'
import { getQuestions } from '@/services/dataService'

useAuthStore().readUserDetails()

import { useQuery } from '@tanstack/vue-query'

const { isPending, isError, data, error } = useQuery({
  queryKey: ['questions'],
  queryFn: getQuestions,
})

console.log(data.value)
</script>

<template>
  <AppHeader></AppHeader>

  <main>
    <div class="content">
      <RouterView />
    </div>
  </main>

  <AppFooter></AppFooter>
</template>

<style scoped lang="scss">
main {
  flex: 1;
  position: relative;

  .content {
    width: 80%;
    height: auto;
    margin: 0 auto;
  }
}
</style>
