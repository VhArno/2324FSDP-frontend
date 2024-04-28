<script setup lang="ts"></script>

<template>
  <button><slot></slot></button>
</template>

<style scoped lang="scss">
button {
  background: rgb(33, 166, 135);
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 10px;
  color: rgb(255, 255, 255);
  text-shadow: rgb(19, 61, 51) 0px 0px 1px;
  font-size: 1.01em;
  font-weight: 500;

  &:hover {
    background-color: var(--accent-btns-hover);
    cursor: pointer;
  }
}
</style>
