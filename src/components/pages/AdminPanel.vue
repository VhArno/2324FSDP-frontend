<script setup lang="ts">
import { getQuestions } from '@/services/dataService';
import type { QuestionData } from '@/types';
import { useQuery } from '@tanstack/vue-query';
import AppButton from '../atoms/AppButton.vue'
import { useTitle } from '@vueuse/core'
import AppAdminQuestions from '@/components/organisms/AppAdminQuestions.vue'
import AppAdminResults from '@/components/organisms/AppAdminResults.vue'
import AppAdminAccounts from '@/components/organisms/AppAdminAccounts.vue'
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores/admin';

const title = useTitle()
title.value = 'Admin | Odisee specialisatie test'

const { isPending, isError, data, error } = useQuery({
  queryKey: ['questions'],
  queryFn: getQuestions<QuestionData>
})

const menuItem = ref<string>('questions')

const adminStore = useAdminStore()
adminStore.loadAccounts()
adminStore.loadResults()
const { accounts, results } = storeToRefs(adminStore)
</script>

<template>
  <section class="admin-panel">
    <div class="side-menu">
      <h2>Menu</h2>
      <div>
        <button @click="menuItem = 'questions'">Vragen</button>
        <button @click="menuItem = 'results'">Resultaten</button>
        <button @click="menuItem = 'accounts'">Accounts</button>
      </div>
    </div>

    <div class="content">

      <AppAdminQuestions v-if="data && menuItem === 'questions'" :questions="data.data.data"></AppAdminQuestions>
      <AppAdminResults v-if="results && menuItem === 'results'" :results="results"></AppAdminResults>
      <AppAdminAccounts v-if="accounts && menuItem === 'accounts'" :accounts="accounts"></AppAdminAccounts>
      
    </div>
  </section>
</template>

<style scoped lang="scss">
.admin-panel {
  display: flex;
  flex-flow: column;
  margin: 2rem auto;

  .side-menu {
    background-color: var(--bg-accent);
    padding: 1rem;
    border-radius: 10px;

    div {
      display: flex;
      flex-flow: column;
      gap: 0.5rem;
      padding: 0.5rem 1rem;

      button {
        font-size: 1.1em;
        text-align: left;
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
    }
  }

  .content {
    width: 100%;
  }
}

@media (min-width: 45em) {
  .admin-panel {
    flex-flow: row;
    gap: 3rem;

    .side-menu {
      
    }

    .content {

    }
  }
}
</style>
