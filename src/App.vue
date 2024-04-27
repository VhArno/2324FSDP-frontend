<script setup lang="ts">
import AppHeader from './components/molecules/AppHeader.vue'
import AppFooter from './components/molecules/AppFooter.vue'
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
    margin: 0 auto;
  }
}
</style>
