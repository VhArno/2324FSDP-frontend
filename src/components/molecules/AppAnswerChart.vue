<script setup lang="ts">
import type { UserAnswer } from '@/types'
import AppChart from '@/components/atoms/AppChart.vue'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  question: string
  answers: UserAnswer[]
}>()

const userAnswerCount: Map<string, number> = new Map<string, number>()

props.answers.map((x) => {
  if (userAnswerCount.has(x.answer)) {
    const value = userAnswerCount.get(x.answer) ?? 0
    userAnswerCount.set(x.answer, value + x.user.length)
  } else {
    userAnswerCount.set(x.answer, x.user.length)
  }
})
</script>

<template>
  <div>
    <h3>{{ question }}</h3>
    <AppChart
      :labels="Array.from(userAnswerCount.keys())"
      :values="Array.from(userAnswerCount.values())"
    ></AppChart>
  </div>
</template>

<style scoped lang="scss"></style>
