<script setup lang="ts">
import { defineProps } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteAccount } from '@/services/adminService'

const queryClient = useQueryClient()

const { isPending, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: (id: number) => deleteAccount(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['accounts'] })
  }
})

const props = defineProps<{
  visible: boolean
  account: { id: number }
}>()

const removeAccount = () => {
  console.log(`Deleting account with id: ${props.account.id}`)
  mutate(props.account.id)
}
</script>

<template>
  <div class="account-options" v-if="visible">
    <button @click="removeAccount()">
      <i class="fa-solid fa-trash"></i>
      <span>Delete account</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.account-options {
  position: absolute;
  right: 0;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  button {
    color: var(--accent-links);
    display: flex;
    gap: 0.4rem;
    font-weight: 600;
    padding: 1rem;
    border: none;
    background-color: var(--bg);

    &:hover {
      background-color: var(--main-light);
      cursor: pointer;
    }
  }
}
</style>
