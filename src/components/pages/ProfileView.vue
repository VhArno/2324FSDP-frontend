<script setup lang="ts">
import AppButton from '../atoms/AppButton.vue'
import { useTitle } from '@vueuse/core'

const title = useTitle()
title.value = 'Profile | Odisee specialisatie test'
</script>

<template>
  <section>
    <div class="intro">
      <div class="profile">
        <div class="details">
          <h1 tabindex=-1>Arno Van Hee</h1>
          <p>arnovanhee@gmail.com</p>
          <AppButton>Logout</AppButton>
        </div>

        <img src="/src/assets/imgs/profile_icon.svg" alt="profile icon" />
      </div>

      <img class="p-frame" src="/src/assets/imgs/frame3.svg" alt="odisee icon" />
    </div>

    <div>
      <h2>Resultaten</h2>

      <div class="results">
        <div>
          <h3>Test 1</h3>
          <h3>24/04/2024</h3>
          <h3>Telecommunications Engineer (Elektronica)</h3>
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
