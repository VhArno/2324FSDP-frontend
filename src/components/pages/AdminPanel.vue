<script setup lang="ts">
import router from '@/router'
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
      <div>
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
    background-color: var(--bg-accent);
    margin: 1rem;

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
    margin: 2rem;
  }
}

@media (min-width: 45em) {
  .admin-panel {
    flex-flow: row;
    gap: 3rem;

    .side-menu {
      position: absolute;
      background-color: var(--bg-accent);
      height: 100%;
      width: 20%;
      max-width: 20rem;
      margin: 0;
    }

    .content {
      position: absolute;
      margin: 1rem 1rem 1rem 25%;
      width: 70%;
    }
  }
}
</style>
