<script setup lang="ts">
import AppHeader from './components/molecules/AppHeader.vue'
import AppFooter from './components/molecules/AppFooter.vue'
import { useAuthStore } from './stores/auth'

useAuthStore().readUserDetails()
</script>

<template>
  <AppHeader></AppHeader>

  <main>
    <div
      :class="{
        content:
          $route.name !== 'adminQuestions' &&
          $route.name !== 'adminResults' &&
          $route.name !== 'adminAccounts'
      }"
    >
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
    width: 90%;
    height: auto;
    margin: 0 auto;
  }
}

@media (min-width: 45em) {
  main {
    .content {
      width: 80%;
    }
  }
}
</style>
