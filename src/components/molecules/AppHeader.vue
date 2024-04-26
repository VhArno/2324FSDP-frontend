<script setup lang="ts">
import AppButton from '../atoms/AppButton.vue'
</script>

<template>
  <header>
    <nav>
      <button aria-expanded="false" class="toggle hamburger hidden" id="menu">
        <span aria-hidden="true" class="icon"> <span></span><span></span><span></span> </span>
      </button>

      <RouterLink to="/" id="logo" href="/" aria-label="logo" tabindex="0">
        <img src="/src/assets/imgs/odisee_logo.svg" alt="Odisee. De co-hogeschool" />
      </RouterLink>

      <ul class="menu-list">
        <li>
          <RouterLink to="/">About <i class="fa-solid fa-user"></i></RouterLink>
        </li>
        <li>
          <RouterLink to="/settings">Test <i class="fa-solid fa-gear"></i></RouterLink>
        </li>
        <li>
          <RouterLink to="/settings">Odisee <i class="fa-solid fa-gear"></i></RouterLink>
        </li>
      </ul>
      <AppButton class="menu-btn">Login</AppButton>
    </nav>
  </header>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  .menu-list {
    display: none;
  }

  .menu-btn {
    display: none;
  }

  .hamburger {
    order: 1;
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

    .menu-list {
      display: flex;
      flex-flow: row;
      gap: 3rem;
      list-style-type: none;
      padding: 0;

      li a {
        color: var(--main);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
          color: var(--accent-links);
        }
      }
    }

    .menu-btn {
      display: block;
    }

    .hamburger {
      display: none;
    }
  }
}
</style>
