<script setup lang="ts">
import { getQuestions } from '@/services/dataService'
import type { QuestionData } from '@/types'
import { useQuery } from '@tanstack/vue-query'
import AppButton from '../atoms/AppButton.vue'
import { useTitle } from '@vueuse/core'
import AppAdminQuestions from '@/components/organisms/AppAdminQuestions.vue'
import AppAdminResults from '@/components/organisms/AppAdminResults.vue'
import AppAdminAccounts from '@/components/organisms/AppAdminAccounts.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from '@/stores/admin'

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
      <h2>Admin panel</h2>
      <div>
        <button :class="{ selected: menuItem === 'questions' }" @click="menuItem = 'questions'">
          Vragen
        </button>
        <button :class="{ selected: menuItem === 'results' }" @click="menuItem = 'results'">
          Resultaten
        </button>
        <button :class="{ selected: menuItem === 'accounts' }" @click="menuItem = 'accounts'">
          Accounts
        </button>
      </div>
    </div>

    <div class="content">
      <AppAdminQuestions
        v-if="data && menuItem === 'questions'"
        :questions="data.data.data"
      ></AppAdminQuestions>
      <AppAdminResults
        v-if="results && menuItem === 'results'"
        :results="results"
      ></AppAdminResults>
      <AppAdminAccounts
        v-if="accounts && menuItem === 'accounts'"
        :accounts="accounts"
      ></AppAdminAccounts>
    </div>
  </section>
</template>

<style lang="scss">
.content {
  width: 100% !important;
}

.admin-panel {
  display: flex;
  flex-flow: column;

  .side-menu {
    background-color: var(--bg-accent);
    border-radius: 10px;
    padding-bottom: 1rem;

    h2 {
      padding: 1rem;
      text-align: center;
    }

    div {
      display: flex;
      flex-flow: column;
      width: 100%;

      button {
        font-size: 1.1em;
        text-align: left;
        border: none;
        background-color: transparent;
        padding: 0.5rem 2rem;
        margin-left: 5px;
        cursor: pointer;

        &:hover {
          margin-left: 0;
          background-color: var(--main-light);
          border-left: 5px solid var(--main);
        }
      }

      .selected {
        margin-left: 0;
        background-color: var(--main-light);
        border-left: 5px solid var(--main);
      }
    }
  }

  .content {
    width: 100%;
    margin: 1rem 1rem 1rem 0;
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
