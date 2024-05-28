<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{
  visible: boolean,
  style: object,
  account: { id: number }
}>()

const deleteAccount = () => {
  // Logic to delete the account
  console.log(`Deleting account with id: ${props.account.id}`);
}
</script>

<template>
    <div class="account-options" v-if="visible">
        <button @click="deleteAccount">Delete Account</button>
    </div>
</template>
  
<style scoped lang="scss">
.account-options {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}
</style>
  