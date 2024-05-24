<script setup lang="ts">
import type { User } from '@/types'

defineProps<{
  accounts: User[]
}>()
</script>

<template>
  <h1>Accounts</h1>

  <div class="accounts">
    <div class="account" v-for="account in accounts" :key="account.id">
      <h2>{{ account.email }}</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accounts {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}
</style>
