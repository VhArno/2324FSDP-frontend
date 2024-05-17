<script setup lang="ts">
import type { User } from '@/types';

defineProps<{
    accounts: User[]
}>()
</script>

<template>
    <div>
        <div class="account" v-for="account in accounts" :key="account.id">
            <h2>{{ account.email }}</h2>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>