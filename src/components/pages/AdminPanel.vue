<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useSpecialisationStore } from '@/stores/specialisation'
import { useTitle } from '@vueuse/core'

const title = useTitle()
title.value = 'Admin | Odisee specialisatie test'

const specialisationStore = useSpecialisationStore()
specialisationStore.loadSpecialisations()
</script>

<template>
  <section class="admin-panel">
    <div class="side-menu">
      <h2>Admin panel</h2>
      <div class="menu">
        <button
          :class="{ selected: $route.name == 'adminQuestions' }"
          @click="router.push({ name: 'adminQuestions' })"
        >
          Vragen
        </button>
        <button
          :class="{ selected: $route.name == 'adminResults' }"
          @click="router.push({ name: 'adminResults' })"
        >
          Resultaten
        </button>
        <button
          :class="{ selected: $route.name == 'adminAccounts' }"
          @click="router.push({ name: 'adminAccounts' })"
        >
          Accounts
        </button>
        <button
          :class="{ selected: $route.name == 'adminUserSuggestions' }"
          @click="router.push({ name: 'adminUserSuggestions' })"
        >
          My suggestions
        </button>
        <button
          :class="{ selected: $route.name == 'adminSuggestions' }"
          @click="router.push({ name: 'adminSuggestions' })"
          v-if="useAuthStore().isSuperAdmin"
        >
          Suggestions
        </button>
      </div>
    </div>

    <div class="content">
      <RouterView></RouterView>
    </div>
  </section>
</template>

<style scoped lang="scss">
.admin-panel {
  display: flex;
  flex-flow: column;

  .side-menu {
    background-color: var(--main-light);
    color: white;
    margin: 1rem;

    h2 {
      background-color: var(--accent-btns);
    }

    .menu {
      position: static;
      top: 0;
    }

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
        color: var(--main);

        &:hover {
          margin-left: 0;
          background-color: var(--bg2);
          color: var(--bg);
          border-left: 6px solid var(--accent-btns);
        }
      }

      .selected {
        color: var(--bg);
        margin-left: 0;
        background-color: var(--bg2);
        border-left: 6px solid var(--accent-btns);
      }
    }
  }

  .content {
    margin: 2rem;
  }
}

@media (min-width: 45em) {
  .admin-panel {
    flex-flow: row;
    gap: 3rem;

    .side-menu {
      position: absolute;
      height: 100%;
      width: 13rem;
      margin: 0;

      .menu {
        position: sticky;
        top: 0;
      }
    }

    .content {
      margin: 1rem 1rem 1rem 14rem;
      width: 100%;
      overflow-x: hidden;
    }
  }
}
</style>
