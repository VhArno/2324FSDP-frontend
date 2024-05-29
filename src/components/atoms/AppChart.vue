<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { ref } from 'vue'
import type { ChartData } from '@/types'

const props = defineProps<{
  labels: string[]
  values: number[]
}>()

const chartOptions = ref<object>({
  responsive: true
})

const chartData = ref<ChartData>({
  labels: props.labels,
  datasets: [{ data: props.values }]
})

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
</script>

<template>
  <Bar
    id="answers-chart"
    class="chart"
    :options="chartOptions"
    :data="chartData"
    aria-label="Test results per specialisation"
  />
</template>

<style scoped lang="scss">
.chart {
  width: 100% !important;
}
</style>
