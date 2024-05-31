<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  color: string
  text: string
}>()

const emit = defineEmits<{
  close: []
}>()

const countdown = ref(4) // Initial countdown value
const barWidth = ref(100) // Initial width of the bar (100%)
let intervalId: number | undefined = undefined
const countingDown = ref(false) // To prevent multiple countdowns

// Start the countdown
const startCountdown = () => {
  if (countingDown.value) return // Prevent multiple countdowns

  countingDown.value = true
  countdown.value = 4 // Reset the countdown to 3 seconds
  barWidth.value = 100 // Reset the bar width to 100%

  intervalId = setInterval(() => {
    countdown.value -= 1
    barWidth.value = (countdown.value / 4) * 100 // Update the bar width based on countdown

    if (countdown.value <= 0) {
      clearInterval(intervalId)
      intervalId = undefined
      countingDown.value = false
      emit('close')
    }
  }, 1000)
}

// Cleanup the interval on component unmount
onUnmounted(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
})

onMounted(() => {
  startCountdown()
})
</script>

<template>
  <div class="notification" :class="color">
    <div class="content">
      <p>{{ text }}</p>
    </div>

    <div class="timer-bar-container">
      <div class="timer-bar" :class="color" :style="{ width: barWidth + '%' }"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notification {
  position: absolute;
  right: 0px;
  top: 5px;
  background-color: var(--bg);
  box-shadow: 0px 0px 10px #b3b3b369;
  z-index: 100;
  border-radius: 4px;

  .content {
    padding: 0.5rem 2rem;
  }

  .blue {
    background-color: blue;
  }

  .red {
    background-color: red;
  }

  .green {
    background-color: green;
  }

  .timer-bar-container {
    width: 100%;
    height: 20px;
  }

  .timer-bar {
    height: 100%;
    transition: width 1s linear;
  }
}
</style>
