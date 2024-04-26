<script setup lang="ts"></script>

<template>
  <a><slot></slot></a>
</template>

<style scoped lang="scss">
a {
  color: var(--accent-links);
  text-decoration: underline;
}
</style>
