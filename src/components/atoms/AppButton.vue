<script setup lang="ts"></script>

<template>
  <button><slot></slot></button>
</template>

<style scoped lang="scss">
button {
  background-color: var(--accent-btns);
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 10px;
  color: var(--bg);

  &:hover {
    cursor: pointer;
  }
}
</style>
