<script setup lang="ts"></script>

<template>
  <button><slot></slot></button>
</template>

<style scoped lang="scss">
button {
  background-color: var(--accent-btns);
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 10px;
  color: var(--bg);
  font-size: 1.01em;
  font-weight: 500;

  &:hover {
    background-color: var(--accent-btns-hover);
    cursor: pointer;
  }
}
</style>
