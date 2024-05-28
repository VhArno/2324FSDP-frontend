<script setup lang="ts">
const value = defineModel('value')
</script>

<template>
  <input class="input" v-model="value" />
</template>

<style scoped lang="scss">
.input {
  background-color: var(--main-light);
  border: 1px solid var(--secondary);
  border-radius: 10px;
  padding: 0.75rem 0.5rem;
}
</style>
