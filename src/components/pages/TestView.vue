<script setup lang="ts">
import { useTitle } from '@vueuse/core'

const title = useTitle()
title.value = 'Test | Odisee specialisatie test'
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped lang="scss">

</style>
