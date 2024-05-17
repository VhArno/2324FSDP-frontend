<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppButton from '../atoms/AppButton.vue'
import { useTitle } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useResultStore } from '@/stores/result';
import router from '@/router';

const title = useTitle()
title.value = 'Profile | Odisee specialisatie test'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const resultStore = useResultStore()
resultStore.loadResults()
const { savedResults } = storeToRefs(resultStore)

const logout = () => {
  authStore.logout()
}

const adminPanel = () => {
  router.push({ name: 'admin'})
}

function formatDate(date: Date) {
  const formattedDate = new Date(date)
  return formattedDate.toLocaleString('en-GB')
}
</script>

<template>
  <section>
    <div class="intro">
      <div class="profile">
        <div class="details">
          <h1 tabindex="-1">{{ user?.firstname + ' ' + user?.lastname }}</h1>
          <p>{{ user?.email }}</p>
          <AppButton @click="logout">Logout</AppButton>
          <AppButton v-if="authStore.isAdmin" @click="adminPanel">Admin panel</AppButton>
        </div>

        <img src="/src/assets/imgs/profile_icon.svg" alt="profile icon" />
      </div>

      <img class="p-frame" src="/src/assets/imgs/frame3.svg" alt="odisee icon" />
    </div>

    <div>
      <h2>Resultaten</h2>

      <div class="results">
        <div v-for="result in savedResults" :key="result.id">
          <h3>{{ result.name }}</h3>
          <h3>{{ formatDate(result.created_at) }}</h3>
          <h3>{{ result.specialisation.name }}</h3>
        </div>

        <div v-if="!savedResults?.length">
          <h3>
            Whoops you don't have any results saved yet! Go to
            <RouterLink :to="{ name: 'test' }">test</RouterLink>.
          </h3>
        </div>
      </div>
    </div>

    <div class="frame">
      <img src="/src/assets/imgs/frame1.svg" alt="odisee icon" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.intro {
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  .profile {
    display: flex;
    flex-flow: column-reverse;
    margin-bottom: 2rem;
    align-items: center;
    gap: 2rem;

    .details {
      display: flex;
      flex-flow: column;
      gap: 0.5rem;
    }
  }

  .p-frame {
    display: none;
  }
}

.results {
  div {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 10px;
    background-color: var(--main-light);

    overflow-x: auto;
    white-space: nowrap;
    scrollbar-color: var(--main) var(--bg-accent);

    h3 {
      font-weight: 600;
    }
  }
}

.frame {
  width: 100%;

  text-align: center;

  img {
    max-width: 15em;
  }
}

@media (min-width: 50em) {
  .intro {
    flex-flow: row wrap;

    .profile {
      flex-flow: row-reverse;
    }

    .p-frame {
      display: block;
    }
  }

  .frame {
    width: auto;
    position: relative;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
