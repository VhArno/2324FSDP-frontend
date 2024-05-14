<script setup lang="ts">
import AppHeader from './components/molecules/AppHeader.vue'
import AppFooter from './components/molecules/AppFooter.vue'
import { useAuthStore } from './stores/auth'
import { getQuestions } from '@/services/dataService'
import { useQuery } from '@tanstack/vue-query'

useAuthStore().readUserDetails()

const { isPending, isError, data, error } = useQuery({
  queryKey: ['questions'],
  queryFn: getQuestions
})
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
