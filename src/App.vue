<script setup lang="ts">
import AppHeader from './components/molecules/AppHeader.vue'
import AppFooter from './components/molecules/AppFooter.vue'
import { useAuthStore } from './stores/auth'
import { onMounted, ref } from 'vue'

const piniaLoaded = ref<boolean>(false)

onMounted(async () => {
  await useAuthStore().readUserDetails()
  piniaLoaded.value = true
})
</script>

<template>
  <AppHeader v-if="piniaLoaded"></AppHeader>

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
