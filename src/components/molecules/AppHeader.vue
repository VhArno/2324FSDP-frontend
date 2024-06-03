<script setup lang="ts">
import router from '@/router'
import AppButton from '../atoms/AppButton.vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const openMenu = ref(false)
const windowWidth = ref(window.innerWidth)

const thresholdWidthEm = 45

function goToLogin() {
  router.push({ name: 'login' })
}

function goToProfile() {
  router.push({ name: 'profile' })
}

function toggleMenu() {
  openMenu.value = !openMenu.value
}

function handleResize() {
  windowWidth.value = window.innerWidth
  if (window.innerWidth / 16 > thresholdWidthEm) {
    openMenu.value = true
  } else {
    openMenu.value = false
  }
}

onMounted(() => {
  openMenu.value = window.innerWidth >= 45 ? true : false
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

watch(windowWidth, (newValue) => {
  if (newValue / 16 > thresholdWidthEm) {
    openMenu.value = true
  } else {
    openMenu.value = false
  }
})
</script>

<template>
  <header>
    <nav>
      <button @click="toggleMenu" aria-expanded="false" class="toggle hamburger" id="menu">
        <span aria-hidden="true" class="icon"> <span></span><span></span><span></span> </span>
      </button>

      <RouterLink to="/" id="logo" href="/" aria-label="logo" tabindex="0">
        <img src="/src/assets/imgs/odisee_logo.svg" alt="Odisee. De co-hogeschool" />
      </RouterLink>

      <div v-show="openMenu" class="menu-items">
        <ul class="menu-list">
          <li>
            <RouterLink to="/">About</RouterLink>
          </li>
          <li>
            <RouterLink to="/test">Test</RouterLink>
          </li>
          <li>
            <a href="https://www.odisee.be/" target="_blank"
              >Odisee<i class="fa-solid fa-arrow-up-right-from-square"></i
            ></a>
          </li>
        </ul>
        <AppButton v-if="!authStore.isAuthenticated" @click="goToLogin" class="menu-btn"
          >Login</AppButton
        >
        <AppButton v-if="authStore.isAuthenticated" @click="goToProfile" class="menu-btn"
          ><i class="fa-solid fa-user"></i> Profile</AppButton
        >
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: auto;
  width: 80%;

  #logo {
    order: -1;
  }

  .menu-items {
    width: 100%;
    padding-left: 2rem;
    display: flex;
    flex-flow: column;
    margin-top: 1rem;

    .menu-list {
      display: flex;
      flex-flow: column;
      gap: 0.5rem;
      list-style-type: none;
      padding: 0;

      li {
        display: flex;
        flex-flow: row;
        align-items: center;

        i {
          margin-left: 0.2rem;
          font-size: 0.8em;
        }

        a {
          color: var(--main);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
            color: var(--accent-links);
          }
        }
      }
    }

    .menu-btn {
      margin-top: 0.5rem;
    }
  }

  .hamburger {
    background-color: transparent;
    border: none;

    .icon {
      display: flex;
      flex-flow: column;
      gap: 0.2rem;
      cursor: pointer;

      span {
        display: block;
        width: 20px;
        border: 2px solid var(--main);
      }
    }
  }
}

@media (min-width: 45em) {
  nav {
    padding: 0.5rem 5rem;
    flex-flow: row nowrap;
    gap: 3rem;

    .menu-items {
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: 0;

      .menu-list {
        flex-flow: row;
        gap: 3rem;
      }

      .menu-btn {
        display: block;
        margin: 0;
      }
    }

    .hamburger {
      display: none;
    }
  }
}
</style>
