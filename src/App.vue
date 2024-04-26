<script setup lang="ts">
import AppHeader from './components/molecules/AppHeader.vue'
import AppFooter from './components/molecules/AppFooter.vue'
</script>

<template>
  <AppHeader></AppHeader>

  <main>
    <RouterView />
  </main>

  <AppFooter></AppFooter>
</template>

<style scoped lang="scss">
main {
  width: 80%;
  margin: 0 auto;
}
</style>
